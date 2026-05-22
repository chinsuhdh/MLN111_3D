import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { List, X, ChevronRight } from 'lucide-react';

const TOC_SECTIONS = [
  { id: 'hero',                 label: 'Giới thiệu',              num: '00' },
  { id: 'section-canhan-xahoi', label: 'Cá nhân & Xã hội',        num: '01' },
  { id: 'section-quanchung',    label: 'Quần chúng Nhân dân',     num: '02' },
  { id: 'section-hcm',          label: 'Tư tưởng Hồ Chí Minh',   num: '03' },
  { id: 'section-dang',         label: 'Quan điểm Đảng',          num: '04' },
  { id: 'section-mindmap',      label: 'Sơ đồ tư duy',            num: '05' },
  { id: 'section-quiz',         label: 'Trắc nghiệm',             num: '06' },
];

export default function TOC() {
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    TOC_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop sidebar (xl+) ──────────────────────────────── */}
      <aside
        className="hidden xl:flex flex-col fixed left-5 2xl:left-8 top-1/2 -translate-y-1/2 z-40 gap-2.5"
        aria-label="Mục lục trang"
      >
        {TOC_SECTIONS.map(({ id, label, num }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Chuyển đến: ${label}`}
              className={`group flex items-center gap-3 transition-all duration-300 text-left ${
                isActive ? 'opacity-100' : 'opacity-35 hover:opacity-70'
              }`}
            >
              {/* Number badge */}
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive ? '#1E3A5F' : 'rgba(255,255,255,0.7)',
                }}
                transition={{ duration: 0.25 }}
                className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm border border-navy/15"
                style={{ color: isActive ? '#fff' : '#1E3A5F' }}
              >
                {num}
              </motion.div>

              {/* Label — slides in on hover / always visible when active */}
              <span
                className={`text-xs 2xl:text-sm font-semibold whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md border border-navy/10 transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 translate-x-0 text-navy'
                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-body'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* ── Mobile floating button ─────────────────────────────── */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50">
        {/* Toggle button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-14 h-14 rounded-2xl bg-navy text-white shadow-2xl flex items-center justify-center"
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
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <List size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Dropdown panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute bottom-[70px] right-0 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-navy/10 overflow-hidden"
            >
              <div className="px-4 py-3 bg-navy">
                <p className="text-xs font-bold uppercase tracking-widest text-white">Mục lục</p>
              </div>
              <div className="p-2">
                {TOC_SECTIONS.map(({ id, label, num }) => {
                  const isActive = active === id;
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-navy/10 text-navy'
                          : 'text-body hover:bg-navy/5'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-200 ${
                          isActive ? 'bg-navy text-white' : 'bg-navy/10 text-navy'
                        }`}
                      >
                        {num}
                      </span>
                      <span className="text-sm font-medium flex-1">{label}</span>
                      {isActive && <ChevronRight size={14} className="text-navy flex-shrink-0" />}
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
