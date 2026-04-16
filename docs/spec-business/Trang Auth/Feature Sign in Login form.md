# Feature: Sign in / Login form 

## 1. Business Goal
Cho phép người dùng đã có tài khoản đăng nhập để truy cập dashboard/portal quản lý thiết bị, API, integration, marketplace hoặc enterprise solution.

## 2. Actors
- User đã có tài khoản
- Visitor muốn đăng nhập để quản lý thiết bị / API / dịch vụ

## 3. Preconditions
- Trang portal load thành công

## 4. Main Flow
1. Hiển thị tiêu đề "Đăng nhập tài khoản của bạn"
2. Hiển thị trường:
   - Email (input email)
   - Mật khẩu (input password với icon mắt để hiện/ẩn)
3. Hiển thị link "Quên mật khẩu?" (căn phải, bên dưới trường mật khẩu)
4. Hiển thị nút "Tiếp tục" (màu cam)
5. Hiển thị link "Chưa có tài khoản? Đăng ký" bên dưới nút
6. User điền Email + Password → nhấn "Tiếp tục" → hệ thống xác thực
7. Thành công → redirect đến dashboard/portal phù hợp với quyền tài khoản
8. Thất bại → hiển thị lỗi "Invalid email or password"

## 5. Business Rules
- Email phải đúng định dạng trước khi submit
- Sau login thành công, hệ thống tự động redirect đến portal phù hợp (không yêu cầu chọn lại)
- "Quên mật khẩu?" dẫn đến trang /auth/forgot-password
- "Đăng ký" dẫn đến trang /auth/register
- Error message "Invalid email or password" — không tiết lộ trường nào sai (bảo mật)
- Session còn hạn → redirect thẳng đến dashboard (bỏ qua trang login)

## 6. Edge Cases
- Email/Password trống → lỗi inline từng trường ("Email is required", "Password is required")
- Email sai định dạng → lỗi "Invalid email"
- Sai email hoặc password → lỗi "Invalid email or password" (không tiết lộ trường nào sai)
- Tài khoản bị khóa → "Your account has been suspended"
- Server error → "Something went wrong. Please try again."
- Mạng chậm → nút disable + spinner loading khi submit
- Session còn hạn → redirect thẳng đến dashboard

## 7. Security Requirements
- Form submit dùng HTTPS
- Password input type="password"
- Backend hash + so sánh password — không trả về plaintext
- Rate limit chống brute-force (ví dụ: khóa 5 phút sau 5 lần sai)
- Error message chung chung, không tiết lộ email có tồn tại hay không

## 8. Acceptance Criteria

### AC-01: Hiển thị form login đầy đủ
Given
- Trang login portal load thành công
When
- Người dùng xem trang
Then
- Hiển thị tiêu đề "Đăng nhập tài khoản của bạn"
- Hiển thị trường Email + Mật khẩu với icon mắt (hiện/ẩn)
- Hiển thị link "Quên mật khẩu?" căn phải
- Hiển thị nút "Tiếp tục" màu cam
- Hiển thị link "Chưa có tài khoản? Đăng ký"

### AC-02: Login thành công
Given
- User có tài khoản hợp lệ
When
- Điền đúng Email + Password
- Nhấn "Continue"
Then
- Xác thực thành công
- Redirect đến dashboard/portal phù hợp với quyền tài khoản
- Không hiển thị lỗi

### AC-03: Login thất bại
Given
- Email tồn tại
When
- Điền password sai
- Nhấn "Continue"
Then
- Hiển thị lỗi "Invalid email or password"
- Vẫn ở trang login

### AC-04: Link "Sign up here" hoạt động
Given
- Trang login đang hiển thị
When
- Click "Register here"((ở phần đăng nhập của iglooaccess))
Then
- Chuyển hướng đến trang đăng ký (Register form)
- Trang đích load thành công