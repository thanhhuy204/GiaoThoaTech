# FEAT-036: Teaser trích dẫn khách hàng (Trang Contact us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1
**File implement:** `app/components/contact/CustomerQuotesSection.tsx`
**Page file:** `app/(pages)/contact/page.tsx`

---

## 1. Business Goal

Tăng lòng tin và giảm lo ngại của prospect bằng cách hiển thị trích dẫn thực tế từ các khách hàng đã triển khai thành công. Khác với FEAT-029 (1 quote liên quan sản phẩm), section này trên trang Contact hiển thị **nhiều quotes** từ nhiều doanh nghiệp khác nhau để tạo breadth của social proof, khuyến khích visitor hoàn tất submit form.

---

## 2. Actors

- **Prospect B2B** — đang cân nhắc submit form, cần validation từ peer companies.
- **Decision maker** — nhận ra tên công ty quen thuộc (Loftaffair, Hornbach...) tăng trust.

---

## 3. Preconditions

- Dữ liệu quotes được populate (static data hoặc từ CMS/API).
- Logo khách hàng tồn tại tại `public/images/customers/` hoặc CDN URL.
- Section render trên trang `/contact`, cạnh hoặc dưới form.

---

## 4. Main Flow

1. Render tiêu đề section: "What our customers say".
2. Render danh sách quotes, mỗi item gồm:
   a. Logo khách hàng (grayscale mặc định).
   b. Quote text ngắn (1–3 câu).
   c. Attribution: tên người, chức vụ, công ty.
   d. (Optional) Tag sản phẩm liên quan.
3. Trên desktop: hiển thị dạng grid 2–3 cột.
4. Trên mobile: scroll ngang (horizontal scroll snap) hoặc stack 1 cột.
5. Ví dụ quotes:
   - Loftaffair (hospitality/rental)
   - Kayakomat (outdoor/rental)
   - Hornbach (retail/DIY)

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
| "What our customers say"                                  |
|                                                          |
|  +------------------+  +------------------+             |
|  | [Logo]           |  | [Logo]           |             |
|  | "Quote text..."  |  | "Quote text..."  |             |
|  |                  |  |                  |             |
|  | Name, Title      |  | Name, Title      |             |
|  | Company          |  | Company          |             |
|  | [Tag: Product]   |  | [Tag: Product]   |             |
|  +------------------+  +------------------+             |
|                                                          |
|  +------------------+                                   |
|  | [Logo]           |                                   |
|  | "Quote text..."  |                                   |
|  | Name, Title      |                                   |
|  | [Tag: Product]   |                                   |
|  +------------------+                                   |
+----------------------------------------------------------+
```

- Desktop (≥1024px): 3 cột equal, `gap: 24px`. Nếu chỉ có 2 quotes: 2 cột.
- Tablet (768px–1023px): 2 cột, `gap: 20px`.
- Mobile (<768px): Horizontal scroll snap — 1 card visible, `scroll-snap-type: x mandatory`.
- Section padding: `80px 0` (desktop), `56px 0` (mobile).
- Background: `#ffffff`.
- Quote card: `border-radius: 8px`, `padding: 32px`, `border: 1px solid rgba(0,0,0,0.08)`, `background: #ffffff`.
- Quote card hover: `box-shadow: 0 8px 24px rgba(0,0,0,0.12)`, `translateY(-4px)`.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Section background | `#ffffff` |
| Section title | `#0f0f0f` |
| Card background | `#ffffff` |
| Card border | `rgba(0,0,0,0.08)` |
| Decorative quote mark | `rgba(232,97,74,0.12)` |
| Quote text | `#1a1a1a` |
| Attribution name | `#0f0f0f` |
| Attribution title | `rgba(0,0,0,0.6)` |
| Product tag background | `rgba(232,97,74,0.1)` |
| Product tag text | `#E8614A` |
| Logo (default) | `grayscale, opacity: 0.55` |
| Logo (hover) | `color, opacity: 1` |
| Mobile scroll indicator | `rgba(0,0,0,0.15)` dots |

### Typography

| Yếu tố | Style |
|---|---|
| Section title | `Playfair Display`, `font-size: clamp(1.75rem, 3vw, 2.5rem)`, `font-weight: 700` |
| Decorative quote mark | `Playfair Display`, `font-size: 64px`, `line-height: 1` |
| Quote text | `font-size: 15px`, `line-height: 1.7`, `font-style: italic`, `color: #1a1a1a` |
| Attribution name | `font-size: 14px`, `font-weight: 700` |
| Attribution title | `font-size: 13px`, `color: rgba(0,0,0,0.6)` |
| Product tag | `font-size: 11px`, `font-weight: 600`, `letter-spacing: 0.06em`, `text-transform: uppercase` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section title | Fade in từ bottom | IntersectionObserver | 400ms, ease-out |
| Quote cards | Staggered fade in + translateY 16px → 0 | IntersectionObserver | 350ms each, delay 100ms per card |
| Card | Lift + shadow | Hover | 250ms, ease |
| Logo | Grayscale → color | Hover (card hover) | 300ms |
| Mobile: scroll | Smooth snap scroll | Swipe / touch | Native CSS |
| Mobile: dots | Active dot highlight | Scroll position change | 200ms |

---

## 7. Business Rules

- Hiển thị **tối thiểu 2, tối đa 6** quotes.
- Nếu có nhiều hơn 6, chỉ hiển thị 6 đầu (sorted by `isFeatured`, rồi theo `order`).
- Nếu có 0 quotes → ẩn toàn bộ section.
- Logo khách hàng **bắt buộc** có `alt` text là tên công ty.
- Quote text tối đa 3 câu — nếu dài hơn, truncate với ellipsis (không cần "Read more" trên trang này).
- Các công ty đề xuất hiển thị: Loftaffair, Kayakomat, Hornbach.
- Quote **không** cần linked đến product detail (không navigate khi click card).

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Quotes array rỗng | Ẩn toàn bộ section |
| Chỉ có 1 quote | Render 1 card, full-width hoặc centered |
| Logo không load | Fallback: text tên công ty bold |
| Quote text quá dài | Clamp với `-webkit-line-clamp: 4` |
| Mobile: chỉ có 2 quotes | Horizontal scroll với 2 cards, centered |
| Card không có product tag | Ẩn tag area, attribution flush bottom |

---

## 9. Security Requirements

- Quote content không render qua `dangerouslySetInnerHTML`.
- Logo URL validate — chỉ internal path hoặc allowlist CDN.
- Không expose email hay thông tin cá nhân trong quotes.

---

## 10. Acceptance Criteria

- [ ] Section hiển thị đúng số quotes (2–6).
- [ ] Quotes rỗng → section ẩn.
- [ ] Grid 3 cột desktop, 2 cột tablet, horizontal scroll mobile.
- [ ] Logo grayscale mặc định, color khi hover card.
- [ ] Quote text italic, decorative quotation mark.
- [ ] Card hover: lift effect + shadow.
- [ ] Staggered fade-in animation khi scroll vào viewport.
- [ ] Logo có `alt` text là tên công ty.
- [ ] Mobile horizontal scroll snap hoạt động mượt.
- [ ] TypeScript strict — interface `CustomerQuote` (hoặc tái sử dụng từ FEAT-029).
- [ ] Quote text clamp nếu quá 4 dòng.

---

## 11. Assets cần thiết

- Logo khách hàng:
  - `public/images/customers/loftaffair.svg`
  - `public/images/customers/kayakomat.svg`
  - `public/images/customers/hornbach.svg`
- (Cung cấp bởi team marketing/design)

---

## 12. Data Structure

```typescript
// Tái sử dụng CustomerQuote từ FEAT-029, bỏ trường productSlug bắt buộc:
interface CustomerQuoteContact {
  id: string;
  quoteText: string;          // 1–3 câu, max ~200 ký tự
  personName: string;
  personTitle: string;
  companyName: string;
  companyLogo: {
    src: string;
    alt: string;              // Tên công ty
    width: number;
    height: number;
  };
  productSlug?: string;       // Optional — hiển thị product tag nếu có
  productName?: string;       // Optional — tên hiển thị trong tag
  isFeatured: boolean;
  order: number;              // Thứ tự hiển thị
}

interface CustomerQuotesSectionProps {
  quotes: CustomerQuoteContact[];
  title?: string;             // Default: "What our customers say"
  maxDisplay?: number;        // Default: 6
}

// Static data example:
const CONTACT_QUOTES: CustomerQuoteContact[] = [
  {
    id: "loftaffair",
    quoteText: "igloo has transformed how we manage access across all our properties...",
    personName: "Anna Müller",
    personTitle: "Head of Operations",
    companyName: "Loftaffair",
    companyLogo: { src: "/images/customers/loftaffair.svg", alt: "Loftaffair", width: 120, height: 40 },
    isFeatured: true,
    order: 1,
  },
  // ...
];
```

---

## 13. Implementation Notes

- Server Component cho static data. Tách `QuoteCardClient.tsx` với `"use client"` nếu cần hover animation.
- Mobile horizontal scroll: Tailwind `flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4` với mỗi card `snap-start flex-shrink-0 w-[85vw]`.
- Scroll dots indicator (mobile): implement với `useState` + `onScroll` event trên scroll container.
- Logo component: tách `CustomerLogo.tsx` tái sử dụng cả ở FEAT-029.
- Grid vs flex: Dùng `grid` cho desktop/tablet (equal height), `flex overflow-x-auto` cho mobile scroll.
- Nếu dùng static data, tạo file `lib/data/customerQuotes.ts` export array.
- `isFeatured` sort: `quotes.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || a.order - b.order).slice(0, maxDisplay)`.
