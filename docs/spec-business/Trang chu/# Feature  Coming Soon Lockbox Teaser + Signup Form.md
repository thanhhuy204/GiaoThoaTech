# Feature : Coming Soon Lockbox Teaser + Signup Form

## 1. Business Goal
Giới thiệu sản phẩm Lockbox sắp ra mắt, tạo sự chú ý và thu thập email lead chất lượng để xây dựng danh sách chờ (waitlist), cung cấp ưu tiên đặt hàng và cập nhật độc quyền khi pre-order mở.

## 2. Actors
- Visitor quan tâm sản phẩm mới (Lockbox)
- Potential User (chủ nhà cho thuê, quản lý bất động sản, doanh nghiệp cần hộp khóa thông minh)

## 3. Preconditions
- Trang chủ load thành công
- Phần này hiển thị ngay dưới Hero Banner.

## 4. Main Flow
1. Hiển thị khối với hình ảnh Lockbox bên trái (tay cầm sản phẩm, nền đỏ cam)
2. Hiển thị tiêu đề bên phải: "Tough Protection. Trusted Access"
3. Hiển thị dòng phụ: "The igloo Lockbox. Coming Soon."
4. Hiển thị mô tả: "Be the first to experience it. Sign up for exclusive launch updates — and get priority access to reserve your unit when pre-orders open."
5. Hiển thị form đăng ký:
   - Name (tùy chọn)
   - Email* (bắt buộc)
   - Region* (dropdown lựa chọn khu vực: North America, EU, UK, APAC)
6. Người dùng điền form → nhấn "Reserve your spot" (nút cam)
7. Submit thành công → hiển thị thông báo "Thank you for subscribing! We’ll only contact you with updates about the igloo Lockbox launch."

## 5. Business Rules
- Field Email và Region là bắt buộc
- Form chỉ submit khi validate email hợp lệ.
- Sau submit, form thay bằng thông báo thành công
- Không reload trang khi submit (AJAX)

## 6. Edge Cases
- Email không hợp lệ → lỗi inline "Please enter a valid email address."
- Submit thất bại (mạng/server) → thông báo lỗi.
- Double submit → nút disable trong lúc xử lý
- JavaScript tắt → form vẫn submit nhưng không validate client-side

## 7. Security Requirements
- Submit form dùng HTTPS
- Giới hạn số lần gửi form trong một khoảng thời gian để chống spam/bot
- Backend validate và sanitize input, không lưu plaintext

## 8. Acceptance Criteria

### AC-01: Hiển thị khối Coming Soon Lockbox

Given
- Visitor truy cập trang chủ

When
- Trang được tải

Then
- Hệ thống hiển thị hình ảnh Lockbox bên trái
- Hệ thống hiển thị tiêu đề "Tough Protection. Trusted Access"
- Hệ thống hiển thị dòng phụ "The igloo Lockbox. Coming Soon."
- Hệ thống hiển thị mô tả giới thiệu sản phẩm

### AC-02: Hiển thị form đăng ký

Given
- Khối Coming Soon Lockbox đang hiển thị

When
- Visitor xem phần đăng ký

Then
- Hệ thống hiển thị form gồm:
- Name (tùy chọn)
- Email (bắt buộc)
- Region (dropdown bắt buộc)

### AC-03: Submit form thành công

Given
- Visitor nhập email hợp lệ
- Visitor chọn Region

When
- Visitor nhấn nút "Reserve your spot"

Then
- Hệ thống gửi dữ liệu đến backend
- Hệ thống hiển thị thông báo "Thank you for subscribing"

### AC-04: Email không hợp lệ

Given
- Visitor nhập email không hợp lệ

When
- Visitor nhấn "Reserve your spot"

Then
- Hệ thống hiển thị lỗi "Please enter a valid email address"
- Form không được submit

### AC-05: Lỗi submit form

Given
- Visitor gửi form hợp lệ

When
- Xảy ra lỗi mạng hoặc lỗi server

Then
- Hệ thống hiển thị thông báo lỗi
- Visitor có thể thử gửi lại

### AC-06: Submit không reload trang

Given
- Visitor gửi form

When
- Form được xử lý

Then
- Trang không bị reload
- Form được xử lý bằng AJAX