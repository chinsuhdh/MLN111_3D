import { motion } from 'motion/react';
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
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mt-10 rounded-2xl border-l-4 border-beige bg-gradient-to-br from-amber-50/80 to-orange-50/40 p-7 lg:p-10 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center bg-beige/30 flex-shrink-0">
          <BookOpen size={18} className="text-beige-dark" strokeWidth={2} />
        </div>
        <span className="section-eyebrow text-beige-dark mb-0 tracking-widest">
          Thực tiễn · Case Study
        </span>
      </div>

      <h4 className="font-serif font-bold text-lg md:text-xl lg:text-2xl text-navy mb-4 leading-snug">
        {title}
      </h4>

      <div className="text-sm md:text-base lg:text-lg leading-relaxed text-body/75 space-y-2">
        {children}
      </div>

      {/* Source citation */}
      <p className="mt-5 flex items-center gap-2 text-xs md:text-sm text-body/40 font-medium italic border-t border-beige/30 pt-4">
        <span className="w-1.5 h-1.5 rounded-full bg-beige flex-shrink-0" />
        Nguồn tham khảo: {source}
      </p>
    </motion.div>
  );
}
