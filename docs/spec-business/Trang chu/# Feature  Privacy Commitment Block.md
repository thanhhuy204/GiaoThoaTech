# Feature : Privacy Commitment Block (Cam kết bảo mật)

## 1. Business Goal
Nhấn mạnh cam kết bảo mật dữ liệu nghiêm ngặt (tuân thủ GDPR, không bán dữ liệu), xây dựng lòng tin cho khách hàng cá nhân và doanh nghiệp khi truy cập website.

## 2. Actors
- Visitor quan tâm đến bảo mật dữ liệu
- Potential User doanh nghiệp (cần đảm bảo an toàn thông tin)

## 3. Preconditions
- Trang chủ load thành công

## 4. Main Flow
1. Hiển thị khối với nền gradient xanh-đen
2. Hiển thị tiêu đề: "Data privacy.Nothing else matters."
3. Hiển thị nội dung: "Having an iron clad commitment to the compliance of GDPR, international data privacy laws and standards, we safeguard our users access data as if it were our own."
4. Hiển thị nút "Đọc thêm" → chuyển đến trang Chính sách bảo mật

## 5. Business Rules
- Nội dung phải chính xác, không thay đổi tùy ý
- Nền gradient để khối nổi bật hơn các phần khác
- Nút "Read more" chuyển đến trang Chính sách bảo mật

## 6. Edge Cases
- Nền gradient không tải được → dùng màu nền đơn thay thế
- JavaScript bị tắt → nội dung và nút vẫn hiển thị đầy đủ

## 7. Security Requirements
- Liên kết "Read more" dùng HTTPS
- Không hiển thị dữ liệu cá nhân trong khối

## 8. Acceptance Criteria

### AC-01: Hiển thị khối Privacy Commitment

Given
- Visitor truy cập trang chủ

When
- Trang được tải và cuộn đến phần Privacy Commitment

Then
- Hệ thống hiển thị khối với nền gradient xanh-đen
- Hệ thống hiển thị tiêu đề "Data privacy. Nothing else matters."
- Hệ thống hiển thị nội dung cam kết bảo mật

### AC-02: Hiển thị nút "Read more"

Given
- Khối Privacy Commitment đang hiển thị

When
- Visitor xem phần này

Then
- Hệ thống hiển thị nút "Read more"

### AC-03: Chuyển đến trang Chính sách bảo mật

Given
- Nút "Read more" đang hiển thị

When
- Visitor nhấn vào nút

Then
- Hệ thống chuyển đến trang Chính sách bảo mật

### AC-04: Xử lý khi nền gradient không tải

Given
- Nền gradient của khối không tải được

When
- Trang được tải

Then
- Hệ thống hiển thị màu nền thay thế
- Nội dung và nút "Read more" vẫn hiển thị đầy đủ