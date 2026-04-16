# FEAT-037: Thông báo thành công sau submit (Trang Contact us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0
**File implement:** `app/components/contact/SuccessNotification.tsx`
**Page file:** `app/(pages)/contact/page.tsx`

---

## 1. Business Goal

Xác nhận rõ ràng với người dùng rằng form đã gửi thành công, tạo cảm giác hoàn tất và tin cậy. Thông báo thành công cũng là cơ hội cuối để reinforce brand và set expectation về bước tiếp theo (đội sales sẽ liên hệ trong bao lâu).

---

## 2. Actors

- **Visitor** — vừa submit form, đang chờ xác nhận.

---

## 3. Preconditions

- `ContactForm` (FEAT-032) vừa nhận response `200 OK` từ API `POST /api/contact`.
- Component nhận `submissionState === 'success'` từ parent (`ContactForm`).
- (Optional) API trả về `leadId` — có thể hiển thị reference number.

---

## 4. Main Flow

1. API trả về `{ success: true }`:
   a. Parent `ContactForm` set state: `submissionState = 'success'`.
   b. Form container fade out (300ms).
   c. `SuccessNotification` fade in thay thế vị trí form.
2. Success notification hiển thị:
   - Icon check mark lớn (animated).
   - Headline: "Thank you!"
   - Message: "Our team will reach out shortly. We typically respond within 1 business day."
   - (Optional) Reference: "Your reference: #[leadId]" nếu có.
   - Sub-action: "In the meantime, explore our products →" dẫn đến `/products`.
3. Không reload trang.
4. Không có auto-redirect.

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
|                                                          |
|              [✓ Animated check circle]                   |
|                    (64px × 64px)                         |
|                                                          |
|                     Thank you!                           |
|                                                          |
|    Our team will reach out shortly. We typically         |
|    respond within 1 business day.                        |
|                                                          |
|            Your reference: #lead_abc123                  |
|                                                          |
|         Explore our products →                           |
|                                                          |
+----------------------------------------------------------+
```

- Layout: centered, single column, max-width: 480px, `margin: 0 auto`.
- Chiếm **cùng vị trí** với form khi hiển thị (không shift layout).
- Padding: `48px 32px` (desktop), `40px 24px` (mobile).
- Background: `#ffffff` với `border-radius: 8px` và subtle shadow.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Container background | `#ffffff` |
| Container border | `rgba(0,0,0,0.08)` |
| Container shadow | `0 8px 32px rgba(0,0,0,0.08)` |
| Check circle fill | `#E8614A` |
| Check mark | `#ffffff` |
| Headline | `#0f0f0f` |
| Message text | `rgba(0,0,0,0.65)` |
| Reference text | `rgba(0,0,0,0.45)` |
| Sub-action link | `#E8614A` |
| Sub-action link hover | `#d4503a` |

### Typography

| Yếu tố | Style |
|---|---|
| Headline "Thank you!" | `Playfair Display`, `font-size: clamp(2rem, 4vw, 2.75rem)`, `font-weight: 700` |
| Message | `font-size: 16px`, `line-height: 1.7`, `text-align: center`, `color: rgba(0,0,0,0.65)` |
| Reference | `font-size: 13px`, `font-family: monospace`, `color: rgba(0,0,0,0.45)` |
| Sub-action link | `font-size: 15px`, `font-weight: 500` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Form | Fade out + scale (1 → 0.97) | `success` state | 300ms, ease-in |
| Success container | Fade in + scale (0.97 → 1) | After form fade out | 350ms, ease-out, delay 200ms |
| Check circle | Draw stroke animation (SVG stroke-dashoffset) | Container visible | 500ms, ease-out |
| Check mark | Fade in + scale (0 → 1) | After circle draw | 250ms, ease-out, delay 450ms |
| Headline | Fade in từ bottom | After check mark | 300ms, delay 600ms |
| Message | Fade in | After headline | 300ms, delay 750ms |
| Reference + sub-action | Fade in | After message | 300ms, delay 900ms |
| Sub-action arrow (→) | TranslateX (0 → 4px) | Hover link | 200ms |

**Check circle draw animation (SVG):**
```
circle: stroke-dasharray = circumference
        stroke-dashoffset: circumference → 0
        transition: 500ms ease-out
```

---

## 7. Business Rules

- Thông báo **không** tự dismiss hay auto-redirect — người dùng kiểm soát hoàn toàn.
- Form **ẩn hoàn toàn** (không chỉ invisible, mà `display: none` sau animation) khi success.
- Message text cố định: "Our team will reach out shortly. We typically respond within 1 business day." — không thay đổi tùy user.
- `leadId` hiển thị **chỉ khi** API trả về — không hardcode placeholder.
- Sub-action link dẫn đến `/products` — internal link, không mở tab mới.
- Không có "Submit another form" button — nếu user muốn submit lại, phải refresh trang.
- Page title không đổi sau success.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| API thất bại (500, timeout) | Không hiện success notification — hiện error state thay vào đó |
| `leadId` không có trong response | Ẩn reference row hoàn toàn |
| User nhấn browser Back sau success | Quay lại trang trước (không phải form) |
| User refresh trang sau success | Form hiện lại (empty) — success state bị reset |
| Screen reader | Announce "Form submitted successfully. Thank you!" khi success state mount |

---

## 9. Security Requirements

- `leadId` từ API chỉ hiển thị text — không link đến bất kỳ dashboard nào.
- Không expose thông tin form đã submit trong success message.
- Không auto-redirect đến URL từ `?redirect=` param (phòng open redirect).

---

## 10. Acceptance Criteria

- [ ] Form fade out khi `success` state.
- [ ] Success notification fade in sau form.
- [ ] Check circle animated (draw stroke) khi hiện.
- [ ] Headline "Thank you!" dùng Playfair Display.
- [ ] Message text chính xác: "Our team will reach out shortly..."
- [ ] `leadId` hiển thị nếu có, ẩn nếu không.
- [ ] Sub-action link "/products" hoạt động.
- [ ] Không reload trang.
- [ ] Screen reader announcement khi success mount.
- [ ] API error → error state, không hiện success.
- [ ] TypeScript strict — props interface đầy đủ.
- [ ] Animation sequence đúng thứ tự (circle → check → headline → message).

---

## 11. Assets cần thiết

- Check circle SVG: implement inline trong component (không cần file riêng).
  ```svg
  <circle cx="32" cy="32" r="28" stroke="#E8614A" stroke-width="3" fill="none" />
  <path d="M20 32 L28 40 L44 24" stroke="white" stroke-width="3" />
  ```

---

## 12. Data Structure

```typescript
interface SuccessNotificationProps {
  leadId?: string;            // Optional — từ API response
  productsHref?: string;      // Default: "/products"
  headline?: string;          // Default: "Thank you!"
  message?: string;           // Default copy
}

// Parent state trong ContactForm.tsx:
type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

interface SubmissionResult {
  state: SubmissionState;
  leadId?: string;
  errorMessage?: string;
}

// Error state type:
interface ErrorNotificationProps {
  message: string;
  onRetry: () => void;
}
```

---

## 13. Implementation Notes

- Component cần `"use client"` vì dùng animation và `useEffect` cho screen reader announcement.
- Render pattern trong `ContactForm`:
  ```tsx
  {submissionState === 'success' ? (
    <SuccessNotification leadId={leadId} />
  ) : (
    <form>...</form>
  )}
  ```
- Screen reader: dùng `role="status"` và `aria-live="polite"` trên success container.
- Check circle animation: dùng CSS `@keyframes` với SVG `stroke-dashoffset`. Tính `circumference = 2 * Math.PI * r = 2 * Math.PI * 28 ≈ 175.93`.
- Thay vì CSS transition trên SVG stroke, dùng Tailwind `[stroke-dashoffset:...]` custom hoặc inline `style`.
- Animation sequence: orchestrate với `animationDelay` CSS trên từng element — không cần JS timer.
- Error state: Tách `ErrorNotification.tsx` component riêng với `message` và `onRetry` callback — render trong cùng container khi `submissionState === 'error'`.
- "error" state UI:
  - Icon X circle, màu `#dc2626`.
  - Message: error message từ API hoặc generic.
  - Nút "Try again" → gọi `onRetry()` → reset về `'idle'`, form visible lại.
