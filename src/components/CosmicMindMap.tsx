'use client';

import React, { useRef, useMemo, useEffect, useContext, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Text, Sphere, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useMotionValue, useSpring } from 'framer-motion';
import {
  PhilosophyScrollContext,
  CAMERA_WAYPOINTS,
  SECTION_BOUNDS,
  cinematicEase,
  getFocusedPlanet,
} from '../hooks/usePhilosophyScroll';

// ─────────────────────────────────────────────────────────────────────────────
// THEME & ASSETS
// ─────────────────────────────────────────────────────────────────────────────
const THEME = {
  core:       '#FDE047',
  social:     '#38BDF8',
  revolution: '#FB923C',
  abstract:   '#C084FC',
  orbit:      '#1E3A5F',
  cosmic:     '#64FFDA',
};

// ĐƯỜNG DẪN ĐẾN FILE FONT TRONG THƯ MỤC PUBLIC
const DISPLAY_FONT = '/fonts/InstrumentSerif-Regular.ttf';

// ─────────────────────────────────────────────────────────────────────────────
// GRAVITY CURVE
// ─────────────────────────────────────────────────────────────────────────────
const GravityCurve = ({
  sourceRef,
  targetRef,
  color,
  tension = 5,
  opacity = 0.25,
}: {
  sourceRef: React.RefObject<THREE.Group | null>;
  targetRef: React.RefObject<THREE.Group | null>;
  color: string;
  tension?: number;
  opacity?: number;
}) => {
  const lineRef = useRef<THREE.Line>(null);

  const vStart   = useMemo(() => new THREE.Vector3(), []);
  const vEnd     = useMemo(() => new THREE.Vector3(), []);
  const vControl = useMemo(() => new THREE.Vector3(), []);
  const curve    = useMemo(() => new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd), [vStart, vControl, vEnd]);
  const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  const material = useMemo(() => new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
  }), [color, opacity]);
  const lineObject = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useFrame(() => {
    if (!sourceRef.current || !targetRef.current || !lineRef.current) return;
    material.opacity = opacity;
    sourceRef.current.getWorldPosition(vStart);
    targetRef.current.getWorldPosition(vEnd);
    vControl.addVectors(vStart, vEnd).multiplyScalar(0.5);
    vControl.y += tension + Math.sin(Date.now() * 0.001) * 1.5;
    curve.v0 = vStart;
    curve.v1 = vControl;
    curve.v2 = vEnd;
    lineRef.current.geometry.setFromPoints(curve.getPoints(24));
  });

  return <primitive object={lineObject} ref={lineRef} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// SATELLITE
// ─────────────────────────────────────────────────────────────────────────────
interface SatelliteData {
  name: string;
  radius: number;
  speed: number;
  angle: number;
  size: number;
  color: string;
}

const Satellite = ({
  name, radius, speed, angle, size, color, focused,
}: SatelliteData & { focused: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  const currentSpeed = useRef(speed);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const targetSpeed = focused ? speed * 0.35 : speed;
    currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.03;
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.cos(t * currentSpeed.current + angle) * radius;
    ref.current.position.z = Math.sin(t * currentSpeed.current + angle) * radius;
    ref.current.position.y = Math.sin(t * currentSpeed.current * 3 + angle) * (size * 0.5);
  });

  return (
    <group ref={ref}>
      <Sphere args={[size, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={focused ? 2.2 : 1.4}
          toneMapped={false}
        />
      </Sphere>
      <Text
        font={DISPLAY_FONT}
        position={[0, size + 1.0, 0]}
        fontSize={size * 1.25}
        color={focused ? '#FFFFFF' : '#CBD5E1'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000"
      >
        {name}
      </Text>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PLANET NODE
// ─────────────────────────────────────────────────────────────────────────────
interface PlanetData {
  id: string;
  name: string;
  radius: number;
  speed: number;
  angle: number;
  size: number;
  color: string;
  satellites: SatelliteData[];
  coreRef: React.RefObject<THREE.Group | null>;
  focusedPlanet: string | null;
}

const PlanetNode = ({
  id, name, radius, speed, angle, size, color, satellites, coreRef, focusedPlanet,
}: PlanetData) => {
  const groupRef  = useRef<THREE.Group>(null);
  const meshRef   = useRef<THREE.Mesh>(null);
  const matRef    = useRef<THREE.MeshStandardMaterial>(null);
  const ringRef   = useRef<THREE.Mesh>(null);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const isFocused      = focusedPlanet === id;
  const isDeemphasized = focusedPlanet !== null && !isFocused;

  const currentScale    = useRef(1.0);
  const currentEmissive = useRef(1.1);
  const currentOrbitOp  = useRef(0.12);
  const floatOffset     = useRef(0);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    groupRef.current.position.x = Math.cos(t * speed + angle) * radius;
    groupRef.current.position.z = Math.sin(t * speed + angle) * radius;

    const baseFloat = Math.sin(t * speed * 0.5 + angle) * 3.5;
    const targetFloat = isFocused ? Math.sin(t * 0.8) * 2.0 : 0;
    floatOffset.current += (targetFloat - floatOffset.current) * 0.04;
    groupRef.current.position.y = baseFloat + floatOffset.current;

    const targetScale = isFocused ? 1.65 : isDeemphasized ? 0.82 : 1.0;
    currentScale.current += (targetScale - currentScale.current) * 0.04;
    groupRef.current.scale.setScalar(currentScale.current);

    const targetEmissive = isFocused ? 2.9 : isDeemphasized ? 0.45 : 1.1;
    currentEmissive.current += (targetEmissive - currentEmissive.current) * 0.04;
    if (matRef.current) matRef.current.emissiveIntensity = currentEmissive.current;

    const targetOp = isFocused ? 0.32 : isDeemphasized ? 0.04 : 0.12;
    currentOrbitOp.current += (targetOp - currentOrbitOp.current) * 0.04;
    if (ringMatRef.current) ringMatRef.current.opacity = currentOrbitOp.current;

    if (meshRef.current) meshRef.current.rotation.y += 0.003;
  });

  return (
    <>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.2, radius + 0.2, 128]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color={color}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group ref={groupRef}>
        <Sphere ref={meshRef} args={[size, 40, 40]}>
          <meshStandardMaterial
            ref={matRef}
            color={color}
            emissive={color}
            emissiveIntensity={1.1}
            toneMapped={false}
            roughness={0.3}
            metalness={0.1}
          />
        </Sphere>

        <Text
          font={DISPLAY_FONT}
          position={[0, size + 2.5, 0]}
          fontSize={size * 1.05}
          color={isFocused ? '#FFFFFF' : '#E2E8F0'}
          letterSpacing={0.08}
          outlineWidth={0.05}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>

        {satellites.map((sat, i) => (
          <Satellite key={i} {...sat} focused={isFocused} />
        ))}
      </group>

      <GravityCurve
        sourceRef={coreRef}
        targetRef={groupRef}
        color={color}
        tension={7}
        opacity={isFocused ? 0.5 : isDeemphasized ? 0.08 : 0.22}
      />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHICAL UNIVERSE
// ─────────────────────────────────────────────────────────────────────────────
const PhilosophicalUniverse = ({ focusedPlanet }: { focusedPlanet: string | null }) => {
  const coreRef = useRef<THREE.Group>(null);
  const coreMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const systems = useMemo(() => [
    {
      id: 'CA_NHAN',
      name: 'CÁ NHÂN',
      radius: 34, speed: 0.14, angle: 0,
      size: 2.4, color: THEME.social,
      satellites: [
        { name: 'Bản chất loài', radius: 7, speed: 0.9,  angle: 0,         size: 0.75, color: THEME.abstract },
        { name: 'Tính cá thể',   radius: 7, speed: 0.9,  angle: Math.PI,   size: 0.75, color: THEME.abstract },
      ],
    },
    {
      id: 'XA_HOI',
      name: 'XÃ HỘI',
      radius: 54, speed: 0.09, angle: Math.PI,
      size: 3.4, color: THEME.social,
      satellites: [
        { name: 'Giai cấp',  radius: 9, speed: 0.55, angle: 0,       size: 1.1, color: THEME.abstract },
        { name: 'Nhà nước',  radius: 9, speed: 0.55, angle: Math.PI, size: 1.1, color: THEME.abstract },
      ],
    },
    {
      id: 'LANH_TU',
      name: 'LÃNH TỤ',
      radius: 24, speed: 0.24, angle: Math.PI / 2,
      size: 1.9, color: THEME.revolution,
      satellites: [
        { name: 'Định hướng', radius: 5.5, speed: 1.3, angle: 0,       size: 0.65, color: THEME.abstract },
        { name: 'Tổ chức',    radius: 5.5, speed: 1.3, angle: Math.PI, size: 0.65, color: THEME.abstract },
      ],
    },
    {
      id: 'QUAN_CHUNG',
      name: 'QUẦN CHÚNG',
      radius: 44, speed: 0.11, angle: -Math.PI / 2,
      size: 2.9, color: THEME.revolution,
      satellites: [
        { name: 'Lực lượng SX', radius: 8.5, speed: 0.65, angle: 0,       size: 0.95, color: THEME.abstract },
        { name: 'CM Xã hội',    radius: 8.5, speed: 0.65, angle: Math.PI, size: 0.95, color: THEME.abstract },
      ],
    },
  ], []);

  useFrame(({ clock }) => {
    if (!coreRef.current) return;
    coreRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.38) * 1.8;
    if (coreMatRef.current) {
      const targetEmissive = focusedPlanet === null ? 3.0 : 2.0;
      coreMatRef.current.emissiveIntensity +=
        (targetEmissive - coreMatRef.current.emissiveIntensity) * 0.03;
    }
  });

  return (
    <>
      <group ref={coreRef}>
        <Sphere args={[3.8, 64, 64]}>
          <meshStandardMaterial
            ref={coreMatRef}
            color={THEME.core}
            emissive={THEME.core}
            emissiveIntensity={2.8}
            toneMapped={false}
          />
        </Sphere>
        <Sphere args={[4.6, 28, 28]}>
          <meshBasicMaterial
            color={THEME.core}
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            wireframe
          />
        </Sphere>
        <Text
          font={DISPLAY_FONT}
          position={[0, 6.8, 0]}
          fontSize={2.8}
          color="#FFF"
          letterSpacing={0.15}
          outlineWidth={0.08}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
        >
          CON NGƯỜI
        </Text>
      </group>

      {systems.map((sys) => (
        <PlanetNode
          key={sys.id}
          {...sys}
          coreRef={coreRef as React.RefObject<THREE.Group | null>}
          focusedPlanet={focusedPlanet}
        />
      ))}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CINEMATIC CAMERA CONTROLLER
// ─────────────────────────────────────────────────────────────────────────────
const CinematicCamera = ({
  latestMouseX,
  latestMouseY,
}: {
  latestMouseX: React.RefObject<number>;
  latestMouseY: React.RefObject<number>;
}) => {
  const { camera } = useThree();
  const { scrollProgress, activeSection } = useContext(PhilosophyScrollContext);
  const orbitAngle = useRef(0);

  useFrame(({ clock }) => {
    const progress = Math.max(0, Math.min(1, scrollProgress));
    let fromIdx = 0;
    let toIdx   = 0;
    let rawT    = 0;

    for (let i = 0; i < SECTION_BOUNDS.length - 1; i++) {
      const currentPeak = SECTION_BOUNDS[i].peak;
      const nextPeak    = SECTION_BOUNDS[i + 1].peak;
      if (progress >= currentPeak && progress <= nextPeak) {
        fromIdx = i;
        toIdx   = i + 1;
        rawT    = (progress - currentPeak) / (nextPeak - currentPeak);
        break;
      }
    }

    if (progress < SECTION_BOUNDS[0].peak) {
      fromIdx = 0; toIdx = 0; rawT = 0;
    } else if (progress > SECTION_BOUNDS[SECTION_BOUNDS.length - 1].peak) {
      fromIdx = SECTION_BOUNDS.length - 1;
      toIdx   = SECTION_BOUNDS.length - 1;
      rawT    = 1;
    }

    const et = cinematicEase(Math.min(rawT, 1));
    const from = CAMERA_WAYPOINTS[fromIdx].pos;
    const to   = CAMERA_WAYPOINTS[toIdx].pos;

    let baseX = from[0] + (to[0] - from[0]) * et;
    let baseY = from[1] + (to[1] - from[1]) * et;
    let baseZ = from[2] + (to[2] - from[2]) * et;

    const driftStrength = Math.max(0, (rawT - 0.65) / 0.35);
    orbitAngle.current += 0.002 * driftStrength;
    const orbitRadius = 6 * driftStrength;
    baseX += Math.sin(orbitAngle.current) * orbitRadius;
    baseZ += Math.cos(orbitAngle.current) * orbitRadius * 0.5;

    const mx = (latestMouseX.current ?? 0);
    const my = (latestMouseY.current ?? 0);
    const parallaxScale = activeSection === 0 ? 10 : 5;
    const targetX = baseX + mx * parallaxScale;
    const targetY = baseY - my * (parallaxScale * 0.7);
    const targetZ = baseZ;

    const lerpFactor = 0.042;
    camera.position.x += (targetX - camera.position.x) * lerpFactor;
    camera.position.y += (targetY - camera.position.y) * lerpFactor;
    camera.position.z += (targetZ - camera.position.z) * lerpFactor;

    const focusedPlanet = getFocusedPlanet(activeSection);
    const lookAtY = focusedPlanet ? -2 : 0;
    camera.lookAt(0, lookAtY, 0);
  });

  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function CosmicMindMap() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 32, stiffness: 85 });
  const smoothMouseY = useSpring(mouseY, { damping: 32, stiffness: 85 });
  const latestMX = useRef(0);
  const latestMY = useRef(0);

  const { activeSection } = useContext(PhilosophyScrollContext);
  const focusedPlanet = getFocusedPlanet(activeSection);

  // Thêm 2 state để quản lý hiệu suất động
  const [dpr, setDpr] = useState(typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1);
  const [enableEffects, setEnableEffects] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth)  - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const unsubX = smoothMouseX.on('change', v => { latestMX.current = v; });
    const unsubY = smoothMouseY.on('change', v => { latestMY.current = v; });
    return () => { unsubX(); unsubY(); };
  }, [smoothMouseX, smoothMouseY]);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 48, 125], fov: 44 }}
        dpr={dpr} // DPR bây giờ được quản lý động
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        shadows={false}
      >
        {/* Lắng nghe hiệu suất: Nếu FPS tụt, hạ DPR và tắt hiệu ứng */}
        <PerformanceMonitor 
          onDecline={() => {
            setDpr(1);
            setEnableEffects(false);
          }} 
        />

        <color attach="background" args={['#030A14']} />
        <fog attach="fog" args={['#030A14', 55, 200]} />

        <ambientLight intensity={0.22} />
        <pointLight position={[0, 0, 0]}    intensity={130} distance={120} color={THEME.core} />
        <pointLight position={[30, 20, 30]} intensity={22}  color={THEME.social} />
        <pointLight position={[-30, -10, 20]} intensity={18} color={THEME.revolution} />

        <Stars
          radius={130}
          depth={65}
          count={isMobile ? 1200 : 2800}
          factor={4}
          saturation={0.1}
          fade
          speed={0.5}
        />

        <PhilosophicalUniverse focusedPlanet={focusedPlanet} />

        <CinematicCamera latestMouseX={latestMX} latestMouseY={latestMY} />

        {/* Chỉ bật hậu kỳ (Post-processing) nếu máy đủ khỏe */}
        {enableEffects && (
          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={0.85}
              mipmapBlur={!isMobile}
              intensity={isMobile ? 0 : focusedPlanet ? 1.6 : 1.1}
            />
            <Noise opacity={0.022} />
            <Vignette eskil={false} offset={0.15} darkness={1.15} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}