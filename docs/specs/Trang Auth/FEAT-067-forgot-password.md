# FEAT-067: Quên mật khẩu (Forgot Password — 4 bước)

**Route:**
- Bước 1: `/[locale]/auth/forgot-password`
- Bước 2: `/[locale]/auth/forgot-password/method`
- Bước 3: `/[locale]/auth/forgot-password/verify`
- Bước 4: `/[locale]/auth/forgot-password/new-password`

**File implement:**
- `app/[locale]/auth/forgot-password/page.tsx` + `forgot-password-content.tsx` + `forgot-password.css`

> Toàn bộ 4 bước được quản lý bởi **một component duy nhất** dùng state `step: 1 | 2 | 3 | 4`, không reload trang.

**Business Spec:** `docs/spec-business/Trang Auth/# Feature Quên mật khẩu.md`

---

## 1. Mục đích màn hình

Quy trình 4 bước giúp người dùng khôi phục mật khẩu: tìm tài khoản → chọn phương thức nhận mã → xác thực OTP → đặt mật khẩu mới. Thiết kế tối giản, từng bước rõ ràng, mobile-first.

---

## 2. Cấu trúc Component

```
ForgotPasswordContent ('use client')
├── StepIndicator                  ← 4 bước tiến độ (dots/bar)
├── Step1FindAccount               ← Tìm tài khoản
│   ├── InputField (email/phone)
│   └── Button "Tiếp tục"
├── Step2ChooseMethod              ← Chọn phương thức
│   ├── AccountPreview             ← avatar + tên
│   ├── RadioOption × 3            ← email / SMS / mật khẩu
│   └── Button "Tiếp tục"
├── Step3VerifyOTP                 ← Nhập mã OTP
│   ├── OTPInput (6 ô hoặc 1 input)
│   ├── Countdown timer
│   ├── Link "Gửi lại mã"
│   └── Button "Tiếp tục"
└── Step4NewPassword               ← Tạo mật khẩu mới
    ├── AccountPreview
    ├── PasswordInput + EyeIcon
    ├── Checkbox "Đăng xuất ở mọi nơi khác"
    ├── Button "Tiếp tục"
    └── SuccessState               ← sau khi submit thành công
```

---

## 3. Layout

```
┌────────────────────────────────────┐
│         [Logo]                     │
│   ●──○──○──○   StepIndicator       │
│                                    │
│   [Tiêu đề bước]                   │
│   [Mô tả ngắn]                     │
│                                    │
│   [Input / Options / OTP]          │
│                                    │
│   [Nút "Tiếp tục"]                 │
│   [Link "Quay lại"]                │
└────────────────────────────────────┘
```

- Layout đơn cột, `max-width: 440px`, căn giữa màn hình
- Nền trang: trắng `#ffffff`
- Không có Navbar/Footer (trang auth độc lập)
- Có logo nhỏ góc trên trái/giữa, link về trang chủ

---

## 4. Components Chi tiết

### 4.1 StepIndicator
```
●──●──○──○
1   2   3   4
```
- 4 dot hoặc progress bar
- Step hiện tại: filled đỏ `#E8614A`
- Step đã qua: filled xám `#ccc`
- Step chưa tới: outline xám

### 4.2 Step 1 — Tìm tài khoản
```
[Tiêu đề]   "Tìm tài khoản của bạn"
[Mô tả]     "Hãy nhập số điện thoại hoặc email của bạn"
[Input]      placeholder: "Email hoặc số điện thoại"
[Nút]        "Tiếp tục" — đỏ cam, full width
[Link]       "Quay lại đăng nhập"
```
- Validate: không trống
- Lỗi: "Không tìm thấy tài khoản với thông tin này" — inline dưới input

### 4.3 Step 2 — Chọn phương thức
```
[AccountPreview]  avatar + tên tài khoản
[Radio 1]  📧  Nhận mã qua email  (email ẩn 1 phần: e***@gmail.com)
[Radio 2]  📱  Nhận mã qua SMS    (SĐT ẩn 1 phần: 09***5678)
[Radio 3]  🔑  Tiếp tục bằng mật khẩu
[Nút]      "Tiếp tục"
[Link]     "Không phải bạn?" → quay lại bước 1
```
- Chọn Radio 3 → navigate về trang Login
- Nút disabled khi chưa chọn option nào

### 4.4 Step 3 — Xác nhận OTP
```
[Tiêu đề]   "Xác nhận tài khoản"
[Mô tả]     "Nhập mã 6 số đã được gửi đến [email/SĐT]"
[OTPInput]  6 ô input riêng biệt, tự focus ô tiếp theo
[Timer]     "Mã hết hạn sau 08:00" — đếm ngược
[Link]      "Gửi lại mã" — chỉ active khi hết hạn
[Nút]       "Tiếp tục"
[Link]      "Thay đổi phương thức" → quay lại bước 2
```
- OTP sai: "Mã không hợp lệ. Vui lòng thử lại."
- OTP hết hạn: "Mã đã hết hạn. Vui lòng gửi lại."

### 4.5 Step 4 — Tạo mật khẩu mới
```
[Tiêu đề]   "Tạo mật khẩu mới"
[Mô tả]     "Tối thiểu 8 ký tự gồm chữ, số và ký tự đặc biệt"
[AccountPreview]  avatar + tên
[PasswordInput]   "Mật khẩu mới" + icon mắt
[StrengthBar]     Thanh độ mạnh mật khẩu (yếu/trung bình/mạnh)
[Checkbox]        "Đăng xuất ở mọi nơi khác"
[Nút]             "Tiếp tục"
```

### 4.6 SuccessState (sau bước 4)
```
[Icon ✓ xanh lá]
[Tiêu đề]   "Mật khẩu đã được thay đổi thành công!"
[Nút]       "Đăng nhập ngay" → /auth/login
```
- Auto redirect về login sau 3 giây nếu user không nhấn

---

## 5. UI Behavior

| Hành động | Kết quả |
|---|---|
| Nhấn "Tiếp tục" bước 1 | Validate → loading → chuyển bước 2 hoặc hiện lỗi |
| Chọn phương thức + "Tiếp tục" | Gửi OTP → chuyển bước 3 |
| Chọn "Tiếp tục bằng mật khẩu" | Navigate về `/auth/login` |
| Nhập OTP ô thứ N xong | Auto focus ô N+1 |
| Paste OTP | Tự điền vào 6 ô |
| Timer hết → click "Gửi lại mã" | Reset timer + gửi OTP mới |
| Bước 4 submit thành công | SuccessState → auto redirect sau 3s |
| Nhấn "Quay lại" ở bất kỳ bước nào | Về bước trước, giữ nguyên dữ liệu đã nhập |

---

## 6. Style

| Token | Giá trị |
|---|---|
| Màu accent | `#E8614A` |
| Màu success | `#22c55e` |
| Màu text | `#1a1a1a` |
| Màu text phụ | `#666` |
| Màu error | `#ef4444` |
| Nền trang | `#ffffff` |
| Input border | `1.5px solid #e5e5e3` |
| Input focus | `border-color: #E8614A` |
| Nút chính | Nền `#E8614A`, trắng, height 48px, border-radius 10px |
| Nút disabled | `opacity: 0.45` |
| OTP ô | `52px × 56px`, border-radius 10px, font-size 1.4rem |
| StrengthBar yếu | `#ef4444` |
| StrengthBar trung bình | `#f59e0b` |
| StrengthBar mạnh | `#22c55e` |
| Font tiêu đề | `1.5rem`, weight 700 |
| Transition | `0.2s ease` |

---

## 7. Edge Cases

| Tình huống | Xử lý UI |
|---|---|
| Không tìm thấy tài khoản | Lỗi inline: "Không tìm thấy tài khoản với thông tin này" |
| OTP sai | Lỗi dưới OTP input, giữ nguyên ô nhập |
| OTP hết hạn | Timer đỏ, link "Gửi lại mã" active |
| Mật khẩu không đủ mạnh | StrengthBar đỏ + hint text, nút disabled |
| Mạng chậm | Loading spinner trên nút, disable form |
| JS tắt | Form submit server-side, không có OTP real-time |
| Mobile | OTP input type="number", nút 48px, padding dễ chạm |

---

## 8. Mapping Business Spec → UI

| Business Spec | UI |
|---|---|
| Bước 1: nhập email/SĐT | `Step1FindAccount` — input + validate |
| Bước 2: chọn phương thức | `Step2ChooseMethod` — 3 radio options |
| "Tiếp tục bằng mật khẩu" → login | Radio 3 → navigate login |
| Bước 3: nhập OTP | `Step3VerifyOTP` — 6 ô + timer + gửi lại |
| OTP 8-10 phút | Countdown timer 08:00 |
| Bước 4: mật khẩu mới | `Step4NewPassword` — input + strength bar |
| Checkbox đăng xuất mọi nơi | Checkbox dưới password input |
| Thành công → về login | `SuccessState` + auto redirect 3s |
| Mobile friendly | Layout đơn cột, input/nút ≥ 48px |

---

## 9. Assets

| Asset | Ghi chú |
|---|---|
| Logo | `/images/logo/logo1.jpg` |
| Avatar placeholder | SVG inline hình người |
| Icon ✓ success | SVG inline |
