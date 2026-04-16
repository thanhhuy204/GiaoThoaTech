# FEAT-029: Teaser trích dẫn khách hàng (Trang Chi tiết sản phẩm)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1
**File implement:** `app/components/products/ProductCustomerQuote.tsx`
**Page file:** `app/(pages)/products/[slug]/page.tsx`

---

## 1. Business Goal

Tăng lòng tin và social proof bằng trích dẫn thực tế từ khách hàng đã sử dụng đúng sản phẩm đang xem. Quote có liên quan trực tiếp đến sản phẩm sẽ tạo sự tin tưởng mạnh hơn so với testimonial chung chung, từ đó thúc đẩy visitor tiếp tục xuống CTA (FEAT-030).

---

## 2. Actors

- **Visitor** — đọc testimonial để validate quyết định.
- **Prospect B2B** — quan tâm đến tên công ty/logo khách hàng để đánh giá mức độ tin cậy.

---

## 3. Preconditions

- `ProductDetail.customerQuote` được populate từ API.
- Nếu `customerQuote === null`, section không render.
- Logo khách hàng tồn tại tại `public/images/customers/[customerId].svg` hoặc URL CDN.

---

## 4. Main Flow

1. Kiểm tra `customerQuote !== null` — nếu null, return null (không render).
2. Render layout quote:
   a. Logo khách hàng (horizontal, max-height: 40px).
   b. Nội dung quote (large quotation mark decorative).
   c. Attribution: tên người, chức vụ, công ty.
   d. Tag sản phẩm liên quan (optional).
3. Section render sau `SecurityCommitment` (FEAT-028).

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
|                                                          |
|  [Customer Logo]                                         |
|                                                          |
|  "                                                       |
|  [Quote content — 1–3 sentences]                        |
|  "                                                       |
|                                                          |
|  [Avatar] Name, Title — Company Name                    |
|  [Tag: Padlock 2]                                        |
|                                                          |
+----------------------------------------------------------+
```

- Layout: centered, single column, max-width: 800px, margin auto.
- Section padding: `80px 0` (desktop), `56px 24px` (mobile).
- Background: `#f9f9f9` (xen kẽ với section trước nền tối).
- Quotation mark decorative: `font-size: 120px`, `color: rgba(232,97,74,0.15)`, Playfair Display, positioned absolute top-left của quote container.
- Quote text container: `position: relative`, `padding: 0 32px` (desktop), `0 16px` (mobile).
- Logo: `filter: grayscale(100%)`, opacity 0.6 — trên hover: grayscale(0%), opacity 1.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Section background | `#f9f9f9` |
| Decorative quotation mark | `rgba(232,97,74,0.15)` |
| Quote text | `#1a1a1a` |
| Attribution name | `#0f0f0f` |
| Attribution title/company | `rgba(0,0,0,0.6)` |
| Product tag background | `rgba(232,97,74,0.1)` |
| Product tag text | `#E8614A` |
| Logo (default) | `grayscale, opacity: 0.6` |
| Logo (hover) | `color, opacity: 1` |

### Typography

| Yếu tố | Style |
|---|---|
| Decorative quotation | `Playfair Display`, `font-size: 120px`, `line-height: 1` |
| Quote text | `Playfair Display`, `font-size: clamp(1.1rem, 2vw, 1.4rem)`, `font-style: italic`, `line-height: 1.7` |
| Attribution name | `font-size: 15px`, `font-weight: 700`, `font-family: system sans-serif` |
| Attribution title | `font-size: 14px`, `color: rgba(0,0,0,0.6)` |
| Product tag | `font-size: 12px`, `font-weight: 600`, `letter-spacing: 0.06em`, `text-transform: uppercase` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section | Fade in từ bottom (translateY 20px → 0) | IntersectionObserver | 500ms, ease-out |
| Decorative quote mark | Fade in, delay 100ms | IntersectionObserver | 400ms |
| Quote text | Fade in, delay 200ms | IntersectionObserver | 400ms |
| Attribution | Fade in, delay 300ms | IntersectionObserver | 300ms |
| Logo | Grayscale → color transition | Hover | 300ms |

---

## 7. Business Rules

- Nếu `customerQuote === null` hoặc `undefined`, **ẩn hoàn toàn** section — không render placeholder.
- Quote phải liên quan trực tiếp đến sản phẩm (`customerQuote.productSlug === product.slug`).
- Logo khách hàng **bắt buộc** có `alt` text là tên công ty.
- Không hiển thị quá 1 quote trên trang chi tiết sản phẩm (nếu có nhiều, chọn quote `isFeatured: true`).
- Quote text tối đa 3 câu — nếu dài hơn, truncate với nút "Read more" mở modal.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| `customerQuote === null` | Ẩn hoàn toàn section |
| Logo không tải được | Thay bằng text tên công ty (font-weight: 700) |
| Quote text quá dài (>3 câu) | Hiển thị 3 câu + nút "Read more" |
| Không có avatar người dùng | Ẩn avatar, chỉ hiển thị tên + chức vụ |
| Quote text ngắn (<10 từ) | Vẫn render bình thường, không cần minimum length |

---

## 9. Security Requirements

- Quote content không render qua `dangerouslySetInnerHTML`.
- Logo URL validate — chỉ cho phép internal path hoặc allowlist CDN domain.
- Không expose thông tin cá nhân nhạy cảm của người để quote.

---

## 10. Acceptance Criteria

- [ ] Section ẩn hoàn toàn khi `customerQuote === null`.
- [ ] Logo hiển thị grayscale mặc định, chuyển màu khi hover.
- [ ] Quote dùng Playfair Display italic, có decorative quotation mark.
- [ ] Attribution đủ thông tin: tên, chức vụ, công ty.
- [ ] Product tag hiển thị đúng tên sản phẩm.
- [ ] Logo có `alt` text là tên công ty.
- [ ] Fade-in animation khi scroll vào viewport.
- [ ] Quote dài → truncate + "Read more" button.
- [ ] TypeScript strict — interface `CustomerQuote` đầy đủ.

---

## 11. Assets cần thiết

- Logo khách hàng: `public/images/customers/[customerId].[svg|png]`.
- Avatar (optional): `public/images/customers/avatars/[personId].jpg`.

---

## 12. Data Structure

```typescript
interface CustomerQuote {
  id: string;
  quoteText: string;              // 1–3 câu
  personName: string;             // "Johan Lindqvist"
  personTitle: string;            // "Operations Manager"
  companyName: string;            // "Kayakomat"
  companyLogo: {
    src: string;                  // "/images/customers/kayakomat.svg"
    alt: string;                  // "Kayakomat" — tên công ty
    width: number;
    height: number;
  };
  personAvatar?: {
    src: string;
    alt: string;
  };
  productSlug: string;            // "padlock-2" — liên kết với sản phẩm
  isFeatured: boolean;
}

interface ProductCustomerQuoteProps {
  quote: CustomerQuote | null;
  productName: string;            // Hiển thị trong product tag
}
```

---

## 13. Implementation Notes

- Server Component — không cần `"use client"` trừ "Read more" expansion.
- Nếu cần "Read more" modal: tách `QuoteExpandButton.tsx` với `"use client"`.
- Decorative quote mark: dùng `before:` pseudo-element với Tailwind arbitrary values, hoặc render `<span aria-hidden="true">` với Playfair Display.
- Logo `next/image` với `width` và `height` từ data, style `max-h-[40px] w-auto`.
- Logo filter: Tailwind `grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`.
- Validate `customerQuote?.productSlug === productSlug` trong Server Component trước khi truyền prop.
