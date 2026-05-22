import AnimatedView from './AnimatedView';

export default function MindMap() {
  return (
    <section id="section-mindmap" className="py-20 lg:py-32 bg-gradient-to-b from-[#F0F2F5] to-bg">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section header */}
        <AnimatedView className="text-center mb-12 lg:mb-16">
          <p className="section-eyebrow mb-4">Phần 05 · Sơ đồ tư duy</p>
          <h2
            className="font-serif font-bold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Mạng lưới Khái niệm
          </h2>
          <p className="text-body/60 max-w-2xl mx-auto mt-4 text-base md:text-lg lg:text-xl leading-relaxed">
            Biểu đồ tương quan giữa các khái niệm trung tâm trong triết học Mác–Lênin về con người.
          </p>
          <div className="w-16 h-0.5 mx-auto mt-6 bg-gradient-to-r from-navy to-dred" />
        </AnimatedView>

        {/* Diagram container */}
        <AnimatedView delay={0.2}>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#152B47] p-6 lg:p-12 shadow-2xl border border-white/10">
            {/* Compatibility badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/40 text-xs font-medium">
              SVG · Sẵn sàng cho ReactFlow
            </div>

            <svg
              viewBox="0 0 960 620"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              aria-label="Sơ đồ mạng lưới khái niệm triết học Mác–Lênin"
            >
              <defs>
                <pattern id="mm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0L0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </pattern>
                <radialGradient id="mm-center" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A52348" />
                  <stop offset="100%" stopColor="#6D1832" />
                </radialGradient>
                <radialGradient id="mm-navy" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#2A4F80" />
                  <stop offset="100%" stopColor="#1E3A5F" />
                </radialGradient>
                <radialGradient id="mm-beige" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#E0BF9A" />
                  <stop offset="100%" stopColor="#C49A6C" />
                </radialGradient>
                <filter id="mm-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="mm-glow-soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background grid */}
              <rect width="960" height="620" fill="url(#mm-grid)" />

              {/* ── SECONDARY OUTER LINKS (light, background) ─────── */}
              <line x1="480" y1="130" x2="760" y2="310" stroke="#8B1E3F" strokeWidth="1" strokeDasharray="5 7" opacity="0.2" />
              <line x1="760" y1="310" x2="480" y2="490" stroke="#8B1E3F" strokeWidth="1" strokeDasharray="5 7" opacity="0.2" />
              <line x1="480" y1="490" x2="200" y2="310" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="5 7" opacity="0.2" />
              <line x1="200" y1="310" x2="480" y2="130" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="5 7" opacity="0.2" />

              {/* ── PRIMARY LINKS (center → 4 main nodes) ─────────── */}
              {/* → Cá nhân (top) */}
              <line x1="480" y1="310" x2="480" y2="148" stroke="#D4A373" strokeWidth="2.5" strokeDasharray="7 5" opacity="0.6" className="svg-line" />
              {/* → Xã hội (right) */}
              <line x1="480" y1="310" x2="742" y2="310" stroke="#D4A373" strokeWidth="2.5" strokeDasharray="7 5" opacity="0.6" className="svg-line" />
              {/* → Quần chúng (bottom) */}
              <line x1="480" y1="310" x2="480" y2="472" stroke="#D4A373" strokeWidth="2.5" strokeDasharray="7 5" opacity="0.6" className="svg-line" />
              {/* → Lãnh tụ (left) */}
              <line x1="480" y1="310" x2="218" y2="310" stroke="#D4A373" strokeWidth="2.5" strokeDasharray="7 5" opacity="0.6" className="svg-line" />

              {/* ── TERTIARY LINKS (main nodes → sub-nodes) ───────── */}
              {/* Cá nhân subs */}
              <line x1="480" y1="102" x2="330" y2="52" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 5" />
              <line x1="480" y1="102" x2="630" y2="52" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 5" />
              {/* Xã hội subs */}
              <line x1="788" y1="310" x2="890" y2="190" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 5" />
              <line x1="788" y1="310" x2="890" y2="430" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 5" />
              {/* Lãnh tụ subs */}
              <line x1="172" y1="310" x2="70" y2="190" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 5" />
              <line x1="172" y1="310" x2="70" y2="430" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 5" />
              {/* Quần chúng subs */}
              <line x1="480" y1="518" x2="360" y2="585" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 5" />
              <line x1="480" y1="518" x2="600" y2="585" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 5" />

              {/* ── CENTER NODE — Con Người / HCM ─────────────────── */}
              <circle cx="480" cy="310" r="80" fill="url(#mm-center)" filter="url(#mm-glow-soft)" opacity="0.97" />
              <circle cx="480" cy="310" r="80" stroke="#D4A373" strokeWidth="2.5" fill="none" opacity="0.55" />
              <circle cx="480" cy="310" r="68" stroke="#D4A373" strokeWidth="0.8" fill="none" opacity="0.25" />
              <text x="480" y="298" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="800" fill="white" opacity="0.97" letterSpacing="0.5">CON NGƯỜI</text>
              <text x="480" y="316" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#D4A373" opacity="0.9">Tổng hòa các</text>
              <text x="480" y="330" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#D4A373" opacity="0.9">quan hệ xã hội</text>
              {/* Outer pulse ring */}
              <circle cx="480" cy="310" r="88" stroke="#D4A373" strokeWidth="1" fill="none" opacity="0.12" className="svg-node" />

              {/* ── TOP — Cá nhân ─────────────────────────────────── */}
              <circle cx="480" cy="120" r="52" fill="url(#mm-navy)" filter="url(#mm-glow)" opacity="0.97" />
              <circle cx="480" cy="120" r="52" stroke="#D4A373" strokeWidth="1.8" fill="none" opacity="0.45" />
              <text x="480" y="114" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="800" fill="white" opacity="0.97">CÁ NHÂN</text>
              <text x="480" y="130" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(255,255,255,0.6)">Individual</text>
              <circle cx="480" cy="120" r="60" stroke="#D4A373" strokeWidth="0.8" fill="none" opacity="0.1" className="svg-node" />

              {/* ── RIGHT — Xã hội ────────────────────────────────── */}
              <circle cx="765" cy="310" r="52" fill="url(#mm-center)" filter="url(#mm-glow)" opacity="0.95" />
              <circle cx="765" cy="310" r="52" stroke="#D4A373" strokeWidth="1.8" fill="none" opacity="0.45" />
              <text x="765" y="304" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="800" fill="white" opacity="0.97">XÃ HỘI</text>
              <text x="765" y="320" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(255,255,255,0.6)">Society</text>

              {/* ── BOTTOM — Quần chúng Nhân dân ─────────────────── */}
              <circle cx="480" cy="500" r="52" fill="url(#mm-navy)" filter="url(#mm-glow)" opacity="0.97" />
              <circle cx="480" cy="500" r="52" stroke="#D4A373" strokeWidth="1.8" fill="none" opacity="0.45" />
              <text x="480" y="491" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9.5" fontWeight="800" fill="white" opacity="0.97">QUẦN CHÚNG</text>
              <text x="480" y="507" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9.5" fontWeight="800" fill="white" opacity="0.97">NHÂN DÂN</text>

              {/* ── LEFT — Lãnh tụ ────────────────────────────────── */}
              <circle cx="195" cy="310" r="52" fill="url(#mm-beige)" filter="url(#mm-glow)" opacity="0.97" />
              <circle cx="195" cy="310" r="52" stroke="#1E3A5F" strokeWidth="1.8" fill="none" opacity="0.45" />
              <text x="195" y="304" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="800" fill="#152B47" opacity="0.97">LÃNH TỤ</text>
              <text x="195" y="320" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(21,43,71,0.65)">Leader</text>

              {/* ── SUB-NODES — Cá nhân ──────────────────────────── */}
              <circle cx="330" cy="48" r="30" fill="rgba(30,58,95,0.75)" stroke="rgba(212,163,115,0.35)" strokeWidth="1.2" />
              <text x="330" y="44" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Bản chất</text>
              <text x="330" y="57" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.9">loài</text>

              <circle cx="630" cy="48" r="30" fill="rgba(30,58,95,0.75)" stroke="rgba(212,163,115,0.35)" strokeWidth="1.2" />
              <text x="630" y="44" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Tính cá</text>
              <text x="630" y="57" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.9">thể</text>

              {/* ── SUB-NODES — Xã hội ───────────────────────────── */}
              <circle cx="890" cy="188" r="30" fill="rgba(139,30,63,0.75)" stroke="rgba(212,163,115,0.35)" strokeWidth="1.2" />
              <text x="890" y="184" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Giai</text>
              <text x="890" y="197" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.9">cấp</text>

              <circle cx="890" cy="432" r="30" fill="rgba(139,30,63,0.75)" stroke="rgba(212,163,115,0.35)" strokeWidth="1.2" />
              <text x="890" y="428" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Nhà</text>
              <text x="890" y="441" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.9">nước</text>

              {/* ── SUB-NODES — Lãnh tụ ──────────────────────────── */}
              <circle cx="70" cy="188" r="30" fill="rgba(212,163,115,0.75)" stroke="rgba(30,58,95,0.35)" strokeWidth="1.2" />
              <text x="70" y="184" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#152B47" opacity="0.95">Định</text>
              <text x="70" y="197" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#152B47" opacity="0.95">hướng</text>

              <circle cx="70" cy="432" r="30" fill="rgba(212,163,115,0.75)" stroke="rgba(30,58,95,0.35)" strokeWidth="1.2" />
              <text x="70" y="428" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#152B47" opacity="0.95">Tổ</text>
              <text x="70" y="441" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#152B47" opacity="0.95">chức</text>

              {/* ── SUB-NODES — Quần chúng ───────────────────────── */}
              <circle cx="360" cy="585" r="30" fill="rgba(30,58,95,0.75)" stroke="rgba(212,163,115,0.35)" strokeWidth="1.2" />
              <text x="360" y="581" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="600" fill="white" opacity="0.9">Lực lượng</text>
              <text x="360" y="594" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="600" fill="white" opacity="0.9">sản xuất</text>

              <circle cx="600" cy="585" r="30" fill="rgba(30,58,95,0.75)" stroke="rgba(212,163,115,0.35)" strokeWidth="1.2" />
              <text x="600" y="581" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="600" fill="white" opacity="0.9">CM</text>
              <text x="600" y="594" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="600" fill="white" opacity="0.9">Xã hội</text>

              {/* Decorative floating particles */}
              <circle cx="155" cy="120" r="3.5" fill="#D4A373" opacity="0.45" className="svg-node" style={{ animationDelay: '0.4s' }} />
              <circle cx="810" cy="130" r="3" fill="#8B1E3F" opacity="0.4" className="svg-node" style={{ animationDelay: '1.1s' }} />
              <circle cx="840" cy="480" r="4" fill="#1E3A5F" opacity="0.4" className="svg-node" style={{ animationDelay: '1.8s' }} />
              <circle cx="120" cy="490" r="3.5" fill="#D4A373" opacity="0.4" className="svg-node" style={{ animationDelay: '0.7s' }} />
              <circle cx="480" cy="40" r="3" fill="#8B1E3F" opacity="0.35" className="svg-node" style={{ animationDelay: '1.4s' }} />
            </svg>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {[
                { color: 'bg-gradient-to-br from-[#2A4F80] to-[#1E3A5F]', label: 'Cá nhân · Quần chúng Nhân dân' },
                { color: 'bg-gradient-to-br from-[#A52348] to-[#6D1832]', label: 'Xã hội · Con người (trung tâm)' },
                { color: 'bg-gradient-to-br from-[#E0BF9A] to-[#C49A6C]', label: 'Lãnh tụ' },
                { color: 'border-2 border-dashed border-beige/50 bg-transparent', label: 'Quan hệ biện chứng' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${color}`} />
                  <span className="text-white/55 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedView>
      </div>
    </section>
  );
}
