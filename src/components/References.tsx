'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS } from '../hooks/usePhilosophyScroll';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface Section {
  id: number;
  title: string;
  content: string;
  subsections?: { title: string; details: string[] }[];
}
interface DocumentData {
  title: string;
  sections: Section[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CITATION FORMATTER — futuristic data chips
// ─────────────────────────────────────────────────────────────────────────────
const CHIP_COLOR = '#64FFDA';

const formatTextWithCitations = (text: string) => {
  if (!text) return text;
  const regex = /(\[\[[\d,\s]+\]\])/g;
  const parts  = text.split(regex);
  return parts.map((part, index) => {
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const match = part.match(/\[\[([\d,\s]+)\]\]/);
      if (match) {
        const numbers = match[1].split(',').map(n => n.trim());
        return (
          <sup key={index} className="ml-1 inline-flex gap-0.5 select-none align-super">
            {numbers.map((num, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.15, y: -1 }}
                className="inline-flex items-center justify-center cursor-help"
                style={{
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  padding: '1px 4px',
                  borderRadius: '3px',
                  color: CHIP_COLOR,
                  background: `${CHIP_COLOR}12`,
                  border: `1px solid ${CHIP_COLOR}40`,
                  boxShadow: `0 0 6px ${CHIP_COLOR}20`,
                  transition: 'box-shadow 0.2s',
                }}
                title={`Tài liệu tham khảo: [${num}]`}
              >
                {num}
              </motion.span>
            ))}
          </sup>
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA CORE — rotating geometric shape
// ─────────────────────────────────────────────────────────────────────────────
function DataCore({ active }: { active: boolean }) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <motion.svg
        width="96" height="96"
        className="absolute inset-0"
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="48" cy="48" r="44"
          fill="none"
          stroke="rgba(100,255,218,0.12)"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
      </motion.svg>
      <motion.svg
        width="64" height="64"
        className="absolute"
        animate={{ rotate: active ? -360 : 0 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <polygon
          points="32,4 56,18 56,46 32,60 8,46 8,18"
          fill="none"
          stroke="rgba(100,255,218,0.25)"
          strokeWidth="1.5"
        />
      </motion.svg>
      <motion.div
        className="w-8 h-8 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(100,255,218,0.5) 0%, rgba(100,255,218,0.05) 70%)',
          boxShadow: '0 0 18px rgba(100,255,218,0.3)',
        }}
        animate={active ? { scale: [1, 1.25, 1], opacity: [0.9, 0.5, 0.9] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS ROW
// ─────────────────────────────────────────────────────────────────────────────
function StatusRow({ label, value, color = CHIP_COLOR, blink = false }: {
  label: string; value: string; color?: string; blink?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">{label}</span>
      <div className="flex items-center gap-1.5">
        {blink && (
          <motion.div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 4px ${color}` }}
            animate={{ opacity: [1, 0.1, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}
        <span className="text-[10px] font-mono font-bold" style={{ color }}>{value}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RECORD CARD
// ─────────────────────────────────────────────────────────────────────────────
const CARD_ACCENT_COLORS = ['#64FFDA', '#D4A373', '#38BDF8', '#C084FC', '#FB923C'];

function RecordCard({ section, index }: { section: Section; index: number }) {
  const accent = CARD_ACCENT_COLORS[index % CARD_ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07, ease: [0.22, 0.68, 0, 1.1] }}
      className="group rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(6,14,28,0.7)',
        border: `1px solid rgba(255,255,255,0.06)`,
        borderLeft: `3px solid ${accent}50`,
      }}
      whileHover={{
        borderLeftColor: `${accent}cc`,
        backgroundColor: 'rgba(6,14,28,0.9)',
      } as never}
    >
      <div className="px-5 py-4 flex items-start gap-4" style={{ borderBottom: `1px solid ${accent}12` }}>
        <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5" style={{ background: `${accent}10`, border: `1px solid ${accent}28` }}>
          <span className="text-[11px] font-black font-mono" style={{ color: accent }}>{String(section.id).padStart(2, '0')}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[8px] tracking-[0.22em] uppercase mb-1.5" style={{ fontFamily: 'monospace', color: `${accent}70` }}>
            ▸ RECORD_ID: {String(section.id).padStart(2, '0')} · PRIORITY: HIGH
          </p>
          <h3 className="text-base font-semibold text-white leading-snug" style={{ fontFamily: 'var(--font-display)' }}>{section.title}</h3>
        </div>
        <div className="flex-shrink-0 px-2 py-1 rounded-md text-[8px] font-mono font-bold tracking-widest" style={{ color: accent, background: `${accent}10`, border: `1px solid ${accent}22` }}>
          VERIFIED
        </div>
      </div>
      <div className="px-5 py-4 space-y-4">
        <p className="text-sm text-white/55 leading-relaxed">{formatTextWithCitations(section.content)}</p>
        {section.subsections?.map((sub, i) => (
          <div key={i} className="rounded-lg p-4" style={{ background: `${accent}05`, borderLeft: `2px solid ${accent}25` }}>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: `${accent}90`, fontFamily: 'monospace' }}>◈ {sub.title}</h4>
            <ul className="space-y-1.5">
              {sub.details.map((detail, d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: `${accent}80` }} />
                  <span className="text-xs text-white/50 leading-relaxed">{formatTextWithCitations(detail)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SPINNER
// ─────────────────────────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <motion.div
        className="w-14 h-14 rounded-full"
        style={{ border: '2px solid rgba(100,255,218,0.12)', borderTopColor: '#64FFDA' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <div className="text-center space-y-1">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#64FFDA]/60">FETCHING DATA RECORDS...</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN REFERENCES COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function References() {
  const { scrollProgress } = useContext(PhilosophyScrollContext);
  const [doc, setDoc] = useState<DocumentData | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- TRẠNG THÁI BẬT/TẮT CỬA SỔ
  const contentRef = useRef<HTMLDivElement>(null);

  const s = SECTION_BOUNDS[5];
  const opacityIn  = Math.min(1, scrollProgress < s.peak
    ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start))
    : 1);
  const opacityOut = scrollProgress > s.exit
    ? Math.max(0, 1 - (scrollProgress - s.exit) / (s.end - s.exit))
    : 1;
  const opacity = Math.min(opacityIn, opacityOut);
  const scale   = 0.91 + 0.09 * Math.min(1, opacityIn);

  useEffect(() => {
    fetch('/MLN111.json')
      .then(res => res.json())
      .then(data => setDoc(data))
      .catch(err => console.error('Lỗi tải tài liệu:', err));
  }, []);

  useEffect(() => {
    if (doc && selectedId === null && doc.sections.length > 0) {
      setSelectedId(doc.sections[0].id);
    }
  }, [doc, selectedId]);

  // Tự động đóng cửa sổ nếu người dùng cuộn chuột rời khỏi Phần 05
  useEffect(() => {
    if (opacity < 0.1 && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [opacity, isModalOpen]);

  if (opacity < 0.01) return null;

  const activeSection = doc?.sections.find(s => s.id === selectedId) ?? null;

  return (
    <div
      id="section-references"
      className="hud-panel flex items-center justify-center"
      style={{
        opacity,
        transform: `scale(${scale})`,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
        padding: '4.5rem 1.5rem 1.5rem',
      }}
    >
      <AnimatePresence mode="wait">
        {!isModalOpen ? (
          // ── NÚT BẤM (TRIGGER BUTTON) ──────────────────────────────────────
          <motion.button
            key="trigger-btn"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            onClick={() => setIsModalOpen(true)}
            className="group relative flex flex-col items-center justify-center px-16 py-12 rounded-[2rem] transition-transform duration-300 hover:scale-105"
            style={{
              background: 'rgba(3,10,20,0.6)',
              border: '1px solid rgba(100,255,218,0.2)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 40px rgba(100,255,218,0.05) inset, 0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            <div className="absolute inset-0 rounded-[2rem] border-2 border-[#64FFDA]/0 group-hover:border-[#64FFDA]/30 transition-colors duration-500 pointer-events-none" />
            <DataCore active={true} />
            <p className="mt-8 text-[#64FFDA] font-mono tracking-[0.3em] text-sm font-bold group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(100,255,218,0.8)]">
              [ TRUY CẬP DATABANK ]
            </p>
            <p className="mt-3 text-white/40 text-[10px] uppercase tracking-widest font-mono">
              Hệ thống tài liệu tham khảo MLN111
            </p>
          </motion.button>
        ) : (
          // ── ARCHIVE TERMINAL WINDOW ──────────────────────────────────────
          <motion.div
            key="terminal-modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.22, 0.68, 0, 1.1] }}
            className="relative w-full max-w-7xl mx-auto flex flex-col"
            style={{
              height: 'calc(100vh - 6.5rem)',
              background: 'rgba(3,10,20,0.78)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(100,255,218,0.15)',
              borderRadius: '20px',
              boxShadow: `
                0 0 0 1px rgba(100,255,218,0.06),
                0 0 60px rgba(100,255,218,0.04),
                0 32px 80px rgba(0,0,0,0.7)
              `,
              overflow: 'hidden',
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(100,255,218,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.015) 1px, transparent 1px)`, backgroundSize: '52px 52px', borderRadius: '20px' }} />

            {/* ── TERMINAL TITLE BAR ──────────────────────────────────────── */}
            <div className="relative flex-shrink-0 flex items-center justify-between px-6 py-3.5" style={{ borderBottom: '1px solid rgba(100,255,218,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }} />)}
                </div>
                <div className="w-px h-4 bg-white/10" />
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35">CENTRAL DATA ARCHIVE TERMINAL</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3">
                <motion.div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(100,255,218,0.4), transparent)' }} animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
                <p className="text-[9px] font-mono text-[#64FFDA]/50 tracking-widest">MLN111 · ARCHIVE</p>
                <motion.div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(100,255,218,0.4), transparent)' }} animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full" style={{ background: '#64FFDA', boxShadow: '0 0 6px #64FFDA' }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                  <span className="text-[9px] font-mono text-[#64FFDA]/60 tracking-widest">ONLINE</span>
                </div>
                {/* NÚT TẮT (CLOSE BUTTON) */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/30"
                  aria-label="Đóng Terminal"
                >
                  <svg width="12" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="11" y2="11" />
                    <line x1="11" y1="1" x2="1" y2="11" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── MAIN BODY: Sidebar + Content ────────────────────────────── */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-shrink-0 lg:w-72 flex flex-col" style={{ background: 'rgba(0,4,12,0.55)', borderRight: '1px solid rgba(100,255,218,0.07)' }}>
                <div className="flex flex-col items-center py-7 px-5" style={{ borderBottom: '1px solid rgba(100,255,218,0.07)' }}>
                  <DataCore active={true} />
                  <div className="mt-4 text-center">
                    <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#64FFDA]/40 mb-1">DATABANK ACCESS</p>
                    <h2 className="text-sm font-semibold text-white leading-snug text-center px-2" style={{ fontFamily: 'var(--font-display)' }}>{doc ? doc.title : '...'}</h2>
                  </div>
                </div>

                <div className="px-5 py-4 space-y-0.5" style={{ borderBottom: '1px solid rgba(100,255,218,0.07)' }}>
                  <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-white/20 mb-2.5">SYSTEM STATUS</p>
                  <StatusRow label="CORE"     value="ONLINE"  blink />
                  <StatusRow label="DATABANK" value="SYNCED"  color="#D4A373" />
                  <StatusRow label="RECORDS"  value={doc ? `${doc.sections.length} FILES` : 'LOADING'} color="#38BDF8" />
                  <StatusRow label="PROTOCOL" value="MLN111"  color="#C084FC" />
                  <StatusRow label="ARCHIVE"  value="2026.05" color="rgba(255,255,255,0.4)" />
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-3" style={{ scrollbarWidth: 'none' }}>
                  <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-white/20 px-2 mb-3">RECORD INDEX</p>
                  {doc?.sections.map((sec, i) => {
                    const accent = CARD_ACCENT_COLORS[i % CARD_ACCENT_COLORS.length];
                    const isActive = selectedId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => { setSelectedId(sec.id); contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left mb-1 transition-all duration-200 group"
                        style={{ background: isActive ? `${accent}12` : 'transparent', border: `1px solid ${isActive ? `${accent}30` : 'transparent'}` }}
                      >
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black font-mono flex-shrink-0" style={{ background: isActive ? `${accent}20` : 'rgba(255,255,255,0.05)', color: isActive ? accent : 'rgba(255,255,255,0.3)' }}>{String(sec.id).padStart(2, '0')}</span>
                        <span className="text-[11px] leading-snug flex-1 min-w-0 truncate transition-colors" style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.4)' }}>{sec.title}</span>
                        {isActive && <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div ref={contentRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                {!doc ? <LoadingState /> : (
                  <AnimatePresence mode="wait">
                    {activeSection ? (
                      <motion.div key={activeSection.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="p-6 lg:p-8">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-3">
                            <p className="text-[9px] tracking-[0.25em] uppercase" style={{ fontFamily: 'monospace', color: `${CARD_ACCENT_COLORS[(activeSection.id - 1) % CARD_ACCENT_COLORS.length]}70` }}>▸ RECORD_ID: {String(activeSection.id).padStart(2, '0')} · STATUS: ACTIVE</p>
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-light text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{activeSection.title}</h2>
                          <div className="mt-3 h-px" style={{ background: `linear-gradient(90deg, ${CARD_ACCENT_COLORS[(activeSection.id - 1) % CARD_ACCENT_COLORS.length]}40, transparent)` }} />
                        </div>
                        <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(6,14,28,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${CARD_ACCENT_COLORS[(activeSection.id - 1) % CARD_ACCENT_COLORS.length]}40` }}>
                          <p className="text-sm text-white/60 leading-relaxed">{formatTextWithCitations(activeSection.content)}</p>
                        </div>
                        {activeSection.subsections?.map((sub, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }} className="rounded-xl mb-4 overflow-hidden" style={{ background: 'rgba(6,14,28,0.55)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(212,163,115,0.08)', background: 'rgba(212,163,115,0.03)' }}>
                              <span className="text-[9px] font-mono text-[#D4A373]/50 tracking-widest">◈ SUBRECORD</span>
                              <h4 className="text-sm font-semibold text-[#D4A373]/80">{sub.title}</h4>
                            </div>
                            <ul className="px-5 py-4 space-y-2">
                              {sub.details.map((detail, d) => (
                                <li key={d} className="flex items-start gap-2.5">
                                  <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(212,163,115,0.5)' }} />
                                  <span className="text-xs text-white/50 leading-relaxed">{formatTextWithCitations(detail)}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8 space-y-4">
                        {doc.sections.map((section, index) => <RecordCard key={section.id} section={section} index={index} />)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
                {doc && (
                  <div className="px-6 lg:px-8 py-8 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <blockquote className="text-sm italic text-white/30 leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-display)' }}>"Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người."</blockquote>
                    <cite className="block mt-2 not-italic text-[10px] font-mono tracking-widest uppercase text-[#D4A373]/40">— C.Mác & Ph.Ăng-ghen</cite>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}