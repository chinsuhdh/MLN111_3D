'use client';

import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS } from '../hooks/usePhilosophyScroll';

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT NODE
// ─────────────────────────────────────────────────────────────────────────────
interface ConceptNode {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  sectionIdx: number;
  satellites: string[];
}

const CONCEPTS: ConceptNode[] = [
  {
    id: 'CA_NHAN',
    label: 'Cá Nhân & Xã Hội',
    sublabel: 'Phần 01',
    color: '#64FFDA',
    sectionIdx: 1,  // jump to first part
    satellites: ['Bản chất loài', 'Tính cá thể', 'Giai cấp', 'Nhà nước'],
  },
  {
    id: 'QUAN_CHUNG',
    label: 'Quần Chúng & Lãnh Tụ',
    sublabel: 'Phần 02',
    color: '#D4A373',
    sectionIdx: 3,  // jump to first part
    satellites: ['Lực lượng SX', 'CM Xã hội', 'Định hướng', 'Tổ chức'],
  },
  {
    id: 'CASE_STUDY',
    label: 'Tình huống · Trưởng nhóm C',
    sublabel: 'Phần 03',
    color: '#38BDF8',
    sectionIdx: 5,  // jump to first part
    satellites: ['Cá nhân – Tập thể', 'Lãnh tụ vi mô', 'Mâu thuẫn', 'Giải pháp'],
  },
];

// High-contrast shadow shared across all narrative text
const NARRATIVE_SHADOW =
  '0 2px 10px rgba(0,0,0,0.95), 0 8px 30px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.12)';
const BODY_SHADOW = '0 2px 8px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.6)';

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW MODE — left-side cinematic floating layout
// ─────────────────────────────────────────────────────────────────────────────
export default function OverviewMode() {
  const { scrollProgress, flyTo } = useContext(PhilosophyScrollContext);
  const s = SECTION_BOUNDS[7]; // Overview is now section index 7

  const opacityIn = Math.min(
    1,
    scrollProgress < s.peak
      ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start))
      : 1,
  );
  const opacityOut =
    scrollProgress > s.exit
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
          className="hud-spacecraft"
          style={{
            opacity,
            pointerEvents: opacity > 0.25 ? 'auto' : 'none',
            // Left-side placement, matching Hero & Section 02
            justifyContent: 'flex-start',
            paddingLeft: '8vw',
            paddingRight: '0',
          }}
          initial={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
          animate={{ opacity: 1,  x: 0,   filter: 'blur(0px)' }}
          exit={{    opacity: 0,  x: -50, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1.2] }}
        >
          <div className="narrative-column" style={{ textAlign: 'left' }}>

            {/* ── EYEBROW ─────────────────────────────────────────────── */}
            <motion.p
              className="section-eyebrow mb-5"
              style={{
                color: '#FDE047',
                textShadow: '0 0 18px rgba(253,224,71,0.7)',
                fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)',
                letterSpacing: '0.22em',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
            >
              Phần 04 · Toàn cảnh hệ tư tưởng
            </motion.p>

            {/* ── MAIN TITLE ──────────────────────────────────────────── */}
            <motion.h2
              className="font-light leading-none tracking-tight text-white mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                textShadow:
                  '0 0 24px rgba(255,255,255,0.22), 0 0 60px rgba(253,224,71,0.15), 0 4px 16px rgba(0,0,0,0.95)',
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6 }}
            >
              Bản đồ Triết học
            </motion.h2>

            {/* ── SUBTITLE ─────────────────────────────────────────────── */}
            <motion.p
              className="text-2xl text-white/55 mb-10 leading-snug"
              style={{ fontFamily: 'var(--font-body)', textShadow: BODY_SHADOW }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.26, duration: 0.5 }}
            >
              Toàn bộ hệ thống khái niệm triết học Mác–Lênin về Con người.
            </motion.p>

            {/* ── ACCENT RULE ──────────────────────────────────────────── */}
            <motion.div
              className="mb-10"
              style={{
                height: 1,
                width: '100%',
                background: 'linear-gradient(90deg, rgba(253,224,71,0.6), transparent 70%)',
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.32, duration: 0.55, ease: 'easeOut' }}
            />

            {/* ── CONCEPT LIST ─────────────────────────────────────────── */}
            <div className="space-y-8">
              {CONCEPTS.map((concept, idx) => (
                <motion.div
                  key={concept.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.38 + idx * 0.1 }}
                >
                  {/* Concept heading — clickable */}
                  <button
                    onClick={() => flyTo(concept.sectionIdx)}
                    className="group flex items-center gap-5 text-left w-full mb-3 transition-opacity duration-200 hover:opacity-85"
                  >
                    {/* Pulsing planet dot */}
                    <motion.span
                      className="flex-shrink-0 w-3.5 h-3.5 rounded-full"
                      style={{
                        background: concept.color,
                        boxShadow: `0 0 10px ${concept.color}cc, 0 0 24px ${concept.color}55`,
                      }}
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{
                        duration: 2.5 + idx * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    <div>
                      <p
                        className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
                        style={{
                          color: `${concept.color}cc`,
                          textShadow: `0 0 12px ${concept.color}60`,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {concept.sublabel}
                      </p>
                      <h3
                        className="text-3xl font-semibold text-white leading-snug group-hover:text-white transition-colors"
                        style={{
                          fontFamily: 'var(--font-display)',
                          textShadow: NARRATIVE_SHADOW,
                        }}
                      >
                        {concept.label}
                      </h3>
                    </div>

                    {/* Arrow — appears on hover */}
                    <svg
                      className="ml-auto opacity-0 group-hover:opacity-70 transition-opacity flex-shrink-0"
                      width="22" height="22" fill="none"
                      stroke={concept.color} strokeWidth="1.8"
                    >
                      <path d="M3 11h16M12 4l8 7-8 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Satellite tags */}
                  <div className="pl-[4.25rem] flex flex-wrap gap-2">
                    {concept.satellites.map(sat => (
                      <span
                        key={sat}
                        className="text-sm px-3 py-1 rounded-full"
                        style={{
                          color: `${concept.color}aa`,
                          textShadow: BODY_SHADOW,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {sat}
                      </span>
                    ))}
                  </div>

                  {/* Separator */}
                  {idx < CONCEPTS.length - 1 && (
                    <div
                      className="mt-7 h-px"
                      style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.07), transparent 60%)' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* ── SCROLL HINT ──────────────────────────────────────────── */}
            <motion.p
              className="mt-12 text-sm text-white/30 tracking-[0.18em] uppercase font-mono"
              style={{ textShadow: BODY_SHADOW }}
              animate={{ opacity: [0.3, 0.65, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ↓ Cuộn để xem tài liệu tham khảo
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
