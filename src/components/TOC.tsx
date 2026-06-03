'use client';

import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, ChevronRight } from 'lucide-react';
import { PhilosophyScrollContext } from '../hooks/usePhilosophyScroll';

// ─────────────────────────────────────────────────────────────────────────────
// Cấu hình Mục lục: idx để click bay tới đúng phần, activeGroup để sáng đèn
// Đã đồng bộ hoàn toàn với cấu trúc SECTION_BOUNDS mới nhất
// ─────────────────────────────────────────────────────────────────────────────
const TOC_SECTIONS = [
  { idx: 0,  label: 'Giới thiệu',           num: '00', icon: '✦', activeGroup: [0] },
  { idx: 1,  label: 'Cá nhân & Xã hội',     num: '01', icon: '◎', activeGroup: [1, 2] },
  { idx: 3,  label: 'Quần chúng & Lãnh tụ', num: '02', icon: '◉', activeGroup: [3, 4] },
  { idx: 5,  label: 'Tình huống',           num: '03', icon: '◈', activeGroup: [5, 6] },
  { idx: 7,  label: 'Thực tiễn VN',         num: '04', icon: '★', activeGroup: [7, 8] },
  { idx: 9,  label: 'Tổng quan',            num: '05', icon: '✺', activeGroup: [9] },
  { idx: 10, label: 'Tài liệu',             num: '06', icon: '◆', activeGroup: [10] },
];

export default function TOC() {
  const { activeSection, flyTo } = useContext(PhilosophyScrollContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleFlyTo = (idx: number) => {
    flyTo(idx);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────── */}
      <aside
        className="hidden xl:flex flex-col fixed left-5 2xl:left-8 top-1/2 -translate-y-1/2 z-40 gap-3"
        aria-label="Mục lục vũ trụ"
      >
        {TOC_SECTIONS.map(({ idx, label, num, icon, activeGroup }) => {
          // Kiểm tra xem section hiện tại có nằm trong nhóm sáng đèn không
          const isActive = activeGroup.includes(activeSection);
          
          return (
            <button
              key={idx}
              onClick={() => handleFlyTo(idx)}
              aria-label={`Chuyển đến: ${label}`}
              className={`group flex items-center gap-3 transition-all duration-400 text-left ${
                isActive ? 'opacity-100' : 'opacity-30 hover:opacity-70'
              }`}
            >
              {/* Waypoint indicator (Nút chấm nhỏ) */}
              <div className="relative flex-shrink-0">
                <motion.div
                  animate={{
                    width:  isActive ? 36 : 28,
                    height: isActive ? 36 : 28,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="rounded-xl flex items-center justify-center text-xs font-bold"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(100,255,218,0.25), rgba(30,58,95,0.4))'
                      : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${isActive ? 'rgba(100,255,218,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    color: isActive ? '#64FFDA' : 'rgba(255,255,255,0.5)',
                    boxShadow: isActive ? '0 0 12px rgba(100,255,218,0.2)' : 'none',
                  }}
                >
                  {isActive ? <span className="text-[10px]">{icon}</span> : <span className="text-[9px]">{num}</span>}
                </motion.div>

                {/* Vòng pulse tỏa ra khi Active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ border: '1px solid rgba(100,255,218,0.3)' }}
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Tên Label — Hiện lên khi Hover hoặc khi Active */}
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -4,
                }}
                className={`text-[11px] 2xl:text-xs font-semibold whitespace-nowrap px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  isActive ? 'block' : 'hidden group-hover:block'
                }`}
                style={{
                  background: 'rgba(3,10,20,0.8)',
                  border: '1px solid rgba(100,255,218,0.2)',
                  color: isActive ? '#64FFDA' : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {label}
              </motion.span>

              {/* Hover label (Chỉ hiện khi chưa Active) */}
              {!isActive && (
                <span
                  className="text-[11px] font-semibold whitespace-nowrap px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                  style={{
                    background: 'rgba(3,10,20,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {label}
                </span>
              )}
            </button>
          );
        })}

        {/* Trục kẻ dọc (Vertical connector line) */}
        <div
          className="absolute left-[14px] top-4 bottom-4 w-px pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(100,255,218,0.15), transparent)' }}
        />
      </aside>

      {/* ── Mobile floating button ─────────────────────────── */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl"
          style={{
            background: 'rgba(3,10,20,0.9)',
            border: '1px solid rgba(100,255,218,0.3)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 20px rgba(100,255,218,0.2)',
          }}
          aria-label="Mở mục lục"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={18} color="#64FFDA" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <List size={18} color="#64FFDA" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute bottom-[60px] right-0 w-60 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(3,10,20,0.95)',
                border: '1px solid rgba(100,255,218,0.2)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
              }}
            >
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64FFDA]/70">
                  Mục lục · Navigation
                </p>
              </div>
              <div className="p-2">
                {TOC_SECTIONS.map(({ idx, label, num, icon, activeGroup }) => {
                  const isActive = activeGroup.includes(activeSection);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleFlyTo(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-[#64FFDA]/10 text-[#64FFDA]'
                          : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] flex-shrink-0"
                        style={{
                          background: isActive ? 'rgba(100,255,218,0.2)' : 'rgba(255,255,255,0.06)',
                          border: `1px solid ${isActive ? 'rgba(100,255,218,0.4)' : 'rgba(255,255,255,0.08)'}`,
                          color: isActive ? '#64FFDA' : 'rgba(255,255,255,0.4)',
                        }}
                      >
                        {isActive ? icon : num}
                      </span>
                      <span className="text-sm font-medium flex-1">{label}</span>
                      {isActive && <ChevronRight size={12} className="flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}