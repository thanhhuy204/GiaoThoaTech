# FEAT-014: Nút CTA "Speak to us — get a free demo"

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/integrations/IntegrationsCta.tsx`
**Page file:** `app/(pages)/integrations/page.tsx`

---

## 1. Business Goal

Khuyến khích khách hàng liên hệ trực tiếp ngay sau khi đã xem toàn bộ nội dung trang Integrations (giải pháp, key features), nhằm tăng tỷ lệ chuyển đổi lead từ trang này. CTA nằm cuối trang để capture visitor đang ở trạng thái quyết định cao nhất.

---

## 2. Actors

- **Visitor quan tâm tích hợp** — visitor đã đọc xong trang và muốn tìm hiểu thêm
- **Potential B2B User** — người đã đánh giá xong và sẵn sàng liên hệ bước tiếp theo

---

## 3. Preconditions

- Trang Integrations (`/integrations`) load thành công trên HTTPS
- Trang liên hệ (`/contact`) đã tồn tại
- Section nằm ở cuối trang Integrations — sau FEAT-013 (Key features list)

---

## 4. Main Flow

1. Người dùng cuộn đến cuối trang Integrations, thấy CTA section
2. Hệ thống hiển thị section với tiêu đề ngắn gọn tạo urgency (ví dụ: `"Ready to get started?"`)
3. Hiển thị nút CTA chính: `"Speak to us — get a free demo"` (màu cam nổi bật)
4. Người dùng click nút
5. Hệ thống navigate đến trang `/contact?ref=integrations-cta`
6. Trang không reload — dùng client-side navigation (next/link)

---

## 5. UI Specification

### Layout

- **Section container:** `width: 100%`, padding `80px 40px`, background `#0f0f0f` (tối, tương phản với các section trên)
- **Nội dung:** căn giữa, max-width `640px`, margin `0 auto`, `text-align: center`
- Stack: pre-headline → headline → sub-text → nút CTA (theo chiều dọc, gap `16px` mỗi element)

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#0f0f0f` |
| Pre-headline label | `rgba(255,255,255,0.45)` |
| Tiêu đề section | `#ffffff` |
| Sub-text | `rgba(255,255,255,0.6)` |
| Nền nút (mặc định) | `#E8614A` |
| Text nút | `#ffffff` |
| Nền nút (hover) | `#d44f39` |
| Nền nút (active) | `#c0432f` |
| Focus ring nút | outline `2px solid #E8614A`, offset `2px` |
| Subtle glow phía sau (tùy chọn) | `radial-gradient(ellipse 400px 200px at 50% 50%, rgba(232,97,74,0.08), transparent)` |

### Typography

| Yếu tố | Style |
|---|---|
| Pre-headline | `0.65rem`, uppercase, letter-spacing `0.16em`, font-weight `600`, color `rgba(255,255,255,0.45)` |
| Tiêu đề H2 | `Playfair Display`, bold, `2rem`, line-height 1.3, color `#ffffff` |
| Sub-text | `0.95rem`, line-height 1.7, color `rgba(255,255,255,0.6)` |
| Text nút | `0.9rem`, font-weight `600`, letter-spacing `0.02em` |

### Nội dung text

**Pre-headline:** `"GET IN TOUCH"`

**Tiêu đề H2:** `"Ready to grow with igloo?"`

**Sub-text:** `"Talk to our team and get a free demo tailored to your business needs."`

**Text nút:** `"Speak to us — get a free demo"`

### Button Component

```
Button:
  padding: 14px 32px
  border-radius: 4px
  background: #E8614A
  color: #ffffff
  font-size: 0.9rem
  font-weight: 600
  letter-spacing: 0.02em
  border: none
  cursor: pointer
  transition: background-color 200ms ease, transform 100ms ease
  display: inline-flex
  align-items: center
  gap: 8px
  margin-top: 8px

Button:hover
  background: #d44f39
  transform: translateY(-2px)

Button:active
  background: #c0432f
  transform: translateY(0)

Button:focus-visible
  outline: 2px solid #E8614A
  outline-offset: 2px
```

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Pre-headline | `fadeUp` | Scroll into view | 0.6s |
| Tiêu đề H2 | `fadeUp` | Scroll into view | 0.7s, delay 0.1s |
| Sub-text | `fadeUp` | Scroll into view | 0.6s, delay 0.2s |
| Nút CTA | `fadeUp` | Scroll into view | 0.6s, delay 0.3s |
| Button hover | `translateY(-2px)` + bg darken | Hover | 200ms ease |

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 7. Business Rules

- Nút màu cam nổi bật (`#E8614A`) — không thay đổi màu
- Text nút cố định: `"Speak to us — get a free demo"` — không viết tắt hay thay đổi
- Navigate đến `/contact` kèm ref param: `?ref=integrations-cta`
- Section nằm ở **cuối trang** — sau tất cả content sections (FEAT-011, 012, 013)
- Nền tối (`#0f0f0f`) để tạo visual closure cho trang và làm nút cam nổi bật tối đa
- Khi JavaScript tắt: navigate vẫn hoạt động như link thông thường (fallback `<a href>`)
- **Không dùng** `window.open()` — navigate trong cùng tab

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| JavaScript tắt | Nút render là `<a href="/contact?ref=integrations-cta">` — điều hướng bình thường |
| Mạng chậm | Client-side navigation của Next.js xử lý — không cần loading state đặc biệt |
| Người dùng dùng bàn phím (Tab → Enter) | Focus ring hiển thị rõ, Enter navigate đúng trang |
| Màn hình rất hẹp (≤320px) | Nút full-width, text không bị cắt |
| Trang `/contact` không tồn tại | 404 do Next.js xử lý — ngoài scope FEAT-014 |

---

## 9. Security Requirements

- Navigate dùng `next/link` hoặc `next/navigation` — không dùng `window.location`
- URL `/contact?ref=integrations-cta`: validate ref param ở server nếu được log
- Không có form hay input trong component này — không có XSS risk
- Không dùng `dangerouslySetInnerHTML`

---

## 10. Acceptance Criteria

- [ ] Section hiển thị đúng ở cuối trang Integrations (sau Key features)
- [ ] Pre-headline `"GET IN TOUCH"` hiển thị đúng style
- [ ] Tiêu đề `"Ready to grow with igloo?"` dùng font `Playfair Display`
- [ ] Sub-text hiển thị đúng nội dung
- [ ] Nút `"Speak to us — get a free demo"` hiển thị đúng màu cam `#E8614A`
- [ ] Click nút → navigate đến `/contact?ref=integrations-cta` (không reload)
- [ ] Hover nút: background `#d44f39`, translateY(-2px)
- [ ] Focus ring hiển thị khi Tab đến nút
- [ ] Khi JavaScript tắt: nút vẫn navigate được qua `<a href>`
- [ ] Animation stagger khi scroll vào viewport
- [ ] Nền section `#0f0f0f`
- [ ] Nút có `aria-label` đầy đủ
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ Tailwind className)

---

## 12. Data Structure

```typescript
interface IntegrationsCtaProps {
  preHeadline?: string;    // default: "GET IN TOUCH"
  headline?: string;       // default: "Ready to grow with igloo?"
  subText?: string;        // default: "Talk to our team..."
  ctaLabel?: string;       // default: "Speak to us — get a free demo"
  ctaHref?: string;        // default: "/contact?ref=integrations-cta"
  ctaAriaLabel?: string;   // default: "Liên hệ igloo để nhận demo miễn phí"
}
```

---

## 13. Implementation Notes

- Dùng `"use client"` vì có animation trigger cần Intersection Observer; hoặc dùng CSS animation thuần không cần JS — ưu tiên CSS-only nếu có thể
- Implement navigation bằng `next/link` component bao nút (hoặc dùng `useRouter` từ `next/navigation`)
- Cách đơn giản nhất: `<Link href="/contact?ref=integrations-cta">` bao quanh `<button>` element
  ```tsx
  <Link href="/contact?ref=integrations-cta" aria-label="Liên hệ igloo để nhận demo miễn phí">
    <button>Speak to us — get a free demo</button>
  </Link>
  ```
  Hoặc dùng `<Link>` với `role="button"` styling — tùy team convention
- Đây là **closing CTA** của toàn trang — đặt trong file page (`app/(marketing)/integrations/page.tsx`) ở vị trí cuối cùng, sau tất cả sections khác
- Component nên có `displayName = "IntegrationsCta"` để dễ debug trong React DevTools
- Pattern tương tự có thể tái sử dụng cho các trang khác (Overview, Technology) — consider extract thành `components/ui/CtaSection.tsx` với props linh hoạt
