'use client';

import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS } from '../hooks/usePhilosophyScroll';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface ContentBlock {
  type: 'heading' | 'body' | 'quote' | 'bullet-list' | 'highlight' | 'numbered-list';
  label?: string;     // small eyebrow label above heading
  text?: string;      // plain text / heading text
  items?: string[];   // for bullet-list / numbered-list
  html?: string;      // for body blocks with inline bold/emphasis
}

export interface PlanetTheoryHUDProps {
  sectionIdx: number;
  title: string;
  eyebrow: string;
  accentColor: string;
  /** Subtitle shown below main title */
  subtitle?: string;
  /** Simulated orbital coordinates */
  coords?: { lat: string; lon: string; alt: string };
  /** Rich content blocks rendered in order */
  blocks: ContentBlock[];
}

// ─────────────────────────────────────────────────────────────────────────────
// TGT LOCK — SVG sci-fi scan-line extending left toward the planet
// ─────────────────────────────────────────────────────────────────────────────
function TgtLock({ color, title }: { color: string; title: string }) {
  return (
    <div
      className="absolute top-1/3 left-0 -translate-x-full pointer-events-none hidden lg:flex flex-col items-end"
      style={{ width: 220, gap: 4 }}
    >
      {/* TGT label */}
      <motion.p
        className="text-right pr-2"
        style={{ fontFamily: 'monospace', fontSize: 8, color: `${color}90`, letterSpacing: '0.12em' }}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {'[ TGT_LOCK : '}
        <span style={{ color }}>{title.toUpperCase()}</span>
        {' ]'}
      </motion.p>

      {/* Crosshair + dashed connector */}
      <div className="relative flex items-center w-full">
        {/* Glowing terminal dot */}
        <motion.div
          className="relative flex-shrink-0"
          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px ${color}, 0 0 18px ${color}50` }}
          />
          {/* Crosshair arms */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 22, height: 22, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: `${color}55`, transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: `${color}55`, transform: 'translateX(-50%)' }} />
          </div>
        </motion.div>

        {/* Dashed line sweeping to panel */}
        <div className="flex-1 relative h-px mx-1.5 overflow-hidden">
          <div
            style={{
              position: 'absolute', inset: 0,
              background: `repeating-linear-gradient(90deg, ${color}55 0, ${color}55 5px, transparent 5px, transparent 11px)`,
            }}
          />
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, height: '100%', width: 40,
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
            animate={{ x: [-40, 240] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
          />
        </div>

        {/* Tick mark at panel edge */}
        <div className="flex-shrink-0 flex flex-col items-center" style={{ gap: 2 }}>
          <div style={{ width: 1, height: 7, background: `${color}50` }} />
          <div style={{ width: 1, height: 10, background: color, boxShadow: `0 0 4px ${color}` }} />
          <div style={{ width: 1, height: 7, background: `${color}50` }} />
        </div>
      </div>

      {/* Coordinate readout */}
      <motion.p
        className="text-right pr-2"
        style={{ fontFamily: 'monospace', fontSize: 8, color: `${color}60`, letterSpacing: '0.1em', lineHeight: 1.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        SYS · DATA LINK ACTIVE
      </motion.p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT BLOCK RENDERER
// ─────────────────────────────────────────────────────────────────────────────
function RenderBlock({ block, accentColor, index }: { block: ContentBlock; accentColor: string; index: number }) {
  const delay = 0.08 + index * 0.055;

  switch (block.type) {
    case 'heading':
      return (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.45 }}
          className="pt-2"
        >
          {block.label && (
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
              style={{ color: `${accentColor}90`, fontFamily: 'monospace' }}>
              ▸ {block.label}
            </p>
          )}
          <h3 className="text-lg font-semibold text-white leading-snug"
            style={{ fontFamily: 'var(--font-display)' }}>
            {block.text}
          </h3>
          <div className="mt-1.5 h-px w-12" style={{ background: `linear-gradient(90deg, ${accentColor}60, transparent)` }} />
        </motion.div>
      );

    case 'body':
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.4 }}
          className="text-[15px] text-white/60 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.html ?? block.text ?? '' }}
        />
      );

    case 'quote':
      return (
        <motion.blockquote
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.45 }}
          className="pl-4 py-3 rounded-r-lg"
          style={{
            borderLeft: `3px solid ${accentColor}50`,
            background: `${accentColor}07`,
          }}
        >
          <p className="text-sm italic text-white/65 leading-relaxed"
            style={{ fontFamily: 'var(--font-display)' }}>
            "{block.text}"
          </p>
          {block.label && (
            <cite className="block mt-1.5 not-italic text-[10px] font-bold tracking-wider uppercase"
              style={{ color: `${accentColor}80` }}>
              — {block.label}
            </cite>
          )}
        </motion.blockquote>
      );

    case 'bullet-list':
      return (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.4 }}
          className="space-y-2"
        >
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: accentColor, boxShadow: `0 0 4px ${accentColor}` }} />
              <span className="text-sm text-white/60 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </motion.ul>
      );

    case 'numbered-list':
      return (
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.4 }}
          className="space-y-2.5"
        >
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                style={{
                  background: `${accentColor}14`,
                  border: `1px solid ${accentColor}35`,
                  color: accentColor,
                }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-white/60 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </motion.ol>
      );

    case 'highlight':
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 0.4 }}
          className="rounded-xl p-4"
          style={{
            background: `${accentColor}08`,
            border: `1px solid ${accentColor}22`,
            borderLeft: `3px solid ${accentColor}55`,
          }}
        >
          {block.label && (
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5"
              style={{ color: `${accentColor}80`, fontFamily: 'monospace' }}>
              ◈ {block.label}
            </p>
          )}
          <p className="text-sm text-white/65 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.html ?? block.text ?? '' }} />
        </motion.div>
      );

    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HUD
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
  const opacityIn  = Math.min(1, scrollProgress < s.peak
    ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start))
    : 1);
  const opacityOut = scrollProgress > s.exit
    ? Math.max(0, 1 - (scrollProgress - s.exit) / (s.end - s.exit))
    : 1;
  const opacity = Math.min(opacityIn, opacityOut);

  if (opacity < 0.01) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={`hud-${sectionIdx}`}
        className="hud-spacecraft"
        style={{ opacity, pointerEvents: opacity > 0.2 ? 'auto' : 'none' }}
        initial={{ x: 60, opacity: 0, filter: 'blur(10px)' }}
        animate={{ x: 0,  opacity: 1, filter: 'blur(0px)' }}
        exit={{   x: 50, opacity: 0, filter: 'blur(5px)' }}
        transition={{ duration: 0.65, ease: [0.22, 0.68, 0, 1.1] }}
      >
        {/* ── OUTER SHELL — full height, relative for TgtLock positioning ─ */}
        <div className="relative h-full flex flex-col">

          {/* TGT LOCK scan-line (extends left toward planet) */}
          <TgtLock color={accentColor} title={title} />

          {/* ── GLASS PANEL — transparent-left → solid-right gradient ────── */}
          <div
            className="relative flex flex-col h-full"
            style={{
              background: `linear-gradient(100deg,
                transparent 0%,
                rgba(3,10,20,0.55) 18%,
                rgba(3,10,20,0.82) 42%,
                rgba(2,7,16,0.96) 100%)`,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              /* Glowing left border connecting to planet */
              borderLeft: `2px solid ${accentColor}60`,
              boxShadow: `
                -16px 0 50px ${accentColor}0E,
                -4px  0 16px ${accentColor}1A,
                inset 1px 0 0 ${accentColor}12
              `,
              overflow: 'hidden',
            }}
          >
            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)
                `,
                backgroundSize: '52px 52px',
              }}
            />

            {/* Animated top scan line */}
            <div className="relative flex-shrink-0 h-[2px] overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <motion.div
                className="absolute top-0 left-0 h-full w-1/4"
                style={{ background: `linear-gradient(90deg, transparent, ${accentColor}cc, transparent)` }}
                animate={{ x: ['-25%', '500%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
              />
            </div>

            {/* ── HEADER ────────────────────────────────────────────────── */}
            <div className="flex-shrink-0 px-8 pt-7 pb-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Eyebrow */}
                  <p className="section-eyebrow mb-2" style={{ color: accentColor }}>
                    {eyebrow}
                  </p>

                  {/* Title */}
                  <motion.h2
                    className="text-4xl lg:text-5xl font-light text-white leading-none tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.55 }}
                  >
                    {title}
                  </motion.h2>

                  {subtitle && (
                    <p className="mt-2 text-base text-white/45 leading-snug">{subtitle}</p>
                  )}
                </div>

                {/* Status badge */}
                <div className="ml-6 flex flex-col items-end gap-1.5 flex-shrink-0 pt-1">
                  <div
                    className="flex items-center gap-2 px-3 py-1 rounded-full"
                    style={{
                      background: `${accentColor}10`,
                      border: `1px solid ${accentColor}28`,
                    }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: accentColor, boxShadow: `0 0 5px ${accentColor}` }}
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: accentColor }}>
                      ONLINE
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-white/25">
                    SYS-0{sectionIdx} · {coords.alt}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="flex-shrink-0 mx-8 h-px"
              style={{
                background: `linear-gradient(90deg, ${accentColor}40, ${accentColor}10, transparent)`,
              }}
            />

            {/* ── SCROLLABLE CONTENT ────────────────────────────────────── */}
            <div
              className="flex-1 overflow-y-auto px-8 py-6 space-y-5"
              style={{
                /* Hide scrollbar */
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              } as React.CSSProperties}
            >
              {blocks.map((block, i) => (
                <RenderBlock
                  key={i}
                  block={block}
                  accentColor={accentColor}
                  index={i}
                />
              ))}
            </div>

            {/* ── FOOTER ───────────────────────────────────────────────── */}
            <div
              className="flex-shrink-0 px-8 py-3 flex items-center gap-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <span
                className="text-[9px] uppercase tracking-[0.18em] text-white/20"
                style={{ fontFamily: 'monospace' }}
              >
                MLN111 · Triết học Mác–Lênin
              </span>

              {/* Signal bars */}
              <div className="ml-auto flex items-end gap-0.5">
                {[3, 5, 8, 6, 4].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-sm"
                    style={{ background: accentColor, opacity: 0.3 }}
                    animate={{ height: [`${h}px`, `${Math.min(h * 1.8, 14)}px`, `${h}px`] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                  />
                ))}
              </div>

              {/* Live timestamp */}
              <span className="text-[9px] font-mono text-white/18">
                {coords.lat} · {coords.lon}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
