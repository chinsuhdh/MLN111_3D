'use client';

import React, { useContext, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS } from '../hooks/usePhilosophyScroll';

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

const VISUALS = {
  SHADOW_NARRATIVE: '0 2px 10px rgba(0,0,0,0.95), 0 8px 30px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.12)',
  SHADOW_BODY: '0 2px 8px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.6)',
  FONT_DISPLAY: 'var(--font-display)',
  FONT_BODY: 'var(--font-body)',
};

// Đã ép giới hạn min xuống thấp hơn để chứa được nhiều chữ
const TYPOGRAPHY = {
  title: 'clamp(1.4rem, 4vh, 4rem)', 
  eyebrow: 'clamp(0.55rem, 1vh, 0.9rem)',
};

const ANIMATION = {
  duration: 0.55,
  titleDuration: 0.6,
  staggerDelay: 0.07,
  easeOut: 'easeOut' as const,
  cinematicEase: [0.22, 0.68, 0, 1.1] as [number, number, number, number],
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

function isRightSide(sectionIdx: number): boolean {
  return sectionIdx === 1 || sectionIdx === 2 || sectionIdx === 5 || sectionIdx === 6;
}

const RenderBlock = React.memo(function RenderBlock({ 
  block, accentColor, index 
}: { 
  block: ContentBlock; accentColor: string; index: number 
}) {
  const delay = 0.1 + index * ANIMATION.staggerDelay;

  const labelStyle = useMemo(() => ({
    color: `${accentColor}dd`,
    fontFamily: VISUALS.FONT_BODY,
    textShadow: `0 0 12px ${accentColor}60`,
  }), [accentColor]);

  const bodyStyle = useMemo(() => ({
    textShadow: VISUALS.SHADOW_BODY,
    fontFamily: VISUALS.FONT_BODY,
  }), []);

  // Đã đồng loạt giảm text-size từ clamp(1rem...) xuống clamp(0.85rem...) và thu gọn margin
  switch (block.type) {
    case 'heading':
      return (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: ANIMATION.duration, ease: ANIMATION.easeOut }} className="pt-[1vh]">
          {block.label && <p className="mb-[0.5vh] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]" style={{ ...labelStyle, textShadow: `0 0 16px ${accentColor}80` }}>▸ {block.label}</p>}
          <h3 className="text-[clamp(1.1rem,2.5vh,1.75rem)] font-semibold leading-snug text-white" style={{ fontFamily: VISUALS.FONT_DISPLAY, textShadow: VISUALS.SHADOW_NARRATIVE }}>{block.text}</h3>
          <div className="mt-[0.8vh] h-px w-12 md:w-16" style={{ background: `linear-gradient(90deg, ${accentColor}90, transparent)` }} />
        </motion.div>
      );

    case 'body':
      return (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: ANIMATION.duration }} className="text-[clamp(0.85rem,1.6vh,1.15rem)] leading-relaxed text-white/80" style={bodyStyle} dangerouslySetInnerHTML={{ __html: block.html ?? block.text ?? '' }} />
      );

    case 'quote':
      return (
        <motion.blockquote initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: ANIMATION.duration }} className="pl-4 md:pl-5 py-[0.5vh]" style={{ borderLeft: `3px solid ${accentColor}60` }}>
          <p className="italic text-[clamp(0.85rem,1.6vh,1.15rem)] leading-relaxed text-white/70" style={{ fontFamily: VISUALS.FONT_DISPLAY, textShadow: VISUALS.SHADOW_NARRATIVE }}>"{block.text}"</p>
          {block.label && <cite className="block mt-[0.8vh] not-italic text-[10px] md:text-xs font-bold tracking-wider uppercase" style={{ color: `${accentColor}aa`, textShadow: `0 0 10px ${accentColor}50` }}>— {block.label}</cite>}
        </motion.blockquote>
      );

    case 'bullet-list':
      return (
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: ANIMATION.duration }} className="space-y-[0.8vh] md:space-y-[1.2vh]">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 md:gap-3">
              <span className="mt-[0.5vh] md:mt-[0.6vh] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0" style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}cc` }} />
              <span className="text-[clamp(0.85rem,1.6vh,1.15rem)] text-white/75 leading-relaxed" style={bodyStyle} dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </motion.ul>
      );

    case 'numbered-list':
      return (
        <motion.ol initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: ANIMATION.duration }} className="space-y-[0.8vh] md:space-y-[1.2vh]">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 md:gap-3">
              <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs md:text-sm font-bold" style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}`, fontFamily: VISUALS.FONT_BODY }}>{i + 1}</span>
              <span className="text-[clamp(0.85rem,1.6vh,1.15rem)] text-white/75 leading-relaxed" style={bodyStyle} dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </motion.ol>
      );

    case 'highlight':
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: ANIMATION.duration }} className="pl-4 md:pl-5 py-[0.2vh]" style={{ borderLeft: `3px solid ${accentColor}50` }}>
          {block.label && <p className="mb-[0.5vh] text-[10px] md:text-xs font-bold uppercase tracking-[0.18em]" style={labelStyle}>{block.label}</p>}
          <p className="text-[clamp(0.85rem,1.6vh,1.15rem)] text-white/75 leading-relaxed" style={bodyStyle} dangerouslySetInnerHTML={{ __html: block.html ?? block.text ?? '' }} />
        </motion.div>
      );

    default:
      return null;
  }
});

interface TheoryContentProps extends Omit<PlanetTheoryHUDProps, 'sectionIdx'> {
  alignRight: boolean;
}

const TheoryContent = React.memo(function TheoryContent({
  title, eyebrow, accentColor, subtitle, coords, blocks, alignRight
}: TheoryContentProps) {
  
  const titleGlow = useMemo(() => `0 0 24px rgba(255,255,255,0.22), 0 0 60px ${accentColor}20, 0 4px 16px rgba(0,0,0,0.95)`, [accentColor]);

  return (
    // Giảm padding tổng từ 6vh xuống 3vh
    <div className={`w-full max-w-xl mx-auto py-[2vh] lg:py-[3vh] pointer-events-auto ${alignRight ? 'lg:ml-auto lg:mr-0' : 'lg:mx-0'}`}>
      <motion.p
        className="section-eyebrow mb-[1vh]"
        style={{ color: accentColor, textShadow: `0 0 18px ${accentColor}90`, fontSize: TYPOGRAPHY.eyebrow, letterSpacing: '0.22em' }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.45 }}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        className="font-light leading-[1.1] tracking-tight text-white mb-[1vh]"
        style={{ fontFamily: VISUALS.FONT_DISPLAY, fontSize: TYPOGRAPHY.title, textShadow: titleGlow }}
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: ANIMATION.titleDuration }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-[clamp(0.95rem,2vh,1.35rem)] text-white/55 mb-[2vh] md:mb-[2.5vh] leading-snug"
          style={{ fontFamily: VISUALS.FONT_BODY, textShadow: VISUALS.SHADOW_BODY }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: ANIMATION.duration }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className="mb-[2vh] md:mb-[2.5vh]"
        style={{ height: 1, width: '100%', background: `linear-gradient(90deg, ${accentColor}60, transparent 75%)` }}
        initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.28, duration: ANIMATION.duration, ease: ANIMATION.easeOut }}
      />

      {/* Thu hẹp khoảng cách giữa các block */}
      <div className="space-y-[1.5vh] md:space-y-[2vh]">
        {blocks.map((block, i) => (
          <RenderBlock key={i} block={block} accentColor={accentColor} index={i} />
        ))}
      </div>

      <motion.p
        className="mt-[3vh] md:mt-[4vh] text-[9px] md:text-[10px] font-mono text-white/20 tracking-[0.16em] uppercase"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }}
      >
        {coords?.lat} · {coords?.lon} · {coords?.alt}
      </motion.p>
    </div>
  );
});

export default function PlanetTheoryHUD({
  sectionIdx,
  title,
  eyebrow,
  accentColor,
  subtitle,
  coords,
  blocks,
}: PlanetTheoryHUDProps) {
  const { scrollProgress } = useContext(PhilosophyScrollContext);
  const isMobile = useIsMobile();

  const s = SECTION_BOUNDS[sectionIdx];
  const opacityIn = Math.min(1, scrollProgress < s.peak ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start)) : 1);
  const opacityOut = scrollProgress > s.exit ? Math.max(0, 1 - (scrollProgress - s.exit) / (s.end - s.exit)) : 1;
  const opacity = Math.min(opacityIn, opacityOut);

  if (opacity < 0.01) return null;

  let yOffset = 0;
  let blurAmount = 0;
  
  if (scrollProgress < s.peak) {
    yOffset = (1 - opacityIn) * 150;
    blurAmount = (1 - opacityIn) * 12;
  } else if (scrollProgress > s.exit) {
    yOffset = (1 - opacityOut) * -150;
    blurAmount = (1 - opacityOut) * 12;
  }

  const isRight = isRightSide(sectionIdx);
  const distanceX = isMobile ? 30 : 80;
  const initX = isRight ? distanceX : -distanceX;

  return (
    <AnimatePresence>
      <motion.div
        key={`hud-${sectionIdx}`}
        className="fixed inset-0 z-10 w-full h-full pointer-events-none"
        style={{ 
          opacity, 
          y: yOffset,
          filter: `blur(${blurAmount}px)`
        }}
        initial={{ x: initX }}
        animate={{ x: 0 }}
        exit={{ x: initX * 0.4 }}
        transition={{ duration: 0.65, ease: ANIMATION.cinematicEase }}
      >
        <div className="w-full h-full grid lg:grid-cols-2">
          
          {!isRight ? (
            <div className="flex flex-col justify-center px-6 md:px-16 lg:pr-24 h-full text-left relative pointer-events-none">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030A14] via-[#030A14]/80 lg:bg-none lg:bg-gradient-to-r lg:from-[#030A14]/90 lg:via-[#030A14]/40 to-transparent -z-10" />
              <TheoryContent alignRight={false} title={title} eyebrow={eyebrow} subtitle={subtitle} blocks={blocks} coords={coords} accentColor={accentColor} />
            </div>
          ) : (
            <div className="hidden lg:block pointer-events-none" />
          )}

          {isRight ? (
            <div className="flex flex-col justify-center px-6 md:px-16 lg:pl-24 h-full text-left relative pointer-events-none">
               <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030A14] via-[#030A14]/80 lg:bg-none lg:bg-gradient-to-l lg:from-[#030A14]/90 lg:via-[#030A14]/40 to-transparent -z-10" />
               <TheoryContent alignRight={true} title={title} eyebrow={eyebrow} subtitle={subtitle} blocks={blocks} coords={coords} accentColor={accentColor} />
            </div>
          ) : (
            <div className="hidden lg:block pointer-events-none" />
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}