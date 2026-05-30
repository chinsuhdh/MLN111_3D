import { useRef, useState, useEffect, useContext } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS } from '../hooks/usePhilosophyScroll';

export default function ConstellationMindMap() {
  const { scrollProgress } = useContext(PhilosophyScrollContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Scroll-driven visibility
  const s = SECTION_BOUNDS[4];
  const opacityIn  = Math.min(1, scrollProgress < s.peak
    ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start))
    : 1);
  const opacityOut = scrollProgress > s.exit
    ? Math.max(0, 1 - (scrollProgress - s.exit) / (s.end - s.exit))
    : 1;
  const opacity = Math.min(opacityIn, opacityOut);
  const scale   = 0.88 + 0.12 * Math.min(1, Math.max(0, (scrollProgress - s.start) / (s.peak - s.start)));

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX       = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const rotateY       = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const layerOuterX   = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const layerOuterY   = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
  const layerInnerX   = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const layerInnerY   = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);
  const layerCenterX  = useTransform(smoothX, [-0.5, 0.5], [-75, 75]);
  const layerCenterY  = useTransform(smoothY, [-0.5, 0.5], [-75, 75]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((touch.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((touch.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleReset = () => { mouseX.set(0); mouseY.set(0); };

  const isDimmed = (nodeType: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode === 'CENTER') return false;
    return hoveredNode !== nodeType;
  };

  if (opacity < 0.01) return null;

  return (
    <div
      id="section-mindmap"
      className="hud-panel"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: 'opacity 0.08s linear, transform 0.08s linear',
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
        alignItems: 'flex-start',
        paddingTop: '4rem',
      }}
    >
      <div className="w-full h-full overflow-y-auto px-4 md:px-12 2xl:px-20 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-4">Phần 04 · Không gian Tư tưởng</p>
          <h2 className="text-4xl md:text-5xl tracking-tight text-white">
            Chòm sao Khái niệm
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-5 text-sm md:text-base leading-relaxed">
            Khám phá mạng lưới liên kết đa chiều. Rê chuột hoặc chạm vào các vì sao để kết nối không gian.
          </p>
        </div>

        {/* 3D parallax constellation */}
        <div className="max-w-[1200px] mx-auto w-full">
          <div
            className="relative w-full p-2 md:p-6 lg:p-10 touch-none"
            style={{ perspective: 1500 }}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleReset}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleReset}
            onTouchCancel={handleReset}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full aspect-[10/12] md:aspect-[16/10] min-h-[65vh] md:min-h-[600px]"
            >
              <svg viewBox="0 0 960 620" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  {/* Sun gradient */}
                  <radialGradient id="star-sun" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#FFF" />
                    <stop offset="20%"  stopColor="#FEF08A" />
                    <stop offset="100%" stopColor="#EAB308" />
                  </radialGradient>
                  <radialGradient id="glow-sun" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#CA8A04" stopOpacity="0.7" />
                    <stop offset="50%"  stopColor="#854D0E" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#422006" stopOpacity="0" />
                  </radialGradient>
                  {/* Cyan gradient */}
                  <radialGradient id="star-cyan" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#FFF" />
                    <stop offset="30%"  stopColor="#5EEAD4" />
                    <stop offset="100%" stopColor="#0D9488" />
                  </radialGradient>
                  <radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#0F766E" stopOpacity="0.8" />
                    <stop offset="50%"  stopColor="#115E59" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#042F2E" stopOpacity="0" />
                  </radialGradient>
                  {/* Purple gradient */}
                  <radialGradient id="star-purple" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#FFF" />
                    <stop offset="30%"  stopColor="#D8B4FE" />
                    <stop offset="100%" stopColor="#9333EA" />
                  </radialGradient>
                  <radialGradient id="glow-purple" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#7E22CE" stopOpacity="0.8" />
                    <stop offset="50%"  stopColor="#581C87" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3B0764" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background connector lines — reveal on hover */}
                <motion.g style={{ x: layerOuterX, y: layerOuterY }} opacity={hoveredNode ? 0.25 : 0} className="transition-opacity duration-700 pointer-events-none">
                  <g stroke="#334155" strokeWidth="1" strokeDasharray="3 8">
                    <line x1="100" y1="100" x2="860" y2="520" />
                    <line x1="860" y1="100" x2="100" y2="520" />
                  </g>
                </motion.g>

                {/* Constellation rays — reveal on hover */}
                <motion.g style={{ x: layerInnerX, y: layerInnerY }} opacity={hoveredNode ? 0.8 : 0} className="transition-opacity duration-500 pointer-events-none">
                  <path d="M480 310 L480 120 M480 310 L765 310 M480 310 L480 500 M480 310 L195 310"
                    stroke="#64FFDA" strokeWidth="2" strokeDasharray="5 5" opacity="0.7" />
                  <polygon points="480,120 765,310 480,500 195,310" stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0.3" />
                  <g stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.5">
                    <line x1="480" y1="120" x2="330" y2="48" /><line x1="480" y1="120" x2="630" y2="48" />
                    <line x1="765" y1="310" x2="890" y2="188" /><line x1="765" y1="310" x2="890" y2="432" />
                    <line x1="195" y1="310" x2="70"  y2="188" /><line x1="195" y1="310" x2="70"  y2="432" />
                    <line x1="480" y1="500" x2="360" y2="585" /><line x1="480" y1="500" x2="600" y2="585" />
                  </g>
                </motion.g>

                {/* Satellite planets */}
                <motion.g style={{ x: layerInnerX, y: layerInnerY }} opacity={isDimmed('NODE') ? 0.15 : 1} className="transition-opacity duration-500 cursor-default">
                  {[
                    { cx: 330,  cy: 48,  r: 32, glow: 'glow-cyan',    star: 'star-cyan',    label: 'BẢN CHẤT LOÀI', ty: 22, dur: 6 },
                    { cx: 630,  cy: 48,  r: 30, glow: 'glow-purple',  star: 'star-purple',  label: 'TÍNH CÁ THỂ',   ty: 22, dur: 7 },
                    { cx: 890,  cy: 188, r: 36, glow: 'glow-cyan',    star: 'star-cyan',    label: 'GIAI CẤP',      ty: 235, dur: 5 },
                    { cx: 890,  cy: 432, r: 32, glow: 'glow-purple',  star: 'star-purple',  label: 'NHÀ NƯỚC',      ty: 475, dur: 8 },
                    { cx: 70,   cy: 188, r: 34, glow: 'glow-purple',  star: 'star-purple',  label: 'ĐỊNH HƯỚNG',    ty: 235, dur: 6.5 },
                    { cx: 70,   cy: 432, r: 30, glow: 'glow-cyan',    star: 'star-cyan',    label: 'TỔ CHỨC',       ty: 475, dur: 7.5 },
                    { cx: 360,  cy: 585, r: 32, glow: 'glow-cyan',    star: 'star-cyan',    label: 'LỰC LƯỢNG SX',  ty: 625, dur: 5.5 },
                    { cx: 600,  cy: 585, r: 36, glow: 'glow-purple',  star: 'star-purple',  label: 'CM XÃ HỘI',     ty: 625, dur: 6.2 },
                  ].map((sat, i) => (
                    <g key={i} style={{ transformOrigin: `${sat.cx}px ${sat.cy}px` }} className={`animate-[breathe_${sat.dur}s_ease-in-out_infinite]`}>
                      <circle cx={sat.cx} cy={sat.cy} r={sat.r} fill={`url(#${sat.glow})`} />
                      <circle cx={sat.cx} cy={sat.cy} r={sat.r * 0.32} fill={`url(#${sat.star})`} />
                      <text x={sat.cx} y={sat.ty} textAnchor="middle" fontFamily="Inter" fontSize="9.5" fontWeight="400" fill="#CBD5E1" letterSpacing="0.8">{sat.label}</text>
                    </g>
                  ))}
                </motion.g>

                {/* 4 main star nodes */}
                <motion.g style={{ x: layerCenterX, y: layerCenterY }}>
                  {[
                    { key: 'CA_NHAN',    cx: 480, cy: 120, r: 25, rGlow: 70, glow: 'glow-cyan',   star: 'star-cyan',   ring: '#2DD4BF', label: 'CÁ NHÂN',    ly: 70,  dur: 15 },
                    { key: 'XA_HOI',     cx: 765, cy: 310, r: 28, rGlow: 80, glow: 'glow-purple', star: 'star-purple', ring: '#A78BFA', label: 'XÃ HỘI',     ly: 260, dur: 20 },
                    { key: 'LANH_TU',   cx: 195, cy: 310, r: 25, rGlow: 70, glow: 'glow-purple', star: 'star-purple', ring: '#A78BFA', label: 'LÃNH TỤ',    ly: 260, dur: 15 },
                    { key: 'QUAN_CHUNG', cx: 480, cy: 500, r: 28, rGlow: 80, glow: 'glow-cyan',   star: 'star-cyan',   ring: '#2DD4BF', label: 'QUẦN CHÚNG', ly: 565, dur: 18 },
                  ].map(n => (
                    <motion.g
                      key={n.key}
                      onPointerEnter={() => setHoveredNode(n.key)}
                      onPointerLeave={() => setHoveredNode(null)}
                      className="cursor-pointer transition-all duration-500"
                      opacity={isDimmed(n.key) ? 0.25 : 1}
                    >
                      <circle cx={n.cx} cy={n.cy} r={n.rGlow} fill={`url(#${n.glow})`} />
                      <circle cx={n.cx} cy={n.cy} r={n.r} fill={`url(#${n.star})`} />
                      <circle
                        cx={n.cx} cy={n.cy} r={n.r + 16}
                        stroke={n.ring} strokeWidth="1.2" fill="none" opacity="0.35" strokeDasharray="4 4"
                        style={{ transformOrigin: `${n.cx}px ${n.cy}px`, animation: `cosmic-spin ${n.dur}s linear infinite` }}
                      />
                      <text x={n.cx} y={n.ly} textAnchor="middle" fontFamily="Inter" fontSize="13" fontWeight="600" fill="#FFF" letterSpacing="1.5" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                        {n.label}
                      </text>
                    </motion.g>
                  ))}
                </motion.g>

                {/* Central CON NGƯỜI sun */}
                <motion.g
                  style={{ x: layerCenterX, y: layerCenterY }}
                  onPointerEnter={() => setHoveredNode('CENTER')}
                  onPointerLeave={() => setHoveredNode(null)}
                  className="cursor-crosshair"
                >
                  <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                    <circle cx="480" cy="310" r="135" fill="url(#glow-sun)" />
                    <circle cx="480" cy="310" r="40"  fill="url(#star-sun)" />
                    <circle cx="480" cy="310" r="78"  stroke="#FDE047" strokeWidth="1.2" fill="none" opacity="0.5" strokeDasharray="14 28"
                      style={{ transformOrigin: '480px 310px', animation: 'cosmic-spin 12s linear infinite' }} />
                    <circle cx="480" cy="310" r="92"  stroke="#FFF" strokeWidth="0.4" fill="none" opacity="0.25"
                      style={{ transformOrigin: '480px 310px', animation: 'cosmic-spin 20s linear infinite reverse' }} />
                    <text x="480" y="315" textAnchor="middle" fontFamily="Inter" fontSize="16" fontWeight="800" fill="#FFF" letterSpacing="2.5"
                      style={{ textShadow: '0 4px 15px rgba(0,0,0,1), 0 0 10px #FDE047' }}>
                      CON NGƯỜI
                    </text>
                  </motion.g>
                </motion.g>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}