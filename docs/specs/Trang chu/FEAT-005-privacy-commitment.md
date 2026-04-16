# FEAT-005: Privacy Commitment Block

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/trangchu/PrivacyCommitmentBlock.tsx`
**Page file:** `app/page.tsx`
> ⚠️ **Lưu ý:** File này **chưa tồn tại** và chưa được thêm vào `app/page.tsx`. Cần tạo mới và đặt vào đúng thứ tự trong page.

---

## 1. Business Goal

Nhấn mạnh cam kết bảo mật dữ liệu nghiêm ngặt (GDPR compliance, không bán dữ liệu). Xây dựng lòng tin cho khách hàng cá nhân và doanh nghiệp khi truy cập website.

---

## 2. Actors

- **Visitor quan tâm bảo mật** — khách có mối lo về privacy
- **Potential User doanh nghiệp** — công ty cần đảm bảo an toàn thông tin
- **Admin/Legal team** — quản lý nội dung cam kết pháp lý

---

## 3. Preconditions

- Website hoạt động bình thường (HTTPS)
- Trang chủ load thành công
- Trang Chính sách bảo mật (`/privacy-policy`) đã setup

---

## 4. Main Flow

1. Người dùng kéo xuống trang chủ
2. Hệ thống hiển thị khối Privacy Commitment
3. Khối có nền gradient (xanh + đen hoặc solid color)
4. Hiển thị tiêu đề: `"Data privacy. Nothing else matters."`
5. Hiển thị nội dung: `"Having an iron clad commitment to the compliance of GDPR, international data privacy laws and standards, we safeguard our users access data as if it were our own."`
6. Hiển thị nút "Read more" hoặc "Learn more"
7. Click nút → navigate đến `/privacy-policy` hoặc `/legal/privacy`

---

## 5. UI Specification

### Layout

- **Container:** width `100%`, padding `80px 40px`, min-height `300px`
- **Inner content:** max-width `800px`, centered horizontally + vertically
- **Content alignment:** text-align center
- **Flexbox:** `display: flex`, `flex-direction: column`, `justify-content: center`, `align-items: center`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền gradient 1 | `linear-gradient(135deg, #0f3460 0%, #0f0f0f 100%)` |
| Nền solid alternative | `#1a1a2e` (đen + tint xanh) |
| Tiêu đề | `#ffffff` |
| Nội dung text | `rgba(255,255,255,0.85)` |
| Link "Read more" text | `var(--primary)` / `#E8614A` |
| Link "Read more" hover | `#FFD6B3` (lighter cam) |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề (H2) | `Playfair Display`, bold, `2.8rem`, line-height 1.2, color white |
| Nội dung text | `1.05rem`, line-height 1.7, color mờ trắng |
| Link "Read more" | `0.95rem`, font-weight 600, letter-spacing `0.05em`, color primary |

### Responsive Spacing

| Breakpoint | Padding | Title size | Text size |
|---|---|---|---|
| Desktop (≥1024px) | 80px 40px | 2.8rem | 1.05rem |
| Tablet (768px-1023px) | 60px 30px | 2.4rem | 1rem |
| Mobile (≤767px) | 40px 24px | 1.8rem | 0.95rem |

### Button Component

```
Link Button "Read more":
  padding: 12px 32px
  border-radius: 4px
  background: var(--primary) / #E8614A
  color: #ffffff
  font-weight: 600
  letter-spacing: 0.05em
  text-decoration: none
  transition: all 200ms ease
  cursor: pointer
  display: inline-block
  margin-top: 24px
  
:hover
  background: #d44f39
  text-decoration: underline
  
:active
  transform: scale(0.98)
```

---

## 6. Animations

| Element | Animation | Trigger | Duration | Delay |
|---|---|---|---|---|
| Tiêu đề | `fadeup` | Mount | 0.7s | 0ms |
| Nội dung text | `fadeup` | Mount | 0.7s | 150ms |
| Nút "Read more" | `fadeup` | Mount | 0.7s | 300ms |
| Block on scroll into view | `fadeup` or `slide-in` | IntersectionObserver | 0.8s | — |

**Keyframe:**
```css
@keyframes fadeup {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 7. Business Rules

- **Content immutable:** Tiêu đề và nội dung không tùy ý thay đổi (tuân thủ pháp lý GDPR)
- **Link destination:** Nút "Read more" luôn link đến `/privacy-policy`
- **Display:** Luôn hiển thị trên trang chủ (không conditional)
- **Background:** Gradient để khối nổi bật hơn, khác với các section khác
- **Trust signal:** Nội dung phải chính xác 100%, không marketing fluff

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Gradient CSS không support | Fallback solid color `#1a1a2e` |
| Text quá dài trên mobile | Truncate phù hợp, line-height thoải mái, padding đủ |
| Nút "Read more" cuộn ra ngoài màn hình | Click vẫn hoạt động, ripple effect (tùy chọn) |
| JavaScript bị tắt | Khối vẫn hiển thị, nút là `<a href>` bình thường |
| Trang `/privacy-policy` không exist | 404 hoặc cất return home (error boundary) |
| Dark mode browser setting | Khối tự động adjust contrast nếu có dark mode support |

---

## 9. Security Requirements

- **HTTPS:** Tất cả nội dung + link dùng HTTPS
- **Content integrity:** Tiêu đề/nội dung không thay đổi qua DOM manipulation
- **Link validation:** `/privacy-policy` dùng `next/link` để prevent injection
- **Legal accuracy:** GDPR claims phải accurate, không misleading
- **No tracking:** Không inject tracking code vào nút link

---

## 10. Accessibility Requirements

- **Semantic HTML:** Dùng `<section>`, `<h2>`, `<p>`, `<a>`
- **Color contrast:** WCAG AA minimum (4.5:1 for text)
- **Focus states:** Nút link có visible focus outline (`:focus-visible`)
- **ARIA labels:** Nút có `aria-label` rõ ràng nếu cần
- **Skip link:** (Optional) Nút link có thể skipable

---

## 11. Acceptance Criteria

- [ ] Khối hiển thị với nền gradient xanh-đen (hoặc solid color fallback)
- [ ] Tiêu đề `"Data privacy. Nothing else matters."` hiển thị chính xác, màu trắng
- [ ] Nội dung GDPR commitment hiển thị đầy đủ, dòng dài hợp lý
- [ ] Nút "Read more" hiển thị rõ, màu cam nổi bật
- [ ] Click nút → navigate đúng `/privacy-policy`
- [ ] Animation fadeup khi mount + stagger cho các phần tử
- [ ] Responsive: text scale trên mobile, padding hợp lý
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ className)
- [ ] Color contrast WCAG AA (4.5:1)
- [ ] Nút link có `:focus-visible` outline
- [ ] HTTPS enforced
- [ ] Performance: LCP không bị delay (component render nhanh)

---

## 12. Component Props (TypeScript)

```typescript
interface PrivacyCommitmentBlockProps {
  // Tùy chọn: customize liên kết target
  privacyPolicyUrl?: string;  // Default: "/privacy-policy"
  
  // Tùy chọn: custom title/content (cho test hoặc i18n)
  title?: string;  // Default: "Data privacy. Nothing else matters."
  content?: string;  // Default: GDPR compliance message
  buttonText?: string;  // Default: "Read more"
  
  // Tùy chọn: background gradient (customize màu)
  gradientStart?: string;  // Default: "#0f3460"
  gradientEnd?: string;  // Default: "#0f0f0f"
  
  // Tùy chọn: trigger animation on scroll into view
  animateOnScroll?: boolean;  // Default: true
}
```

---

## 13. Implementation Notes

- Use `next/link` cho link `href="/privacy-policy"`
- Optional: sử dụng `IntersectionObserver` hook để trigger animation khi scroll vào view
- Gradient CSS: `linear-gradient(135deg, var(--color-start) 0%, var(--color-end) 100%)`
- Mobile responsive: test trên 320px, 480px, 768px viewports
- Accessibility: test với screen reader (NVDA, JAWS) + keyboard navigation
- Performance: component nhẹ (no heavy images/videos), giới hạn CSS animations
