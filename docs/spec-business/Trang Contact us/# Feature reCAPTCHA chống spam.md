# Feature: reCAPTCHA chống spam

## 1. Business Goal

Ngăn bot tự động và spam submissions tấn công form liên hệ, đảm bảo mọi lead gửi đến đội sales đều là từ người dùng thật. reCAPTCHA v3 (ẩn, không cần tương tác) được ưu tiên để không làm gián đoạn UX của khách hàng B2B.

## 2. Actors

- Bot/spam tool — cần bị chặn
- Legitimate user — không bị ảnh hưởng bởi reCAPTCHA v3 (invisible)
- Backend/API — nhận và validate reCAPTCHA token từ Google

## 3. Preconditions

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public key) có trong `.env.local` và production env
- `RECAPTCHA_SECRET_KEY` (server key) chỉ có trong server-side env, KHÔNG expose ra client
- reCAPTCHA v3 script từ Google load được trong browser
- API route `/api/contact` có logic verify reCAPTCHA token với Google API

## 4. Main Flow

1. Trang /contact load → RecaptchaProvider inject Google reCAPTCHA v3 script vào `<head>`
2. reCAPTCHA v3 chạy ẩn — thu thập behavioral signals liên tục trong session
3. Khi user click Submit trong ContactForm (FEAT-032):
   - Frontend gọi `grecaptcha.execute(siteKey, { action: 'contact_form' })`
   - Google trả về token (JWT, sống 2 phút)
   - Token được đưa vào request body `ContactFormData.recaptchaToken`
4. Frontend gửi POST /api/contact với token
5. Server-side (Next.js API route): verify token với Google `https://www.google.com/recaptcha/api/siteverify`
6. Google trả về score (0.0–1.0):
   - Score >= 0.5 → cho phép submit
   - Score < 0.5 → reject, trả về `{ code: "RECAPTCHA_FAILED" }`
7. Frontend nhận lỗi → hiện message: "Verification failed. Please refresh and try again."

## 5. Business Rules

- Dùng reCAPTCHA v3 (ẩn, không cần user interaction) — không phải v2 checkbox
- `action` name: `'contact_form'` — dùng cho analytics Google reCAPTCHA dashboard
- Score threshold: 0.5 (chặn nếu < 0.5)
- Token có thời hạn 2 phút — nếu user để form quá lâu, gọi `execute()` lại trước submit
- `RECAPTCHA_SECRET_KEY` tuyệt đối KHÔNG đưa vào client bundle
- Disclaimer text bắt buộc theo Google ToS nếu ẩn badge
- Không dùng package `react-google-recaptcha` hay wrapper ngoài — implement thuần với script inject và `window.grecaptcha`

## 6. Edge Cases

| Tình huống | Hành vi mong đợi |
| --- | --- |
| reCAPTCHA script không load (ad blocker) | Hiện error: "Could not load verification. Please disable ad blockers and try again." Submit bị block. |
| Token expire (user để form >2 phút) | Gọi lại `grecaptcha.execute()` trước submit để lấy token mới |
| Google verify API timeout (server-side) | Server trả về 503, frontend hiện: "Verification service unavailable. Please try again later." |
| Score = 0 (rõ ràng là bot) | Block submit, log server-side, không leak lý do cho client |
| Development environment | Dùng test key Google (luôn pass) — không dùng production key trong local |

## 7. Security Requirements

- `RECAPTCHA_SECRET_KEY` chỉ tồn tại trong server environment — KHÔNG `NEXT_PUBLIC_`
- Verify token phía server (Next.js API route) — không verify client-side
- Không log reCAPTCHA token vào console hay server logs
- Token dùng một lần — không cache hay reuse token giữa các submit
- Submit dùng HTTPS

## 8. Acceptance Criteria

### AC-01: reCAPTCHA v3 load thành công

Given

- Visitor truy cập trang "/contact"

When

- Trang form liên hệ được tải

Then

- reCAPTCHA v3 script load thành công
- Không có UI element visible (invisible reCAPTCHA)
- Disclaimer text hiển thị theo Google ToS nếu badge bị ẩn

### AC-02: Submit hợp lệ qua reCAPTCHA

Given

- Visitor đã xác thực reCAPTCHA thành công (score >= 0.5)
- Form chứa dữ liệu hợp lệ

When

- Visitor nhấn nút Submit

Then

- `grecaptcha.execute()` được gọi, token có trong request body
- Hệ thống cho phép gửi form đến backend

### AC-03: Chặn submit khi reCAPTCHA thất bại

Given

- reCAPTCHA xác định request có nguy cơ là bot (score < 0.5)

When

- Visitor nhấn Submit

Then

- Hệ thống chặn việc gửi form
- Hiển thị: "Verification failed. Please refresh and try again."

### AC-04: Xử lý khi reCAPTCHA không tải

Given

- reCAPTCHA script không tải được

When

- Visitor truy cập trang form

Then

- Submit bị block với error message hướng dẫn tắt ad blocker
- Token expire → auto-renew trước submit
