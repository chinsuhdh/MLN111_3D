'use client';

import { useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhilosophyScrollContext, SECTION_BOUNDS, ReferenceNodeId } from '../hooks/usePhilosophyScroll';

// Bổ sung các Node mới và cập nhật nội dung lý luận Biện chứng
const KNOWLEDGE_GRAPH: Record<string, any> = {
  con_nguoi: {
    id: 'con_nguoi', label: 'CON NGƯỜI', color: '#FDE047', subtitle: 'Chủ thể của lịch sử',
    definition: 'Con người là một chỉnh thể thống nhất biện chứng giữa mặt sinh học và mặt xã hội. Bản chất con người là tổng hòa những quan hệ xã hội.',
    quote: '"Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội."',
    relations: [{ target: 'XÃ HỘI', type: 'Tạo nên & Cải biến' }]
  },
  xa_hoi: {
    id: 'xa_hoi', label: 'XÃ HỘI', color: '#38BDF8', subtitle: 'Môi trường sinh tồn',
    definition: 'Hệ thống các quan hệ vật chất và tinh thần. Cá nhân không thể tồn tại bên ngoài xã hội.',
    quote: '"Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người."',
    relations: [{ target: 'CON NGƯỜI', type: 'Quy định bản chất' }]
  },
  ca_nhan: {
    id: 'ca_nhan', label: 'CÁ NHÂN', color: '#64FFDA', subtitle: 'Thực thể đơn nhất',
    definition: 'Một con người cụ thể mang những đặc điểm sinh học riêng biệt, đồng thời là sự kết tinh của xã hội.',
    quote: 'Mỗi cá nhân là một cái riêng, tồn tại trong mối quan hệ biện chứng với cái chung là xã hội và giai cấp.',
    relations: [{ target: 'QUẦN CHÚNG', type: 'Phần tử cấu thành' }]
  },
  quan_chung: {
    id: 'quan_chung', label: 'QUẦN CHÚNG', color: '#FB923C', subtitle: 'Động lực lịch sử',
    definition: 'Lực lượng sáng tạo chân chính, người trực tiếp sản xuất ra của cải vật chất và là động lực của cách mạng.',
    quote: '"Cách mạng là sự nghiệp của quần chúng."',
    relations: [{ target: 'LÃNH TỤ', type: 'Nuôi dưỡng & Thúc đẩy' }]
  },
  lanh_tu: {
    id: 'lanh_tu', label: 'LÃNH TỤ & VĨ NHÂN', color: '#C084FC', subtitle: 'Cá nhân kiệt xuất',
    definition: 'Sinh ra từ phong trào quần chúng, có khả năng nhận thức quy luật khách quan, tập hợp và dẫn dắt tập thể.',
    quote: '"Chưa hề có giai cấp nào giành được thống trị nếu không đào tạo được lãnh tụ của mình."',
    relations: [{ target: 'QUẦN CHÚNG', type: 'Định hướng & Dẫn dắt' }]
  }
};

const NODE_IDS = Object.keys(KNOWLEDGE_GRAPH) as ReferenceNodeId[];

export default function References() {
  const { 
    scrollProgress, 
    referenceActiveNode, setReferenceActiveNode,
    referenceHoveredNode, setReferenceHoveredNode,
    setReferenceInteractionEnabled 
  } = useContext(PhilosophyScrollContext);

  const s = SECTION_BOUNDS[10]; 
  const opacityIn  = Math.min(1, scrollProgress < s.peak ? Math.max(0, (scrollProgress - s.start) / (s.peak - s.start)) : 1);
  const opacityOut = scrollProgress > s.exit ? Math.max(0, 1 - (scrollProgress - s.exit) / (s.end - s.exit)) : 1;
  const opacity = Math.min(opacityIn, opacityOut);

  useEffect(() => {
    setReferenceInteractionEnabled(opacity > 0.3);
    return () => setReferenceInteractionEnabled(false);
  }, [opacity, setReferenceInteractionEnabled]);

  if (opacity < 0.01) return null;
  // Đảm bảo fallback nếu node chưa được map (đặc biệt là 2 node mới)
  const centerNode = KNOWLEDGE_GRAPH[referenceActiveNode] || KNOWLEDGE_GRAPH['con_nguoi'];

  return (
    <div
      id="section-knowledge-map"
      className="fixed inset-0 z-10 pointer-events-none"
      style={{ opacity }}
    >
      {/* ── SIDEBAR TRÁI: MENU ĐIỀU HƯỚNG ── */}
      <div className="absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 w-72 xl:w-80 pointer-events-auto z-20 hidden md:flex flex-col gap-5">
        
        <div className="mb-2">
          <p className="font-mono text-xs xl:text-sm text-[#64FFDA] tracking-[0.2em] uppercase mb-2" style={{ textShadow: '0 0 10px rgba(100,255,218,0.5)' }}>Cơ sở dữ liệu</p>
          <h3 className="text-3xl xl:text-4xl text-white font-light" style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Tọa độ Nhận thức</h3>
        </div>

        <div className="flex flex-col gap-2.5">
          {NODE_IDS.map(id => {
            const node = KNOWLEDGE_GRAPH[id];
            const isActive = referenceActiveNode === id;
            const isHovered = referenceHoveredNode === id;
            
            return (
              <button
                key={id}
                onClick={() => setReferenceActiveNode(id as ReferenceNodeId)}
                onMouseEnter={() => setReferenceHoveredNode(id as ReferenceNodeId)}
                onMouseLeave={() => setReferenceHoveredNode(null)}
                className={`flex items-center gap-4 py-3 px-4 xl:py-4 xl:px-5 rounded-2xl transition-all duration-500 relative overflow-hidden group border-none ${
                  isActive ? 'bg-white/5' : 'hover:bg-white/[0.03]'
                }`}
              >
                 {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                      style={{ background: node.color, boxShadow: `0 0 15px ${node.color}` }}
                    />
                 )}

                <motion.div 
                  className="w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-full flex-shrink-0 z-10"
                  style={{ background: node.color, boxShadow: (isActive || isHovered) ? `0 0 15px ${node.color}` : 'none' }}
                  animate={{ scale: isActive ? 1.5 : 1 }}
                />
                
                <div className="text-left z-10">
                  <p 
                    className={`font-semibold tracking-widest text-xs xl:text-sm transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`} 
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {node.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TEXT LƠ LỬNG Ở DƯỚI ĐÁY CÁC HÀNH TINH ── */}
      <div className="absolute bottom-10 left-[50%] md:left-[calc(50%+4rem)] xl:left-[calc(50%+6rem)] -translate-x-1/2 w-[92%] md:w-[750px] xl:w-[950px] pointer-events-auto z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={centerNode.id}
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
            transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.1] }}
          >
            {/* Hiệu ứng Floating liên tục vô trọng lực */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative flex flex-col md:flex-row gap-6 xl:gap-12 items-center justify-center py-8"
            >
              {/* Bóng đổ Radial đằng sau để đảm bảo dễ đọc trên nền sao, không có viền cứng */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.65)_0%,transparent_75%)] -z-10 pointer-events-none mix-blend-multiply" />
              
              {/* Cột trái: Tiêu đề & Subtitle */}
              <div className="w-full md:w-[45%] flex flex-col justify-center text-center md:text-right md:items-end">
                <p className="font-mono text-xs xl:text-sm uppercase tracking-[0.25em] mb-2" style={{ color: centerNode.color, textShadow: `0 0 15px ${centerNode.color}` }}>
                  ▸ {centerNode.subtitle}
                </p>
                <h2 className="text-5xl xl:text-6xl text-white font-light tracking-tight leading-none mb-3" style={{ fontFamily: 'var(--font-display)', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                  {centerNode.label}
                </h2>
                
                {/* Đường dẫn/Relations: Liên kết biện chứng */}
                {centerNode.relations && (
                  <div className="mt-4 flex flex-wrap justify-center md:justify-end gap-2">
                    {centerNode.relations.map((rel: any, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 rounded-full text-[9px] xl:text-[10px] uppercase font-mono tracking-widest border border-white/10 bg-white/5 text-white/70 backdrop-blur-md whitespace-nowrap">
                        <span style={{ color: centerNode.color, textShadow: `0 0 8px ${centerNode.color}` }}>●</span> {rel.type} <span className="text-white">→ {rel.target}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Line phân cách Gradient Mềm */}
              <div className="hidden md:block w-px h-32 opacity-50" style={{ background: `linear-gradient(180deg, transparent, ${centerNode.color}, transparent)` }} />
              <div className="md:hidden h-px w-full opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${centerNode.color}, transparent)` }} />
              
              {/* Cột phải: Nội dung chi tiết */}
              <div className="w-full md:w-[55%] flex flex-col justify-center text-center md:text-left drop-shadow-2xl">
                <p className="text-lg xl:text-xl text-white/90 leading-relaxed mb-4 font-light" style={{ fontFamily: 'var(--font-body)', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                  {centerNode.definition}
                </p>
                
                <blockquote className="md:pl-4 md:border-l-2 py-1 mb-2 border-white/20" style={{ borderColor: `${centerNode.color}80` }}>
                  <p className="italic text-base xl:text-lg text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {centerNode.quote}
                  </p>
                </blockquote>
              </div>

            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}