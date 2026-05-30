import { createContext, useContext, RefObject } from 'react';

export interface PhilosophyScrollState {
  scrollProgress: number;
  activeSection: number;
  focusedPlanet: string | null;
  flyTo: (sectionIndex: number) => void;
  scrollContainerRef: RefObject<HTMLDivElement>;
}

export const PhilosophyScrollContext = createContext<PhilosophyScrollState>({
  scrollProgress: 0,
  activeSection: 0,
  focusedPlanet: null,
  flyTo: () => {},
  scrollContainerRef: { current: null },
});

export const usePhilosophyScroll = () => useContext(PhilosophyScrollContext);

// 6 scroll pages: Hero, S1 (Cá nhân & Xã hội), S2 (Quần chúng & Lãnh tụ), S3 (Tình huống), Overview, References
export const TOTAL_PAGES = 6;

// Each band: start → peak (fully visible) → exit (fade starts) → end
export const SECTION_BOUNDS = [
  { start: 0.000, peak: 0.030, exit: 0.130, end: 0.165 }, // 0: Hero
  { start: 0.130, peak: 0.200, exit: 0.295, end: 0.330 }, // 1: Cá nhân & Xã hội
  { start: 0.295, peak: 0.365, exit: 0.460, end: 0.495 }, // 2: Quần chúng & Lãnh tụ
  { start: 0.460, peak: 0.530, exit: 0.625, end: 0.660 }, // 3: Case Study / Tình huống
  { start: 0.625, peak: 0.700, exit: 0.820, end: 0.860 }, // 4: Overview
  { start: 0.820, peak: 0.880, exit: 0.970, end: 1.000 }, // 5: References
] as const;

// Cinematic camera waypoints for 6 sections
export const CAMERA_WAYPOINTS = [
  { pos: [0,   48, 125] as [number, number, number] }, // 0: Hero — wide overview
  { pos: [30,  12,  42] as [number, number, number] }, // 1: CÁ NHÂN zone (r=34, angle≈0)
  { pos: [-20, -8,  28] as [number, number, number] }, // 2: QUẦN CHÚNG + LÃNH TỤ combined
  { pos: [-48,  8, -34] as [number, number, number] }, // 3: Case Study / Tình huống (wide angle)
  { pos: [0,   85, 145] as [number, number, number] }, // 4: Overview — full system
  { pos: [0,   55, 105] as [number, number, number] }, // 5: References
] as const;

// Peak progress values (used by flyTo)
export const SECTION_PEAKS = [0.030, 0.200, 0.365, 0.530, 0.700, 0.880] as const;

// Map section index → planet id (null = no planet focus)
export const SECTION_PLANET_MAP: Record<number, string | null> = {
  0: null,
  1: 'CA_NHAN',
  2: 'QUAN_CHUNG',
  3: 'XA_HOI',  // Case Study / Tình huống — uses XÃ HỘI zone camera
  4: null,
  5: null,
};

export function getSectionIndex(progress: number): number {
  for (let i = SECTION_BOUNDS.length - 1; i >= 0; i--) {
    if (progress >= SECTION_BOUNDS[i].start) return i;
  }
  return 0;
}

export function getFocusedPlanet(sectionIdx: number): string | null {
  return SECTION_PLANET_MAP[sectionIdx] ?? null;
}

export function lerpCameraPos(
  waypointA: [number, number, number],
  waypointB: [number, number, number],
  t: number
): [number, number, number] {
  return [
    waypointA[0] + (waypointB[0] - waypointA[0]) * t,
    waypointA[1] + (waypointB[1] - waypointA[1]) * t,
    waypointA[2] + (waypointB[2] - waypointA[2]) * t,
  ];
}

// Cinematic easing: exponential ease-out — fast approach, slow arrival
export function cinematicEase(t: number): number {
  return t === 0 ? 0 : 1 - Math.pow(2, -10 * t);
}