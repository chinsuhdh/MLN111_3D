import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import BackgroundScene from './components/BackgroundScene';
import CinematicLoader from './components/CinematicLoader';
import Hero from './components/Hero';
import TheorySections from './components/TheorySections';
import OverviewMode from './components/OverviewMode';
import References from './components/References';
import GlobalArchiveUI from './components/GlobalArchiveUI'; // <-- 1. Import Component Kho lưu trữ
//import TOC from './components/TOC';

export default function App() {
  return (
    <main className="relative w-full h-screen overflow-hidden isolate bg-[#030A14]">
      <div className="relative z-10 w-full h-full">
        <Suspense fallback={
          <AnimatePresence>
            <CinematicLoader key="loader" />
          </AnimatePresence>
        }>
          <Layout>
            {/* 3D universe — fixed, always visible, -z-10 */}
            <BackgroundScene />

            {/* Section 0: Hero */}
            <Hero />

            {/* Sections 1-4: Planet HUDs (CÁ NHÂN, XÃ HỘI, LÃNH TỤ, QUẦN CHÚNG) */}
            <TheorySections />

            {/* Section 5: Overview — full philosophical system view */}
            <OverviewMode />

            {/* Section 6: References */}
            <References />

            {/* NÚT VÀ CỬA SỔ DỮ LIỆU GỐC TRÔI NỔI */}
            {/* 2. Đặt GlobalArchiveUI ở đây để nó luôn hiển thị trên mọi Section */}
            <GlobalArchiveUI />
          
          </Layout>
        </Suspense>
      </div>
    </main>
  );
}