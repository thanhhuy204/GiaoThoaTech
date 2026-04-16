# Feature : Product Showcase

## 1. Business Goal
Giới thiệu danh sách sản phẩm smart lock chính, nhấn mạnh giải thưởng và độ bền, nhằm khuyến khích người dùng click vào trang chi tiết sản phẩm.

## 2. Actors
- Visitor đang tìm sản phẩm
- Potential User (cá nhân hoặc doanh nghiệp)

## 3. Preconditions
- Trang chủ load thành công
- Phần này hiển thị khi kéo xuống hoặc chuyển từ nút "Xem sản phẩm"

## 4. Main Flow
1. Người dùng kéo xuống trang chủ hoặc click nút "See Products" từ Hero
2. Hệ thống hiển thị khối Product Showcase
3. Hiển thị tiêu đề: "Discover our award-winning smart lock lineup"
4. Hiển thị lưới 5 sản phẩm nổi bật theo thứ tự cố định:
   - Deadbolt Go — Khóa cửa thông minh với vân tay
   - Keybox 3 — Hộp khóa thông minh cho giao chìa
   - Padlock 2 — Ổ khóa thông minh cấp quân sự
   - Cellular Deadbolt — Khóa cửa di động đầu tiên trên thế giới
   - Padlock Lite — Ổ khóa vân tay di động
5. Mỗi sản phẩm trong card: hình ảnh, tên, mô tả ngắn (tối đa 2 dòng), badge giải thưởng (nếu có), nút "Learn More"
6. Click card hoặc "Learn More" → navigate đến /products/[slug]

## 5. Business Rules
- Chỉ hiển thị đúng 5 sản phẩm nổi bật hiện tại — thứ tự cố định
- Hình ảnh có alt text đầy đủ
- Tải nhanh (dưới 2.5 giây cho toàn lưới) — dùng next/image lazy-load
- Không lộ ID nội bộ sản phẩm trong URL (dùng slug)
- Award badges hiển thị màu gold nếu có
- Mô tả ngắn: tối đa 100 ký tự (tối đa 2 dòng)

## 6. Edge Cases
- Hình sản phẩm không tải → placeholder (gray box) + tên vẫn rõ
- Data product bị null/undefined → ẩn card, hiển thị các card còn lại
- Description quá dài → truncate + "..." ellipsis
- JavaScript bị tắt → cards tĩnh, vẫn clickable như thẻ liên kết
- Mobile (<768px) → stack thành 1 cột, full width

## 7. Security Requirements
- Hình ảnh và liên kết chi tiết dùng HTTPS
- Không lộ ID nội bộ sản phẩm — dùng slug đọc được
- Link điều hướng dùng next/link — không dùng window.location.href

## 8. Acceptance Criteria

### AC-01: Hiển thị tiêu đề và lưới sản phẩm

Given
- Visitor truy cập trang chủ và cuộn đến phần Product Showcase

When
- Trang được tải

Then
- Hệ thống hiển thị tiêu đề "Discover our award-winning smart lock lineup"
- Hệ thống hiển thị lưới đúng 5 product cards

### AC-02: Hiển thị thông tin mỗi sản phẩm

Given
- Lưới sản phẩm đang hiển thị

When
- Visitor xem một sản phẩm bất kỳ

Then
- Card hiển thị: hình ảnh sản phẩm, tên, mô tả ngắn
- Hình ảnh có alt text đầy đủ
- Award badge hiển thị màu gold (nếu có)

### AC-03: Click card chuyển đến trang chi tiết

Given
- Product card đang hiển thị

When
- Visitor click card hoặc nút "Learn More"

Then
- Hệ thống navigate đến /products/[slug]
- Trang chi tiết sản phẩm load thành công

### AC-04: Responsive grid

Given
- Lưới sản phẩm đang hiển thị

When
- Visitor xem trên các thiết bị khác nhau

Then
- Desktop (≥1024px): 5 cột
- Tablet (768px–1023px): 3 cột
- Mobile (≤767px): 1 cột

### AC-05: Xử lý khi hình ảnh không tải

Given
- Hình ảnh sản phẩm không tải được

When
- Trang được tải

Then
- Hệ thống hiển thị placeholder (gray box)
- Tên, mô tả và nút "Learn More" vẫn hiển thị đầy đủ