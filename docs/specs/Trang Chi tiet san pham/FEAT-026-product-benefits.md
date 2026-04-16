# FEAT-026: Lợi ích chính bullet points (Trang Chi tiết sản phẩm)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0
**File implement:** `app/components/products/ProductBenefits.tsx`
**Page file:** `app/(pages)/products/[slug]/page.tsx`

---

## 1. Business Goal

Liệt kê lợi ích nổi bật của sản phẩm để khách hàng thấy giá trị ngay lập tức, ngay sau khi đọc hero section. Mỗi bullet point phải truyền tải một lợi thế cạnh tranh rõ ràng, dễ scan, hỗ trợ quyết định mua hàng nhanh hơn.

---

## 2. Actors

- **Visitor** — khách vãng lai đang scan trang để đánh giá sản phẩm nhanh.
- **Prospect** — khách hàng tiềm năng so sánh sản phẩm với đối thủ cạnh tranh.
- **Decision maker** — người ra quyết định mua, cần thấy spec kỹ thuật nổi bật ngay.

---

## 3. Preconditions

- `ProductDetail.benefits` được populate đầy đủ từ API.
- Section này render ngay sau `ProductHero` (FEAT-025) trên trang.
- Có ít nhất 1 benefit trong danh sách để render section.

---

## 4. Main Flow

1. Render tiêu đề section: "Key Benefits" hoặc "Why [Product Name]?".
2. Render danh sách benefit, mỗi item gồm:
   a. Icon check (custom SVG, màu primary `#E8614A`).
   b. Tiêu đề ngắn (bold).
   c. Mô tả ngắn (optional, 1 dòng).
3. Danh sách default cho Padlock 2:
   - IP67 chống nước & bụi
   - Chịu nhiệt -20°C đến 50°C
   - 150,000+ chu kỳ khóa/mở
   - Bluetooth 4.2 + algoPIN™ offline
   - Military-grade AES-128 encryption
4. Layout 2 cột trên desktop, 1 cột trên mobile.

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
| Section: Key Benefits                                    |
|                                                          |
|  [✓] IP67 chống nước     |  [✓] Chịu nhiệt -20°C        |
|  [✓] 150k+ chu kỳ        |  [✓] Bluetooth + algoPIN™    |
|  [✓] Military encryption |                               |
+----------------------------------------------------------+
```

- Desktop (≥1024px): 2 cột, `gap: 16px 48px`.
- Mobile (<1024px): 1 cột, `gap: 16px`.
- Section padding: `80px 0` (desktop), `48px 0` (mobile).
- Max-width container: 1200px, centered.
- Mỗi benefit item: `display: flex`, `align-items: flex-start`, `gap: 16px`.
- Icon container: `width: 24px`, `height: 24px`, `flex-shrink: 0`, `margin-top: 2px`.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Section background | `#ffffff` |
| Section title | `#0f0f0f` |
| Icon check | `#E8614A` |
| Icon background circle | `rgba(232,97,74,0.08)` |
| Benefit title | `#1a1a1a` |
| Benefit description | `rgba(0,0,0,0.6)` |
| Divider (optional) | `rgba(0,0,0,0.08)` |

### Typography

| Yếu tố | Style |
|---|---|
| Section title | `Playfair Display`, `font-size: clamp(1.75rem, 3vw, 2.5rem)`, `font-weight: 700` |
| Benefit title | `font-size: 16px`, `font-weight: 600`, `font-family: system sans-serif`, `color: #1a1a1a` |
| Benefit description | `font-size: 14px`, `font-family: system sans-serif`, `line-height: 1.5`, `color: rgba(0,0,0,0.6)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section title | Fade in from bottom (translateY 16px → 0) | IntersectionObserver (20% visible) | 400ms, ease-out |
| Benefit items | Staggered fade in from bottom | IntersectionObserver | 300ms each, delay 80ms per item |
| Icon | Scale bounce (0.8 → 1.05 → 1) | Item enters viewport | 400ms, ease |
| Benefit item row | Background highlight on hover (`rgba(232,97,74,0.04)`) | Hover | 200ms |

---

## 7. Business Rules

- Danh sách benefits lấy từ `ProductDetail.benefits` — không hardcode trong component.
- Hiển thị tối đa 8 benefits. Nếu nhiều hơn 8, ẩn phần thừa sau nút "Show all".
- Mỗi benefit **bắt buộc** có `title`. Trường `description` là optional.
- Icon check là SVG nội tuyến hoặc từ `components/ui/icons/` — không dùng thư viện icon ngoài.
- Section chỉ render khi `benefits.length > 0`.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| `benefits` mảng rỗng | Ẩn toàn bộ section, không render placeholder |
| Benefit title quá dài (>80 ký tự) | Wrap xuống dòng, không truncate |
| Chỉ có 1 benefit | Layout 1 cột, không tạo cột trống |
| Số benefits lẻ (ví dụ 5) | Cột cuối chỉ có 1 item, layout không bị vỡ |
| `description` bị null/undefined | Chỉ render title, bỏ qua description |
| Nhiều hơn 8 benefits | Hiển thị 8 đầu, nút "Show all X benefits" mở rộng danh sách |

---

## 9. Security Requirements

- Không render `title` hoặc `description` qua `dangerouslySetInnerHTML`.
- Content từ API phải được escape — dùng React text rendering thông thường.

---

## 10. Acceptance Criteria

- [ ] Section render đúng danh sách benefits từ `ProductDetail.benefits`.
- [ ] Icon check màu `#E8614A` cho mỗi item.
- [ ] Layout 2 cột trên desktop (≥1024px), 1 cột trên mobile.
- [ ] Staggered animation hoạt động khi scroll vào viewport.
- [ ] `benefits` rỗng → section bị ẩn hoàn toàn.
- [ ] Benefit title bold, description muted — đúng typography spec.
- [ ] Không dùng thư viện icon ngoài.
- [ ] TypeScript strict — interface `ProductBenefit` đầy đủ.
- [ ] Không có lỗi Lighthouse accessibility (icon có `aria-hidden="true"`).

---

## 11. Assets cần thiết

- Icon check SVG: `components/ui/icons/CheckIcon.tsx` — nếu chưa có, tạo mới.
- Không cần ảnh hay font bổ sung.

---

## 12. Data Structure

```typescript
interface ProductBenefit {
  id: string;
  title: string;          // Bắt buộc, ví dụ: "IP67 chống nước & bụi"
  description?: string;   // Optional, ví dụ: "Hoạt động bình thường khi ngâm nước 1m/30 phút"
  icon?: string;          // Optional icon key — default dùng CheckIcon
}

// Trong ProductDetail (FEAT-025)
interface ProductDetail {
  // ...
  benefits: ProductBenefit[];
}

// Props của component
interface ProductBenefitsProps {
  benefits: ProductBenefit[];
  productName: string;    // Dùng cho section title "Why [productName]?"
}
```

---

## 13. Implementation Notes

- Component là Server Component thuần — không cần `"use client"`.
- Animation stagger: Tách `ProductBenefitsClient.tsx` với `"use client"` nếu cần `IntersectionObserver`. Inject `style={{ animationDelay: \`${index * 80}ms\` }}` cho từng item.
- "Show all" button (nếu cần): Tách thành `BenefitsExpandButton.tsx` với `"use client"`.
- Icon: Tạo `CheckCircleIcon` component trả về SVG inline, nhận `className` prop để override màu qua Tailwind.
- Grid: Dùng Tailwind `grid grid-cols-1 lg:grid-cols-2` với `gap-x-12 gap-y-4`.
