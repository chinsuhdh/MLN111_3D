import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { BookOpen } from 'lucide-react';

interface CaseStudyBlockProps {
  title: string;
  source: string;
  children: ReactNode;
}

export default function CaseStudyBlock({ title, source, children }: CaseStudyBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="liquid-glass mt-8 rounded-2xl p-6 lg:p-8"
      style={{ borderLeft: '3px solid rgba(212,163,115,0.5)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="liquid-glass w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
          <BookOpen size={16} color="#D4A373" strokeWidth={2} />
        </div>
        <span className="section-eyebrow" style={{ color: '#D4A373' }}>
          Thực tiễn · Case Study
        </span>
      </div>

      <h4 className="text-lg md:text-xl text-white mb-4 leading-snug">
        {title}
      </h4>

      <div className="text-sm md:text-base leading-relaxed text-muted-foreground space-y-2">
        {children}
      </div>

      {/* Source */}
      <p
        className="mt-5 flex items-center gap-2 text-xs text-muted-foreground font-medium italic pt-4"
        style={{ borderTop: '1px solid rgba(212,163,115,0.1)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#D4A373' }} />
        Nguồn tham khảo: {source}
      </p>
    </motion.div>
  );
}
