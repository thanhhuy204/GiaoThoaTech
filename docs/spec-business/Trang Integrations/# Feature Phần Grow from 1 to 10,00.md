# Feature: Phần "Grow from 1 to 10,000 properties" 
## 1. Business Goal
Nhấn mạnh khả năng mở rộng nhanh chóng của giải pháp igloo (từ 1 đến 10,000 bất động sản mà không mất nhiều thời gian), thu hút doanh nghiệp đang tìm giải pháp scale dễ dàng.

## 2. Actors
- Visitor doanh nghiệp đang mở rộng quy mô
- Potential B2B User cần giải pháp tích hợp nhanh

## 3. Preconditions
- Trang Integrations load thành công

## 4. Main Flow
1. Người dùng truy cập trang Integrations (/integrations)
2. Hệ thống hiển thị hero section (phần đầu tiên, above the fold) với nền tối (#0f0f0f)
3. Hiển thị tiêu đề H1: "GROW FROM 1 to 10,000 properties in no time" — chữ "10,000" màu cam
4. Hiển thị mô tả: "Need a smart lock ecosystem that scales with you? With igloo's friendly, easy-to-use software, no full stack development team needed — grow from 1 to 100,000 properties fast."
5. Không có CTA button trong section này (CTA riêng ở phần cuối trang — FEAT-014)

## 5. Business Rules
- Tiêu đề và mô tả phải chính xác như đã định nghĩa — không thay đổi nội dung
- Section nằm đầu trang Integrations — hiển thị above the fold
- Nền tối (#0f0f0f) để phân biệt với các section bên dưới
- Không có dữ liệu động — toàn bộ hardcode
- Font tiêu đề: Playfair Display, bold, uppercase

## 6. Edge Cases
- Font Playfair Display không load → fallback Georgia, serif
- JavaScript tắt → section hiển thị đầy đủ tĩnh, không animation
- Màn hình rất hẹp (≤320px) → font scale nhỏ nhất, padding giảm
- Text quá dài trên mobile → tự xuống dòng, không overflow

## 7. Security Requirements
- Không có dữ liệu nhạy cảm
- Không có form hay input
- Không dùng dangerouslySetInnerHTML

## 8. Acceptance Criteria
- Section hiển thị đúng nội dung tiêu đề: "GROW FROM 1 to 10,000 properties in no time"
- Tiêu đề dùng font Playfair Display, bold, uppercase; chữ "10,000" màu cam
- Mô tả hiển thị đúng nội dung đã quy định
- Nền tối (#0f0f0f), chữ trắng và cam theo đúng design system
- Section là phần đầu tiên (top) của trang Integrations
- Responsive: font scale đúng theo breakpoint (3rem desktop, 2.2rem tablet, 1.75rem mobile)
- Animation fadeUp khi mount
- Nội dung không bị cắt hoặc overflow trên bất kỳ viewport nào