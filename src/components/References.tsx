'use client';

import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS } from '../hooks/usePhilosophyScroll';

// Projector-optimised shadows
const NARRATIVE_SHADOW =
  '0 2px 10px rgba(0,0,0,0.95), 0 8px 30px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.12)';
const BODY_SHADOW = '0 2px 8px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.6)';
const CHIP_COLOR = '#64FFDA';

// ─────────────────────────────────────────────────────────────────────────────
// DATA QUIZ MÔ PHỎNG
// ─────────────────────────────────────────────────────────────────────────────
const QUIZ_DATA = [
  {
    id: 1,
    category: 'BẢN CHẤT CON NGƯỜI',
    question: 'Theo triết học Mác - Lênin, bản chất con người trong tính hiện thực của nó là gì?',
    options: [
      'Một thực thể sinh học thuần túy, hành động theo bản năng.',
      'Sản phẩm của một lực lượng siêu nhiên định đoạt.',
      'Tổng hòa các quan hệ xã hội.',
      'Một cá thể biệt lập, không chịu sự chi phối của tự nhiên.'
    ],
    correct: 2,
    explanation: 'Con người là một hệ thống chỉnh thể thống nhất cá thể – loài. C.Mác khẳng định: "Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội."'
  },
  {
    id: 2,
    category: 'ĐỘNG LỰC LỊCH SỬ',
    question: 'Lực lượng nào được coi là chủ thể sáng tạo chân chính và là động lực phát triển của lịch sử?',
    options: [
      'Các vị vua chúa và quý tộc.',
      'Quần chúng nhân dân.',
      'Các vĩ nhân và lãnh tụ.',
      'Tầng lớp tri thức tinh hoa.'
    ],
    correct: 1,
    explanation: 'Quần chúng nhân dân là chủ thể sáng tạo chân chính, lực lượng sản xuất cơ bản và là động lực của mọi cuộc cách mạng xã hội.'
  },
  {
    id: 3,
    category: 'QUAN HỆ BIỆN CHỨNG',
    question: 'Đâu là cách giải quyết ĐÚNG ĐẮN mối quan hệ giữa cá nhân và xã hội?',
    options: [
      'Đề cao quá mức lợi ích cá nhân (chủ nghĩa cá nhân).',
      'Tuyệt đối hóa xã hội, xóa bỏ mọi quyền lợi của cá nhân.',
      'Kết hợp hài hòa, cá nhân phát triển là điều kiện cho xã hội phát triển.',
      'Tách rời cá nhân khỏi xã hội để đảm bảo tự do tuyệt đối.'
    ],
    correct: 2,
    explanation: 'Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người. Cần tránh cả hai thái cực: chủ nghĩa cá nhân và tuyệt đối hóa tập thể.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA CORE — rotating geometric shape
// ─────────────────────────────────────────────────────────────────────────────
function DataCore({ active }: { active: boolean }) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <motion.svg
        width="96" height="96"
        className="absolute inset-0"
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(100,255,218,0.12)" strokeWidth="1" strokeDasharray="8 6" />
      </motion.svg>
      <motion.svg
        width="64" height="64"
        className="absolute"
        animate={{ rotate: active ? -360 : 0 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="none" stroke="rgba(100,255,218,0.25)" strokeWidth="1.5" />
      </motion.svg>
      <motion.div
        className="w-8 h-8 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(100,255,218,0.5) 0%, rgba(100,255,218,0.05) 70%)',
          boxShadow: '0 0 18px rgba(100,255,218,0.3)',
        }}
        animate={active ? { scale: [1, 1.25, 1], opacity: [0.9, 0.5, 0.9] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS ROW
// ─────────────────────────────────────────────────────────────────────────────
function StatusRow({ label, value, color = CHIP_COLOR, blink = false }: {
  label: string; value: string; color?: string; blink?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">{label}</span>
      <div className="flex items-center gap-1.5">
        {blink && (
          <motion.div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 4px ${color}` }}
            animate={{ opacity: [1, 0.1, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}
        <span className="text-[10px] font-mono font-bold" style={{ color }}>{value}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN REFERENCES COMPONENT (NOW: KNOWLEDGE ASSESSMENT)
// ─────────────────────────────────────────────────────────────────────────────
export default function References() {
  const { scrollProgress } = useContext(PhilosophyScrollContext);
  
  // States for Modal and Quiz
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const s = SECTION_BOUNDS[8]; 
  const opacityIn  = Math.min(1, scrollProgress < s.peak ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start)) : 1);
  const opacityOut = scrollProgress > s.exit ? Math.max(0, 1 - (scrollProgress - s.exit) / (s.end - s.exit)) : 1;
  const opacity = Math.min(opacityIn, opacityOut);
  const scale   = 0.91 + 0.09 * Math.min(1, opacityIn);

  useEffect(() => {
    if (opacity < 0.1 && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [opacity, isModalOpen]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === QUIZ_DATA[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < QUIZ_DATA.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (opacity < 0.01) return null;

  return (
    <div
      id="section-references"
      className="hud-panel flex items-center justify-center"
      style={{
        opacity,
        transform: `scale(${scale})`,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
        padding: '4.5rem 1.5rem 1.5rem',
      }}
    >
      <AnimatePresence mode="wait">
        {!isModalOpen ? (
          <motion.button
            key="trigger-btn"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            onClick={() => setIsModalOpen(true)}
            className="group relative flex flex-col items-center justify-center px-20 py-16 rounded-[2rem] transition-transform duration-300 hover:scale-105"
            style={{
              background: 'rgba(3,10,20,0.6)',
              border: '1px solid rgba(100,255,218,0.2)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 40px rgba(100,255,218,0.05) inset, 0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            <div className="absolute inset-0 rounded-[2rem] border-2 border-[#64FFDA]/0 group-hover:border-[#64FFDA]/30 transition-colors duration-500 pointer-events-none" />
            <DataCore active={true} />
            <p className="mt-10 text-[#64FFDA] font-mono tracking-[0.3em] text-xl font-bold group-hover:text-white transition-colors drop-shadow-[0_0_12px_rgba(100,255,218,0.9)]">
              [ HỆ THỐNG KIỂM TRA ]
            </p>
            <p className="mt-4 text-white/50 text-base uppercase tracking-widest font-mono">
              Khởi động bộ hiệu chuẩn nhận thức
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="terminal-modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.22, 0.68, 0, 1.1] }}
            className="relative w-full max-w-5xl mx-auto flex flex-col"
            style={{
              height: 'calc(100vh - 8rem)',
              background: 'rgba(3,10,20,0.78)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(100,255,218,0.15)',
              borderRadius: '20px',
              boxShadow: '0 0 0 1px rgba(100,255,218,0.06), 0 0 60px rgba(100,255,218,0.04), 0 32px 80px rgba(0,0,0,0.7)',
              overflow: 'hidden',
            }}
          >
            {/* TERMINAL TITLE BAR */}
            <div className="relative flex-shrink-0 flex items-center justify-between px-6 py-3.5" style={{ borderBottom: '1px solid rgba(100,255,218,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }} />)}
                </div>
                <div className="w-px h-4 bg-white/10" />
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35">COGNITIVE CALIBRATION TERMINAL</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full" style={{ background: '#64FFDA', boxShadow: '0 0 6px #64FFDA' }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                  <span className="text-[9px] font-mono text-[#64FFDA]/60 tracking-widest">TESTING</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/30"
                >
                  <svg width="12" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="11" y2="11" />
                    <line x1="11" y1="1" x2="1" y2="11" />
                  </svg>
                </button>
              </div>
            </div>

            {/* MAIN BODY */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* SIDEBAR */}
              <div className="flex-shrink-0 md:w-64 flex flex-col" style={{ background: 'rgba(0,4,12,0.55)', borderRight: '1px solid rgba(100,255,218,0.07)' }}>
                <div className="flex flex-col items-center py-7 px-5" style={{ borderBottom: '1px solid rgba(100,255,218,0.07)' }}>
                  <DataCore active={!isFinished} />
                  <div className="mt-4 text-center">
                    <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#64FFDA]/40 mb-1">MỤC TIÊU</p>
                    <h2 className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>Hiệu chuẩn tư duy</h2>
                  </div>
                </div>

                <div className="px-5 py-4 space-y-0.5 flex-1">
                  <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-white/20 mb-2.5">TIẾN TRÌNH</p>
                  <StatusRow label="CÂU HỎI"   value={isFinished ? 'HOÀN THÀNH' : `${currentQ + 1} / ${QUIZ_DATA.length}`} blink={!isFinished} />
                  <StatusRow label="ĐIỂM SỐ"   value={`${score * 100} PTS`} color="#D4A373" />
                  <StatusRow label="ĐÁNH GIÁ"  value={isFinished ? (score === QUIZ_DATA.length ? 'XUẤT SẮC' : 'CẦN ÔN LẠI') : 'ĐANG XỬ LÝ'} color="#38BDF8" />
                </div>
              </div>

              {/* QUIZ CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
                <AnimatePresence mode="wait">
                  {!isFinished ? (
                    <motion.div
                      key={currentQ}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="max-w-2xl mx-auto"
                    >
                      <p className="text-xs font-mono text-[#D4A373] tracking-widest mb-4">
                        ▸ HẠNG MỤC: {QUIZ_DATA[currentQ].category}
                      </p>
                      <h3 className="text-2xl md:text-3xl text-white mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-display)', textShadow: NARRATIVE_SHADOW }}>
                        {QUIZ_DATA[currentQ].question}
                      </h3>

                      <div className="space-y-4">
                        {QUIZ_DATA[currentQ].options.map((option, idx) => {
                          let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-300 ";
                          let isCorrect = idx === QUIZ_DATA[currentQ].correct;
                          
                          if (!isAnswered) {
                            btnClass += "border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white";
                          } else {
                            if (isCorrect) {
                              btnClass += "quiz-correct border-green-500/50 text-green-300";
                            } else if (idx === selectedOption && !isCorrect) {
                              btnClass += "quiz-wrong border-red-500/50 text-red-300";
                            } else {
                              btnClass += "border-white/5 bg-transparent text-white/20";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={isAnswered}
                              onClick={() => handleSelect(idx)}
                              className={btnClass}
                            >
                              <span className="font-mono text-[10px] opacity-50 mr-3">[{String.fromCharCode(65 + idx)}]</span>
                              <span className="text-sm md:text-base">{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          className="mt-8 p-5 rounded-xl bg-[#64FFDA]/10 border border-[#64FFDA]/20"
                        >
                          <p className="text-[#64FFDA] text-xs font-mono mb-2 tracking-widest uppercase">▸ Phân tích hệ thống</p>
                          <p className="text-white/80 text-sm leading-relaxed">{QUIZ_DATA[currentQ].explanation}</p>
                          
                          <button
                            onClick={handleNext}
                            className="mt-6 px-6 py-2.5 bg-[#64FFDA] text-[#030A14] font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-white transition-colors"
                          >
                            {currentQ < QUIZ_DATA.length - 1 ? 'Tiếp tục >>' : 'Xem kết quả'}
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto"
                    >
                      <DataCore active={true} />
                      <h2 className="text-4xl text-white mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        Đánh giá hoàn tất
                      </h2>
                      <p className="text-xl text-white/60 mb-8">
                        Độ chính xác: <span className="text-[#64FFDA] font-bold font-mono">{Math.round((score / QUIZ_DATA.length) * 100)}%</span>
                      </p>
                      
                      <div className="p-5 rounded-xl bg-white/5 border border-white/10 mb-8">
                        <p className="text-sm text-white/70 italic">
                          "{score === QUIZ_DATA.length ? 'Nhận thức lý luận của bạn đã đạt mức đồng bộ hoàn hảo với hệ thống.' : 'Triết học là một quá trình nhận thức liên tục. Hãy ôn tập lại các khái niệm để đạt trạng thái cân bằng.'}"
                        </p>
                      </div>

                      <button
                        onClick={resetQuiz}
                        className="px-8 py-3 border border-[#D4A373]/50 text-[#D4A373] hover:bg-[#D4A373]/10 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors"
                      >
                        Khởi động lại mô phỏng
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}