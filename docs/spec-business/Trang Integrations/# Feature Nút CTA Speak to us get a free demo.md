# Feature: Nút CTA "Speak to us — get a free demo"

## 1. Business Goal

Khuyến khích khách hàng liên hệ trực tiếp ngay sau khi đã xem toàn bộ nội dung trang Integrations, nhằm tăng tỷ lệ chuyển đổi lead. CTA nằm cuối trang để capture visitor đang ở trạng thái quyết định cao nhất.

## 2. Actors

- Visitor quan tâm tích hợp — visitor đã đọc xong trang và muốn tìm hiểu thêm
- Potential B2B User — người đã đánh giá xong và sẵn sàng liên hệ bước tiếp theo

## 3. Preconditions

- Trang Integrations (/integrations) load thành công trên HTTPS
- Trang liên hệ (/contact) đã tồn tại
- Section nằm ở cuối trang Integrations — sau Key features list (FEAT-013)

## 4. Main Flow

1. Người dùng cuộn đến cuối trang Integrations, thấy CTA section
2. Hệ thống hiển thị pre-headline: "GET IN TOUCH"
3. Hệ thống hiển thị tiêu đề H2: "Ready to grow with igloo?"
4. Hệ thống hiển thị sub-text: "Talk to our team and get a free demo tailored to your business needs."
5. Hiển thị nút CTA: "Speak to us — get a free demo" (màu cam #E8614A)
6. Người dùng click nút → hệ thống navigate đến /contact?ref=integrations-cta
7. Trang không reload — dùng client-side navigation (next/link)

## 5. Business Rules

- Nút màu cam nổi bật (#E8614A) — không thay đổi màu
- Text nút cố định: "Speak to us — get a free demo" — không viết tắt hay thay đổi
- Navigate đến /contact kèm ref param: ?ref=integrations-cta
- Section nằm ở cuối trang — sau tất cả content sections (FEAT-011, 012, 013)
- Nền tối (#0f0f0f) để tạo visual closure cho trang và làm nút cam nổi bật tối đa
- Không dùng window.open() — navigate trong cùng tab
- Nút có aria-label đầy đủ

## 6. Edge Cases

- JavaScript tắt → nút render là thẻ a href="/contact?ref=integrations-cta" — điều hướng bình thường
- Mạng chậm → client-side navigation của Next.js xử lý — không cần loading state đặc biệt
- Người dùng dùng bàn phím (Tab → Enter) → focus ring hiển thị rõ, Enter navigate đúng trang
- Màn hình rất hẹp (≤320px) → nút full-width, text không bị cắt

## 7. Security Requirements

- Navigate dùng next/link — không dùng window.location
- Không có form hay input trong component này
- Không dùng dangerouslySetInnerHTML

## 8. Acceptance Criteria

- Section hiển thị đúng ở cuối trang Integrations (sau Key features)
- Pre-headline "GET IN TOUCH" hiển thị đúng style (uppercase, nhỏ, mờ)
- Tiêu đề "Ready to grow with igloo?" dùng font Playfair Display
- Sub-text hiển thị đúng nội dung
- Nút "Speak to us — get a free demo" hiển thị đúng màu cam #E8614A
- Click nút → navigate đến /contact?ref=integrations-cta (không reload trang)
- Hover nút: background #d44f39, translateY(-2px)
- Focus ring hiển thị khi Tab đến nút
- Khi JavaScript tắt: nút vẫn navigate được qua thẻ a href
- Nền section #0f0f0f
- Nút có aria-label đầy đủ
- Animation fadeUp stagger khi scroll vào viewport
