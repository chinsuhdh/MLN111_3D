import PlanetTheoryHUD from './PlanetTheoryHUD';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 (idx=1): Cá nhân & Xã hội
// Camera: flies toward CÁ NHÂN planet zone
// ─────────────────────────────────────────────────────────────────────────────
function SectionCaNhanXaHoi() {
  return (
    <PlanetTheoryHUD
      sectionIdx={1}
      title="Cá Nhân & Xã Hội"
      eyebrow="Phần 01 · Hành tinh CÁ NHÂN"
      accentColor="#64FFDA"
      subtitle="Con người — cá thể trong dòng lịch sử"
      coords={{ lat: '34.0°N', lon: '87.2°E', alt: '34 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Luận điểm nền tảng',
          text: 'Hệ thống chỉnh thể Cá thể – Loài',
        },
        {
          type: 'body',
          html: 'Con người là <strong>một hệ thống chỉnh thể thống nhất cá thể – loài</strong>. Bản chất của nó là <strong>tổng hòa các quan hệ xã hội</strong>. Cá nhân vừa mang bản chất loài phổ quát (lý trí, ngôn ngữ, lao động sáng tạo) vừa mang tính cá thể độc đáo không thể thay thế.',
        },
        {
          type: 'highlight',
          label: 'Quan hệ biện chứng',
          html: 'Cá nhân và xã hội <strong>không tách rời nhau</strong>. Quan hệ cá nhân – xã hội là <strong>tất yếu lịch sử</strong>, là tiền đề và điều kiện tồn tại và phát triển của cả cá nhân lẫn xã hội.',
        },
        {
          type: 'heading',
          label: 'Phân tầng bản chất',
          text: 'Tính giai cấp & Tính nhân loại',
        },
        {
          type: 'body',
          html: 'Trong mỗi con người cá nhân trong xã hội có giai cấp đều <strong>mang tính giai cấp</strong> — phản ánh vị trí trong cơ cấu sản xuất — nhưng cũng đều <strong>mang tính nhân loại</strong> phổ quát.',
        },
        {
          type: 'bullet-list',
          items: [
            '<strong>Tính nhân loại</strong> là vĩnh hằng — những giá trị nhân văn không bị giới hạn bởi thời đại hay giai cấp',
            '<strong>Tính giai cấp</strong> là lịch sử — xuất hiện, thay đổi và biến mất theo tiến trình của quan hệ sản xuất',
          ],
        },
        {
          type: 'heading',
          label: 'Ý nghĩa phương pháp luận',
          text: 'Nguyên tắc nhìn nhận Con người',
        },
        {
          type: 'highlight',
          label: '◉ Phương pháp luận',
          html: 'Phải luôn chú ý giải quyết đúng đắn mối quan hệ <strong>xã hội – cá nhân</strong>, tránh hai khuynh hướng cực đoan: <strong>đề cao quá mức cá nhân</strong> (chủ nghĩa cá nhân) hoặc <strong>tuyệt đối hóa xã hội</strong> (xóa bỏ quyền cá nhân). Xem xét con người phải đặt trong tổng thể các quan hệ xã hội lịch sử – cụ thể.',
        },
        {
          type: 'numbered-list',
          items: [
            'Không tách con người ra khỏi các quan hệ xã hội cụ thể mà nó đang sống',
            'Không quy toàn bộ bản chất con người về một quan hệ nào đó',
            'Phải thấy sự thống nhất giữa cái chung (loài) và cái riêng (cá thể)',
          ],
        },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 (idx=2): Quần chúng nhân dân & Lãnh tụ
// Camera: flies toward QUẦN CHÚNG + LÃNH TỤ zone
// ─────────────────────────────────────────────────────────────────────────────
function SectionQuanChungLanhTu() {
  return (
    <PlanetTheoryHUD
      sectionIdx={2}
      title="Quần Chúng & Lãnh Tụ"
      eyebrow="Phần 02 · Hành tinh QUẦN CHÚNG"
      accentColor="#D4A373"
      subtitle="Động lực lịch sử — sức mạnh tập thể & vai trò cá nhân kiệt xuất"
      coords={{ lat: '44.0°S', lon: '270.0°W', alt: '44 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Vai trò lịch sử',
          text: 'Quần chúng nhân dân — Chủ thể sáng tạo',
        },
        {
          type: 'body',
          html: 'Quần chúng nhân dân là <strong>chủ thể sáng tạo chân chính</strong>, là động lực phát triển của lịch sử. Họ là nền tảng không thể thay thế của mọi tiến bộ xã hội.',
        },
        {
          type: 'bullet-list',
          items: [
            '<strong>Lực lượng sản xuất cơ bản</strong> — tạo ra toàn bộ của cải vật chất nuôi sống xã hội',
            '<strong>Động lực của mọi cuộc cách mạng xã hội</strong> — lực lượng trực tiếp phá bỏ quan hệ sản xuất lỗi thời',
            '<strong>Sáng tạo ra toàn bộ các giá trị văn hóa tinh thần</strong> — nguồn gốc của mọi nền văn minh nhân loại',
          ],
        },
        {
          type: 'heading',
          label: 'Lãnh tụ kiệt xuất',
          text: 'Vai trò của Lãnh tụ trong lịch sử',
        },
        {
          type: 'body',
          html: 'Lãnh tụ là những <strong>cá nhân kiệt xuất xuất hiện trong phong trào quần chúng</strong>, nhận thức đúng đắn quy luật khách quan, dám quên mình vì lợi ích của nhân dân, có năng lực tổ chức và dẫn dắt quần chúng tiến lên.',
        },
        {
          type: 'quote',
          text: 'Trong lịch sử chưa hề có một giai cấp nào giành được quyền thống trị, nếu nó không đào tạo được trong hàng ngũ của mình những lãnh tụ chính trị...',
          label: 'V.I. Lênin',
        },
        {
          type: 'highlight',
          label: '⇄ Mối quan hệ biện chứng',
          html: '<strong>Quần chúng nhân dân và phong trào của họ tạo nên các lãnh tụ.</strong> Không được <strong>tuyệt đối hóa vai trò lãnh tụ</strong> dẫn đến sùng bái cá nhân, cũng không được <strong>xem nhẹ vai trò của cá nhân kiệt xuất</strong> mà không phát huy sức mạnh sáng tạo của quần chúng.',
        },
        {
          type: 'numbered-list',
          items: [
            '<strong>Định hướng tư tưởng</strong> — vạch ra con đường đúng đắn cho phong trào',
            '<strong>Tổ chức lực lượng</strong> — biến sức mạnh phân tán thành sức mạnh thống nhất',
            '<strong>Dẫn dắt quần chúng</strong> — biến lý luận thành hành động cách mạng',
          ],
        },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 (idx=3): Phân tích tình huống — Trưởng nhóm C
// Camera: flies toward XÃ HỘI zone / wide philosophical angle
// ─────────────────────────────────────────────────────────────────────────────
function SectionCaseStudy() {
  return (
    <PlanetTheoryHUD
      sectionIdx={3}
      title="Phân Tích Tình Huống"
      eyebrow="Phần 03 · Tình huống Trưởng nhóm C"
      accentColor="#38BDF8"
      subtitle="Ứng dụng triết học Mác–Lênin vào bối cảnh nhóm học tập"
      coords={{ lat: '10.8°N', lon: '106.7°E', alt: '12 AU' }}
      blocks={[
        {
          type: 'heading',
          label: 'Mô tả tình huống',
          text: 'Trưởng nhóm C và mâu thuẫn nội bộ',
        },
        {
          type: 'body',
          html: 'Trong nhóm học tập C, trưởng nhóm đối mặt với mâu thuẫn giữa <strong>lợi ích cá nhân của các thành viên</strong> và <strong>mục tiêu chung của tập thể</strong>. Một số thành viên thiếu tích cực, công việc phân bổ không đồng đều, dẫn đến xung đột và nguy cơ tan rã nhóm.',
        },
        {
          type: 'highlight',
          label: '⇄ Liên hệ lý luận',
          html: 'Tình huống thể hiện rõ mối quan hệ biện chứng <strong>Cá nhân – Xã hội</strong>: cá nhân (thành viên) phải đặt lợi ích cá nhân trong mối quan hệ với lợi ích tập thể (nhóm). Trưởng nhóm đóng vai trò như một <strong>lãnh tụ vi mô</strong> — cần dẫn dắt, tổ chức và định hướng.',
        },
        {
          type: 'heading',
          label: 'Phân tích theo góc độ Mác–Lênin',
          text: 'Quan hệ Quần chúng & Lãnh tụ trong nhóm nhỏ',
        },
        {
          type: 'bullet-list',
          items: [
            '<strong>Quần chúng nhân dân</strong> (các thành viên nhóm) là <strong>động lực</strong> — không có sự tham gia tích cực của họ, nhóm không thể hoàn thành nhiệm vụ',
            '<strong>Lãnh tụ</strong> (trưởng nhóm) cần <strong>nhận thức đúng quy luật</strong>: phân công hợp lý, lắng nghe nguyện vọng, đặt mục tiêu chung lên trên',
            'Tránh <strong>độc đoán</strong> (tuyệt đối hóa vai trò cá nhân) và tránh <strong>buông lỏng</strong> (xem nhẹ vai trò định hướng)',
          ],
        },
        {
          type: 'heading',
          label: 'Giải pháp đề xuất',
          text: 'Ứng dụng nguyên tắc biện chứng',
        },
        {
          type: 'numbered-list',
          items: [
            '<strong>Họp nhóm dân chủ</strong> — để từng thành viên bày tỏ khó khăn, xác định nguyên nhân mâu thuẫn',
            '<strong>Phân công lại công việc</strong> dựa trên năng lực và điều kiện thực tế của mỗi người — đảm bảo công bằng',
            '<strong>Xây dựng mục tiêu chung</strong> mà cả nhóm cùng cam kết — biến lợi ích cá nhân thành động lực tập thể',
            '<strong>Định kỳ đánh giá</strong> tiến độ và điều chỉnh — áp dụng tư duy biện chứng: không cố định, luôn vận động',
          ],
        },
        {
          type: 'highlight',
          label: '◉ Kết luận',
          html: 'Tình huống trưởng nhóm C minh họa sinh động rằng <strong>lý luận triết học Mác–Lênin không phải lý thuyết trừu tượng</strong> — mà là <strong>phương pháp tư duy thực tiễn</strong> có thể áp dụng vào giải quyết các vấn đề tập thể ngay trong đời sống học tập hàng ngày.',
        },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function TheorySections() {
  return (
    <>
      <SectionCaNhanXaHoi />
      <SectionQuanChungLanhTu />
      <SectionCaseStudy />
    </>
  );
}