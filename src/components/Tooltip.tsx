import { useState, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

interface TooltipProps {
  term: string;
  definition: string;
  children: ReactNode;
}

export default function Tooltip({ term, definition, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const ref = useRef<HTMLSpanElement>(null);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="button"
      aria-describedby={tooltipId}
      style={{ outline: 'none' }}
    >
      {/* Dotted underline to signal interactivity */}
      <span className="border-b-2 border-dotted border-dred/60 cursor-help pb-0.5 text-inherit">
        {children}
      </span>

      <AnimatePresence>
        {visible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[100] w-72 pointer-events-none"
          >
            <div className="bg-navy-dark/95 backdrop-blur-xl text-white rounded-2xl px-5 py-4 shadow-2xl border border-beige/20">
              <p className="text-beige text-xs font-bold uppercase tracking-widest mb-2">{term}</p>
              <p className="text-white/85 text-sm leading-relaxed">{definition}</p>
            </div>
            {/* Arrow */}
            <div
              className="mx-auto w-3 h-3 -mt-1.5"
              style={{
                background: 'rgba(21,43,71,0.95)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                marginLeft: 'calc(50% - 6px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
