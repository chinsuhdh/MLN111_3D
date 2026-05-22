import { ReactNode, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 h-[5px] z-[9999] origin-left w-full"
      style={{ scaleX, background: 'linear-gradient(90deg, #1E3A5F, #8B1E3F, #D4A373)' }}
    />
  );
}

const NAV_LINKS = [
  { href: '#section-canhan-xahoi', label: 'Cá nhân & Xã hội' },
  { href: '#section-quanchung',    label: 'Quần chúng'        },
  { href: '#section-hcm',          label: 'Tư tưởng HCM'     },
  { href: '#section-dang',         label: 'Quan điểm Đảng'   },
  { href: '#section-mindmap',      label: 'Sơ đồ tư duy'     },
  { href: '#section-quiz',         label: 'Trắc nghiệm'      },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 130;
        if (window.scrollY >= top) current = section.getAttribute('id') || '';
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = (href: string) => {
    const isActive = activeSection === href.replace('#', '');
    return `px-4 py-2.5 2xl:px-6 2xl:py-3.5 rounded-xl text-base 2xl:text-xl font-medium transition-all duration-200 ${
      isActive ? 'text-navy font-semibold bg-navy/8' : 'text-body hover:text-navy hover:bg-navy/6'
    }`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-[14px] bg-bg/93 border-b border-navy/10 shadow-sm'
          : 'backdrop-blur-[8px] bg-bg/75'
      }`}
    >
      {/* Full-width container — no max-w constraint */}
      <div className="w-full max-w-none px-6 md:px-16 2xl:px-28">
        <div className="flex items-center justify-between h-20 lg:h-24 2xl:h-28">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 2xl:gap-5 group flex-shrink-0">
            <span className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-navy to-dred shadow-lg flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3" fill="white" opacity="0.95" />
                <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />
              </svg>
            </span>
            <div>
              <p className="font-serif font-bold text-navy text-xl 2xl:text-3xl leading-tight group-hover:text-dred transition-colors duration-200">
                Tư Tưởng
              </p>
              <p className="font-sans font-medium text-body/50 text-sm 2xl:text-lg">
                Học Thuật · Mác–Lênin
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1 2xl:gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={linkClass(href)}>{label}</a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Mở menu"
            className="lg:hidden p-3 rounded-xl hover:bg-navy/8 transition-colors"
          >
            <svg width="28" height="28" fill="none" stroke="#1E3A5F" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="7"  x2="25" y2="7"  />
              <line x1="3" y1="14" x2="25" y2="14" />
              <line x1="3" y1="21" x2="25" y2="21" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden border-t border-navy/10 overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2 bg-white/96 backdrop-blur-xl">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 rounded-xl text-xl font-medium text-body hover:text-navy hover:bg-navy/6 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-20 2xl:py-32 bg-navy-dark">
      {/* Full-width — no max-w constraint */}
      <div className="w-full max-w-none px-6 md:px-16 2xl:px-28 text-center">
        <div className="flex items-center justify-center gap-4 mb-8 2xl:mb-12">
          <span
            className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(212,163,115,0.3), rgba(139,30,63,0.3))' }}
          >
            <svg width="22" height="22" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="3" fill="#D4A373" opacity="0.9" />
              <circle cx="7" cy="7" r="6" stroke="#D4A373" strokeWidth="1" opacity="0.4" fill="none" />
            </svg>
          </span>
          <span className="font-serif font-bold text-white text-3xl 2xl:text-5xl">Tư Tưởng Học Thuật</span>
        </div>

        <blockquote className="max-w-4xl mx-auto mb-12 2xl:mb-16">
          <p className="font-serif italic text-white/70 text-2xl 2xl:text-4xl leading-relaxed">
            "Không có gì quý hơn độc lập, tự do."
          </p>
          <cite className="block mt-4 not-italic font-sans text-sm 2xl:text-lg font-bold tracking-widest uppercase text-beige opacity-70">
            — Hồ Chí Minh
          </cite>
        </blockquote>

        <div
          className="w-28 h-px mx-auto mb-12"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,163,115,0.5), transparent)' }}
        />

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-white/40 text-base 2xl:text-xl hover:text-beige transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="text-white/25 text-sm 2xl:text-base leading-relaxed">
          &copy; 2025 · Triết học Mác – Lênin &amp; Tư tưởng Hồ Chí Minh · Cống hiến cho sự nghiệp nghiên cứu học thuật
        </p>
        <p className="text-white/15 text-xs 2xl:text-sm mt-2">Viện Triết Học · Thư viện số &amp; Liên hệ tổ chức</p>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col font-sans antialiased text-body">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 pt-20 lg:pt-24 2xl:pt-28">
        {children}
      </main>
      <Footer />
    </div>
  );
}