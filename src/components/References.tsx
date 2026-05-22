import AnimatedView from './AnimatedView';
import { BookMarked, ExternalLink } from 'lucide-react';

const REFERENCES = [
  {
    id: 1,
    authors: 'Bộ Giáo dục và Đào tạo',
    year: '2021',
    title: 'Giáo trình Triết học Mác – Lênin',
    publisher: 'NXB Chính trị Quốc gia Sự thật, Hà Nội',
    tag: 'Giáo trình chính thức',
  },
  {
    id: 2,
    authors: 'Đảng Cộng sản Việt Nam',
    year: '2021',
    title: 'Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII',
    publisher: 'NXB Chính trị Quốc gia Sự thật, Hà Nội',
    tag: 'Văn kiện Đảng',
  },
  {
    id: 3,
    authors: 'Hội đồng Trung ương chỉ đạo biên soạn',
    year: '2019',
    title: 'Giáo trình Tư tưởng Hồ Chí Minh (dành cho bậc đại học không chuyên lý luận chính trị)',
    publisher: 'NXB Chính trị Quốc gia Sự thật',
    tag: 'Giáo trình chính thức',
  },
  {
    id: 4,
    authors: 'Karl Marx & Friedrich Engels',
    year: '1848',
    title: 'Tuyên ngôn của Đảng Cộng sản',
    publisher: 'Trong: Marx-Engels Toàn tập, NXB Chính trị Quốc gia',
    tag: 'Tác phẩm kinh điển',
  },
  {
    id: 5,
    authors: 'Hồ Chí Minh',
    year: '2011',
    title: 'Hồ Chí Minh Toàn tập (Tập 1–15)',
    publisher: 'NXB Chính trị Quốc gia Sự thật, Hà Nội',
    tag: 'Tư tưởng HCM',
  },
  {
    id: 6,
    authors: 'Nguyễn Phú Trọng',
    year: '2022',
    title: 'Một số vấn đề lý luận và thực tiễn về chủ nghĩa xã hội và con đường đi lên chủ nghĩa xã hội ở Việt Nam',
    publisher: 'NXB Chính trị Quốc gia Sự thật',
    tag: 'Lý luận hiện đại',
  },
];

const TAG_COLORS: Record<string, string> = {
  'Giáo trình chính thức': 'bg-navy/40 text-white/80',
  'Văn kiện Đảng': 'bg-dred/40 text-white/80',
  'Tác phẩm kinh điển': 'bg-beige/20 text-beige',
  'Tư tưởng HCM': 'bg-beige/20 text-beige',
  'Lý luận hiện đại': 'bg-white/10 text-white/70',
};

export default function References() {
  return (
    <section id="section-references" className="py-20 lg:py-32 bg-navy-dark relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_25%_50%,_#D4A373_1px,_transparent_1px),_radial-gradient(circle_at_75%_50%,_#D4A373_1px,_transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Heading */}
        <AnimatedView className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5 px-5 py-2.5 rounded-full bg-beige/10 border border-beige/20">
            <BookMarked size={16} className="text-beige" />
            <span className="section-eyebrow text-beige mb-0 tracking-widest">Tài liệu tham khảo</span>
          </div>
          <h2
            className="font-serif font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Nguồn trích dẫn &amp; Tài liệu học thuật
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto mt-4 text-base lg:text-lg leading-relaxed">
            Các công trình nghiên cứu và văn kiện chính thức được sử dụng làm cơ sở lý luận cho bài trình bày.
          </p>
          <div className="w-20 h-0.5 mx-auto mt-6 bg-gradient-to-r from-beige/60 via-dred/60 to-transparent" />
        </AnimatedView>

        {/* References grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {REFERENCES.map((ref, i) => (
            <AnimatedView
              key={ref.id}
              delay={i * 0.07}
              className="group rounded-2xl p-6 lg:p-8 bg-white/5 border border-white/10 hover:border-beige/30 hover:bg-white/8 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Number */}
                <span className="font-serif text-4xl lg:text-5xl font-bold text-beige/20 leading-none flex-shrink-0 group-hover:text-beige/35 transition-colors duration-300">
                  {String(ref.id).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  {/* Tag */}
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${TAG_COLORS[ref.tag] ?? 'bg-white/10 text-white/60'}`}>
                    {ref.tag}
                  </span>

                  {/* Authors & year */}
                  <p className="text-beige/60 text-xs font-semibold mb-1.5">
                    {ref.authors} <span className="text-white/30">·</span> {ref.year}
                  </p>

                  {/* Title */}
                  <p className="text-white font-serif font-semibold text-sm lg:text-base leading-snug mb-3">
                    {ref.title}
                  </p>

                  {/* Publisher */}
                  <p className="text-white/35 text-xs italic leading-relaxed">
                    {ref.publisher}
                  </p>
                </div>
              </div>

              {/* Hover accent */}
              <div className="mt-4 flex items-center gap-1.5 text-beige/0 group-hover:text-beige/50 transition-colors duration-300 text-xs font-medium">
                <ExternalLink size={12} />
                <span>Tài liệu gốc</span>
              </div>
            </AnimatedView>
          ))}
        </div>
      </div>
    </section>
  );
}
