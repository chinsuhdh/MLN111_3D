import AnimatedView from './AnimatedView';
import Tooltip from './Tooltip';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center py-16 2xl:py-24 overflow-hidden"
    >
      {/* Full-width — no max-w container */}
      <div className="w-full max-w-none px-6 md:px-16 2xl:px-28">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 2xl:gap-28 items-center">

          {/* ── Left column: Text ──────────────────────────────────── */}
          <AnimatedView>
            {/* Eyebrow */}
            <p className="section-eyebrow text-base md:text-lg 2xl:text-xl mb-6 md:mb-8">
              Triết học Mác – Lênin · Tư tưởng Hồ Chí Minh
            </p>

            {/* Main heading — aggressive TV scale */}
            <h1
              className="font-serif font-bold leading-[1.05] mb-8 md:mb-10 2xl:mb-14 text-navy
                         text-5xl md:text-6xl 2xl:text-8xl"
            >
              CON NGƯỜI
              <br />
              <span className="hero-title-accent">TRONG TRIẾT HỌC</span>
              <br />
              <span className="text-navy">MÁC – LÊNIN &amp;</span>
              <br />
              <em className="font-serif italic text-dred">Tư tưởng Hồ Chí Minh</em>
            </h1>

            {/* Description */}
            <p className="leading-relaxed text-body/70 mb-10 md:mb-12 2xl:mb-16
                          text-xl md:text-2xl 2xl:text-3xl max-w-3xl">
              Nghiên cứu toàn diện về quan niệm con người — từ{' '}
              <Tooltip
                term="Bản thể luận"
                definition="Ngành triết học nghiên cứu bản chất của tồn tại. Trong triết học Mác, bản thể luận duy vật khẳng định vật chất là nền tảng của mọi thực tại, con người được quy định bởi tồn tại xã hội."
              >
                bản chất xã hội
              </Tooltip>
              , quan hệ{' '}
              <Tooltip
                term="Tất yếu lịch sử"
                definition="Quy luật khách quan trong sự phát triển xã hội — những điều kiện lịch sử nhất định tất yếu dẫn đến những kết quả nhất định, không phụ thuộc vào ý chí chủ quan của cá nhân."
              >
                cá nhân–xã hội
              </Tooltip>{' '}
              đến vai trò quần chúng nhân dân và lãnh tụ trong lịch sử.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 pl-6 2xl:pl-8 mb-12 2xl:mb-16 border-beige">
              <p className="font-serif italic text-body/60 leading-relaxed text-xl md:text-2xl 2xl:text-3xl">
                "Con người là tổng hòa của các quan hệ xã hội."
              </p>
              <cite className="block mt-3 not-italic font-sans font-bold text-dred tracking-wider uppercase text-base md:text-lg 2xl:text-xl">
                — Karl Marx
              </cite>
            </blockquote>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-14 md:mb-16 2xl:mb-20">
              <a
                href="#section-canhan-xahoi"
                className="inline-flex items-center justify-center gap-3
                           px-8 py-5 md:px-10 md:py-6 2xl:px-14 2xl:py-8
                           rounded-2xl font-semibold text-white transition-all duration-300
                           hover:shadow-2xl hover:-translate-y-1
                           bg-gradient-to-br from-navy to-navy-light
                           text-lg md:text-xl 2xl:text-2xl"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
                Khám phá nội dung
              </a>
              <a
                href="#section-hcm"
                className="inline-flex items-center justify-center gap-3
                           px-8 py-5 md:px-10 md:py-6 2xl:px-14 2xl:py-8
                           rounded-2xl font-semibold transition-all duration-300
                           hover:shadow-xl hover:-translate-y-1
                           text-dred border-2 border-dred bg-transparent hover:bg-dred/5
                           text-lg md:text-xl 2xl:text-2xl"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Tư tưởng Hồ Chí Minh
              </a>
            </div>

            {/* Stats bar */}
            <div className="pt-8 2xl:pt-12 border-t border-navy/10 grid grid-cols-3 gap-8 md:gap-12 2xl:gap-20">
              {[
                { value: '4',  label: 'Chủ đề lớn',        color: 'text-navy'  },
                { value: '12', label: 'Luận điểm',         color: 'text-dred'  },
                { value: '∞',  label: 'Giá trị thực tiễn', color: 'text-beige' },
              ].map(({ value, label, color }) => (
                <div key={label}>
                  <p className={`font-serif font-bold ${color} text-5xl md:text-6xl 2xl:text-8xl leading-none`}>
                    {value}
                  </p>
                  <p className="text-body/50 font-medium mt-2 text-base md:text-lg 2xl:text-xl">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedView>

          {/* ── Right column: SVG diagram ──────────────────────────── */}
          <AnimatedView delay={0.25} direction="left" className="flex items-center justify-center">
            <div className="relative w-full mx-auto">
              {/* Glow orbs */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 2xl:w-[600px] 2xl:h-[600px] rounded-full opacity-10 bg-[radial-gradient(circle,rgba(30,58,95,0.2)_0%,transparent_70%)]" />
              </div>
              <div className="absolute top-8 right-8 w-48 h-48 2xl:w-72 2xl:h-72 rounded-full opacity-10 pointer-events-none bg-[radial-gradient(circle,rgba(139,30,63,0.4)_0%,transparent_70%)]" />

              <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-2xl"
                aria-label="Biểu đồ tương quan con người và xã hội"
              >
                <defs>
                  <radialGradient id="hero-core-grad" cx="40%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#2A4F80" />
                    <stop offset="100%" stopColor="#1E3A5F" />
                  </radialGradient>
                </defs>

                <circle cx="200" cy="200" r="175" stroke="#1E3A5F" strokeWidth="0.5" strokeDasharray="8 6" opacity="0.18" />
                <circle cx="200" cy="200" r="145" stroke="#8B1E3F" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.12" />
                <circle cx="200" cy="200" r="110" stroke="#1E3A5F" strokeWidth="1"   strokeDasharray="2 5" opacity="0.15" />

                <circle cx="200" cy="200" r="42" fill="url(#hero-core-grad)" opacity="0.95" />
                <circle cx="200" cy="200" r="42" stroke="#1E3A5F" strokeWidth="1.5" opacity="0.4" fill="none" />
                <circle cx="200" cy="186" r="10" fill="white" opacity="0.9" />
                <path d="M185 215 Q200 205 215 215" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />

                <circle cx="200" cy="52"  r="18" fill="#1E3A5F" opacity="0.9" />
                <circle cx="200" cy="52"  r="18" stroke="#D4A373" strokeWidth="1.5" fill="none" opacity="0.6" />
                <text x="200" y="57" textAnchor="middle" fontFamily="Inter" fontSize="9" fontWeight="600" fill="white" opacity="0.9">Cá nhân</text>

                <circle cx="340" cy="290" r="18" fill="#8B1E3F" opacity="0.9" />
                <circle cx="340" cy="290" r="18" stroke="#D4A373" strokeWidth="1.5" fill="none" opacity="0.6" />
                <text x="340" y="295" textAnchor="middle" fontFamily="Inter" fontSize="9" fontWeight="600" fill="white" opacity="0.9">Xã hội</text>

                <circle cx="60"  cy="290" r="18" fill="#2A4F80" opacity="0.9" />
                <circle cx="60"  cy="290" r="18" stroke="#D4A373" strokeWidth="1.5" fill="none" opacity="0.6" />
                <text x="60"  y="295" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Nhân dân</text>

                <circle cx="370" cy="140" r="14" fill="#8B1E3F" opacity="0.7" />
                <text x="370" y="145" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="white" opacity="0.9">Giai cấp</text>

                <circle cx="30"  cy="140" r="14" fill="#1E3A5F" opacity="0.7" />
                <text x="30"  y="145" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="white" opacity="0.9">Lịch sử</text>

                <circle cx="200" cy="356" r="14" fill="#D4A373" opacity="0.85" />
                <text x="200" y="361" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="#1E3A5F" opacity="0.95">Hạnh phúc</text>

                <line x1="200" y1="158" x2="200" y2="70"  stroke="#1E3A5F" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.35" className="svg-line" />
                <line x1="228" y1="228" x2="326" y2="278" stroke="#8B1E3F" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.35" className="svg-line" />
                <line x1="172" y1="228" x2="76"  y2="278" stroke="#2A4F80" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.35" className="svg-line" />
                <line x1="240" y1="188" x2="357" y2="148" stroke="#8B1E3F" strokeWidth="1"   strokeDasharray="3 4" opacity="0.25" />
                <line x1="160" y1="188" x2="43"  y2="148" stroke="#1E3A5F" strokeWidth="1"   strokeDasharray="3 4" opacity="0.25" />
                <line x1="200" y1="242" x2="200" y2="342" stroke="#D4A373" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" className="svg-line" />

                <line x1="214" y1="65"  x2="325" y2="276" stroke="#1E3A5F" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.14" />
                <line x1="186" y1="65"  x2="75"  y2="276" stroke="#8B1E3F" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.14" />
                <line x1="322" y1="280" x2="75"  y2="280" stroke="#D4A373" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.18" />

                <circle cx="155" cy="120" r="3.5" fill="#D4A373" opacity="0.55" className="svg-node" style={{ animationDelay: '0.5s' }} />
                <circle cx="265" cy="108" r="3"   fill="#8B1E3F" opacity="0.5"  className="svg-node" style={{ animationDelay: '1s'   }} />
                <circle cx="310" cy="210" r="4"   fill="#1E3A5F" opacity="0.45" className="svg-node" style={{ animationDelay: '1.5s' }} />
                <circle cx="95"  cy="225" r="3.5" fill="#D4A373" opacity="0.5"  className="svg-node" style={{ animationDelay: '0.8s' }} />
                <circle cx="138" cy="315" r="3"   fill="#8B1E3F" opacity="0.45" className="svg-node" style={{ animationDelay: '1.3s' }} />
                <circle cx="262" cy="320" r="3"   fill="#1E3A5F" opacity="0.4"  className="svg-node" style={{ animationDelay: '0.3s' }} />

                <path d="M20  20  Q20  35  35  35"  stroke="#1E3A5F" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2" />
                <path d="M380 20  Q380 35  365 35"  stroke="#8B1E3F" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2" />
                <path d="M20  380 Q20  365 35  365" stroke="#D4A373" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
                <path d="M380 380 Q380 365 365 365" stroke="#1E3A5F" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2" />
              </svg>

              <p className="text-center text-body/40 mt-5 font-medium uppercase tracking-widest text-sm md:text-base 2xl:text-lg">
                Mạng lưới quan hệ Con người – Xã hội – Lịch sử
              </p>
            </div>
          </AnimatedView>

        </div>
      </div>
    </section>
  );
}