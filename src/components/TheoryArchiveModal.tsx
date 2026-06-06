'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePhilosophyScroll } from '../hooks/usePhilosophyScroll';
// Nếu bạn có dùng lucide-react, có thể import X icon. Nếu không, dùng ký tự '✕'
import { X, Database } from 'lucide-react'; 

export default function TheoryArchiveModal() {
  const { isArchiveOpen, setIsArchiveOpen } = usePhilosophyScroll();

  // Đóng modal khi bấm phím Esc
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsArchiveOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsArchiveOpen]);

  return (
    <AnimatePresence>
      {isArchiveOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030A14]/80 p-4 md:p-8"
        >
          {/* Vùng bấm ra ngoài để đóng */}
          <div className="absolute inset-0" onClick={() => setIsArchiveOpen(false)} />

          {/* Cửa sổ Archive */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col bg-[#081220] border border-[#64FFDA]/30 rounded-2xl shadow-[0_0_50px_rgba(100,255,218,0.1)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#64FFDA]/20 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-[#64FFDA]" />
                <h2 className="text-[#64FFDA] font-mono text-sm tracking-[0.2em] uppercase">
                  Dữ liệu gốc · Thuyết Mác - Lênin & Hồ Chí Minh
                </h2>
              </div>
              <button
                onClick={() => setIsArchiveOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Khung chứa Text có thanh cuộn (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              <article className="max-w-4xl mx-auto text-white/80 font-light leading-relaxed space-y-6" style={{ fontFamily: 'var(--font-body)' }}>
                
                {/* --- PHẦN 3 --- */}
                <h2 className="text-2xl md:text-3xl text-white font-semibold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)', color: '#64FFDA' }}>
                  3. Quan điểm của triết học Mác - Lênin về quan hệ cá nhân và xã hội, về vai trò của quần chúng nhân dân và lãnh tụ trong lịch sử
                </h2>

                <h3 className="text-xl md:text-2xl text-white mt-6 mb-3">3.1. Quan hệ giữa cá nhân và xã hội</h3>
                <p>Con người, xét cả về thực thể sinh học lẫn thực thể xã hội, vừa mang bản chất loài lẫn tính đặc thù cá thể. Nó vừa là một vũ trụ thu nhỏ, riêng biệt, độc đáo, lại vừa mang đặc điểm chung, phổ biến của loài. Sự thống nhất giữa cái chung và cái riêng trong con người khiến cho nó ở đỉnh cao của sự phát triển, trở thành “trung tâm” của vũ trụ, “con người là hoa của đất”. Ở động vật, sự thống nhất giữa cái chung của loài và cái riêng của cá thể, dù ở trình độ cao thì cũng chỉ ở phương diện sinh vật mà thôi. Trong khi đó, ở con người sự thống nhất ấy không chỉ ở trình độ cao nhất về phương diện sinh vật mà cả ở phương diện xã hội.</p>
                <p>Con người là một hệ thống chỉnh thể thống nhất cá thể - loài, mang những thuộc tính cá thể, đơn nhất, lẫn những thuộc tính chung, phổ biến của loài, bản chất của nó là tổng hòa các quan hệ xã hội. Nó là đại diện cho loài, cho xã hội, cho nhân loại, cho lịch sử loài người. Trong con người, do vậy, luôn có những cái chung toàn nhân loại, như các giá trị chung, nhu cầu chung, lợi ích chung, v.v... Nó cũng là đại biểu của một xã hội cụ thể, một thời kỳ lịch sử xác định, có tính đặc thù, với các quan hệ xã hội xác định. Các quan hệ xã hội kết tinh trong mỗi con người luôn là quan hệ xã hội cụ thể của một thời đại, một gia đình, một nhóm xã hội, một cộng đồng, một tập đoàn, một giai cấp, một quốc gia - dân tộc xác định. Trong mỗi người còn có cả những cái riêng, cái đơn nhất, đặc thù của cá thể, cá nhân từ kinh nghiệm, tâm lý, trí tuệ, v.v... do những điều kiện sống, do đặc điểm sinh học quy định. Nhờ đó, mỗi con người là một cá thể, cá nhân riêng biệt, khác biệt nhau. “Con người là một thực thể xã hội mang tính cá nhân”</p>
                <p>Cá nhân và xã hội không tách rời nhau. Xã hội do các cá nhân cụ thể hợp thành, mỗi cá nhân là một phần tử của xã hội sống và hoạt động trong xã hội đó. Khi mới sinh ra, chưa có ý thức, chưa có các quan hệ xã hội thì con người mới chỉ là cá thể. Chỉ khi cá thể đó giao tiếp xã hội, có những quan hệ xã hội xác định, có ý thức mới trở thành cá nhân. Cá nhân không thể tách rời xã hội. Quan hệ cá nhân – xã hội là tất yếu, là tiền đề và điều kiện tồn tại và phát triển của cả cá nhân lẫn xã hội. Đương nhiên, quan hệ ấy phụ thuộc vào điều kiện lịch sử cụ thể, vào trình độ phát triển xã hội và của từng cá nhân, đặc biệt là phụ thuộc vào bản chất của xã hội. Quan hệ cá nhân - xã hội là khác nhau trong xã hội có phân chia giai cấp và xã hội không phân chia giai cấp. Sự thống nhất và mâu thuẫn giữa cá nhân và xã hội là một phạm trù lịch sử, phụ thuộc vào từng giai đoạn lịch sử khác nhau.</p>
                <p>Sự thống nhất cá nhân – xã hội còn thể hiện ở một góc độ khác trong quan hệ con người giai cấp và con người nhân loại. Quan hệ con người giai cấp và con người nhân loại chỉ tồn tại trong xã hội có phân chia giai cấp, do vậy nó có tính lịch sử. Mỗi con người cá nhân trong xã hội có giai cấp đều mang tính giai cấp do nó luôn là thành viên của một giai cấp, tầng lớp xã hội xác định. Các quan hệ xã hội mà nó sống và hoạt động trong đó luôn có quan hệ giai cấp và các quan hệ đó luôn đóng vai trò quyết định, chi phối các hành vi và hoạt động của nó, đặc biệt, quy định lợi ích và hoạt động thực hiện các lợi ích ấy. Mặt khác, mỗi cá nhân, dù thuộc về giai cấp nào cũng đều mang tính nhân loại. Nhân loại là cộng đồng người phổ biến rộng rãi nhất, được hình thành trong suốt chiều dài lịch sử nhân loại. Tính nhân loại được thể hiện trong các giá trị chung toàn nhân loại, trong những quy tắc, chuẩn mực chung xuất hiện trên nền tảng lợi ích chung, từ bản chất người của các cá nhân tạo nên cộng đồng nhân loại.</p>
                <p>Tính giai cấp và tính nhân loại trong mỗi con người vừa thống nhất vừa khác biệt, thậm chí mâu thuẫn nhau. Tính nhân loại là vĩnh hằng, là nền tảng của cuộc sống ở mọi con người, dù khác biệt màu da, quốc tịch, giai cấp, tộc người, hay giới, độ tuổi, học vấn, v.v... Chỉ có khi nào không còn tồn tại nhân loại thì khi đó tính nhân loại mới mất đi. Nhưng, ở mỗi giai đoạn lịch sử khác nhau lại tồn tại các giai cấp khác nhau. Các giai cấp và quan hệ của chúng biến đổi thường xuyên do các điều kiện kinh tế, chính trị, xã hội luôn thay đổi. Con người với tính cách là những chủ thể xã hội luôn có những hoạt động để cải biến điều kiện khách quan tạo nên những điều kiện sinh hoạt thuận lợi hơn cho mình. Chính điều đó đã làm cho các điều kiện sinh sống của con người luôn biến đổi, các lực lượng sản xuất luôn phát triển, xã hội luôn thay đổi theo chiều hướng tiến bộ. Nhưng, trong các giai cấp đang đấu tranh với nhau, có giai cấp đại diện cho sự phát triển tiến bộ, có giai cấp lại là lực lượng cản trở sự phát triển tiến bộ ấy. Tính giai cấp trong những con người đại biểu cho giai cấp đang cản trở sự phát triển ấy tất nhiên là mâu thuẫn với tính nhân loại.</p>
                <p>Mỗi con người đều sinh ra, lớn lên trong một cộng đồng quốc gia, dân tộc xác định. Do những điều kiện lịch sử, kinh tế, văn hóa, xã hội và chính trị khác nhau nên trong mỗi cộng đồng quốc gia dân tộc cũng hình thành những giá trị, phẩm chất, đặc điểm đặc thù của mình. Con người tất yếu mang trong mình những điểm đặc thù đó, dù họ muốn hay không, dù ý thức được điều đó hay không. Do vậy, trong mỗi con người cá nhân luôn luôn mang trong nó cả những cái riêng biệt của nó với tính cách là cá nhân, vừa mang trong mình cả những cái đặc thù của quốc gia dân tộc, vừa mang cả tính giai cấp lẫn tính nhân loại. Với tính cách là chủ thể hoạt động sự gắn kết, tác động biện chứng lẫn nhau giữa các phương diện, khía cạnh đó trong mỗi con người là luôn biến động, biện chứng, khách quan, tất yếu. Theo quan điểm của các nhà kinh điển của chủ nghĩa Mác, tính giai cấp và tính dân tộc mang tính lịch sử, sẽ mất dần theo sự phát triển và tiến bộ của xã hội. Nhưng tính nhân loại và cá nhân sẽ là vĩnh viễn. Trong khi lịch sử nhân loại chưa đạt đến trình độ phát triển đó thì sự thống nhất giữa tính cá nhân, tính giai cấp, tính dân tộc và tính nhân loại là mục tiêu, yêu cầu và tiêu chuẩn của tiến bộ xã hội. Giải quyết đúng đắn, phù hợp với điều kiện, hoàn cảnh khách quan mối quan hệ giữa con người cá nhân, con người giai cấp, con người dân tộc, con người nhân loại luôn là đòi hỏi của hoạt động thực tiễn.</p>
                <div className="pl-4 border-l-4 border-[#64FFDA]/50 bg-white/5 py-2 pr-4 rounded-r-lg my-6">
                  <p className="text-white/90">Các quan điểm trên đây về con người có ý nghĩa phương pháp luận quan trọng. Trong hoạt động nhận thức và thực tiễn phải luôn chú ý giải quyết đúng đắn mối quan hệ xã hội – cá nhân, phải tránh khuynh hướng đề cao quá mức (mặt/cái) cá nhân hoặc (mặt cái) xã hội. Nếu đặt cá nhân lên trên xã hội, chỉ thấy cá nhân mà không thấy xã hội, đem cá nhân đối lập với xã hội, hoặc ngược lại, chỉ đề cao xã hội mà bỏ quên cá nhân, không nhận thức đúng sự phát triển của xã hội là sự kết hợp hoạt động của các cá nhân, thì đều sai lầm và có thể dẫn đến những hệ lụy khó lường cho cả xã hội lẫn cá nhân.</p>
                </div>
                <p>Hơn nữa, trong đời sống xã hội khi xem xét con người phải đặt nó trong tổng thể các quan hệ xã hội, bởi trong tính hiện thực, bản chất của con người là tổng thể các quan hệ xã hội. Điều này cũng gắn liền với nguyên tắc lịch sử - cụ thể và nguyên tắc toàn diện. Sẽ là sai lầm nếu chỉ nhìn vào một mặt khía cạnh/phương diện của một con người để đánh giá bản chất của người đó. Xem xét một con người phải đặt con người đó trong tổng thể các quan hệ của chính người đó.</p>

                <h3 className="text-xl md:text-2xl text-white mt-8 mb-3">3.2. Vai trò của quần chúng nhân dân và lãnh tụ trong lịch sử</h3>
                <p>Đây là một trong những nội dung quan trọng của triết học Mác. Nội dung này được triết học Mác luận giải một cách khoa học trên cơ sở quán triệt sâu sắc chủ nghĩa duy vật biện chứng và toàn bộ các nội dung khác của chủ nghĩa duy vật lịch sử, là sự vận dụng nhất quán chủ nghĩa duy vật và phương pháp biện chứng duy vật vào lý luận về vai trò con người trong tiến trình lịch sử.</p>
                <p>Trong lịch sử tư tưởng nhân loại, vấn đề này đã được đề cập theo các lập trường tư tưởng khác nhau. Các tôn giáo đều cho rằng lịch sử vận động của xã hội là do Thượng đế, Chúa trời sắp đặt, các cá nhân buộc phải tuân thủ ý chí tối cao. Số phận con người, sự hoạt động của họ là do các thần linh, Thượng đế, Đấng Tối cao quyết định. Các trào lưu duy tâm cho rằng lịch sử xã hội là do các bậc vua chúa, các vĩ nhân, những người đặc biệt có tài cao, sức lớn điều khiển, còn quần chúng nhân dân chỉ là những đám đông ô hợp, chịu sự điều khiển của các bậc vua chúa, các vĩ nhân, của những người đặc biệt đó. Họ chỉ là phương tiện, “con rối” trong tay của những người này. Các nhà duy vật trước Mác thường phủ nhận vai trò của Thượng đế, thần linh, Đấng Tối cao và khẳng định rằng sự biến đổi của xã hội là do một nhân tố xã hội xác định nào đó quyết định, như đạo đức, tình yêu thương, những người có đầu óc phê phán hoặc sớm nhận thức được chân lý. Nhưng, do những nguyên nhân khác nhau, họ cũng đã rơi vào duy tâm khi tuyệt đối hóa vai trò của các nhân tố đó.</p>
                <p>Theo quan điểm triết học Mác- Lênin, xã hội biến đổi nhờ hoạt động của toàn thể quần chúng nhân dân dưới sự lãnh đạo của các tổ chức hoặc cá nhân nhằm thực hiện một mục đích nào đó. Mối quan hệ giữa vai trò quần chúng nhân dân với cá nhân chính là quan hệ giữa vai trò của nhân dân lao động với cá nhân lãnh tụ/vĩ nhân. Một mặt, quan hệ này thể hiện một phần nội dung quan hệ giữa cá nhân và xã hội. Mặt khác, nó lại chứa đụng những nội dung mới, khác biệt, bởi trong quan hệ này nó nói đến quan hệ với những cá nhân đặc biệt, cá nhân lãnh tụ/ vĩ nhân.</p>
                <p>Quần chúng nhân dân là thuật ngữ chỉ tập hợp đông đảo những con người hoạt động trong một không gian và thời gian xác định, bao gồm nhiều thành phần, tầng lớp xã hội và giai cấp đang hoạt động trong một xã hội xác định... Nội hàm của khái niệm quần chúng nhân dân bao gồm: Những người lao động sản xuất ra của cải vật chất và tinh thần là lực lượng căn bản, chủ chốt; Toàn thể dân cư đang chống lại những kẻ áp bức, bóc lột thống trị và đối kháng với nhân dân; Những người đang có các hoạt động trong các lĩnh vực khác nhau, trực tiếp hoặc gián tiếp góp phần vào sự biến đổi xã hội.</p>
                <p>Cá nhân chính là con người cụ thể đang hoạt động trong một xã hội xác định thể hiện tính đơn nhất với tính cách là cá thể về phương diện sinh học, với tính cách là nhân cách về phương diện xã hội. Khác với khái niệm con người dùng để chỉ tính phổ biến về bản chất người trong mỗi cá nhân, khái niệm cá nhân nhấn mạnh tính đặc thù riêng biệt của mỗi cá thể về phương diện xã hội...</p>
                <p>Trong số các cá nhân ở những thời kỳ lịch sử nhất định, trong những điều kiện, hoàn cảnh cụ thể, xác định xuất hiện những cá nhân kiệt xuất, trở thành những người lãnh đạo quần chúng nhân dân nhằm thực hiện một mục tiêu xác định. Đó là những lãnh tụ hay vĩ nhân. Ngoài các phẩm chất cá nhân lãnh tụ vĩ nhân là những cá nhân kiệt xuất, xuất hiện trong phong trào quần chúng nhân dân, nhận thức được một cách đúng đắn, nhanh nhạy, kịp thời những yêu cầu, các quy luật, những vấn đề căn bản nhất của một lĩnh vực hoạt động nhất định của đời sống xã hội...</p>
                <p>Các nhà kinh điển của chủ nghĩa Mác - Lênin đã luận giải và luận chứng một cách đúng đắn mối quan hệ giữa vai trò của lãnh tụ và vai trò của quần chúng nhân dân trong sự phát triển xã hội. Quần chúng nhân dân là chủ thể sáng tạo chân chính, là động lực phát triển của lịch sử. Vai trò đó của quần chúng nhân dân được thể hiện ở các nội dung sau đây:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/80">
                  <li>Yếu tố căn bản và quyết định của lực lượng sản xuất là quần chúng nhân dân lao động.</li>
                  <li>Trong mọi cuộc cách mạng xã hội cũng như ở các giai đoạn biến động của xã hội, quần chúng nhân dân luôn là lực lượng chủ yếu, cơ bản và quyết định mọi thắng lợi của các cuộc cách mạng.</li>
                  <li>Toàn bộ các giá trị văn hóa, tinh thần và đời sống tinh thần nói chung đều do quần chúng nhân dân sáng tạo ra.</li>
                </ul>
                <p>Tùy thuộc vào những điều kiện lịch sử khác nhau mà vai trò của quần chúng nhân dân cũng được thể hiện khác nhau. Xã hội càng công bằng, dân chủ, tự do, bình đẳng thì càng phát huy được vai trò của cá nhân và của quần chúng nhân dân nói chung.</p>
                <p>Trong mối quan hệ với quần chúng nhân dân, lãnh tụ đóng vai trò hết sức to lớn, vô cùng quan trọng... Quan hệ giữa lãnh tụ với quần chúng nhân dân là quan hệ thống nhất, biện chứng thể hiện trên các nội dung sau đây:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/80">
                  <li>Mục đích và lợi ích của quần chúng nhân dân và lãnh tụ là thống nhất.</li>
                  <li>Quần chúng nhân dân và phong trào của họ tạo nên các lãnh tụ và những điều kiện, tiền đề khách quan để các lãnh tụ xuất hiện và hoàn thành các nhiệm vụ mà lịch sử đặt ra cho họ.</li>
                </ul>
                <div className="pl-4 border-l-4 border-[#64FFDA]/50 bg-white/5 py-2 pr-4 rounded-r-lg my-6">
                  <p className="text-white/90">Quan điểm của chủ nghĩa Mác - Lênin về mối quan hệ giữa quần chúng nhân dân với lãnh tụ có ý nghĩa phương pháp luận rất quan trọng. Lãnh tụ có vai trò quan trọng, nhưng không thể tuyệt đối hóa vai trò của họ dẫn đến tệ sùng bái cá nhân... Ngược lại, việc tuyệt đối hóa vai trò của quần chúng nhân dân, xem nhẹ vai trò của các cá nhân và lãnh tụ sẽ dẫn đến hạn chế, xem thường các sáng kiến cá nhân...</p>
                </div>

                {/* --- PHẦN 4 --- */}
                <h2 className="text-2xl md:text-3xl text-white font-semibold mt-12 mb-4" style={{ fontFamily: 'var(--font-display)', color: '#EF4444' }}>
                  4. Vấn đề con người trong sự nghiệp cách mạng ở Việt Nam
                </h2>
                <p>Lý luận về con người của các nhà kinh điển của chủ nghĩa Mác - Lênin là nền tảng lý luận cho việc phát huy vai trò của con người trong cách mạng và trong sự nghiệp đổi mới ở Việt Nam hiện nay. Chủ tịch Hồ Chí Minh, do yêu cầu khách quan của sự phát triển lịch sử - xã hội Việt Nam... đã vận dụng sáng tạo và phát triển lý luận về con người phù hợp với điều kiện lịch sử xã hội Việt Nam hiện đại.</p>
                <p>Theo Hồ Chí Minh: “chữ người, nghĩa hẹp là gia đình, anh em, họ hàng, bầu bạn. Nghĩa rộng là đồng bào cả nước. Rộng nữa là cả loài người”. Tư tưởng Hồ Chí Minh về con người bao hàm nhiều nội dung khác nhau, trong đó có các nội dung cơ bản là: tư tưởng về giải phóng nhân dân lao động, giải phóng giai cấp, giải phóng dân tộc, tư tưởng về con người vừa là mục tiêu, vừa là động lực của cách mạng, tư tưởng về phát triển con người toàn diện.</p>
                <p>Giải phóng nhân dân lao động gắn liền với giải phóng giai cấp, giải phóng dân tộc, bởi ở Việt Nam quyền lợi của nhân dân lao động thống nhất với quyền lợi của giai cấp và dân tộc...</p>
                <p>Do bối cảnh lịch sử của quốc gia dân tộc, Hồ Chí Minh luôn nhấn mạnh tư tưởng giành độc lập, tự do cho quốc gia dân tộc. Độc lập, tự do là quyền bất khả xâm phạm của quốc gia dân tộc... “Trong lúc này nếu không giải quyết được vấn đề dân tộc giải phóng, không đòi được độc lập, tự do cho toàn thể dân tộc, thì chẳng những toàn thể quốc gia dân tộc còn chịu mãi kiếp ngựa trâu, mà quyền lợi của bộ phận, giai cấp đến vạn năm cũng không đòi lại được”.</p>
                <p>Hồ Chí Minh khẳng định: Tôi chỉ có một sự ham muốn, ham muốn tột bậc là làm sao nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành... “Nước độc lập mà dân không được hưởng hạnh phúc, tự do, thì độc lập cũng chẳng có nghĩa lý gì”.</p>
                <p>Phát triển con người toàn diện là một nội dung quan trọng trong tư tưởng Hồ Chí Minh về con người. “Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người”. Con người toàn diện là con người có cả đức và tài (vừa hồng vừa chuyên) trong đó đức là gốc...</p>
                <p>Con người vừa là mục tiêu, là nguồn gốc, là động lực của sự phát triển xã hội. Chủ nghĩa Mác - Lênin khẳng định con người là chủ thể lịch sử xã hội. Quan điểm đó đã được cụ thể hóa trong tư tưởng Hồ Chí Minh và tiếp tục được Đảng Cộng sản Việt Nam cụ thể hóa vào sự nghiệp đổi mới ở Việt Nam hiện nay...</p>
                <p>Việc phát huy vai trò con người ở Việt Nam trong điều kiện hiện nay đã được Đảng ta chú trọng nhấn mạnh trong các kỳ đại hội Đảng... Đảng Cộng sản Việt Nam cũng nhấn mạnh đến việc xây dựng con người Việt Nam đáp ứng yêu cầu phát triển đất nước hiện nay với những đức tính sau đây:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/80">
                  <li>Có tinh thần yêu nước, tự cường dân tộc, phấn đấu vì độc lập dân tộc và chủ nghĩa xã hội...</li>
                  <li>Có ý thức tập thể, đoàn kết, phấn đấu vì lợi ích chung.</li>
                  <li>Có lối sống lành mạnh, nếp sống văn minh, cần kiệm, trung thực, nhân nghĩa...</li>
                  <li>Lao động chăm chỉ với lương tâm nghề nghiệp, có kĩ thuật, sáng tạo...</li>
                  <li>Thường xuyên học tập, nâng cao hiểu biết, trình độ chuyên môn...</li>
                </ul>
                <p>Hội nghị lần thứ Chín của Ban Chấp hành Trung ương Đảng khóa XI tiếp tục nhấn mạnh và bổ sung: “Xây dựng nền văn hóa và con người Việt Nam phát triển toàn diện, hướng đến chân, thiện, mỹ, thấm nhuần tinh thần dân tộc, nhân văn, dân chủ và khoa học... Gắn xây dựng, rèn luyện đạo đức với thực hiện quyền con người, quyền và nghĩa vụ cơ bản của công dân...”</p>
                <p>Việc phát huy vai trò con người để thực hiện mục tiêu giải phóng con người, xem con người vừa là mục tiêu, vừa là động lực của sự nghiệp đổi mới được Đảng Cộng sản Việt Nam quán triệt trong tất cả các lĩnh vực của đời sống xã hội... Sự thành công của công cuộc đổi mới nói riêng và sự phát triển đất nước nói riêng phụ thuộc rất lớn vào việc phát huy vai trò con người, nhất là khi cuộc cách mạng khoa học – công nghệ đang diễn ra như vũ bão, cách mạng công nghiệp lần thứ tư đang bắt đầu, toàn cầu hóa và hội nhập quốc tế đang diễn ra với những diễn biến bất thường, khó lường.</p>
              </article>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}