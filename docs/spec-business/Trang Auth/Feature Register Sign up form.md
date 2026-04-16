# Feature: Register / Sign up form

## 1. Business Goal
Cho phép người dùng mới tạo tài khoản để truy cập các dịch vụ API, integration, marketplace, enterprise solution, tăng lượng user đăng ký và chuyển đổi thành khách hàng trả phí.

## 2. Actors
- Visitor  
- Potential User  

## 3. Preconditions
- Trang đăng ký load thành công (từ link "Register here")  
- User chưa đăng nhập tài khoản igloohome  

---

## 4. Main Flow
1. Hiển thị tiêu đề **"Đăng ký."**
2. Hiển thị form các trường:
   - Tên đăng nhập* (input text, placeholder: "Nhập tên đăng nhập của bạn")
   - Email* (input email, placeholder: "Nhập email của bạn")
   - Số điện thoại (optional, input tel)
   - Mật khẩu* (input password, có icon mắt hiện/ẩn + strength bar)
   - Xác nhận mật khẩu* (input password, có icon mắt hiện/ẩn)
3. Hiển thị nút **"Đăng ký"** (màu cam)
4. Hiển thị link "Đã có tài khoản? Đăng nhập" → dẫn đến trang login
5. User điền đầy đủ → nhấn đăng ký → hệ thống validate → tạo tài khoản → hiển thị màn hình thành công (icon check, "Account created!", nút "Sign in now") → redirect login

---

## 5. Business Rules
- Các trường có `*` là bắt buộc
- Username (tên đăng nhập) không được trùng, tối thiểu 3 ký tự
- Email: đúng định dạng, chưa tồn tại trong hệ thống
- Password: ít nhất 8 ký tự, có chữ hoa, có ký tự đặc biệt
- Password strength bar hiển thị realtime khi nhập (Weak/Fair/Good/Strong)
- Không cho phép submit nếu thiếu trường bắt buộc hoặc validation fail
- Sau đăng ký thành công → hiển thị màn hình success → user click để đến trang login
- Rate limit chống spam đăng ký

---

## 6. Edge Cases
- Trường bắt buộc trống → lỗi inline từng trường (ví dụ: `"Email is required"`)
- Username đã tồn tại → `"Username already exists."`
- Email đã tồn tại → `"Email already registered"`
- Email sai định dạng → `"Invalid email"`
- Password không đủ điều kiện → lỗi `"Password must be at least 8 characters, include an uppercase letter and a special character"`
- Xác nhận mật khẩu không khớp → `"Passwords do not match"`
- Mạng chậm → nút disable + spinner loading khi submit
- JavaScript tắt → form submit server-side (không có validation client-side)

---

## 7. Security Requirements
- Form submit dùng HTTPS  
- Backend validate & sanitize input (chống SQL Injection, XSS)  
- Không lưu dữ liệu nhạy cảm dạng plaintext  

---

## 8. Acceptance Criteria

### AC-01: Hiển thị form đăng ký đầy đủ
**Given**  
Trang đăng ký load thành công  

**When**  
Người dùng xem trang  

**Then**
- Hiển thị tiêu đề "Register"
- Hiển thị ghi chú "* indicates required field"
- Hiển thị tất cả trường (bắt buộc & optional)
- Hiển thị nút "Submit" màu cam

---

### AC-02: Đăng ký thành công với thông tin hợp lệ
**Given**
- User điền đầy đủ các trường bắt buộc  
- Username chưa tồn tại  
- Email chưa tồn tại  

**When**
User nhấn "Submit"  

**Then**
- Validate thành công  
- Tạo tài khoản mới  
- Redirect đến dashboard/portal  

---

### AC-03: Trường bắt buộc trống
**Given**
Trang đăng ký đang hiển thị  

**When**
- User để trống ít nhất 1 trường (*)  
- Nhấn "Submit"  

**Then**
- Hiển thị lỗi inline từng trường  
- Không submit form  
- Không chuyển trang  

---

### AC-04: Username đã tồn tại
**Given**
Username đã được đăng ký  

**When**
- User nhập Username trùng  
- Nhấn "Submit"  

**Then**
- Hiển thị lỗi `"Username already exists."`
- Không tạo tài khoản  
- User vẫn ở trang đăng ký  

---

### AC-05: Email đã tồn tại
**Given**
Email đã được đăng ký  

**When**
- User nhập email trùng  
- Nhấn "Submit"  

**Then**
- Hiển thị lỗi `"Email already registered"`
- Không tạo tài khoản  
- User vẫn ở trang đăng ký  

---

### AC-06: Mật khẩu không đủ điều kiện
**Given**
Trang đăng ký đang hiển thị  

**When**
- User nhập Password không hợp lệ  
- Nhấn "Submit"  

**Then**
- Hiển thị lỗi:  
  `"Password must be at least 8 characters, include an uppercase letter and a special character"`
- Không submit form  

---

### AC-07: Xác nhận mật khẩu không khớp
**Given**
Trang đăng ký đang hiển thị  

**When**
- Password và Confirm Password không giống nhau  
- Nhấn "Submit"  

**Then**
- Hiển thị lỗi `"Passwords do not match"`
- Không submit form  

---

### AC-08: Form hoạt động trên mobile
**Given**
Trang đăng ký hiển thị trên mobile  

**When**
User điền form và submit  

**Then**
- Submit thành công hoặc hiển thị lỗi đúng  
- Không lỗi layout  
- Input dễ nhập  
- Nút "Submit" dễ click  