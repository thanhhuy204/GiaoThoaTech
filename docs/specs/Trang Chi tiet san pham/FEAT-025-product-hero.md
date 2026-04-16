# FEAT-025: Hero sản phẩm (Trang Chi tiết sản phẩm)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0
**File implement:** `app/components/products/ProductHero.tsx`
**Page file:** `app/(pages)/products/[slug]/page.tsx`

---

## 1. Business Goal

Tạo ấn tượng mạnh đầu tiên về sản phẩm cụ thể, hiển thị hình ảnh đẹp và tên + mô tả ngắn để thu hút người xem tiếp tục đọc. Hero section phải truyền tải ngay lập tức giá trị cốt lõi của sản phẩm và kích thích người dùng cuộn xuống tìm hiểu thêm.

---

## 2. Actors

- **Visitor** — khách vãng lai truy cập trang chi tiết sản phẩm qua link trực tiếp hoặc từ trang danh sách sản phẩm.
- **Prospect** — khách hàng tiềm năng đang nghiên cứu sản phẩm để đưa ra quyết định mua.

---

## 3. Preconditions

- Route `/products/[slug]` được truy cập với `slug` hợp lệ (ví dụ: `padlock-2`).
- Dữ liệu sản phẩm (`ProductDetail`) đã được fetch từ API hoặc CMS trước khi render.
- File ảnh hero của sản phẩm tồn tại trong `public/images/products/[slug]/`.

---

## 4. Main Flow

1. Người dùng truy cập `/products/padlock-2` (hoặc slug bất kỳ).
2. Server Component fetch dữ liệu sản phẩm theo `slug`.
3. Render breadcrumb navigation: `Home > Products > Padlock 2`.
4. Render split layout:
   - **Trái (60%):** Hình ảnh hero sản phẩm lớn, full-height, object-cover.
   - **Phải (40%):** Tên sản phẩm (H1), badge danh mục, mô tả ngắn 1–2 dòng, và nhóm CTA.
5. Hero chiếm 55–65% chiều cao màn hình (min-height: 60vh).
6. Ảnh có `alt` text đầy đủ từ trường `product.imageAlt`.

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
| Breadcrumb: Home / Products / Padlock 2                  |
+----------------------------------------------------------+
|                          |                               |
|   Product Image          |  [Badge: Smart Padlock]       |
|   (hero, full-height,    |                               |
|   object-cover)          |  H1: Padlock 2 – Military     |
|                          |  grade smart padlock          |
|   60% width              |                               |
|                          |  Short description (1–2 line) |
|                          |                               |
|                          |  [Get a demo]  [Data Sheet]   |
|                          |  40% width                    |
+----------------------------------------------------------+
```

- Desktop (≥1280px): Split 60/40, row.
- Tablet (768px–1279px): Split 50/50, row.
- Mobile (<768px): Stack column — ảnh trên, nội dung dưới. Ảnh height: 280px.
- Breadcrumb nằm trên split layout, full-width, padding-top: 24px.
- Minimum hero height: `60vh` trên desktop, `auto` trên mobile.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background hero | `#f9f9f9` |
| Breadcrumb text | `rgba(0,0,0,0.6)` |
| Breadcrumb separator | `rgba(0,0,0,0.3)` |
| Breadcrumb current page | `#0f0f0f` |
| Badge background | `rgba(232,97,74,0.1)` |
| Badge text | `#E8614A` |
| H1 color | `#0f0f0f` |
| Description text | `rgba(0,0,0,0.6)` |
| Image overlay gradient | `linear-gradient(to right, transparent 70%, #f9f9f9 100%)` — desktop only |

### Typography

| Yếu tố | Style |
|---|---|
| Breadcrumb | `font-size: 14px`, `font-family: system sans-serif`, `line-height: 1.4` |
| Badge | `font-size: 12px`, `font-weight: 600`, `letter-spacing: 0.08em`, `text-transform: uppercase` |
| H1 (product name) | `Playfair Display`, `font-size: clamp(2rem, 4vw, 3.5rem)`, `font-weight: 700`, `line-height: 1.15` |
| Description | `font-size: 18px`, `font-family: system sans-serif`, `line-height: 1.65`, `color: rgba(0,0,0,0.6)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Breadcrumb | Fade in from top (translateY -8px → 0) | Page load | 300ms, ease-out |
| Product image | Fade in + subtle scale (1.02 → 1) | Page load | 500ms, ease-out |
| H1 | Fade in from bottom (translateY 12px → 0) | Page load | 400ms, ease-out, delay 100ms |
| Description | Fade in | Page load | 400ms, ease-out, delay 200ms |
| CTA group | Fade in | Page load | 400ms, ease-out, delay 300ms |
| Breadcrumb link | Underline on hover | Hover | 150ms |
| Image | Subtle zoom (scale 1 → 1.03) | Hover (desktop) | 600ms, ease |

---

## 7. Business Rules

- `slug` phải khớp với danh sách sản phẩm đã được định nghĩa. Slug không hợp lệ → redirect `notFound()` (Next.js 404).
- Ảnh hero **bắt buộc** có `alt` text mô tả sản phẩm (không để trống).
- Hero phải chiếm **50–70% chiều cao màn hình** đầu tiên trên desktop.
- Breadcrumb luôn hiển thị: `Home > Products > [Product Name]`.
- Tên sản phẩm (H1) là duy nhất trên trang — không có H1 khác.
- Không dùng WebGL/Canvas cho hiệu ứng ảnh.
- Server Component — không dùng `"use client"` trừ khi cần animation (tách ra sub-component).

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| `slug` không tồn tại | Gọi `notFound()` → Next.js render trang 404 |
| Ảnh hero bị lỗi / không tải được | Hiển thị placeholder màu `#f0f0f0` với icon camera, không crash trang |
| Tên sản phẩm quá dài (>60 ký tự) | Wrap xuống dòng, không truncate — font size responsive giữ layout |
| Mô tả trống | Ẩn phần description, CTA group dịch lên |
| Không có badge danh mục | Ẩn badge, H1 dịch lên |
| Fetch API thất bại | Render error boundary, hiện fallback UI "Product unavailable" |

---

## 9. Security Requirements

- `slug` được sanitize trước khi dùng làm key fetch API (chỉ cho phép `[a-z0-9-]`).
- Không render HTML từ CMS trực tiếp vào `dangerouslySetInnerHTML` — parse an toàn.
- Alt text không chứa script injection.

---

## 10. Acceptance Criteria

- [ ] Route `/products/[slug]` render đúng hero section cho mỗi sản phẩm.
- [ ] Breadcrumb hiển thị đúng 3 cấp: `Home > Products > [Product Name]`.
- [ ] Split layout 60/40 trên desktop, stack trên mobile.
- [ ] H1 sử dụng Playfair Display, đúng màu `#0f0f0f`.
- [ ] Ảnh có `alt` text đầy đủ, không để trống.
- [ ] Hero chiếm min 50% chiều cao viewport trên desktop.
- [ ] Slug không hợp lệ → trang 404.
- [ ] Ảnh lỗi → placeholder hiển thị, trang không crash.
- [ ] Animations chạy đúng khi trang load (fade in theo thứ tự).
- [ ] TypeScript strict — không có lỗi `any`.
- [ ] Accessible: breadcrumb dùng `<nav aria-label="Breadcrumb">`.

---

## 11. Assets cần thiết

- Ảnh hero sản phẩm: `public/images/products/[slug]/hero.jpg` — tối thiểu 1200×800px, định dạng WebP ưu tiên.
- Fallback placeholder: `public/images/products/placeholder.svg`.
- Font Playfair Display load qua `next/font/google`.

---

## 12. Data Structure

```typescript
interface ProductDetail {
  id: string;
  slug: string;                  // e.g. "padlock-2"
  name: string;                  // e.g. "Padlock 2"
  tagline: string;               // e.g. "Military grade smart padlock"
  shortDescription: string;      // 1–2 sentences
  category: string;              // e.g. "Smart Padlock"
  heroImage: {
    src: string;                 // path or URL
    alt: string;                 // required, non-empty
    width: number;
    height: number;
  };
  datasheetUrl: string | null;   // null → ẩn nút Download
  benefits: ProductBenefit[];
  offlineTech: OfflineTechSection;
  customerQuote: CustomerQuote | null;
}

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}
```

---

## 13. Implementation Notes

- Dùng Next.js `generateStaticParams` để pre-render các slug đã biết tại build time.
- Fetch dữ liệu trong Server Component (`page.tsx`) và truyền qua props xuống `ProductHero`.
- Dùng `next/image` với `priority={true}` cho ảnh hero (LCP optimization).
- Animation: Dùng CSS `@keyframes` + Tailwind `animate-*` custom, hoặc tách `ProductHeroClient.tsx` với `"use client"` chỉ cho phần animation.
- Breadcrumb implement bằng `<nav aria-label="Breadcrumb"><ol>` với `aria-current="page"` trên item cuối.
- Dynamic metadata: export `generateMetadata` trong `page.tsx` để set `<title>` và `<meta description>` theo sản phẩm.
