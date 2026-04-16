# FEAT-064: Sign In / Login Form

**Trạng thái:** Implemented
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/[locale]/auth/login/login-content.tsx`
**Route:** `/[locale]/auth/login`

---

## 1. Business Goal

Cho phép người dùng đã có tài khoản giaothoatech đăng nhập để truy cập dashboard/portal quản lý thiết bị, API, integration, marketplace hoặc enterprise solution.

---

## 2. Actors

- **User đã có tài khoản giaothoatech** — muốn đăng nhập quản lý thiết bị / API / dịch vụ
- **Visitor** — người dùng muốn truy cập portal

---

## 3. Preconditions

- Trang portal load thành công (HTTPS)
- User chưa đăng nhập (chưa có session hợp lệ)

---

## 4. Main Flow

1. Hiển thị tiêu đề `"Đăng nhập tài khoản của bạn"` (VI) / `"Sign in to your account"` (EN)
2. Hiển thị trường:
   - `Email` (input email)
   - `Mật khẩu` (input password, có icon mắt để hiện/ẩn)
3. Hiển thị link `"Quên mật khẩu?"` căn phải, bên dưới trường Mật khẩu
4. Hiển thị nút `"Tiếp tục"` (màu cam)
5. Hiển thị link `"Chưa có tài khoản? Đăng ký"` bên dưới nút
6. User điền Email + Password → nhấn `"Tiếp tục"` → hệ thống xác thực
7. Thành công → redirect đến dashboard/portal phù hợp với quyền tài khoản
8. Thất bại → hiển thị lỗi `"Invalid email or password"`

---

## 5. UI Specification

### Layout

- Trang chia 2 cột (desktop): cột trái hình ảnh/branding, cột phải form
- Cột trái hiển thị bullet features:
  - Công nghệ PIN ngoại tuyến — không cần internet
  - Tích hợp 50+ hệ thống PMS
- Mobile: 1 cột, form chiếm toàn bộ
- Form tối đa `440px` width, căn giữa cột phải
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
| Nút "Tiếp tục" | `#E8614A` (cam) |
| Nút hover | `#D14A35` |
| Link "Quên mật khẩu?" | `#E8614A` |
| Link "Đăng ký" | `#E8614A` |
| Background trang | `#F9FAFB` |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề H1 | `1.6rem`, font-weight 700 |
| Label | `0.875rem`, font-weight 500 |
| Input text | `1rem` |
| Error message | `0.8rem`, color đỏ |
| Link "Quên mật khẩu?" | `0.875rem` |
| Link "Đăng ký" | `0.875rem` |

### Các trường input

| Tên trường | Type | Required | Validation |
|---|---|---|---|
| Email | email | ✅ | Đúng định dạng |
| Mật khẩu | password | ✅ | Không được rỗng |

### Password field

- `type="password"` mặc định
- Icon mắt bên phải: click để toggle `type="text"` / `type="password"`
- Icon: `EyeIcon` / `EyeOffIcon` (SVG inline)

### Nút Tiếp tục

- `width: 100%`
- Height: `48px`
- Border-radius: `8px`
- Màu nền: `#E8614A`
- Chữ: `"Tiếp tục"`, màu trắng, font-weight 600
- Hover: `#D14A35`
- Loading state: spinner + disabled khi đang xác thực

---

## 6. Validation Rules

### Client-side

| Trường | Rule | Error message |
|---|---|---|
| Email | Không được rỗng | `"Email is required"` |
| Email | Đúng định dạng regex | `"Invalid email"` |
| Mật khẩu | Không được rỗng | `"Password is required"` |

### Server-side / API Response

| Tình huống | Error message hiển thị |
|---|---|
| Email hoặc Password sai | `"Invalid email or password"` |
| Tài khoản bị khóa | `"Your account has been suspended"` |
| Server error | `"Something went wrong. Please try again."` |

---

## 7. Business Rules

- Email phải đúng định dạng trước khi submit
- Sau login thành công → hệ thống tự redirect đến portal phù hợp (không yêu cầu chọn lại)
- `"Quên mật khẩu?"` dẫn đến trang `/auth/forgot-password`
- `"Đăng ký"` dẫn đến trang `/auth/register`
- Error message "Invalid email or password" — không tiết lộ trường nào sai (bảo mật)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Email/Password trống → Submit | Lỗi inline từng trường, không submit |
| Email sai định dạng | Lỗi `"Invalid email"` ngay trên client |
| Sai email hoặc password | Lỗi `"Invalid email or password"` — không tiết lộ trường nào sai |
| Mạng chậm khi submit | Nút disabled + spinner loading |
| Mobile | Layout 1 cột, input dễ nhập, nút dễ click |
| Session còn hạn | Redirect thẳng đến dashboard (bỏ qua trang login) |

---

## 9. Security Requirements

- Form submit dùng HTTPS
- `type="password"` cho trường mật khẩu
- Backend hash + so sánh password — không trả về plaintext
- Rate limit chống brute-force (ví dụ: khóa 5 phút sau 5 lần sai)
- Error message chung chung, không tiết lộ email có tồn tại hay không

---

## 10. Acceptance Criteria

- [x] AC-01: Hiển thị tiêu đề `"Đăng nhập tài khoản của bạn"`
- [x] AC-01: Hiển thị trường Email + Mật khẩu với icon mắt
- [x] AC-01: Hiển thị link `"Quên mật khẩu?"` căn phải
- [x] AC-01: Hiển thị nút `"Tiếp tục"` màu cam
- [x] AC-01: Hiển thị link `"Chưa có tài khoản? Đăng ký"`
- [ ] AC-02: Login thành công → redirect dashboard đúng với quyền tài khoản
- [x] AC-03: Sai email/password → lỗi `"Invalid email or password"`
- [x] AC-04: Click `"Đăng ký"` → chuyển đến trang đăng ký thành công
- [x] Email/Password trống → lỗi inline, không submit
- [x] Email sai định dạng → lỗi `"Invalid email"`
- [x] Icon mắt toggle hiện/ẩn password hoạt động đúng
- [x] Loading spinner khi đang submit
- [x] Form hoạt động đúng trên mobile
- [x] Không có lỗi TypeScript (`tsc --noEmit`)
- [x] Input có `aria-label` và `id` phù hợp
- [x] Icon mắt có `aria-label="Show password"` / `"Hide password"`

---

## 11. Assets

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Ảnh branding trái | `public/images/logo/Logo-Login.png` | Ảnh sản phẩm/thương hiệu |
| Logo giaothoatech | `public/images/logo/Logo-footer.png` | Hiển thị phía trên form |
| Icon mắt | SVG inline | `EyeIcon` / `EyeOffIcon` |

---

## 12. Related Features

- **FEAT-063** — Register Form (trang đăng ký)
- **FEAT-065** — Forgot Password (nếu có)
