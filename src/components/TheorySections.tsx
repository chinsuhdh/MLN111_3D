'use client';

import React, { useContext, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS } from '../hooks/usePhilosophyScroll';

export interface ContentBlock {
  type: 'heading' | 'body' | 'quote' | 'bullet-list' | 'highlight' | 'numbered-list';
  label?: string;
  text?: string;
  items?: string[];
  html?: string;
}

export interface PlanetTheoryHUDProps {
  sectionIdx: number;
  title: string;
  eyebrow: string;
  accentColor: string;
  subtitle?: string;
  coords?: { lat: string; lon: string; alt: string };
  blocks: ContentBlock[];
}

const VISUALS = {
  SHADOW_NARRATIVE: '0 2px 10px rgba(0,0,0,0.95), 0 8px 30px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.12)',
  SHADOW_BODY: '0 2px 8px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.6)',
  FONT_DISPLAY: 'var(--font-display)',
  FONT_BODY: 'var(--font-body)',
};

const TYPOGRAPHY = {
  title: 'clamp(1.4rem, 4vh, 4rem)', 
  eyebrow: 'clamp(0.55rem, 1vh, 0.9rem)',
};

const ANIMATION = {
  duration: 0.55,
  titleDuration: 0.6,
  staggerDelay: 0.07,
  easeOut: 'easeOut' as const,
  cinematicEase: [0.22, 0.68, 0, 1.1] as [number, number, number, number],
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

// Cập nhật lại logic Trái/Phải theo index mới
function isRightSide(sectionIdx: number): boolean {
  return sectionIdx === 2 || sectionIdx === 3 || sectionIdx === 6 || sectionIdx === 7;
}

const RenderBlock = React.memo(function RenderBlock({ 
  block, accentColor, index 
}: { 
  block: ContentBlock; accentColor: string; index: number 
}) {
  const delay = 0.1 + index * ANIMATION.staggerDelay;

  const labelStyle = useMemo(() => ({
    color: `${accentColor}dd`,
    fontFamily: VISUALS.FONT_BODY,
    textShadow: `0 0 12px ${accentColor}60`,
  }), [accentColor]);

  const bodyStyle = useMemo(() => ({
    textShadow: VISUALS.SHADOW_BODY,
    fontFamily: VISUALS.FONT_BODY,
  }), []);

  switch (block.type) {
    case 'heading':
      return (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: ANIMATION.duration, ease: ANIMATION.easeOut }} className="pt-[1vh]">
          {block.label && <p className="mb-[0.5vh] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]" style={{ ...labelStyle, textShadow: `0 0 16px ${accentColor}80` }}>▸ {block.label}</p>}
          <h3 className="text-[clamp(1.1rem,2.5vh,1.75rem)] font-semibold leading-snug text-white" style={{ fontFamily: VISUALS.FONT_DISPLAY, textShadow: VISUALS.SHADOW_NARRATIVE }}>{block.text}</h3>
          <div className="mt-[0.8vh] h-px w-12 md:w-16" style={{ background: `linear-gradient(90deg, ${accentColor}90, transparent)` }} />
        </motion.div>
      );

    case 'body':
      return (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: ANIMATION.duration }} className="text-[clamp(0.85rem,1.6vh,1.15rem)] leading-relaxed text-white/80" style={bodyStyle} dangerouslySetInnerHTML={{ __html: block.html ?? block.text ?? '' }} />
      );

    case 'quote':
      return (
        <motion.blockquote initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: ANIMATION.duration }} className="pl-4 md:pl-5 py-[0.5vh]" style={{ borderLeft: `3px solid ${accentColor}60` }}>
          <p className="italic text-[clamp(0.85rem,1.6vh,1.15rem)] leading-relaxed text-white/70" style={{ fontFamily: VISUALS.FONT_DISPLAY, textShadow: VISUALS.SHADOW_NARRATIVE }}>"{block.text}"</p>
          {block.label && <cite className="block mt-[0.8vh] not-italic text-[10px] md:text-xs font-bold tracking-wider uppercase" style={{ color: `${accentColor}aa`, textShadow: `0 0 10px ${accentColor}50` }}>— {block.label}</cite>}
        </motion.blockquote>
      );

    case 'bullet-list':
      return (
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: ANIMATION.duration }} className="space-y-[0.8vh] md:space-y-[1.2vh]">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 md:gap-3">
              <span className="mt-[0.5vh] md:mt-[0.6vh] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0" style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}cc` }} />
              <span className="text-[clamp(0.85rem,1.6vh,1.15rem)] text-white/75 leading-relaxed" style={bodyStyle} dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </motion.ul>
      );

    case 'numbered-list':
      return (
        <motion.ol initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: ANIMATION.duration }} className="space-y-[0.8vh] md:space-y-[1.2vh]">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 md:gap-3">
              <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs md:text-sm font-bold" style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}`, fontFamily: VISUALS.FONT_BODY }}>{i + 1}</span>
              <span className="text-[clamp(0.85rem,1.6vh,1.15rem)] text-white/75 leading-relaxed" style={bodyStyle} dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </motion.ol>
      );

    case 'highlight':
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: ANIMATION.duration }} className="pl-4 md:pl-5 py-[0.2vh]" style={{ borderLeft: `3px solid ${accentColor}50` }}>
          {block.label && <p className="mb-[0.5vh] text-[10px] md:text-xs font-bold uppercase tracking-[0.18em]" style={labelStyle}>{block.label}</p>}
          <p className="text-[clamp(0.85rem,1.6vh,1.15rem)] text-white/75 leading-relaxed" style={bodyStyle} dangerouslySetInnerHTML={{ __html: block.html ?? block.text ?? '' }} />
        </motion.div>
      );

    default:
      return null;
  }
});

interface TheoryContentProps extends Omit<PlanetTheoryHUDProps, 'sectionIdx'> {
  alignRight: boolean;
}

const TheoryContent = React.memo(function TheoryContent({
  title, eyebrow, accentColor, subtitle, coords, blocks, alignRight
}: TheoryContentProps) {
  
  const titleGlow = useMemo(() => `0 0 24px rgba(255,255,255,0.22), 0 0 60px ${accentColor}20, 0 4px 16px rgba(0,0,0,0.95)`, [accentColor]);

  return (
    <div className={`w-full max-w-xl mx-auto py-[2vh] lg:py-[3vh] pointer-events-auto ${alignRight ? 'lg:ml-auto lg:mr-0' : 'lg:mx-0'}`}>
      <motion.p
        className="section-eyebrow mb-[1vh]"
        style={{ color: accentColor, textShadow: `0 0 18px ${accentColor}90`, fontSize: TYPOGRAPHY.eyebrow, letterSpacing: '0.22em' }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.45 }}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        className="font-light leading-[1.1] tracking-tight text-white mb-[1vh]"
        style={{ fontFamily: VISUALS.FONT_DISPLAY, fontSize: TYPOGRAPHY.title, textShadow: titleGlow }}
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: ANIMATION.titleDuration }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-[clamp(0.95rem,2vh,1.35rem)] text-white/55 mb-[2vh] md:mb-[2.5vh] leading-snug"
          style={{ fontFamily: VISUALS.FONT_BODY, textShadow: VISUALS.SHADOW_BODY }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: ANIMATION.duration }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className="mb-[2vh] md:mb-[2.5vh]"
        style={{ height: 1, width: '100%', background: `linear-gradient(90deg, ${accentColor}60, transparent 75%)` }}
        initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.28, duration: ANIMATION.duration, ease: ANIMATION.easeOut }}
      />

      <div className="space-y-[1.5vh] md:space-y-[2vh]">
        {blocks.map((block, i) => (
          <RenderBlock key={i} block={block} accentColor={accentColor} index={i} />
        ))}
      </div>

      <motion.p
        className="mt-[3vh] md:mt-[4vh] text-[9px] md:text-[10px] font-mono text-white/20 tracking-[0.16em] uppercase"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }}
      >
        {coords?.lat} · {coords?.lon} · {coords?.alt}
      </motion.p>
    </div>
  );
});

export function PlanetTheoryHUD({
  sectionIdx,
  title,
  eyebrow,
  accentColor,
  subtitle,
  coords,
  blocks,
}: PlanetTheoryHUDProps) {
  const { scrollProgress } = useContext(PhilosophyScrollContext);
  const isMobile = useIsMobile();

  const s = SECTION_BOUNDS[sectionIdx];
  const opacityIn = Math.min(1, scrollProgress < s.peak ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start)) : 1);
  const opacityOut = scrollProgress > s.exit ? Math.max(0, 1 - (scrollProgress - s.exit) / (s.end - s.exit)) : 1;
  const opacity = Math.min(opacityIn, opacityOut);

  if (opacity < 0.01) return null;

  let yOffset = 0;
  let blurAmount = 0;
  
  if (scrollProgress < s.peak) {
    yOffset = (1 - opacityIn) * 150;
    blurAmount = (1 - opacityIn) * 12;
  } else if (scrollProgress > s.exit) {
    yOffset = (1 - opacityOut) * -150;
    blurAmount = (1 - opacityOut) * 12;
  }

  const isRight = isRightSide(sectionIdx);
  const distanceX = isMobile ? 30 : 80;
  const initX = isRight ? distanceX : -distanceX;

  return (
    <AnimatePresence>
      <motion.div
        key={`hud-${sectionIdx}`}
        className="fixed inset-0 z-10 w-full h-full pointer-events-none"
        style={{ 
          opacity, 
          y: yOffset,
          filter: `blur(${blurAmount}px)`
        }}
        initial={{ x: initX }}
        animate={{ x: 0 }}
        exit={{ x: initX * 0.4 }}
        transition={{ duration: 0.65, ease: ANIMATION.cinematicEase }}
      >
        <div className="w-full h-full grid lg:grid-cols-2">
          
          {!isRight ? (
            <div className="flex flex-col justify-center px-6 md:px-16 lg:pr-24 h-full text-left relative pointer-events-none">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030A14] via-[#030A14]/80 lg:bg-none lg:bg-gradient-to-r lg:from-[#030A14]/90 lg:via-[#030A14]/40 to-transparent -z-10" />
              <TheoryContent alignRight={false} title={title} eyebrow={eyebrow} subtitle={subtitle} blocks={blocks} coords={coords} accentColor={accentColor} />
            </div>
          ) : (
            <div className="hidden lg:block pointer-events-none" />
          )}

          {isRight ? (
            <div className="flex flex-col justify-center px-6 md:px-16 lg:pl-24 h-full text-left relative pointer-events-none">
               <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030A14] via-[#030A14]/80 lg:bg-none lg:bg-gradient-to-l lg:from-[#030A14]/90 lg:via-[#030A14]/40 to-transparent -z-10" />
               <TheoryContent alignRight={true} title={title} eyebrow={eyebrow} subtitle={subtitle} blocks={blocks} coords={coords} accentColor={accentColor} />
            </div>
          ) : (
            <div className="hidden lg:block pointer-events-none" />
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CÁC SECTION NỘI DUNG (Đã lùi index từ 2 -> 9)
// ─────────────────────────────────────────────────────────────────────────────

function SectionCaNhanP1() {
  return (
    <PlanetTheoryHUD
      sectionIdx={2}
      title="Cá Nhân & Xã Hội"
      eyebrow="Phần 01 · Bản Chất Con Người"
      accentColor="#64FFDA"
      subtitle="Sự thống nhất giữa thực thể sinh học và xã hội"
      coords={{ lat: '21.0°N', lon: '105.8°E', alt: '34 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Luận điểm nền tảng',
          text: 'Tổng hòa các quan hệ xã hội',
        },
        {
          type: 'body',
          html: 'Theo triết học Mác - Lênin, con người là một chỉnh thể thống nhất giữa <strong>thực thể sinh học</strong> và <strong>thực thể xã hội</strong>. Bản chất con người không phải là một cái gì đó trừu tượng, cố hữu của cá nhân riêng biệt, mà trong tính hiện thực của nó, bản chất con người là <strong>tổng hòa những quan hệ xã hội</strong>.',
        },
        {
          type: 'highlight',
          label: 'Mối quan hệ tất yếu',
          html: 'Cá nhân và xã hội có mối quan hệ không thể tách rời, là tiền đề và điều kiện tồn tại của nhau. Xã hội do các cá nhân hợp thành, ngược lại, cá nhân chỉ trở thành con người thực sự khi giao tiếp và sống trong các quan hệ xã hội.',
        },
      ]}
    />
  );
}

function SectionCaNhanP2() {
  return (
    <PlanetTheoryHUD
      sectionIdx={3}
      title="Cá Nhân & Xã Hội"
      eyebrow="Phần 01 · Tiếp theo"
      accentColor="#64FFDA"
      subtitle="Tính giai cấp, tính nhân loại & Ý nghĩa phương pháp luận"
      coords={{ lat: '21.0°N', lon: '106.2°E', alt: '31 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Cấu trúc bản chất',
          text: 'Tính giai cấp & Tính nhân loại',
        },
        {
          type: 'body',
          html: 'Trong xã hội có giai cấp, mỗi con người vừa mang <strong>tính nhân loại</strong> (những giá trị chung vĩnh hằng, nền tảng cuộc sống) vừa mang <strong>tính giai cấp</strong> (bị chi phối bởi lợi ích của giai cấp mình thuộc về). Sự thống nhất biện chứng giữa các đặc tính này là động lực của tiến bộ xã hội.',
        },
        {
          type: 'highlight',
          label: '◉ Ý nghĩa phương pháp luận',
          html: 'Khi nhìn nhận con người, phải đặt họ trong bối cảnh lịch sử và tổng thể các mối quan hệ xã hội. Phải tránh hai thái cực sai lầm: <strong>Đề cao cá nhân quá mức</strong> (dẫn đến vị kỷ, chủ nghĩa cá nhân) hoặc <strong>tuyệt đối hóa xã hội</strong> (vùi dập cá tính cá nhân).',
        },
      ]}
    />
  );
}

function SectionQuanChungP1() {
  return (
    <PlanetTheoryHUD
      sectionIdx={4}
      title="Quần Chúng & Lãnh Tụ"
      eyebrow="Phần 02 · Động Lực Lịch Sử"
      accentColor="#D4A373"
      subtitle="Quần chúng nhân dân — Chủ thể sáng tạo chân chính"
      coords={{ lat: '16.0°N', lon: '108.2°E', alt: '44 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Bản chất lịch sử',
          text: 'Sức mạnh quyết định của nhân dân',
        },
        {
          type: 'body',
          html: 'Khác với các quan điểm tôn giáo hay duy tâm, triết học Mác - Lênin khẳng định lịch sử được tạo nên bởi mối quan hệ biện chứng giữa quần chúng nhân dân và lãnh tụ. Trong đó, <strong>quần chúng nhân dân là chủ thể sáng tạo ra lịch sử</strong>.',
        },
        {
          type: 'bullet-list',
          items: [
            '<strong>Lực lượng sản xuất cơ bản:</strong> Sản xuất ra toàn bộ của cải vật chất, là nền tảng tồn tại và phát triển của mọi xã hội.',
            '<strong>Động lực cách mạng:</strong> Là lực lượng quyết định thắng lợi của mọi cuộc cách mạng và những chuyển biến xã hội.',
            '<strong>Sáng tạo văn hóa:</strong> Là người trực tiếp sáng tạo, gạn lọc, lưu giữ và phổ biến các giá trị văn hóa, tinh thần.',
          ],
        },
      ]}
    />
  );
}

function SectionQuanChungP2() {
  return (
    <PlanetTheoryHUD
      sectionIdx={5}
      title="Quần Chúng & Lãnh Tụ"
      eyebrow="Phần 02 · Tiếp theo"
      accentColor="#D4A373"
      subtitle="Vai trò của cá nhân kiệt xuất và bài học hệ quả"
      coords={{ lat: '16.0°N', lon: '107.9°E', alt: '40 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Cá nhân kiệt xuất',
          text: 'Vai trò định hướng của Lãnh tụ',
        },
        {
          type: 'body',
          html: 'Lãnh tụ là những cá nhân kiệt xuất sinh ra từ phong trào quần chúng, có khả năng nhận thức đúng đắn quy luật khách quan của thời đại, từ đó tập hợp, tổ chức, dẫn dắt phong trào đạt được mục tiêu chung.',
        },
        {
          type: 'quote',
          text: 'Trong lịch sử chưa hề có một giai cấp nào giành được quyền thống trị, nếu nó không đào tạo được trong hàng ngũ của mình những lãnh tụ chính trị, những đại biểu tiền phong có đủ khả năng tổ chức và lãnh đạo phong trào.',
          label: 'V.I. Lênin',
        },
        {
          type: 'highlight',
          label: '⇄ Quan hệ biện chứng',
          html: 'Mục đích và lợi ích của quần chúng và lãnh tụ là thống nhất. Quần chúng tạo ra phong trào và sinh ra lãnh tụ, còn lãnh tụ dẫn dắt phong trào đi đến thành công. Tuyệt đối hóa lãnh tụ dẫn đến <strong>sùng bái cá nhân</strong>, tuyệt đối hóa quần chúng sẽ dẫn đến <strong>vô tổ chức, xem nhẹ sáng kiến vĩ đại</strong>.',
        },
      ]}
    />
  );
}

function SectionCaseStudyP1() {
  return (
    <PlanetTheoryHUD
      sectionIdx={6}
      title="Phân Tích Tình Huống"
      eyebrow="Phần 03 · Case Study CLB Tình Nguyện"
      accentColor="#38BDF8"
      subtitle="Ứng dụng triết học giải mã sự cố của Trưởng nhóm C"
      coords={{ lat: '10.8°N', lon: '106.7°E', alt: '12 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Bối cảnh thực tế',
          text: 'Sự phá vỡ tính thống nhất biện chứng',
        },
        {
          type: 'body',
          html: 'Trong chiến dịch tình nguyện lớn của một CLB sinh viên, Trưởng nhóm C là người nổi tiếng, được xem là "linh hồn" chương trình nhưng lại tự ý quyết định mọi việc vì tin mình có tầm nhìn tốt hơn. Khi chiến dịch gặp sự cố thiếu kinh phí và tổ chức kém, C đổ lỗi cho đội ngũ, còn thành viên cho rằng C độc đoán.',
        },
        {
          type: 'highlight',
          label: '⇄ Lỗi tuyệt đối hóa cá nhân',
          html: 'C đã mắc sai lầm nghiêm trọng khi <strong>tuyệt đối hóa vai trò cá nhân</strong>, đặt mình lên trên tập thể. Triết học Mác - Lênin chỉ rõ: Nếu tách rời cá nhân khỏi quan hệ xã hội, đem cá nhân đối lập với tập thể sẽ dẫn đến hệ lụy thất bại khó lường.',
        },
        {
          type: 'bullet-list',
          items: [
            '<strong>Triệt tiêu động lực tập thể:</strong> Các thành viên CLB là chủ thể trực tiếp đóng góp công sức, vận hành chiến dịch. Khi bị xem nhẹ và chỉ "làm theo lệnh", tính tích cực, sáng tạo của họ bị triệt tiêu.',
            '<strong>Bệnh sùng bái cá nhân:</strong> C tự thần thánh hóa bản thân, tách rời lợi ích và trí tuệ của mình ra khỏi sức mạnh tổng hợp của đội ngũ quần chúng.',
          ],
        },
      ]}
    />
  );
}

function SectionCaseStudyP2() {
  return (
    <PlanetTheoryHUD
      sectionIdx={7}
      title="Giải Pháp Thực Tiễn"
      eyebrow="Phần 03 · Kết Luận Vấn Đề"
      accentColor="#38BDF8"
      subtitle="Xây dựng con người: Năng lực cá nhân và Sức mạnh tập thể"
      coords={{ lat: '10.8°N', lon: '107.1°E', alt: '10 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Mô hình ứng dụng',
          text: 'Giải pháp cân bằng Đức - Tài',
        },
        {
          type: 'numbered-list',
          items: [
            '<strong>Hài hòa lợi ích:</strong> Xây dựng lối sống "mỗi người vì mọi người, mọi người vì mỗi người". Năng lực xuất sắc của cá nhân (Tài) phải đi kèm với ý thức tôn trọng tập thể (Đức).',
            '<strong>Thực hành tự phê bình:</strong> Thường xuyên lắng nghe phản hồi, tổ chức các buổi họp dân chủ để loại bỏ thói kiêu ngạo độc đoán, nhận thức rõ mọi thành quả đều kết tinh từ trí tuệ tập thể.',
            '<strong>Cơ chế dân chủ (Empowerment):</strong> Sẵn sàng phân quyền, khơi dậy tinh thần làm chủ và sức sáng tạo của từng thành viên trong tổ chức.',
          ],
        },
        {
          type: 'highlight',
          label: '◉ Bài học rút ra',
          html: 'Quần chúng luôn là "người thầy vĩ đại". Lãnh tụ chỉ là sản phẩm của phong trào. Chiến dịch của C thất bại vì C quên mất rằng: <strong>Lãnh tụ là người dẫn đường, nhưng chính tập thể mới là người hiện thực hóa mục tiêu.</strong>',
        },
      ]}
    />
  );
}

function SectionVietNamP1() {
  return (
    <PlanetTheoryHUD
      sectionIdx={8}
      title="Tư Tưởng Hồ Chí Minh"
      eyebrow="Phần 04 · Thực Tiễn Việt Nam"
      accentColor="#EF4444"
      subtitle="Con người vừa là mục tiêu, vừa là động lực cách mạng"
      coords={{ lat: '21.0°N', lon: '105.8°E', alt: '5 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Triết lý cốt lõi',
          text: 'Giải phóng dân tộc gắn liền giải phóng con người',
        },
        {
          type: 'body',
          html: 'Kế thừa chủ nghĩa Mác - Lênin, Chủ tịch Hồ Chí Minh khẳng định con người là trung tâm. Độc lập dân tộc phải gắn liền với tự do, hạnh phúc của nhân dân: <em>"Nước độc lập mà dân không được hưởng hạnh phúc, tự do, thì độc lập cũng chẳng có nghĩa lý gì"</em>.',
        },
        {
          type: 'quote',
          text: 'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người.',
          label: 'Chủ tịch Hồ Chí Minh',
        },
        {
          type: 'highlight',
          label: 'Phát triển con người toàn diện',
          html: 'Hồ Chí Minh chú trọng giáo dục, rèn luyện con người phát triển toàn diện cả <strong>Đức (Hồng)</strong> và <strong>Tài (Chuyên)</strong>, trong đó đạo đức cách mạng đóng vai trò là cái gốc của con người.',
        },
      ]}
    />
  );
}

function SectionVietNamP2() {
  return (
    <PlanetTheoryHUD
      sectionIdx={9}
      title="Chiến Lược Của Đảng"
      eyebrow="Phần 04 · Thời Đại Đổi Mới"
      accentColor="#EF4444"
      subtitle="Tiêu chuẩn con người hiện đại trước làn sóng cách mạng 4.0"
      coords={{ lat: '10.8°N', lon: '106.6°E', alt: '2 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Vị trí trung tâm',
          text: 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh',
        },
        {
          type: 'numbered-list',
          items: [
            'Có tinh thần yêu nước, tự cường dân tộc, có ý chí vươn lên đưa đất nước thoát khỏi nghèo nàn, lạc hậu.',
            'Có ý thức tập thể, đoàn kết, phấn đấu vì lợi ích chung, lối sống lành mạnh, tôn trọng pháp luật và bảo vệ môi trường.',
            'Lao động chăm chỉ, có kỹ thuật, sáng tạo, năng suất cao vì bản thân, gia đình, tập thể và xã hội.',
            'Thường xuyên học tập, nâng cao hiểu biết, trình độ chuyên môn, thẩm mỹ và thể lực trước kỷ nguyên số.',
          ],
        },
        {
          type: 'highlight',
          label: '◉ Giải pháp thực hiện',
          html: 'Kết hợp hài hòa giữa lợi ích vật chất và tinh thần; coi trọng phát triển giáo dục và nguồn nhân lực chất lượng cao; kiên quyết chống thoái hóa biến chất và chủ nghĩa cá nhân ích kỷ.',
        },
      ]}
    />
  );
}

export default function TheorySections() {
  return (
    <>
      <SectionCaNhanP1 />
      <SectionCaNhanP2 />
      <SectionQuanChungP1 />
      <SectionQuanChungP2 />
      <SectionCaseStudyP1 />
      <SectionCaseStudyP2 />
      <SectionVietNamP1 />
      <SectionVietNamP2 />
    </>
  );
}