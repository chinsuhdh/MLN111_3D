'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOADING_MESSAGES = [
  'Khởi tạo Vũ trụ Triết học...',
  'Biên dịch Quan hệ Xã hội...',
  'Tính toán Trọng lực Khái niệm...',
  'Sẵn sàng.',
];

export default function CinematicLoader() {
  const [messageIdx, setMessageIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle loading messages
    const msgTimer = setInterval(() => {
      setMessageIdx(prev => Math.min(prev + 1, LOADING_MESSAGES.length - 1));
    }, 600);

    // Animate progress bar
    const start = Date.now();
    const duration = 2200;
    const raf = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / duration, 1));
      if (elapsed < duration) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => clearInterval(msgTimer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #0a1628 0%, #030A14 70%)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Starfield dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Central orb */}
      <div className="relative mb-12">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#64FFDA]/20"
          style={{ width: 140, height: 140, margin: -20 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        {/* Mid ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#D4A373]/15"
          style={{ width: 110, height: 110, margin: -5 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Core sphere */}
        <motion.div
          className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #2A4F80, #030A14)',
            boxShadow: '0 0 30px rgba(100,255,218,0.3), 0 0 60px rgba(30,58,95,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="28" height="28" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="3" fill="white" opacity="0.95" />
            <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>
        </motion.div>
      </div>

      {/* Brand */}
      <motion.h1
        className="font-serif font-bold text-white text-3xl mb-3 tracking-wide"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Vũ trụ Triết học
      </motion.h1>
      <motion.p
        className="font-mono text-xs uppercase tracking-[0.2em] text-[#64FFDA]/70 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Chủ nghĩa Mác – Lênin · MLN111
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-px bg-white/10 rounded-full overflow-hidden mb-4 relative">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #1E3A5F, #64FFDA, #D4A373)',
          }}
          transition={{ ease: 'easeOut' }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(100,255,218,0.3), transparent)', animation: 'shimmer 2s linear infinite', backgroundSize: '200% 100%' }}
        />
      </div>

      {/* Cycling status message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIdx}
          className="font-mono text-[11px] text-white/40 tracking-widest uppercase"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {LOADING_MESSAGES[messageIdx]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
