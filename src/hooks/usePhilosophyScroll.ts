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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION MAP (9 sections = 9 scroll pages)
//
//  0  Hero
//  1  Cá Nhân – P1   (Right)  Camera: approaching CÁ NHÂN
//  2  Cá Nhân – P2   (Right)  Camera: slow orbit around CÁ NHÂN
//  3  Quần Chúng – P1 (Left)  Camera: approaching QUẦN CHÚNG
//  4  Quần Chúng – P2 (Left)  Camera: orbit QUẦN CHÚNG → LÃNH TỤ
//  5  Tình Huống – P1 (Right) Camera: approaching XÃ HỘI
//  6  Tình Huống – P2 (Right) Camera: orbit XÃ HỘI
//  7  Overview        (Left)  Camera: full system pullback
//  8  References      (Left)  Camera: gentle retreat
// ─────────────────────────────────────────────────────────────────────────────
export const TOTAL_PAGES = 9;

// Each band: start → peak (fully visible) → exit (fade starts) → end
// 9 sections, each occupying ~1/9 of scroll space (≈ 0.111 each)
export const SECTION_BOUNDS = [
  { start: 0.000, peak: 0.020, exit: 0.085, end: 0.111 }, // 0: Hero
  { start: 0.085, peak: 0.130, exit: 0.195, end: 0.222 }, // 1: Cá Nhân P1
  { start: 0.195, peak: 0.240, exit: 0.305, end: 0.333 }, // 2: Cá Nhân P2
  { start: 0.305, peak: 0.350, exit: 0.415, end: 0.444 }, // 3: Quần Chúng P1
  { start: 0.415, peak: 0.460, exit: 0.525, end: 0.555 }, // 4: Quần Chúng P2
  { start: 0.525, peak: 0.570, exit: 0.635, end: 0.666 }, // 5: Tình Huống P1
  { start: 0.635, peak: 0.680, exit: 0.745, end: 0.777 }, // 6: Tình Huống P2
  { start: 0.745, peak: 0.800, exit: 0.878, end: 0.900 }, // 7: Overview
  { start: 0.878, peak: 0.920, exit: 0.975, end: 1.000 }, // 8: References
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA WAYPOINTS
// Part-2 waypoints are subtle orbits of the same planet — same zone but
// shifted angle/distance so the audience feels movement without disorientation.
// ─────────────────────────────────────────────────────────────────────────────
export const CAMERA_WAYPOINTS = [
  { pos: [  0,  48, 125] as [number, number, number] }, // 0: Hero — wide overview
  { pos: [ 30,  12,  42] as [number, number, number] }, // 1: Cá Nhân P1 — direct approach
  { pos: [ 22,   6,  36] as [number, number, number] }, // 2: Cá Nhân P2 — orbit right+closer
  { pos: [-20,  -8,  28] as [number, number, number] }, // 3: Quần Chúng P1 — approach
  { pos: [-28,   4,  22] as [number, number, number] }, // 4: Quần Chúng P2 — drift toward Lãnh Tụ
  { pos: [-48,   8, -34] as [number, number, number] }, // 5: Tình Huống P1 — approach XÃ HỘI
  { pos: [-40,  14, -28] as [number, number, number] }, // 6: Tình Huống P2 — orbit XÃ HỘI
  { pos: [  0,  85, 145] as [number, number, number] }, // 7: Overview — full system
  { pos: [  0,  55, 105] as [number, number, number] }, // 8: References
] as const;

// Peak progress values (used by flyTo — nav jumps to first part of each topic)
export const SECTION_PEAKS = [
  0.020, // 0: Hero
  0.130, // 1: Cá Nhân P1
  0.240, // 2: Cá Nhân P2
  0.350, // 3: Quần Chúng P1
  0.460, // 4: Quần Chúng P2
  0.570, // 5: Tình Huống P1
  0.680, // 6: Tình Huống P2
  0.800, // 7: Overview
  0.920, // 8: References
] as const;

// Nav-jump targets: each topic points to the FIRST part's peak index
// (so clicking "Cá nhân & Xã hội" jumps to P1, not P2)
export const NAV_SECTION_PEAKS: Record<string, number> = {
  hero:      0,
  caNhan:    1,
  quanChung: 3,
  tinhHuong: 5,
  overview:  7,
  references:8,
};

// Map section index → planet id (null = no planet focus)
export const SECTION_PLANET_MAP: Record<number, string | null> = {
  0: null,
  1: 'CA_NHAN',
  2: 'CA_NHAN',
  3: 'QUAN_CHUNG',
  4: 'LANH_TU',
  5: 'XA_HOI',
  6: 'XA_HOI',
  7: null,
  8: null,
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