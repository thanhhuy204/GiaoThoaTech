# Feature: Danh sách Key features (6 bullet)

## 1. Business Goal

Liệt kê súc tích 6 lợi ích kỹ thuật và hỗ trợ chính của giải pháp tích hợp igloo, giúp khách hàng doanh nghiệp và kỹ sư thấy rõ lý do chọn igloo (dễ dùng, không cần big team, scale nhanh, có hỗ trợ tận tâm), từ đó tăng khả năng liên hệ demo.

## 2. Actors

- Visitor doanh nghiệp cần tích hợp API — CTO, tech lead đánh giá về độ phức tạp kỹ thuật
- Potential B2B User quan tâm lợi ích kỹ thuật — developer, product manager cần biết support level

## 3. Preconditions

- Trang Integrations (/integrations) load thành công trên HTTPS
- Section nằm bên dưới 4 khối giải pháp (FEAT-012) trên trang Integrations

## 4. Main Flow

1. Người dùng cuộn xuống trang Integrations, thấy phần Key features
2. Hệ thống hiển thị tiêu đề: "Key features"
3. Hiển thị danh sách 6 bullet theo thứ tự cố định:
   1. Super simple documentation and easy to use API
   2. Minimal Coding Required
   3. Scale Fast
   4. Don't need full stack development team to get started
   5. Dedicated Account Manager
   6. 24/7 Customer Support
4. Mỗi bullet có icon check SVG màu cam (#E8614A) phía trước
5. Không có tương tác — phần trình bày tĩnh

## 5. Business Rules

- Danh sách đúng 6 bullet — không thêm, không bớt
- Nội dung từng bullet chính xác 100% như đã định nghĩa — không paraphrase
- Thứ tự cố định từ 1 đến 6
- Mỗi bullet bắt buộc có icon check SVG màu cam — không dùng Unicode character hay emoji
- Layout: 2 cột desktop (≥768px), 1 cột mobile (≤767px)
- Toàn bộ content hardcode, không fetch từ API

## 6. Edge Cases

- JavaScript tắt → danh sách hiển thị đầy đủ tĩnh, không animation — chấp nhận được
- Font Playfair Display không load → fallback Georgia, serif — heading vẫn đọc được
- Màn hình rất hẹp (≤320px) → 1 cột, padding giảm, font giảm nhẹ
- Text bullet quá dài wrap → wrap tự nhiên, icon check vẫn align-top đúng

## 7. Security Requirements

- Không có form, input hay dữ liệu nhạy cảm
- Không dùng dangerouslySetInnerHTML
- Toàn bộ content hardcode, không fetch từ API

## 8. Acceptance Criteria

- Section hiển thị tiêu đề "Key features" đúng font Playfair Display
- Hiển thị đúng 6 bullet theo thứ tự quy định
- Nội dung từng bullet chính xác 100%
- Mỗi bullet có icon check SVG màu cam (#E8614A)
- Grid 2 cột desktop, 1 cột mobile
- Animation fadeUp + stagger khi scroll vào viewport
- Accessibility: dùng thẻ ul + li semantic, icon check có aria-hidden="true"
- Không dùng inline style (chỉ Tailwind className)
