# FEAT-010: Nút CTA "See how it works"

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Cần có trước khi launch
**File implement:** `app/components/technology/TechnologyHero.tsx`
**Page file:** `app/(pages)/technology/page.tsx`

---

## 1. Business Goal

Khuyến khích người xem trang Technology tìm hiểu sâu hơn về công nghệ offline của igloo bằng cách scroll ngay đến phần diagram How it works, tăng thời gian ở lại trang và giảm tỷ lệ bounce trên trang Technology.

---

## 2. Actors

- **Visitor muốn hiểu sâu hơn** — kỹ sư tích hợp, B2B buyer đang đánh giá công nghệ

---

## 3. Preconditions

- Trang Technology (`/technology`) load thành công trên HTTPS
- Section `#how-it-works` đã tồn tại trên cùng trang (FEAT-009 đã implement)
- Nút nằm trong hero section hoặc phần đầu của trang Technology (above the fold hoặc gần đó)

---

## 4. Main Flow

1. Người dùng vào trang Technology và thấy nút `"See how it works"` ở khu vực hero/intro
2. Người dùng click nút
3. Hệ thống thực hiện smooth scroll tự động đến section `#how-it-works`
4. Trang không reload — URL có thể thay đổi thành `/technology#how-it-works` (hash update)
5. Focus đặt vào đầu section How it works (accessibility)

---

## 5. UI Specification

### Layout

- **Vị trí nút:** trong hero section của trang Technology, bên dưới tiêu đề và mô tả ngắn
- **Căn lề:** căn giữa hoặc căn trái theo layout của hero section
- **Khoảng cách:** margin-top `24px` so với đoạn text trên

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền nút (mặc định) | `#E8614A` (primary) |
| Text nút | `#ffffff` |
| Nền nút (hover) | `#d44f39` (darker 10%) |
| Nền nút (active/pressed) | `#c0432f` (darker 20%) |
| Nền nút (focus ring) | outline `2px solid #E8614A`, offset `2px` |

### Typography

| Yếu tố | Style |
|---|---|
| Text nút | `0.9rem`, font-weight `600`, letter-spacing `0.02em` |

### Button Component

```
Button:
  padding: 12px 28px
  border-radius: 4px
  background: #E8614A
  color: #ffffff
  font-weight: 600
  font-size: 0.9rem
  letter-spacing: 0.02em
  border: none
  cursor: pointer
  transition: background-color 200ms ease, transform 100ms ease
  display: inline-flex
  align-items: center
  gap: 8px

Button:hover
  background: #d44f39
  transform: translateY(-1px)

Button:active
  background: #c0432f
  transform: translateY(0)

Button:focus-visible
  outline: 2px solid #E8614A
  outline-offset: 2px

Arrow icon (optional):
  width: 16px
  height: 16px
  transition: transform 200ms ease

Button:hover Arrow icon
  transform: translateX(3px)
```

### Fallback khi JavaScript tắt

- Nút render là `<a href="#how-it-works">` thay vì `<button>`
- Trình duyệt tự jump đến anchor (không smooth nhưng vẫn hoạt động)

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Nút mount | `fadeUp` | Component mount | 0.7s, delay 0.3s |
| Hover nút | `translateY(-1px)` + bg darkens | Hover | 200ms ease |
| Arrow icon (nếu có) | `translateX(3px)` | Button hover | 200ms ease |
| Smooth scroll | Browser native `scroll-behavior: smooth` | Click | Tự động (browser controlled) |

```css
/* Áp dụng ở global CSS hoặc html element */
html {
  scroll-behavior: smooth;
}
```

---

## 7. Business Rules

- Nút màu cam nổi bật (#E8614A) — không dùng màu khác
- Click phải scroll smooth đến `#how-it-works` — không reload trang
- Khi JavaScript tắt, nút phải là anchor link (`<a href="#how-it-works">`) để vẫn hoạt động
- Text nút cố định: `"See how it works"` — không thay đổi
- Nút phải có `aria-label` rõ ràng: `"Xem cách công nghệ igloo hoạt động"`
- Không kèm `?ref=` tracking param vì đây là scroll nội bộ (không phải navigation)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| JavaScript bị tắt | Nút là `<a href="#how-it-works">` — browser jump đến anchor |
| Section `#how-it-works` chưa render (FEAT-009 lỗi) | Scroll đến cuối trang, không có lỗi JS |
| Trang quá ngắn (section đã visible) | Smooth scroll không đáng kể, vẫn hoạt động đúng |
| Màn hình nhỏ (mobile) | Nút full-width hoặc auto-width căn giữa — tùy layout hero section |
| Người dùng dùng bàn phím (Tab → Enter) | Scroll hoạt động đúng, focus ring hiển thị rõ |

---

## 9. Security Requirements

- Scroll nội bộ — không có rủi ro bảo mật đặc biệt
- Không dùng `eval()` hay động code trong scroll handler
- Không navigate ra ngoài domain

---

## 10. Acceptance Criteria

- [ ] Nút `"See how it works"` hiển thị trong hero section trang Technology
- [ ] Nút màu cam `#E8614A`, text trắng, border-radius `4px`
- [ ] Click nút → smooth scroll đến section `#how-it-works` mà không reload trang
- [ ] Hover nút: background tối hơn (`#d44f39`), translateY(-1px)
- [ ] Khi JavaScript tắt: nút vẫn jump đến `#how-it-works` qua anchor link
- [ ] Focus ring hiển thị khi navigate bằng bàn phím
- [ ] Nút có `aria-label="Xem cách công nghệ igloo hoạt động"`
- [ ] Animation fadeUp khi mount với delay
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ Tailwind className)

---

## 12. Data Structure

```typescript
interface CtaScrollButtonProps {
  label: string;           // "See how it works"
  targetId: string;        // "how-it-works"
  ariaLabel: string;       // "Xem cách công nghệ igloo hoạt động"
  showArrow?: boolean;     // Hiển thị icon mũi tên bên phải
}
```

---

## 13. Implementation Notes

- Implement smooth scroll bằng `element.scrollIntoView({ behavior: "smooth", block: "start" })` trong onClick handler
- Dùng `"use client"` directive vì cần `onClick` event handler
- Fallback HTML: render `<a href="#how-it-works">` làm base element, gắn `onClick` preventDefault + scrollIntoView
  ```tsx
  <a
    href="#how-it-works"
    aria-label="Xem cách công nghệ igloo hoạt động"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }}
  >
    See how it works
  </a>
  ```
- Cách này đảm bảo hoạt động cả khi JS tắt (href anchor) lẫn khi JS bật (smooth scroll)
- Áp dụng `scroll-behavior: smooth` trên `html` element trong `globals.css` để hỗ trợ toàn trang
- Component đơn giản — không cần state, không cần custom hook
