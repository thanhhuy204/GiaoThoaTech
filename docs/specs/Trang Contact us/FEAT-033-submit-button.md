# FEAT-033: Nút Submit form (Trang Contact us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0
**File implement:** `components/ui/SubmitButton.tsx`
**Page file:** `app/(pages)/contact/page.tsx`

---

## 1. Business Goal

Cho phép người dùng hoàn tất gửi thông tin liên hệ/demo một cách rõ ràng và an toàn. Nút Submit phải phản hồi ngay lập tức về trạng thái (loading, disabled, success) để tạo cảm giác tin cậy, tránh double-submit, và hướng dẫn người dùng qua quá trình gửi form.

---

## 2. Actors

- **Visitor** — người điền form liên hệ và muốn gửi thông tin.

---

## 3. Preconditions

- Form `ContactForm` (FEAT-032) đã render và người dùng đang điền.
- Component nhận `isLoading`, `isDisabled`, và `onClick` (hoặc là `type="submit"` trong `<form>`).

---

## 4. Main Flow

1. Nút render ở dưới cùng form với label "Submit".
2. **Idle state (default):** Nút màu cam `#E8614A`, text "Submit", enabled.
3. Người dùng click nút:
   a. Nếu form chưa valid → nút vẫn click được, form validate và hiển thị errors (nút không self-disable trước validate).
   b. Nếu form valid → nút chuyển sang **Loading state**.
4. **Loading state:** Text thay bằng spinner + "Submitting...", nút disabled, pointer-events none.
5. API trả về:
   - Thành công → form ẩn, success notification hiện (FEAT-037). Nút không còn visible.
   - Thất bại → nút trở về **Idle state** để retry.
6. **Disabled state:** Khi form đang loading hoặc đã submit thành công.

---

## 5. UI Specification

### Layout

- Width: `100%` full-width của form container (hoặc min-width: 200px, centered).
- Padding: `14px 32px`.
- `border-radius: 4px`.
- Vị trí: cuối form, sau checkbox privacy.
- Margin-top: `32px` từ checkbox row.

### Màu sắc & States

| State | Background | Text | Border | Cursor |
|---|---|---|---|---|
| Idle | `#E8614A` | `#ffffff` | none | `pointer` |
| Hover | `#d4503a` | `#ffffff` | none | `pointer` |
| Active/press | `#c44530` | `#ffffff` | none | `pointer` |
| Loading | `#E8614A` opacity 0.8 | `#ffffff` opacity 0.9 | none | `not-allowed` |
| Disabled | `rgba(0,0,0,0.12)` | `rgba(0,0,0,0.35)` | none | `not-allowed` |
| Focus visible | `#E8614A` | `#ffffff` | `2px offset ring #E8614A` | `pointer` |

### Typography

| Yếu tố | Style |
|---|---|
| Button label | `font-size: 16px`, `font-weight: 600`, `letter-spacing: 0.02em`, `font-family: system sans-serif` |
| Loading text | `font-size: 16px`, `font-weight: 600`, `color: rgba(255,255,255,0.9)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Button text | Fade out | Loading start | 150ms |
| Spinner | Fade in + rotate infinite | Loading start | 150ms fade, 800ms/rotation |
| Button | Scale press (1 → 0.98) | Active/click | 100ms |
| Button | Background color darken | Hover | 150ms |
| "Submitting..." text | Fade in kèm spinner | Loading state | 150ms |
| Button | Opacity animate (1 → 0.8) | Transition to loading | 150ms |

---

## 7. Business Rules

- Nút **không tự disable** khi form chưa valid — chỉ disable khi đang loading.
- **Double click prevention:** Sau lần click đầu tiên (khi form valid), nút disable ngay lập tức trong loading state để tránh duplicate submit.
- Nút **không disable** dựa trên form validity — validation chạy khi click (không realtime disable/enable).
- Sau thành công: nút không visible (toàn bộ form section thay bằng success state).
- Sau thất bại (API error): nút trở lại Idle state, user có thể retry.
- `type="submit"` — không dùng `type="button"` với `onClick` riêng để đảm bảo accessibility form.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Double click nhanh | Lần click đầu trigger, lần 2 bị block vì loading state |
| Click khi form trống | Form hiện errors, nút không vào loading state |
| API timeout (>10s) | Sau timeout, nút trở về idle, hiện error message |
| JavaScript disabled | Form submit native HTML (server action) — nút vẫn hoạt động |
| Slow network | Spinner hiển thị đủ lâu, không fake timeout |
| User nhấn Enter trong form | Submit trigger (default browser behavior), cùng flow như click |

---

## 9. Security Requirements

- Không bypass validation khi submit bằng keyboard (Enter).
- Loading state ngăn double submit ở frontend (server cũng phải idempotent).
- Không có thông tin nhạy cảm trong button label hay aria attributes.

---

## 10. Acceptance Criteria

- [ ] Nút render màu cam `#E8614A`, label "Submit", full-width.
- [ ] Click khi form invalid → errors hiển thị, nút không loading.
- [ ] Click khi form valid → nút chuyển loading (spinner + "Submitting...").
- [ ] Loading state: nút disabled, cursor not-allowed.
- [ ] API success → nút biến mất cùng form.
- [ ] API error → nút trở về idle, có thể retry.
- [ ] Double click không tạo duplicate API call.
- [ ] Hover: background `#d4503a`.
- [ ] Focus visible: ring outline `#E8614A`.
- [ ] Spinner animation mượt mà, rotate vô hạn khi loading.
- [ ] TypeScript strict — props interface đầy đủ.
- [ ] `aria-disabled`, `aria-busy` đúng theo state.

---

## 11. Assets cần thiết

- Spinner SVG component: `components/ui/icons/SpinnerIcon.tsx` — animated SVG hoặc CSS border-spinner.

---

## 12. Data Structure

```typescript
interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;       // Optional — cho phép parent force disable
  label?: string;             // Default: "Submit"
  loadingLabel?: string;      // Default: "Submitting..."
  className?: string;         // Optional override classes
}

// States được derive từ props:
// idle: !isLoading && !isDisabled
// loading: isLoading
// disabled: isDisabled && !isLoading
```

---

## 13. Implementation Notes

- Component cần `"use client"` nếu quản lý animation state, nhưng ưu tiên để parent (ContactForm) kiểm soát `isLoading` và truyền qua props.
- Spinner: dùng CSS `border-t-transparent border-[#ffffff] rounded-full animate-spin` với Tailwind. Size: `w-5 h-5`.
- Accessibility:
  - `aria-busy={isLoading}`
  - `aria-disabled={isLoading || isDisabled}`
  - Khi loading: aria-label update sang "Submitting form, please wait".
- Tailwind button classes (idle): `w-full bg-[#E8614A] hover:bg-[#d4503a] active:bg-[#c44530] text-white font-semibold py-3.5 px-8 rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8614A] focus-visible:ring-offset-2`.
- Tailwind (loading): thêm `opacity-80 cursor-not-allowed pointer-events-none`.
- Component có thể tái sử dụng ngoài ContactForm (ví dụ: newsletter form, login form).

> **Note:** FEAT-033 là sub-component của FEAT-032. Button behavior này chỉ có nghĩa trong context của ContactForm. Nếu team quyết định merge, nội dung spec này integrate vào FEAT-032 section "Submit Button Behavior".
