import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';
import { PhilosophyScrollContext, SECTION_BOUNDS, SECTION_PEAKS } from '../hooks/usePhilosophyScroll';

type QuoteData = { text: string; author: string };

const QUOTE_DATABASE: QuoteData[] = [
  { text: 'Tồn tại xã hội quyết định ý thức xã hội.', author: 'C.Mác & Ph.Ăng-ghen' },
  { text: 'Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội.', author: 'Karl Marx' },
  { text: 'Mỗi cá nhân là một thực thể xã hội mang tính cá nhân.', author: 'Giáo trình Triết học' },
  { text: 'Quần chúng nhân dân là chủ thể sáng tạo chân chính của lịch sử.', author: 'V.I.Lênin' },
  { text: 'Lịch sử tất cả các xã hội chỉ là lịch sử đấu tranh giai cấp.', author: 'C.Mác & Ph.Ăng-ghen' },
  { text: 'Con người làm ra lịch sử của chính mình, nhưng không phải làm theo ý muốn tùy tiện.', author: 'Karl Marx' },
  { text: 'Hạnh phúc là đấu tranh.', author: 'Karl Marx' },
  { text: 'Lãnh tụ là những người kiệt xuất, do phong trào quần chúng tạo ra.', author: 'Giáo trình Triết học' },
  { text: 'Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.', author: 'C.Mác & Ph.Ăng-ghen' },
];

const TypewriterText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    setDisplay('');
    let i = 0;
    const seg = new Intl.Segmenter('vi', { granularity: 'grapheme' });
    const chars = Array.from(seg.segment(text)).map(s => s.segment);
    const id = setInterval(() => {
      if (i <= chars.length) { setDisplay(chars.slice(0, i).join('')); i++; }
      else clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {display}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        className="inline-block w-0.5 h-[0.9em] bg-[#64FFDA] ml-1 align-middle opacity-60"
      />
    </span>
  );
};

export default function Hero() {
  const { scrollContainerRef, scrollProgress } = useContext(PhilosophyScrollContext);
  const [idleIndex, setIdleIndex] = useState(0);

  const s = SECTION_BOUNDS[0];
  const opIn  = scrollProgress < s.peak
    ? Math.min(1, (scrollProgress - s.start) / Math.max(s.peak - s.start, 0.001))
    : 1;
  const opOut = scrollProgress > s.exit
    ? Math.max(0, 1 - (scrollProgress - s.exit) / Math.max(s.end - s.exit, 0.001))
    : 1;
  const opacity = Math.min(opIn, opOut);
  const scale   = 0.9 + 0.1 * Math.min(1, opIn);

  useEffect(() => {
    const id = setInterval(() => setIdleIndex(p => (p + 1) % QUOTE_DATABASE.length), 8000);
    return () => clearInterval(id);
  }, []);

  const currentQuote = QUOTE_DATABASE[idleIndex];

  if (opacity < 0.01) return null;

  return (
    <div
      className="hud-panel fixed inset-0 w-full h-full z-10"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: 'opacity 0.06s linear, transform 0.06s linear',
        pointerEvents: opacity > 0.25 ? 'auto' : 'none',
      }}
    >
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="w-full h-full flex flex-col justify-center px-8 md:px-16 lg:pr-24 bg-gradient-to-r from-[#030A14] via-[#030A14]/95 to-transparent backdrop-blur-3xl pointer-events-auto">
          <div className="max-w-xl w-full mx-auto lg:mx-0 py-12">
            
            <p className="section-eyebrow mb-6 animate-fade-rise">
              Chủ nghĩa duy vật lịch sử · Triết học Mác – Lênin
            </p>

            <h1
              className="animate-fade-rise font-normal leading-[0.95] tracking-[-0.04em] mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   'clamp(2.8rem, 5.5vw, 5.8rem)',
                color:      'rgba(255,255,255,0.95)',
              }}
            >
              Nơi{' '}
              <em className="not-italic" style={{ color: 'rgba(255,255,255,0.42)' }}>
                con người
              </em>
              {' '}vươn lên qua{' '}
              <em className="not-italic" style={{ color: 'rgba(255,255,255,0.42)' }}>
                lịch sử.
              </em>
            </h1>

            <p
              className="animate-fade-rise-delay leading-relaxed max-w-lg text-white/65"
              style={{
                fontSize:   'clamp(0.95rem, 1.5vw, 1.125rem)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Nghiên cứu quan điểm về{' '}
              <Tooltip term="Bản thể luận" definition="Ngành triết học nghiên cứu bản chất của tồn tại. Trong triết học Mác, bản thể luận duy vật khẳng định vật chất là nền tảng của mọi thực tại.">
                bản chất xã hội
              </Tooltip>{' '}
              của con người, mối quan hệ biện chứng{' '}
              <Tooltip term="Cá nhân & Xã hội" definition="Sự thống nhất biện chứng: Xã hội giữ vai trò quyết định, cung cấp điều kiện để cá nhân phát triển; ngược lại, năng lực cá nhân góp phần thúc đẩy xã hội tiến bộ.">
                cá nhân – tập thể
              </Tooltip>
              , cùng vai trò của KHÁM PHÁ{' '}
              <Tooltip term="Lãnh tụ" definition="Những cá nhân kiệt xuất xuất hiện từ phong trào quần chúng, có tầm nhìn vượt trội, nắm bắt được quy luật khách quan.">
                lãnh tụ
              </Tooltip>{' '}
              trong tiến trình lịch sử.
            </p>

            <div
              className="animate-fade-rise-delay relative pl-5 my-8 min-h-24 flex flex-col justify-center"
              style={{ borderLeft: '1px solid rgba(212,163,115,0.3)' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote.text}
                  initial={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0,  filter: 'blur(0px)' }}
                  exit={{   opacity: 0,           filter: 'blur(4px)', transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <p
                    className="italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize:   'clamp(0.9rem, 1.3vw, 1.05rem)',
                      color:      'rgba(255,255,255,0.65)',
                    }}
                  >
                    <TypewriterText text={currentQuote.text} />
                  </p>
                  <cite
                    className="mt-2 flex items-center gap-2 not-italic font-semibold tracking-wider uppercase"
                    style={{ color: '#D4A373', fontSize: '0.68rem', fontFamily: 'var(--font-body)' }}
                  >
                    — {currentQuote.author}
                  </cite>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const el = scrollContainerRef?.current;
                  if (el) el.scrollTo({ top: (el.scrollHeight - el.clientHeight) * SECTION_PEAKS[1], behavior: 'smooth' });
                }}
                className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-14 py-5 text-base text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                Bắt đầu hành trình
              </button>
              <button
                onClick={() => {
                  const el = scrollContainerRef?.current;
                  if (el) el.scrollTo({ top: (el.scrollHeight - el.clientHeight) * SECTION_PEAKS[5], behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-5 text-base transition-all duration-200 hover:scale-[1.03] cursor-pointer text-white/55 font-sans"
                style={{ fontSize: '0.9rem' }}
              >
                Xem tình huống →
              </button>
            </div>

            <div
              className="animate-fade-rise-delay-3 pt-8 mt-8 grid grid-cols-3 gap-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { value: '2', label: 'Luận điểm lớn', color: 'rgba(100,255,218,0.8)' },
                { value: '1', label: 'Tình huống thực tế', color: 'rgba(212,163,115,0.8)' },
                { value: '∞', label: 'Giá trị thực tiễn', color: 'rgba(255,255,255,0.5)' },
              ].map(({ value, label, color }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color, lineHeight: 1 }}>{value}</p>
                  <p className="mt-2 text-xs text-white/30 font-sans">{label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
        <div className="hidden lg:block pointer-events-none"></div>
      </div>
    </div>
  );
} 