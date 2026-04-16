# Feature: Giải thích công nghệ offline

## 1. Business Goal

Giải thích rõ ràng cách sản phẩm hoạt động offline thông qua công nghệ AccessAnywhere™ và algoPIN™, giúp khách hàng hiểu được giá trị độc đáo mà không cần kết nối Internet liên tục. Đây là điểm khác biệt cạnh tranh quan trọng nhất của sản phẩm.

## 2. Actors

- Prospect kỹ thuật — người đánh giá tính khả thi triển khai, cần hiểu cơ chế offline
- Decision maker — quan tâm đến rủi ro downtime khi mất mạng
- End user — người dùng cuối muốn biết cách dùng PIN khi không có điện thoại

## 3. Preconditions

- Trang chi tiết sản phẩm load thành công
- ProductDetail.offlineTech được populate với dữ liệu đầy đủ
- Section chỉ hiển thị nếu sản phẩm hỗ trợ offline (supportsOffline: true)

## 4. Main Flow

1. Render tiêu đề section: "Offline Access Technology"
2. Render sub-headline: "AccessAnywhere™ — hoạt động không cần Wi-Fi"
3. Render mô tả: "Không cần Wi-Fi hay kết nối mạng, algoPIN™ tạo mã truy cập ngay trên thiết bị của bạn."
4. Render đúng 4 loại PIN dưới dạng card grid (2×2 desktop, 1 cột mobile):
   - One-time PIN — Dùng một lần, tự hủy sau khi mở khóa
   - Duration PIN — Hợp lệ trong khoảng thời gian xác định (ví dụ: 2 giờ, 1 ngày)
   - Recurring PIN — Lặp lại theo lịch định kỳ (ví dụ: mỗi thứ Hai 9:00–17:00)
   - Permanent PIN — Không giới hạn thời gian, thu hồi thủ công
5. Render disclaimer: "algoPIN™ không tiết lộ chi tiết thuật toán mã hóa."

## 5. Business Rules

- Phải hiển thị đúng 4 loại PIN theo thứ tự: One-time, Duration, Recurring, Permanent
- Mô tả công nghệ không tiết lộ chi tiết thuật toán algoPIN™ (chỉ mô tả hành vi người dùng)
- Section chỉ render khi supportsOffline === true
- Thứ tự 4 PIN card cố định, không thay đổi
- Label "algoPIN™" và "AccessAnywhere™" luôn có ký hiệu ™, không rút gọn
- Mỗi PIN card có icon riêng biệt (không dùng emoji)

## 6. Edge Cases

- Sản phẩm không hỗ trợ offline → ẩn toàn bộ section, không render
- offlineTech.description trống → dùng fallback copy default
- Màn hình rất nhỏ (<360px) → 1 cột, card padding giảm xuống 16px
- Thiếu icon cho PIN type → fallback icon chung (key/lock SVG)

## 7. Security Requirements

- Không mô tả chi tiết thuật toán tạo PIN để tránh rủi ro bảo mật
- Content từ CMS không render qua dangerouslySetInnerHTML
- Không hiển thị sample PIN thực tế

## 8. Acceptance Criteria

### AC-01: Hiển thị đúng tiêu đề và mô tả offline

Given
- Trang chi tiết sản phẩm đã load thành công (sản phẩm hỗ trợ offline)

When
- Người dùng scroll đến phần công nghệ offline

Then
- Hiển thị tiêu đề "Offline Access Technology"
- Hiển thị sub-headline về AccessAnywhere™
- Hiển thị mô tả về algoPIN™ tạo mã không cần Wi-Fi

### AC-02: Liệt kê đúng 4 loại PIN

Given
- Trang chi tiết sản phẩm đã load thành công

When
- Người dùng xem phần công nghệ offline

Then
- Hiển thị đúng 4 PIN card theo thứ tự: One-time, Duration, Recurring, Permanent
- Mỗi card có icon riêng biệt, tên và mô tả
- Layout 2×2 trên desktop, 1 cột trên mobile

### AC-03: Section ẩn khi sản phẩm không hỗ trợ offline

Given
- Sản phẩm có supportsOffline === false

When
- Trang được tải

Then
- Section ẩn hoàn toàn, không render bất kỳ nội dung nào

### AC-04: Nội dung hiển thị đầy đủ trên mọi thiết bị

Given
- Trang đang hiển thị trên desktop hoặc mobile

When
- Người dùng resize cửa sổ hoặc mở trên thiết bị mobile

Then
- Toàn bộ tiêu đề, mô tả và 4 PIN card hiển thị đầy đủ
- Không bị cắt chữ, không overflow, không lỗi layout
