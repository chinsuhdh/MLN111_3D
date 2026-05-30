'use client';

import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS, SECTION_PEAKS } from '../hooks/usePhilosophyScroll';

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT NODE (in the hierarchy map)
// ─────────────────────────────────────────────────────────────────────────────
interface ConceptNode {
  id: string;
  label: string;
  color: string;
  sectionIdx: number;
  satellites: string[];
}

const CONCEPTS: ConceptNode[] = [
  {
    id: 'CA_NHAN',
    label: 'CÁ NHÂN & XÃ HỘI',
    color: '#64FFDA',
    sectionIdx: 1,
    satellites: ['Bản chất loài', 'Tính cá thể', 'Giai cấp', 'Nhà nước'],
  },
  {
    id: 'QUAN_CHUNG',
    label: 'QUẦN CHÚNG & LÃNH TỤ',
    color: '#D4A373',
    sectionIdx: 2,
    satellites: ['Lực lượng SX', 'CM Xã hội', 'Định hướng', 'Tổ chức'],
  },
  {
    id: 'CASE_STUDY',
    label: 'TÌNH HUỐNG · TRƯỞNG NHÓM C',
    color: '#38BDF8',
    sectionIdx: 3,
    satellites: ['Cá nhân – Tập thể', 'Lãnh tụ vi mô', 'Mâu thuẫn', 'Giải pháp'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW MODE
// ─────────────────────────────────────────────────────────────────────────────
export default function OverviewMode() {
  const { scrollProgress, flyTo } = useContext(PhilosophyScrollContext);
  const s = SECTION_BOUNDS[4];

  const opacityIn  = Math.min(1, scrollProgress < s.peak
    ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start))
    : 1);
  const opacityOut = scrollProgress > s.exit
    ? Math.max(0, 1 - (scrollProgress - s.exit) / (s.end - s.exit))
    : 1;
  const opacity  = Math.min(opacityIn, opacityOut);
  const isActive = opacity > 0.01;

  if (!isActive) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="overview-mode"
          className="hud-panel"
          style={{
            opacity,
            pointerEvents: opacity > 0.25 ? 'auto' : 'none',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            paddingBottom: '3rem',
            paddingLeft: '2rem',
            paddingTop: '5rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT PANEL — title + hierarchy map */}
          <motion.div
            className="relative"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1.2] }}
          >
            <div
              className="liquid-glass rounded-2xl overflow-hidden"
              style={{
                width: 'min(340px, calc(100vw - 2.5rem))',
                border: '1px solid rgba(253,224,71,0.12)',
                boxShadow: '0 0 60px rgba(253,224,71,0.04), 0 24px 48px rgba(0,0,0,0.5)',
              }}
            >
              {/* Animated top bar */}
              <div className="relative h-[2px] overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full w-1/3"
                  style={{ background: 'linear-gradient(90deg, transparent, #FDE047, transparent)' }}
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                />
                <div className="w-full h-full bg-white/5" />
              </div>

              {/* Header */}
              <div className="p-5 pb-3">
                <p className="section-eyebrow mb-2" style={{ color: '#FDE047' }}>
                  Phần 04 · Toàn cảnh hệ tư tưởng
                </p>
                <h2
                  className="text-2xl text-white mb-1"
                  style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
                >
                  Bản đồ Triết học
                </h2>
                <p className="text-xs text-white/45 leading-relaxed">
                  Toàn bộ hệ thống khái niệm triết học Mác–Lênin về Con người.
                  Nhấp vào mỗi hành tinh để quay lại nghiên cứu.
                </p>
              </div>

              <div className="mx-5 h-px" style={{ background: 'linear-gradient(90deg, rgba(253,224,71,0.15), transparent)' }} />

              {/* Hierarchy tree */}
              <div className="p-5 pt-3">
                {/* Core */}
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{ background: '#FDE047', boxShadow: '0 0 8px #FDE047' }}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="text-sm font-semibold text-white tracking-wider">CON NGƯỜI</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest ml-1">· Trung tâm</span>
                </div>

                {/* Branches */}
                <div className="pl-3 space-y-2" style={{ borderLeft: '1px solid rgba(253,224,71,0.12)' }}>
                  {CONCEPTS.map((concept, idx) => (
                    <motion.div
                      key={concept.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                    >
                      {/* Planet row */}
                      <button
                        onClick={() => flyTo(concept.sectionIdx)}
                        className="group flex items-center gap-2 w-full text-left mb-1 hover:opacity-90 transition-opacity"
                      >
                        <div className="w-px h-4 self-center" style={{ background: `${concept.color}30` }} />
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: concept.color, boxShadow: `0 0 6px ${concept.color}60` }}
                          whileHover={{ scale: 1.4 }}
                        />
                        <span
                          className="text-xs font-semibold tracking-wide transition-colors group-hover:text-white"
                          style={{ color: concept.color }}
                        >
                          {concept.label}
                        </span>
                        <svg
                          className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity"
                          width="10" height="10" fill="none"
                          stroke={concept.color} strokeWidth="2"
                        >
                          <path d="M1 5h8M6 2l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {/* Satellite chips */}
                      <div className="pl-6 flex flex-wrap gap-1 mb-1">
                        {concept.satellites.map(sat => (
                          <span
                            key={sat}
                            className="text-[9px] px-1.5 py-0.5 rounded-md"
                            style={{
                              background: `${concept.color}10`,
                              color: `${concept.color}90`,
                              border: `1px solid ${concept.color}15`,
                            }}
                          >
                            {sat}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div
                className="px-5 py-2.5 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
              >
                <span className="text-[9px] text-white/20 uppercase tracking-widest">
                  {CONCEPTS.length} hành tinh · {CONCEPTS.reduce((acc, c) => acc + c.satellites.length, 0)} vệ tinh
                </span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-0.5 rounded-full"
                      style={{ background: '#FDE047', opacity: 0.3 }}
                      animate={{ height: ['3px', '8px', '3px'] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Hint text below panel */}
            <motion.p
              className="text-[10px] text-white/25 text-center mt-3 tracking-wider"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ↓ Cuộn để xem tài liệu tham khảo
            </motion.p>
          </motion.div>

          {/* RIGHT / CENTER — floating title above universe */}
          <motion.div
            className="absolute top-20 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="section-eyebrow mb-2" style={{ color: 'rgba(253,224,71,0.6)' }}>
              Toàn cảnh · Hệ Tư tưởng Triết học
            </p>
            <motion.div
              className="w-32 h-px mx-auto"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(253,224,71,0.4), transparent)' }}
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
