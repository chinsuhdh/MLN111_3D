import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedView from './AnimatedView';
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, ChevronLeft } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Theo triết học Mác–Lênin, bản chất của con người là gì?',
    options: [
      'Một thực thể sinh học thuần túy, do tự nhiên quy định',
      'Tổng hòa của các quan hệ xã hội — con người mang bản chất xã hội',
      'Một cá thể hoàn toàn độc lập, tự do khỏi ràng buộc xã hội',
      'Sản phẩm của ý chí thần thánh và số phận',
    ],
    correct: 1,
    explanation:
      'Karl Marx khẳng định: "Con người là tổng hòa của các quan hệ xã hội." Bản chất con người không phải là trừu tượng, bẩm sinh mà được hình thành và phát triển qua các quan hệ xã hội cụ thể, lịch sử.',
  },
  {
    id: 2,
    question: 'Quần chúng nhân dân đóng vai trò gì trong lịch sử theo quan điểm Mác–Lênin?',
    options: [
      'Lực lượng thụ động, chờ đợi sự dẫn dắt của lãnh tụ',
      'Nhân tố phụ trợ trong tiến trình lịch sử',
      'Chủ thể sáng tạo lịch sử — lực lượng quyết định tiến trình xã hội',
      'Chỉ có vai trò quan trọng trong các cuộc cách mạng bạo lực',
    ],
    correct: 2,
    explanation:
      'Theo chủ nghĩa Mác–Lênin, quần chúng nhân dân là lực lượng sản xuất cơ bản, là động lực cách mạng và là chủ thể sáng tạo ra lịch sử. Họ quyết định tiến trình và kết quả của sự phát triển xã hội.',
  },
  {
    id: 3,
    question: 'Tư tưởng Hồ Chí Minh xác định con người giữ vị trí gì trong sự nghiệp cách mạng?',
    options: [
      'Phương tiện để đạt mục tiêu chính trị của Đảng',
      'Vừa là mục tiêu, vừa là động lực của sự nghiệp cách mạng',
      'Đối tượng cần được Đảng và Nhà nước hoàn toàn lãnh đạo',
      'Nhân tố thứ yếu, sau tổ chức Đảng và lực lượng vũ trang',
    ],
    correct: 1,
    explanation:
      'Hồ Chí Minh xác định con người vừa là mục tiêu (được giải phóng, được hưởng hạnh phúc) vừa là động lực (sức mạnh cách mạng). Tư tưởng nhất quán: "Độc lập — Tự do — Hạnh phúc" và "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh."',
  },
  {
    id: 4,
    question: 'Mối quan hệ giữa cá nhân và xã hội trong triết học Mác–Lênin được hiểu như thế nào?',
    options: [
      'Cá nhân hoàn toàn phụ thuộc xã hội, không có tính độc lập',
      'Cá nhân và xã hội mâu thuẫn đối lập, không thể dung hòa',
      'Quan hệ biện chứng — thống nhất, tác động qua lại và không thể tách rời',
      'Xã hội chỉ là phép cộng đơn giản của các cá nhân đơn lẻ',
    ],
    correct: 2,
    explanation:
      'Quan hệ biện chứng: cá nhân tồn tại và phát triển đầy đủ trong lòng xã hội; xã hội được tạo thành từ các cá nhân. Cá nhân mang tính xã hội; xã hội tồn tại và vận động qua hoạt động của cá nhân. Hai mặt này không thể tách rời nhau.',
  },
];

type AnswerMap = Record<number, number>;

export default function MiniQuiz() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const score = QUESTIONS.filter((q, idx) => answers[idx] === q.correct).length;
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;
  const q = QUESTIONS[currentQ];

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
  };

  const scoreMsg =
    score === 4 ? '🎉 Xuất sắc! Bạn nắm vững triết học Mác–Lênin!' :
    score === 3 ? '👏 Tốt lắm! Bạn hiểu hầu hết các khái niệm.' :
    score === 2 ? '📚 Khá ổn. Hãy ôn lại một số phần.' :
                  '💪 Hãy đọc lại bài học và thử lại nhé!';

  return (
    <section id="section-quiz" className="py-20 lg:py-32 bg-gradient-to-b from-[#F0F2F5] to-bg">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <AnimatedView className="text-center mb-12">
          <p className="section-eyebrow mb-4">Phần 06 · Trắc nghiệm</p>
          <h2
            className="font-serif font-bold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Kiểm tra kiến thức
          </h2>
          <p className="text-body/60 max-w-xl mx-auto mt-4 text-base md:text-lg lg:text-xl leading-relaxed">
            {submitted
              ? `Bạn đã trả lời đúng ${score}/${QUESTIONS.length} câu.`
              : 'Hãy trả lời 4 câu hỏi dưới đây để tự kiểm tra mức độ hiểu bài.'}
          </p>
          <div className="w-16 h-0.5 mx-auto mt-6 bg-gradient-to-r from-navy to-dred" />
        </AnimatedView>

        {/* ── QUIZ MODE ───────────────────────────────────────── */}
        {!submitted ? (
          <div className="max-w-4xl mx-auto">
            {/* Progress pills */}
            <div className="flex gap-2 mb-8 justify-center flex-wrap">
              {QUESTIONS.map((_, i) => (
                <button
                  key={i}
                  id={`quiz-q-btn-${i}`}
                  onClick={() => setCurrentQ(i)}
                  className={`w-11 h-11 lg:w-12 lg:h-12 rounded-xl font-bold text-sm transition-all duration-200 border-2 ${
                    i === currentQ
                      ? 'bg-navy text-white border-navy scale-110 shadow-lg'
                      : answers[i] !== undefined
                      ? 'bg-navy/15 text-navy border-navy/30'
                      : 'bg-white text-body/50 border-navy/15 hover:border-navy/40'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="glass-card rounded-3xl p-8 md:p-10 lg:p-14"
              >
                <p className="section-eyebrow text-navy mb-4">
                  Câu {currentQ + 1} / {QUESTIONS.length}
                </p>
                <h3
                  className="font-serif font-bold text-navy mb-8 leading-snug"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
                >
                  {q.question}
                </h3>

                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const selected = answers[currentQ] === i;
                    return (
                      <motion.button
                        key={i}
                        id={`quiz-q${currentQ}-opt${i}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(currentQ, i)}
                        className={`w-full flex items-center gap-4 text-left px-5 py-4 lg:px-7 lg:py-5 rounded-2xl border-2 transition-all duration-200 ${
                          selected
                            ? 'border-navy bg-navy text-white shadow-xl'
                            : 'border-navy/12 bg-white/70 hover:border-navy/35 hover:bg-white text-body'
                        }`}
                      >
                        <span
                          className={`w-8 h-8 lg:w-9 lg:h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                            selected ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'
                          }`}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm md:text-base lg:text-lg leading-snug">{opt}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="mt-8 flex gap-3 justify-between items-center pt-6 border-t border-navy/10">
                  <button
                    onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                    disabled={currentQ === 0}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-navy/20 text-navy font-semibold text-sm lg:text-base disabled:opacity-25 hover:bg-navy/5 transition-colors"
                  >
                    <ChevronLeft size={18} /> Trước
                  </button>

                  {currentQ < QUESTIONS.length - 1 ? (
                    <button
                      onClick={() => setCurrentQ(currentQ + 1)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-white font-semibold text-sm lg:text-base hover:bg-navy-light transition-colors"
                    >
                      Tiếp theo <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button
                      id="quiz-submit-btn"
                      onClick={handleSubmit}
                      disabled={!allAnswered}
                      className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-navy to-dred text-white font-bold text-sm lg:text-base disabled:opacity-35 hover:shadow-xl transition-all duration-300"
                    >
                      Nộp bài <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* ── RESULTS MODE ──────────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Score card */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 16 }}
                className="inline-flex items-center justify-center w-32 h-32 rounded-3xl mb-6 bg-gradient-to-br from-navy to-dred shadow-2xl"
              >
                <Trophy size={52} className="text-beige" />
              </motion.div>
              <h3 className="font-serif font-bold text-navy" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                {score}
                <span className="text-body/30 font-sans" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}>
                  /{QUESTIONS.length}
                </span>
              </h3>
              <p className="text-body/60 mt-3 text-lg lg:text-xl">{scoreMsg}</p>
            </div>

            {/* Answer review */}
            <div className="space-y-5">
              {QUESTIONS.map((question, qIdx) => {
                const userAns = answers[qIdx];
                const isCorrect = userAns === question.correct;
                return (
                  <motion.div
                    key={qIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIdx * 0.1 }}
                    className={`rounded-2xl p-7 lg:p-10 border-2 ${
                      isCorrect
                        ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50/50'
                        : 'border-red-200 bg-gradient-to-br from-red-50 to-rose-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle size={26} className="text-green-600" />
                        ) : (
                          <XCircle size={26} className="text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif font-bold text-navy text-base lg:text-xl mb-5 leading-snug">
                          {question.question}
                        </p>

                        <div className="space-y-2 mb-5">
                          {question.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`px-4 py-3 rounded-xl text-sm lg:text-base transition-colors ${
                                i === question.correct
                                  ? 'bg-green-100 text-green-800 font-semibold'
                                  : i === userAns && !isCorrect
                                  ? 'bg-red-100 text-red-600 line-through opacity-75'
                                  : 'text-body/45'
                              }`}
                            >
                              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                              {opt}
                            </div>
                          ))}
                        </div>

                        <div className="p-4 lg:p-5 rounded-xl bg-navy/6 border-l-4 border-navy">
                          <p className="text-sm lg:text-base text-body/80 leading-relaxed">
                            <strong className="text-navy">Giải thích: </strong>
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Reset button */}
            <div className="mt-10 text-center">
              <motion.button
                id="quiz-reset-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-navy text-white font-bold text-base lg:text-xl hover:bg-navy-light transition-colors shadow-xl"
              >
                <RotateCcw size={22} />
                Làm lại bài trắc nghiệm
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
