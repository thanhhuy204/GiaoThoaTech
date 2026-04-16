# FEAT-007: Danh sách sản phẩm nổi bật

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Cần có trước khi launch
**File implement:** `app/components/overview/ProductList.tsx`, `app/components/overview/ProductCard.tsx`
**Page file:** `app/(pages)/overview/page.tsx`

---

## 1. Business Goal

Hiển thị nhanh 5 sản phẩm phần cứng nổi bật của igloo ngay trên trang Overview để khách hàng doanh nghiệp thấy toàn cảnh dòng sản phẩm, từ đó khuyến khích click vào trang chi tiết từng sản phẩm hoặc liên hệ yêu cầu demo.

---

## 2. Actors

- **Visitor doanh nghiệp** — chủ bất động sản, quản lý tòa nhà muốn khảo sát sản phẩm
- **Potential B2B User** — đối tác đang đánh giá giải pháp phần cứng trước khi tích hợp

---

## 3. Preconditions

- Trang Overview (`/overview`) load thành công trên HTTPS
- Danh sách 5 sản phẩm đã được publish và có đủ assets (ảnh + mô tả)
- Các trang chi tiết sản phẩm tương ứng đã tồn tại (`/products/[slug]`)

---

## 4. Main Flow

1. Người dùng kéo xuống trang Overview đến phần sản phẩm nổi bật
2. Hệ thống hiển thị tiêu đề section: `"Featured Products"`
3. Hiển thị lưới 5 sản phẩm theo thứ tự cố định:
   - **Deadbolt Go** — khóa cửa deadbolt vân tay
   - **Keybox 3** — hộp chứa chìa khóa thông minh
   - **Padlock 2** — khóa móc thông minh
   - **Cellular Deadbolt** — khóa deadbolt kết nối di động
   - **Padlock Lite** — khóa móc phổ thông
4. Mỗi sản phẩm hiển thị: ảnh sản phẩm lớn, tên sản phẩm, mô tả ngắn 1 dòng
5. Người dùng click vào ảnh hoặc tên sản phẩm → hệ thống chuyển đến trang chi tiết sản phẩm tương ứng (`/products/[slug]`)

---

## 5. UI Specification

### Layout

- **Section container:** `width: 100%`, padding `80px 40px`, background `#ffffff`
- **Section header:** căn giữa, margin-bottom `56px`
- **Grid sản phẩm:** 5 cột desktop (≥1280px), 3 cột tablet (768px–1279px), 2 cột mobile nhỏ (480px–767px), 1 cột mobile (≤479px)
  - Gap: `24px` desktop, `16px` tablet/mobile
  - Không có nút "Xem tất cả" (không có trang tổng hợp)

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#ffffff` |
| Nền card | `#f9f9f9` |
| Card border | `rgba(0,0,0,0.08)` |
| Card hover shadow | `0 8px 24px rgba(0,0,0,0.12)` |
| Tiêu đề section | `#0f0f0f` |
| Tên sản phẩm | `#1a1a1a` |
| Mô tả sản phẩm | `rgba(0,0,0,0.6)` |
| Link overlay hover | `rgba(232,97,74,0.06)` |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề section H2 | `Playfair Display`, bold, `2.2rem`, line-height 1.3, color `#0f0f0f` |
| Tên sản phẩm | font-weight `700`, `1rem`, letter-spacing `0.01em`, color `#1a1a1a` |
| Mô tả ngắn | `0.875rem`, line-height 1.5, color `rgba(0,0,0,0.6)`, max 1 dòng (overflow ellipsis) |

### Product Card Component

```
Card:
  padding: 20px 16px
  border-radius: 8px
  border: 1px solid rgba(0,0,0,0.08)
  background: #f9f9f9
  transition: all 300ms ease
  cursor: pointer
  display: flex
  flex-direction: column
  align-items: center
  text-align: center

Card:hover
  box-shadow: 0 8px 24px rgba(0,0,0,0.12)
  transform: translateY(-4px)
  background: #ffffff

Card image:
  width: 100%
  aspect-ratio: 1 / 1
  object-fit: contain
  border-radius: 4px
  margin-bottom: 16px
  max-height: 200px

Card name:
  margin-bottom: 6px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 100%

Card description:
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 100%
```

### Sản phẩm cụ thể

| # | Tên | Slug | Mô tả ngắn |
|---|---|---|---|
| 1 | Deadbolt Go | `deadbolt-go` | Fingerprint deadbolt, works without internet |
| 2 | Keybox 3 | `keybox-3` | Smart key storage for property managers |
| 3 | Padlock 2 | `padlock-2` | Weatherproof smart padlock with Bluetooth |
| 4 | Cellular Deadbolt | `cellular-deadbolt` | Remote access via cellular network |
| 5 | Padlock Lite | `padlock-lite` | Lightweight smart padlock for everyday use |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section header | `fadeUp` | Scroll into view (Intersection Observer) | 0.7s |
| Cards (stagger) | `fadeUp` | Scroll into view | 0.7s + delay 0.1s mỗi card |
| Card hover | `translateY(-4px)` + shadow | Hover | 300ms ease |
| Card image | `scale(1.03)` | Hover | 300ms ease |

```css
@keyframes fadeUp {
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

- Hiển thị đúng 5 sản phẩm featured — không thêm, không bớt
- Thứ tự hiển thị cố định: Deadbolt Go → Keybox 3 → Padlock 2 → Cellular Deadbolt → Padlock Lite
- Hình ảnh phải có `alt` text đầy đủ (ví dụ: `"Khóa Deadbolt Go vân tay của igloo"`)
- Không có nút "Xem tất cả sản phẩm" — không có trang list tổng hợp sản phẩm
- Click ảnh hoặc tên đều dẫn đến cùng URL trang chi tiết
- Ảnh sản phẩm dùng định dạng `.webp` để tối ưu performance
- **CTA tracking:** Link sản phẩm kèm `?ref=overview-product-list`

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Hình sản phẩm không tải được | Hiển thị placeholder (background `#e9e9e9` + icon product) + tên và mô tả vẫn hiển thị |
| JavaScript bị tắt | Lưới hiển thị tĩnh, không animation; links vẫn hoạt động bình thường |
| Tên sản phẩm quá dài | Truncate với ellipsis, không wrap sang dòng 2 |
| Màn hình rất nhỏ (≤320px) | 1 cột, ảnh chiếm full width, padding giảm xuống `12px` |
| Slug trang chi tiết thay đổi | Cập nhật trong data source duy nhất — không hardcode URL rải rác |

---

## 9. Security Requirements

- Hình ảnh sản phẩm serve từ HTTPS (`/images/Products/...` hoặc CDN HTTPS)
- Không lộ ID nội bộ sản phẩm trong URL (dùng slug đọc được thay vì UUID)
- Không dùng `dangerouslySetInnerHTML` cho tên hoặc mô tả sản phẩm
- Link điều hướng dùng `next/link` — không dùng `window.location.href`

---

## 10. Acceptance Criteria

- [ ] Section hiển thị tiêu đề `"Featured Products"` đúng font `Playfair Display`
- [ ] Lưới hiển thị đúng 5 sản phẩm theo thứ tự quy định
- [ ] Mỗi sản phẩm có ảnh, tên và mô tả ngắn 1 dòng
- [ ] Hình ảnh có `alt` text đầy đủ (ví dụ: `"Khóa Deadbolt Go vân tay của igloo"`)
- [ ] Click ảnh → chuyển đúng trang `/products/[slug]?ref=overview-product-list`
- [ ] Click tên → chuyển đúng trang `/products/[slug]?ref=overview-product-list`
- [ ] Card hover: shadow + translateY(-4px) hoạt động đúng
- [ ] Responsive: 5 col desktop, 3 col tablet, 2 col mobile nhỏ, 1 col mobile
- [ ] Animation fadeUp + stagger khi scroll vào viewport
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ Tailwind className)
- [ ] Images lazy-load qua `next/image`

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Deadbolt Go | `public/images/Products/deadbolt-go.webp` | 400×400px | Square, transparent bg |
| Keybox 3 | `public/images/Products/keybox-3.webp` | 400×400px | Square, transparent bg |
| Padlock 2 | `public/images/Products/padlock-2.webp` | 400×400px | Đã có |
| Cellular Deadbolt | `public/images/Products/cellular-deadbolt.webp` | 400×400px | Square, transparent bg |
| Padlock Lite | `public/images/Products/padlock-lite.webp` | 400×400px | Đã có |
| Placeholder icon | `public/images/placeholder-product.svg` | 64×64px | Fallback khi ảnh lỗi |

---

## 12. Data Structure

```typescript
interface FeaturedProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  imageAlt: string;
  order: number; // 1–5, thứ tự cố định
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "deadbolt-go",
    slug: "deadbolt-go",
    name: "Deadbolt Go",
    shortDescription: "Fingerprint deadbolt, works without internet",
    imageUrl: "/images/Products/deadbolt-go.webp",
    imageAlt: "Khóa Deadbolt Go vân tay của igloo",
    order: 1,
  },
  // ... các sản phẩm còn lại
];
```

---

## 13. Implementation Notes

- Data sản phẩm hardcode trong file constants (`lib/constants/products.ts`) — không fetch API vì danh sách cố định
- Dùng `next/image` với `loading="lazy"` cho tất cả ảnh sản phẩm; ảnh đầu tiên có thể `priority` nếu above the fold
- Dùng `next/link` cho toàn bộ card làm wrapper (`<Link href="...">`) với `aria-label` đầy đủ
- Intersection Observer trigger animation — dùng `useInView` hook tự viết trong `hooks/useInView.ts` (không dùng thư viện ngoài)
- Server Component mặc định (không cần `"use client"` nếu không có state); chỉ dùng `"use client"` nếu cần animation trigger
- Tên mô tả ngắn: max 60 ký tự — truncate bằng CSS `text-overflow: ellipsis` (không cắt chuỗi bằng JS)
