# FEAT-034: reCAPTCHA chống spam (Trang Contact us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0
**File implement:** `app/components/contact/RecaptchaProvider.tsx`
**Page file:** `app/(pages)/contact/page.tsx`

---

## 1. Business Goal

Ngăn bot tự động và spam submissions tấn công form liên hệ, đảm bảo mọi lead gửi đến đội sales đều là từ người dùng thật. reCAPTCHA v3 (ẩn, không cần tương tác) được ưu tiên để không làm gián đoạn UX của khách hàng B2B vốn đã bận rộn.

---

## 2. Actors

- **Bot/spam tool** — cần bị chặn.
- **Legitimate user** — không bị ảnh hưởng bởi reCAPTCHA v3 (invisible).
- **Backend/API** — nhận và validate reCAPTCHA token từ Google.

---

## 3. Preconditions

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public key) có trong `.env.local` và production env.
- `RECAPTCHA_SECRET_KEY` (server key) **chỉ** có trong server-side env, **không** expose ra client.
- reCAPTCHA v3 script từ Google load được trong browser.
- API route `/api/contact` (server-side) có logic verify reCAPTCHA token với Google API.

---

## 4. Main Flow

1. Trang `/contact` load → `RecaptchaProvider` inject Google reCAPTCHA v3 script vào `<head>`.
2. reCAPTCHA v3 chạy ẩn — thu thập behavioral signals liên tục trong session.
3. Khi user click Submit trong ContactForm (FEAT-032):
   a. Frontend gọi `grecaptcha.execute(siteKey, { action: 'contact_form' })`.
   b. Google trả về `token` (JWT, sống 2 phút).
   c. `token` được đưa vào request body `ContactFormData.recaptchaToken`.
4. Frontend gửi `POST /api/contact` với token.
5. **Server-side** (Next.js API route): verify token với Google `https://www.google.com/recaptcha/api/siteverify`.
6. Google trả về `score` (0.0–1.0):
   - Score ≥ 0.5 → cho phép submit.
   - Score < 0.5 → reject, trả về `{ code: "RECAPTCHA_FAILED" }`.
7. Frontend nhận lỗi → hiện message: "Verification failed. Please refresh and try again."

---

## 5. UI Specification

### Layout

- reCAPTCHA v3 là **invisible** — không có UI element trong form.
- Google badge (bottom-right màn hình) tự động hiển thị theo Google policy.
- Nếu muốn ẩn badge theo Google ToS, phải hiện disclaimer text trong form:
  > "This site is protected by reCAPTCHA and the Google [Privacy Policy] and [Terms of Service] apply."

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Disclaimer text | `rgba(0,0,0,0.5)` |
| Disclaimer links | `#E8614A` |
| reCAPTCHA badge | Mặc định Google styling |

### Typography

| Yếu tố | Style |
|---|---|
| Disclaimer | `font-size: 12px`, `line-height: 1.5`, `font-family: system sans-serif` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| reCAPTCHA badge | Fade in | Page load | Mặc định Google |
| Error message | Fade in từ bottom | Score thấp hoặc load failure | 200ms |

---

## 7. Business Rules

- Dùng **reCAPTCHA v3** (ẩn, không cần user interaction) — không phải v2 checkbox trừ khi v3 liên tục fail.
- `action` name: `'contact_form'` — mô tả rõ hành động, dùng cho analytics Google reCAPTCHA dashboard.
- Score threshold: **0.5** (chặn nếu < 0.5). Có thể điều chỉnh qua server config.
- Token có thời hạn 2 phút — nếu user để form quá lâu, cần `execute()` lại trước khi submit.
- `RECAPTCHA_SECRET_KEY` tuyệt đối **không** đưa vào client bundle.
- Nếu reCAPTCHA script fail (không load được): xem Edge Cases.
- Disclaimer text bắt buộc theo Google ToS nếu ẩn badge.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| reCAPTCHA script không load (network block, ad blocker) | Hiện error trong form: "Could not load verification. Please disable ad blockers and try again." Submit bị block. |
| Token expire (user để form >2 phút trước submit) | Gọi lại `grecaptcha.execute()` ngay trước submit để lấy token mới |
| Google verify API timeout (server-side) | Server trả về 503, frontend hiện: "Verification service unavailable. Please try again later." |
| Score = 0 (rõ ràng là bot) | Block submit, log server-side, không leak lý do cho client |
| Score 0.4–0.5 (borderline) | Block submit, hiện friendly message không accusatory |
| Development environment | Dùng test key Google (luôn pass) — không dùng production key trong local |

---

## 9. Security Requirements

- `RECAPTCHA_SECRET_KEY` chỉ tồn tại trong server environment — **không** `NEXT_PUBLIC_`.
- Verify token phía **server** (Next.js API route hoặc Server Action) — không verify client-side.
- Không log reCAPTCHA token vào console hay server logs.
- Token dùng một lần — không cache hay reuse token giữa các submit.
- Validate `hostname` trong Google verify response khớp với production domain.

---

## 10. Acceptance Criteria

- [ ] reCAPTCHA v3 script load thành công trên trang `/contact`.
- [ ] Không có UI element visible (invisible reCAPTCHA).
- [ ] Disclaimer text hiển thị theo Google ToS nếu badge bị ẩn.
- [ ] Submit form → `grecaptcha.execute()` được gọi → token có trong request body.
- [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` được sử dụng ở client-side.
- [ ] `RECAPTCHA_SECRET_KEY` chỉ dùng server-side, không expose.
- [ ] Score < 0.5 → API trả lỗi → frontend hiện error message đúng.
- [ ] Script không load → submit bị block với error message hướng dẫn.
- [ ] Token expire → auto-renew trước submit.
- [ ] Development dùng test key, không dùng production key.
- [ ] TypeScript strict — `window.grecaptcha` typed đúng.

---

## 11. Assets cần thiết

- reCAPTCHA site key và secret key từ Google reCAPTCHA console (cung cấp bởi DevOps/Backend).
- Môi trường dev: Google test keys (public: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`).

---

## 12. Data Structure

```typescript
// Client-side type cho window.grecaptcha
interface GrecaptchaInstance {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha: GrecaptchaInstance;
  }
}

// Hook để sử dụng reCAPTCHA
interface UseRecaptchaReturn {
  executeRecaptcha: (action: string) => Promise<string>;
  isReady: boolean;
  error: string | null;
}

// Server-side verify response từ Google
interface RecaptchaVerifyResponse {
  success: boolean;
  score: number;          // 0.0 – 1.0
  action: string;         // "contact_form"
  challenge_ts: string;   // ISO timestamp
  hostname: string;       // Domain được verify
  'error-codes'?: string[];
}
```

---

## 13. Implementation Notes

- Tạo custom hook `hooks/useRecaptcha.ts` với `"use client"`:
  ```typescript
  // hooks/useRecaptcha.ts
  export function useRecaptcha(siteKey: string): UseRecaptchaReturn
  ```
- Load script: Dùng `next/script` trong layout hoặc page với `strategy="lazyOnload"`.
- Script URL: `https://www.google.com/recaptcha/api.js?render=${siteKey}`.
- Trong `ContactForm`, gọi `executeRecaptcha('contact_form')` trong submit handler trước khi gửi API.
- Server-side verify: trong `app/api/contact/route.ts` (Next.js Route Handler), gọi Google verify API với `fetch`.
- Không dùng package `react-google-recaptcha` hay wrapper ngoài — implement thuần với script inject và `window.grecaptcha`.
- Fallback khi `window.grecaptcha` undefined: set `error` state và block submit.
