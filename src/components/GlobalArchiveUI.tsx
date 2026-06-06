'use client';

import React from 'react';
import { Database } from 'lucide-react';
import { usePhilosophyScroll } from '../hooks/usePhilosophyScroll';
import TheoryArchiveModal from './TheoryArchiveModal'; // Import cái Modal bạn vừa tạo ở trên

export default function GlobalArchiveUI() {
  const { setIsArchiveOpen } = usePhilosophyScroll();

  return (
    <>
      {/* Nút gọi Modal - Luôn nổi ở góc dưới bên phải màn hình */}
      <button 
        onClick={() => setIsArchiveOpen(true)}
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 px-4 py-2 bg-[#64FFDA]/10 border border-[#64FFDA]/30 rounded-full hover:bg-[#64FFDA]/20 transition-all group backdrop-blur-md"
      >
        <Database className="w-4 h-4 text-[#64FFDA] group-hover:scale-110 transition-transform" />
        <span className="text-[#64FFDA] font-mono text-[10px] uppercase tracking-widest">
          Dữ liệu gốc
        </span>
      </button>

      {/* Render Component chứa luồng text khổng lồ */}
      <TheoryArchiveModal />
    </>
  );
}