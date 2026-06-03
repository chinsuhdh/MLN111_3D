import { createContext, useContext, RefObject } from 'react';

export type ReferenceNodeId = 'con_nguoi' | 'xa_hoi' | 'ca_nhan' | 'quan_chung' | 'lanh_tu'| 'hoat_dong_thuc_tien' // Thêm dòng này
  | 'lich_su';

export interface PhilosophyScrollState {
  scrollProgress: number;
  activeSection: number;
  focusedPlanet: string | null;
  flyTo: (sectionIndex: number) => void;
  scrollContainerRef: RefObject<HTMLDivElement>;
  
  // --- STATE ĐIỀU KHIỂN BẢN ĐỒ TRIẾT HỌC (SECTION 10) ---
  referenceActiveNode: ReferenceNodeId;
  setReferenceActiveNode: (id: ReferenceNodeId) => void;
  referenceHoveredNode: ReferenceNodeId | null;
  setReferenceHoveredNode: (id: ReferenceNodeId | null) => void;
  referenceInteractionEnabled: boolean;
  setReferenceInteractionEnabled: (enabled: boolean) => void;
}

export const PhilosophyScrollContext = createContext<PhilosophyScrollState>({
  scrollProgress: 0,
  activeSection: 0,
  focusedPlanet: null,
  flyTo: () => {},
  scrollContainerRef: { current: null },
  
  referenceActiveNode: 'con_nguoi',
  setReferenceActiveNode: () => {},
  referenceHoveredNode: null,
  setReferenceHoveredNode: () => {},
  referenceInteractionEnabled: false,
  setReferenceInteractionEnabled: () => {},
});

export const usePhilosophyScroll = () => useContext(PhilosophyScrollContext);

export const TOTAL_PAGES = 11;

export const SECTION_BOUNDS = [
  { start: 0.000, peak: 0.020, exit: 0.070, end: 0.090 }, // 0: Hero
  { start: 0.090, peak: 0.110, exit: 0.160, end: 0.181 }, // 1: Cá Nhân P1
  { start: 0.181, peak: 0.200, exit: 0.250, end: 0.272 }, // 2: Cá Nhân P2
  { start: 0.272, peak: 0.290, exit: 0.340, end: 0.363 }, // 3: Quần Chúng P1
  { start: 0.363, peak: 0.380, exit: 0.430, end: 0.454 }, // 4: Quần Chúng P2
  { start: 0.454, peak: 0.470, exit: 0.520, end: 0.545 }, // 5: Tình Huống P1
  { start: 0.545, peak: 0.565, exit: 0.615, end: 0.636 }, // 6: Tình Huống P2
  { start: 0.636, peak: 0.655, exit: 0.705, end: 0.727 }, // 7: Việt Nam P1
  { start: 0.727, peak: 0.745, exit: 0.795, end: 0.818 }, // 8: Việt Nam P2
  { start: 0.818, peak: 0.840, exit: 0.890, end: 0.909 }, // 9: Overview
  { start: 0.909, peak: 0.930, exit: 0.980, end: 1.000 }, // 10: References
] as const;

export const CAMERA_WAYPOINTS = [
  { pos: [  0,  48, 125] as [number, number, number] }, // 0: Hero (Chính giữa)
  { pos: [-35,  65, 130] as [number, number, number] }, // 1: Overview (Camera lùi trái -> 3D dạt sang phải, né chữ)
  { pos: [ 30,  12,  42] as [number, number, number] }, // 2: Cá Nhân P1 
  { pos: [ 22,   6,  36] as [number, number, number] }, // 3: Cá Nhân P2 
  { pos: [-20,  -8,  28] as [number, number, number] }, // 4: Quần Chúng P1 
  { pos: [-28,   4,  22] as [number, number, number] }, // 5: Quần Chúng P2 
  { pos: [-48,   8, -34] as [number, number, number] }, // 6: Tình Huống P1 
  { pos: [-40,  14, -28] as [number, number, number] }, // 7: Tình Huống P2 
  { pos: [-25,  25,  75] as [number, number, number] }, // 8: Việt Nam P1 (Camera lùi trái -> 3D dạt sang phải)
  { pos: [-15,  20,  60] as [number, number, number] }, // 9: Việt Nam P2 
  { pos: [  0,  40, 110] as [number, number, number] }, // 10: References (Trở lại chính giữa để user tương tác)
] as const;

export const SECTION_PEAKS = [
  0.020, 0.110, 0.200, 0.290, 0.380, 0.470, 0.565, 0.655, 0.745, 0.840, 0.930,
] as const;

export const NAV_SECTION_PEAKS: Record<string, number> = {
  hero:      0,
  caNhan:    1,
  quanChung: 3,
  tinhHuong: 5,
  vietNam:   7,
  overview:  9,
  references:10,
};

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
  9: null,
  10: null,
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

export function cinematicEase(t: number): number {
  return t === 0 ? 0 : 1 - Math.pow(2, -10 * t);
}