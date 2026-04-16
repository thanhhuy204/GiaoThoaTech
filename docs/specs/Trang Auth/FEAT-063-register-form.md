# FEAT-063: Register / Sign Up Form

**Trạng thái:** Implemented
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/[locale]/auth/register/register-content.tsx`
**Route:** `/[locale]/auth/register`

---

## 1. Business Goal

Cho phép người dùng mới tạo tài khoản giaothoatech để truy cập các dịch vụ API, integration, marketplace, enterprise solution. Tăng lượng user đăng ký và chuyển đổi thành khách hàng trả phí.

---

## 2. Actors

- **Visitor** — khách chưa có tài khoản, truy cập từ link "Register here"
- **Potential User** — người dùng tiềm năng muốn dùng giaothoatech

---

## 3. Preconditions

- Trang đăng ký load thành công (thường từ link "Register here" ở trang login)
- User chưa đăng nhập tài khoản giaothoatech

---

## 4. Main Flow

1. Hiển thị tiêu đề `"Đăng ký."`
2. Hiển thị form các trường:
   - `Tên đăng nhập *` (input text, placeholder: "Nhập tên đăng nhập của bạn")
   - `Email *` (input email, placeholder: "Nhập email của bạn")
   - `Số điện thoại` (input tel — optional, placeholder: "Nhập số điện thoại của bạn")
   - `Mật khẩu *` (input password, có icon mắt hiện/ẩn + strength bar)
   - `Xác nhận mật khẩu *` (input password, có icon mắt hiện/ẩn)
3. Hiển thị nút `"Đăng ký"` màu cam
4. Hiển thị link `"Đã có tài khoản? Đăng nhập"`
5. User điền đầy đủ → nhấn Đăng ký → hệ thống validate → tạo tài khoản → tự động đăng nhập → redirect trang chủ

---

## 5. UI Specification

### Layout

- Trang chia 2 cột (desktop): cột trái hình ảnh/branding, cột phải form
- Cột trái hiển thị bullet features (branding)
- Mobile: 1 cột, form chiếm toàn bộ
- Form tối đa `480px` width, căn giữa cột phải
- Padding: `48px 40px` desktop, `32px 20px` mobile

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Tiêu đề | `#111111` |
| Label | `#374151` |
| Input border (default) | `#D1D5DB` |
| Input border (focus) | `#E8614A` |
| Input border (error) | `#EF4444` |
| Error text | `#EF4444` |
| Nút Submit | `#E8614A` (cam) |
| Nút Submit hover | `#D14A35` |
| Background trang | `#F9FAFB` |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề H1 | `2rem`, font-weight 700, `"Đăng ký."` |
| Label | `0.875rem`, font-weight 500 |
| Input text | `1rem` |
| Error message | `0.8rem`, color đỏ |
| Link "Đăng nhập" | `0.875rem`, color `#E8614A` |

### Các trường input

| Tên trường | Type | Required | Placeholder | Validation |
|---|---|---|---|---|
| Tên đăng nhập | text | ✅ | Nhập tên đăng nhập của bạn | Không được trùng, tối thiểu 3 ký tự |
| Email | email | ✅ | Nhập email của bạn | Đúng định dạng, chưa tồn tại trong hệ thống |
| Số điện thoại | tel | ❌ | Nhập số điện thoại của bạn | Tùy chọn |
| Mật khẩu | password | ✅ | `••••••••` | ≥8 ký tự, có chữ hoa, có ký tự đặc biệt |
| Xác nhận mật khẩu | password | ✅ | `••••••••` | Phải khớp với Mật khẩu |

### Password Strength Indicator

- Hiển thị thanh 4 đoạn bên dưới input mật khẩu khi user đang nhập
- Scoring:
  - +1: độ dài ≥ 8 ký tự
  - +1: có chữ hoa
  - +1: có ký tự đặc biệt
  - +1: độ dài ≥ 12 ký tự
- Labels: `Weak` / `Fair` / `Good` / `Strong`

### Nút Submit

- `width: 100%`
- Height: `48px`
- Border-radius: `8px`
- Màu nền: `#E8614A`
- Chữ: `"Đăng ký"`, màu trắng, font-weight 600
- Hover: darker cam `#D14A35`
- Loading state: hiển thị spinner, disabled

---

## 6. Validation Rules

### Client-side (real-time sau blur / khi submit)

| Trường | Rule | Error message |
|---|---|---|
| Tên đăng nhập | Không được rỗng | `"Username is required"` |
| Tên đăng nhập | Tối thiểu 3 ký tự | `"Username must be at least 3 characters"` |
| Email | Không được rỗng | `"Email is required"` |
| Email | Đúng định dạng regex | `"Invalid email"` |
| Mật khẩu | Không được rỗng | `"Password is required"` |
| Mật khẩu | ≥8 ký tự + chữ hoa + ký tự đặc biệt | `"Password must be at least 8 characters, include an uppercase letter and a special character"` |
| Xác nhận mật khẩu | Không được rỗng | `"Please confirm your password"` |
| Xác nhận mật khẩu | Khớp với Mật khẩu | `"Passwords do not match"` |

### Server-side

- Backend validate lại toàn bộ input
- Sanitize chống XSS, SQL Injection
- Không lưu password plaintext (bcrypt)

---

## 7. Business Rules

- Username không được trùng với username đã tồn tại trong hệ thống
- Username tối thiểu 3 ký tự
- Email phải đúng định dạng và chưa tồn tại trong hệ thống
- Password tối thiểu 8 ký tự, có ít nhất 1 chữ hoa và 1 ký tự đặc biệt
- Không cho phép submit nếu có trường bắt buộc trống hoặc validation fail
- Sau đăng ký thành công → tự động đăng nhập → redirect thẳng về trang chủ

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Trường bắt buộc trống → Submit | Hiển thị lỗi inline từng trường, không submit |
| Username đã tồn tại | Lỗi `"Username already exists."` sau khi gọi API |
| Email đã tồn tại | Lỗi `"Email already registered"` sau khi gọi API |
| Email sai định dạng | Lỗi `"Invalid email"` ngay trên client |
| Password không đủ điều kiện | Lỗi inline với yêu cầu cụ thể |
| Xác nhận mật khẩu không khớp | Lỗi `"Passwords do not match"` |
| Mạng chậm khi submit | Nút disabled + spinner loading |
| Mobile | Layout 1 cột, input dễ nhập, nút dễ click |

---

## 9. Security Requirements

- Form submit dùng HTTPS
- Backend validate và sanitize input (chống SQL injection, XSS)
- Password hash bằng bcrypt — không lưu plaintext
- Username và Email được xử lý an toàn
- Rate limit chống spam đăng ký

---

## 10. Acceptance Criteria

- [x] AC-01: Hiển thị tiêu đề `"Đăng ký."`
- [x] AC-01: Hiển thị đầy đủ 5 trường (Tên đăng nhập, Email, Số điện thoại, Mật khẩu, Xác nhận mật khẩu)
- [x] AC-01: Nút `"Đăng ký"` màu cam hiển thị đúng
- [x] AC-02: Submit thành công → tạo tài khoản → tự động đăng nhập → redirect trang chủ
- [x] AC-03: Trường bắt buộc trống → lỗi inline, không submit
- [ ] AC-04: Username trùng → lỗi `"Username already exists."`
- [ ] AC-05: Email trùng → lỗi `"Email already registered"`
- [x] AC-06: Password không đủ điều kiện → lỗi inline đầy đủ
- [x] AC-07: Xác nhận mật khẩu không khớp → lỗi `"Passwords do not match"`
- [x] AC-08: Form hoạt động đúng trên mobile (layout, nhập liệu, submit)
- [x] Password field có icon mắt để hiện/ẩn mật khẩu
- [x] Password strength bar hiển thị khi nhập mật khẩu
- [x] Loading spinner khi đang submit
- [x] Link `"Đã có tài khoản? Đăng nhập"` dẫn đến trang login
- [x] Không có lỗi TypeScript (`tsc --noEmit`)
- [x] Không dùng `any` — dùng đúng type
- [x] Input có `aria-label` và `id` phù hợp

---

## 11. Assets

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Ảnh branding trái | `public/images/logo/Logo-Login.png` | Ảnh sản phẩm/thương hiệu |
| Logo giaothoatech | `public/images/logo/Logo-footer.png` | Hiển thị phía trên form |
