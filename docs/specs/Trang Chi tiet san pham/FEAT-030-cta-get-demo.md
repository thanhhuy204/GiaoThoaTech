# FEAT-030: Nút CTA "Get a demo" (Trang Chi tiết sản phẩm)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0
**File implement:** `app/components/products/ProductCTASection.tsx`
**Page file:** `app/(pages)/products/[slug]/page.tsx`

---

## 1. Business Goal

Khuyến khích visitor liên hệ xin demo sau khi đã xem đầy đủ thông tin sản phẩm, chuyển đổi họ thành qualified lead. CTA section là điểm chốt quan trọng nhất của trang — phải nổi bật, rõ ràng, và đơn giản để kích hoạt hành động ngay.

---

## 2. Actors

- **Visitor quan tâm** — đã đọc đủ thông tin và muốn tìm hiểu thêm qua demo.
- **Decision maker** — muốn đặt lịch demo chính thức với đội sales.

---

## 3. Preconditions

- Người dùng đang ở trang `/products/[slug]`.
- `slug` hợp lệ và được truyền vào component.
- Trang `/contact` tồn tại và nhận query param `ref` và `product`.

---

## 4. Main Flow

1. Render section CTA với headline thuyết phục (ví dụ: "Ready to see it in action?").
2. Render sub-text ngắn: "Book a personalized demo with our team."
3. Render nút primary **"Get a demo"** màu cam `#E8614A`.
4. Người dùng click → navigate đến `/contact?ref=product-detail&product=[slug]`.
5. (Secondary) Render nút secondary "Download Data Sheet" (dẫn đến FEAT-031).

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
|                                                          |
|     Ready to see it in action?                          |
|     Book a personalized demo with our team.             |
|                                                          |
|     [  Get a demo  ]   [ Download Data Sheet ]          |
|                                                          |
+----------------------------------------------------------+
```

- Layout: centered, single column, `text-align: center`.
- Max-width: 640px, `margin: 0 auto`.
- Section padding: `80px 0` (desktop), `56px 24px` (mobile).
- Background: `#ffffff`.
- Button group: `display: flex`, `justify-content: center`, `gap: 16px`, `flex-wrap: wrap`.
- "Get a demo" button: primary style.
- "Download Data Sheet" button: secondary style (white background, cam border/text).

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Section background | `#ffffff` |
| Headline | `#0f0f0f` |
| Sub-text | `rgba(0,0,0,0.6)` |
| Primary button background | `#E8614A` |
| Primary button text | `#ffffff` |
| Primary button hover background | `#d4503a` |
| Secondary button background | `transparent` |
| Secondary button border | `#E8614A` |
| Secondary button text | `#E8614A` |
| Secondary button hover background | `rgba(232,97,74,0.06)` |

### Typography

| Yếu tố | Style |
|---|---|
| Headline | `Playfair Display`, `font-size: clamp(1.75rem, 3vw, 2.5rem)`, `font-weight: 700` |
| Sub-text | `font-size: 17px`, `line-height: 1.6`, `color: rgba(0,0,0,0.6)` |
| Primary button | `font-size: 16px`, `font-weight: 600`, `letter-spacing: 0.02em` |
| Secondary button | `font-size: 15px`, `font-weight: 500` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Headline | Fade in từ bottom | IntersectionObserver | 400ms, ease-out |
| Sub-text | Fade in, delay 100ms | IntersectionObserver | 400ms |
| Button group | Fade in + scale (0.97 → 1), delay 200ms | IntersectionObserver | 300ms |
| Primary button | Background darken + scale (1 → 1.02) | Hover | 150ms |
| Primary button | Scale press (1 → 0.98) | Active/click | 100ms |
| Secondary button | Background fill + border opacity | Hover | 150ms |

---

## 7. Business Rules

- URL navigate khi click: `/contact?ref=product-detail&product=[slug]` — `slug` lấy từ props.
- `ref` param **bắt buộc** là `product-detail` (không thay đổi).
- `product` param là slug sản phẩm hiện tại (dynamic).
- Dùng Next.js `<Link>` — không dùng `window.location` hay `router.push`.
- Nút "Get a demo" là primary action — phải nổi bật hơn nút secondary.
- Hai nút render cùng nhau trong 1 button group — không tách section riêng.
- Secondary button "Download Data Sheet" chỉ hiển thị nếu `datasheetUrl !== null`.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| `datasheetUrl === null` | Chỉ hiển thị nút "Get a demo", không có secondary button |
| Viewport < 400px | Buttons stack thành 1 cột (flex-col), full width |
| Người dùng đã ở trang `/contact` | Vẫn navigate lại với params mới |
| Slug chứa ký tự đặc biệt | Slug được encode bằng `encodeURIComponent` trước khi đưa vào URL |

---

## 9. Security Requirements

- `slug` được sanitize — chỉ `[a-z0-9-]` hợp lệ trước khi đưa vào URL param.
- Dùng `encodeURIComponent(slug)` khi build URL để tránh injection.
- Không có input user trong section này — chỉ là navigation.

---

## 10. Acceptance Criteria

- [ ] Nút "Get a demo" màu `#E8614A`, text trắng, `border-radius: 4px`.
- [ ] Click "Get a demo" → navigate đến `/contact?ref=product-detail&product=[slug]` đúng.
- [ ] `ref=product-detail` có trong URL sau khi click.
- [ ] `product=[slug]` đúng với slug trang hiện tại.
- [ ] `datasheetUrl === null` → chỉ 1 nút.
- [ ] Mobile: buttons stack dọc khi viewport < 400px.
- [ ] Hover effect trên cả hai buttons hoạt động.
- [ ] Click animation (press effect) trên primary button.
- [ ] TypeScript strict — props interface đầy đủ.
- [ ] Dùng Next.js `<Link>`, không dùng anchor tag HTML thuần.

---

## 11. Assets cần thiết

- Không cần ảnh hay icon đặc biệt.
- Button component tái sử dụng từ `components/ui/Button.tsx` (nếu đã có).

---

## 12. Data Structure

```typescript
interface ProductCTASectionProps {
  slug: string;           // Product slug — dùng để build URL params
  datasheetUrl: string | null;  // null → ẩn secondary button
  headline?: string;      // Default: "Ready to see it in action?"
  subText?: string;       // Default: "Book a personalized demo with our team."
}

// URL builder helper — đặt trong lib/utils.ts hoặc inline:
function buildDemoUrl(slug: string): string {
  return `/contact?ref=product-detail&product=${encodeURIComponent(slug)}`;
}
```

---

## 13. Implementation Notes

- Server Component — sử dụng Next.js `<Link>` cho navigation (không cần `"use client"`).
- Button primary: Tailwind `bg-[#E8614A] hover:bg-[#d4503a] text-white font-semibold px-8 py-3 rounded transition-colors duration-150`.
- Button secondary: Tailwind `border border-[#E8614A] text-[#E8614A] hover:bg-[#E8614A]/[0.06] px-6 py-3 rounded transition-colors duration-150`.
- Nếu `Button` component trong `components/ui/Button.tsx` đã có `variant` prop, dùng `variant="primary"` và `variant="outline"`.
- Animation fade-in: Tách `ProductCTASectionClient.tsx` chỉ nếu cần `IntersectionObserver`.
- Section này cũng render ở bottom trang sau `CustomerQuote` (FEAT-029) — đảm bảo spacing nhất quán.
