'use client';

import { ReactNode, useState, useRef, useEffect, useCallback } from 'react';
import {
  PhilosophyScrollContext,
  PhilosophyScrollState,
  TOTAL_PAGES,
  SECTION_PEAKS,
  getSectionIndex,
  getFocusedPlanet,
} from '../hooks/usePhilosophyScroll';

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────
function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999]" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <div
        className="h-full origin-left transition-none"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, rgba(100,255,218,0.6), rgba(253,224,71,0.5), rgba(251,146,60,0.7))',
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR — 6 sections
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { sectionIdx: 0, label: 'Giới thiệu' },
  { sectionIdx: 1, label: 'Cá nhân & Xã hội' },
  { sectionIdx: 2, label: 'Quần chúng & Lãnh tụ' },
  { sectionIdx: 3, label: 'Tình huống' },
  { sectionIdx: 4, label: 'Tổng quan' },
  { sectionIdx: 5, label: 'Tài liệu' },
];

function Navbar({
  activeSection,
  onFlyTo,
}: {
  activeSection: number;
  onFlyTo: (idx: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onFlyTo(0)}
          className="flex-shrink-0 transition-opacity duration-200 hover:opacity-75"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-2xl tracking-tight text-white">
            Con Người<sup className="text-xs ml-0.5 opacity-60">®</sup>
          </span>
          <span className="block text-[10px] tracking-[0.22em] uppercase text-white/30 font-sans mt-0.5">
            Triết học Mác – Lênin
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
          {NAV_LINKS.map(({ sectionIdx, label }) => {
            const isActive = activeSection === sectionIdx;
            return (
              <li key={sectionIdx}>
                <button
                  onClick={() => onFlyTo(sectionIdx)}
                  className={`nav-link px-3 py-1.5 rounded-full transition-all duration-200 text-xs ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/45 hover:text-white/75'
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onFlyTo(1)}
            className="liquid-glass hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Khám phá
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Mở menu"
            className="md:hidden p-2 rounded-lg hover:bg-white/6 transition-colors"
          >
            <svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="6"  x2="19" y2="6"  />
              <line x1="3" y1="12" x2="19" y2="12" />
              <line x1="3" y1="18" x2="19" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}
        style={{ borderTop: menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
      >
        <div className="px-6 py-3 flex flex-col gap-1" style={{ background: 'rgba(3,10,20,0.97)' }}>
          {NAV_LINKS.map(({ sectionIdx, label }) => (
            <button
              key={sectionIdx}
              onClick={() => { onFlyTo(sectionIdx); setMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeSection === sectionIdx ? 'text-white bg-white/6' : 'text-white/45 hover:text-white/75'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
export default function Layout({ children }: { children: ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection,  setActiveSection]  = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const max      = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? el.scrollTop / max : 0;
      setScrollProgress(progress);
      setActiveSection(getSectionIndex(progress));
    };
    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const flyTo = useCallback((sectionIdx: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const peaks = [...SECTION_PEAKS];
    el.scrollTo({ top: peaks[Math.min(sectionIdx, peaks.length - 1)] * max, behavior: 'smooth' });
  }, []);

  const focusedPlanet = getFocusedPlanet(activeSection);

  const scrollState: PhilosophyScrollState = {
    scrollProgress,
    activeSection,
    focusedPlanet,
    flyTo,
    scrollContainerRef,
  };

  return (
    <PhilosophyScrollContext.Provider value={scrollState}>
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#030A14]">

        {/* SCROLL DRIVER */}
        <div
          ref={scrollContainerRef}
          className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* STICKY CONTENT LAYER */}
          <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
            <div className="relative w-full h-full flex flex-col">
              <Navbar activeSection={activeSection} onFlyTo={flyTo} />
              <div className="flex-1 relative">
                {children}
              </div>
            </div>
          </div>

          {/* SCROLL SPACE: (TOTAL_PAGES - 1) × 100vh of phantom height */}
          <div
            style={{ height: `calc(${TOTAL_PAGES * 100}vh - 100vh)` }}
            className="w-full pointer-events-none"
          />
        </div>

        {/* Progress bar */}
        <ScrollProgressBar progress={scrollProgress} />
      </div>
    </PhilosophyScrollContext.Provider>
  );
}