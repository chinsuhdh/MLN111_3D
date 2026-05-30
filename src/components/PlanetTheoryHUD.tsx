'use client';

import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS } from '../hooks/usePhilosophyScroll';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface ContentBlock {
  type: 'heading' | 'body' | 'quote' | 'bullet-list' | 'highlight' | 'numbered-list';
  label?: string;
  text?: string;
  items?: string[];
  html?: string;
}

export interface PlanetTheoryHUDProps {
  sectionIdx: number;
  title: string;
  eyebrow: string;
  accentColor: string;
  subtitle?: string;
  coords?: { lat: string; lon: string; alt: string };
  blocks: ContentBlock[];
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGH-CONTRAST NARRATIVE SHADOW — optimised for projector distance
// ─────────────────────────────────────────────────────────────────────────────
const NARRATIVE_SHADOW =
  '0 2px 10px rgba(0,0,0,0.95), 0 8px 30px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.12)';

const BODY_SHADOW = '0 2px 8px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.6)';

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT HELPERS — alternating sides per section
//
// Section index → screen side mapping (9-section model):
//   1 Cá Nhân P1    → Right
//   2 Cá Nhân P2    → Right  (same side as P1 for continuity)
//   3 Quần Chúng P1 → Left
//   4 Quần Chúng P2 → Left   (same side as P1)
//   5 Tình Huống P1 → Right
//   6 Tình Huống P2 → Right  (same side as P1)
// ─────────────────────────────────────────────────────────────────────────────
function isRightSide(sectionIdx: number): boolean {
  // Right: Cá Nhân (1,2) and Case Study (5,6)
  // Left:  Quần Chúng (3,4)
  return sectionIdx === 1 || sectionIdx === 2 || sectionIdx === 5 || sectionIdx === 6;
}

function getContainerStyle(sectionIdx: number): React.CSSProperties {
  const right = isRightSide(sectionIdx);
  return {
    justifyContent: right ? 'flex-end' : 'flex-start',
    paddingLeft:    right ? '0'        : '8vw',
    paddingRight:   right ? '8vw'      : '0',
  };
}

function getInitialX(sectionIdx: number): number {
  return isRightSide(sectionIdx) ? 80 : -80;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT BLOCK RENDERER — projector-scale typography
// ─────────────────────────────────────────────────────────────────────────────
function RenderBlock({
  block,
  accentColor,
  index,
}: {
  block: ContentBlock;
  accentColor: string;
  index: number;
}) {
  const delay = 0.1 + index * 0.07;

  switch (block.type) {

    // ── Heading ──────────────────────────────────────────────────────────────
    case 'heading':
      return (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.55, ease: 'easeOut' }}
          className="pt-6"
        >
          {block.label && (
            <p
              className="mb-2 text-sm font-bold uppercase tracking-[0.2em]"
              style={{
                color: `${accentColor}dd`,
                fontFamily: 'var(--font-body)',
                textShadow: `0 0 16px ${accentColor}80`,
              }}
            >
              ▸ {block.label}
            </p>
          )}
          <h3
            className="text-3xl font-semibold leading-snug text-white"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow: NARRATIVE_SHADOW,
            }}
          >
            {block.text}
          </h3>
          <div
            className="mt-3 h-px w-20"
            style={{ background: `linear-gradient(90deg, ${accentColor}90, transparent)` }}
          />
        </motion.div>
      );

    // ── Body ─────────────────────────────────────────────────────────────────
    case 'body':
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.55 }}
          className="text-xl leading-relaxed text-white/80"
          style={{ textShadow: BODY_SHADOW, fontFamily: 'var(--font-body)' }}
          dangerouslySetInnerHTML={{ __html: block.html ?? block.text ?? '' }}
        />
      );

    // ── Quote ─────────────────────────────────────────────────────────────────
    case 'quote':
      return (
        <motion.blockquote
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.55 }}
          className="pl-6 py-2"
          style={{ borderLeft: `3px solid ${accentColor}60` }}
        >
          <p
            className="italic text-xl leading-relaxed text-white/70"
            style={{ fontFamily: 'var(--font-display)', textShadow: NARRATIVE_SHADOW }}
          >
            "{block.text}"
          </p>
          {block.label && (
            <cite
              className="block mt-3 not-italic text-sm font-bold tracking-wider uppercase"
              style={{ color: `${accentColor}aa`, textShadow: `0 0 10px ${accentColor}50` }}
            >
              — {block.label}
            </cite>
          )}
        </motion.blockquote>
      );

    // ── Bullet list ───────────────────────────────────────────────────────────
    case 'bullet-list':
      return (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.55 }}
          className="space-y-4"
        >
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: accentColor,
                  boxShadow: `0 0 8px ${accentColor}cc, 0 0 18px ${accentColor}55`,
                }}
              />
              <span
                className="text-xl text-white/75 leading-relaxed"
                style={{ textShadow: BODY_SHADOW, fontFamily: 'var(--font-body)' }}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </motion.ul>
      );

    // ── Numbered list ─────────────────────────────────────────────────────────
    case 'numbered-list':
      return (
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.55 }}
          className="space-y-4"
        >
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center text-base font-bold"
                style={{
                  color: accentColor,
                  textShadow: `0 0 10px ${accentColor}`,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {i + 1}
              </span>
              <span
                className="text-xl text-white/75 leading-relaxed"
                style={{ textShadow: BODY_SHADOW, fontFamily: 'var(--font-body)' }}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </motion.ol>
      );

    // ── Highlight ─────────────────────────────────────────────────────────────
    case 'highlight':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.55 }}
          className="pl-6 py-1"
          style={{ borderLeft: `3px solid ${accentColor}50` }}
        >
          {block.label && (
            <p
              className="mb-2 text-sm font-bold uppercase tracking-[0.18em]"
              style={{
                color: `${accentColor}dd`,
                fontFamily: 'var(--font-body)',
                textShadow: `0 0 12px ${accentColor}60`,
              }}
            >
              {block.label}
            </p>
          )}
          <p
            className="text-xl text-white/75 leading-relaxed"
            style={{ textShadow: BODY_SHADOW, fontFamily: 'var(--font-body)' }}
            dangerouslySetInnerHTML={{ __html: block.html ?? block.text ?? '' }}
          />
        </motion.div>
      );

    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — alternating cinematic floating narrative
// ─────────────────────────────────────────────────────────────────────────────
export default function PlanetTheoryHUD({
  sectionIdx,
  title,
  eyebrow,
  accentColor,
  subtitle,
  coords = { lat: '0.0°', lon: '0.0°', alt: '0 AU' },
  blocks,
}: PlanetTheoryHUDProps) {
  const { scrollProgress } = useContext(PhilosophyScrollContext);

  const s = SECTION_BOUNDS[sectionIdx];
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
  const opacity = Math.min(opacityIn, opacityOut);

  if (opacity < 0.01) return null;

  const initX = getInitialX(sectionIdx);

  return (
    <AnimatePresence>
      <motion.div
        key={`hud-${sectionIdx}`}
        className="hud-spacecraft"
        style={{
          opacity,
          pointerEvents: opacity > 0.2 ? 'auto' : 'none',
          ...getContainerStyle(sectionIdx),
        }}
        initial={{ x: initX, opacity: 0, filter: 'blur(10px)' }}
        animate={{ x: 0,     opacity: 1, filter: 'blur(0px)' }}
        exit={{    x: initX * 0.4, opacity: 0, filter: 'blur(6px)' }}
        transition={{ duration: 0.65, ease: [0.22, 0.68, 0, 1.1] }}
      >
        {/* ── NARRATIVE TEXT COLUMN ────────────────────────────────────── */}
        <div
          className="narrative-column"
          style={{ textAlign: 'left' }}
        >
          {/* Eyebrow */}
          <motion.p
            className="section-eyebrow mb-5"
            style={{
              color: accentColor,
              textShadow: `0 0 18px ${accentColor}90`,
              fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)',
              letterSpacing: '0.22em',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.45 }}
          >
            {eyebrow}
          </motion.p>

          {/* Main title */}
          <motion.h2
            className="font-light leading-none tracking-tight text-white mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              textShadow: `0 0 24px rgba(255,255,255,0.22), 0 0 60px ${accentColor}20, 0 4px 16px rgba(0,0,0,0.95)`,
            }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            {title}
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-2xl text-white/55 mb-10 leading-snug"
              style={{
                fontFamily: 'var(--font-body)',
                textShadow: BODY_SHADOW,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Accent rule */}
          <motion.div
            className="mb-9"
            style={{
              height: 1,
              width: '100%',
              background: `linear-gradient(90deg, ${accentColor}60, transparent 75%)`,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.28, duration: 0.55, ease: 'easeOut' }}
          />

          {/* Content blocks */}
          <div className="space-y-7">
            {blocks.map((block, i) => (
              <RenderBlock
                key={i}
                block={block}
                accentColor={accentColor}
                index={i}
              />
            ))}
          </div>

          {/* Coords footer */}
          <motion.p
            className="mt-10 text-xs font-mono text-white/20 tracking-[0.16em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            {coords.lat} · {coords.lon} · {coords.alt}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
