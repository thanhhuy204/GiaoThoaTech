# FEAT-020: Tiêu đề giới thiệu trang Case Studies

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Cần có khi launch
**File implement:** `app/components/case-studies/CaseStudiesHero.tsx`
**Trang:** `/case-studies` — section đầu tiên của trang Case Studies

---

## 1. Business Goal

Tạo ấn tượng đầu tiên mạnh mẽ cho trang Case Studies. Tiêu đề phải truyền đạt ngay lập tức rằng trang này chứa các câu chuyện thành công thực tế của khách hàng igloo — giúp visitor định hướng nội dung, tăng thời gian ở lại trang, và khuyến khích đọc tiếp để tìm ví dụ phù hợp với ngành nghề của mình.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — tìm kiếm bằng chứng thực tế trước khi quyết định mua
- **Decision maker (B2B)** — cần case study cụ thể để thuyết phục nội bộ

---

## 3. Preconditions

- Người dùng truy cập trang `/case-studies`
- Hero section là phần đầu tiên hiển thị khi trang load
- Dưới hero là bộ lọc tag (FEAT-021) và danh sách case studies (FEAT-022)

---

## 4. Main Flow

1. Người dùng truy cập `/case-studies`
2. Trang load → Hero section render ngay lập tức (above the fold)
3. Hiển thị breadcrumb: `Home > Case Studies`
4. Hiển thị H1: `"See how we helped customers scale their assets and real estate"`
5. Hiển thị subtitle mô tả ngắn về nội dung trang
6. Hiển thị background visual (gradient hoặc pattern)
7. Scroll indicator (mũi tên xuống tùy chọn) → click scroll mượt xuống section filter

---

## 5. UI Specification

### Layout

- Section full-width
- Background: gradient `linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 60%, #2a1510 100%)` hoặc `#0f0f0f` với subtle texture
- Min-height: `480px` (desktop), `360px` (mobile)
- Padding: `120px 24px 80px` (desktop — chừa chỗ cho navbar), `80px 24px 56px` (mobile)
- Container max-width: `900px`, căn giữa

### Breadcrumb

- Vị trí: trên cùng, trước heading
- Font: system sans-serif, `13px`, `rgba(255,255,255,0.5)`
- Separator: `/` màu `rgba(255,255,255,0.3)`
- Link `Home`: hover màu `#E8614A`, underline
- Text `Case Studies`: màu `rgba(255,255,255,0.5)`, không link (current page)
- Margin-bottom: `24px`

### Heading H1

- Text chính xác: `"See how we helped customers scale their assets and real estate"`
- Font: Playfair Display, `52px` (desktop) / `36px` (tablet) / `28px` (mobile)
- Color: `#ffffff`
- Font-weight: `700`
- Line-height: `1.2`
- Margin-bottom: `20px`
- Từ khóa highlight: highlight từ `"scale"` hoặc `"assets and real estate"` với màu `#E8614A` (tùy chọn — cần approval design)

### Subtitle

- Font: system sans-serif, `18px` (desktop) / `16px` (mobile)
- Color: `rgba(255,255,255,0.7)`
- Line-height: `1.6`
- Max-width: `600px`
- Ví dụ text: "Real stories from property managers, hospitality operators, and real estate investors who transformed their operations with igloo smart access solutions."
- Margin-bottom: `40px`

### Tag count (tùy chọn)

- Text nhỏ: `"40+ success stories across 5 industries"`
- Font: system sans-serif, `14px`, `rgba(255,255,255,0.5)`

### Background visual

- Option A: Gradient dark với subtle radial glow màu `rgba(232,97,74,0.15)` tại góc phải
- Option B: Full-bleed background image mờ (blur `8px`, opacity `0.3`) với dark overlay

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background | `#0f0f0f` → `#1a1a1a` (gradient) |
| H1 | `#ffffff` |
| H1 keyword highlight | `#E8614A` |
| Subtitle | `rgba(255,255,255,0.7)` |
| Breadcrumb text | `rgba(255,255,255,0.5)` |
| Breadcrumb separator | `rgba(255,255,255,0.3)` |
| Breadcrumb link hover | `#E8614A` |
| Tag count | `rgba(255,255,255,0.5)` |

### Typography

| Yếu tố | Style |
|---|---|
| H1 | Playfair Display, `52px` (desktop) / `28px` (mobile), `#ffffff`, `font-weight: 700`, line-height `1.2` |
| Subtitle | system sans-serif, `18px` (desktop) / `16px` (mobile), `rgba(255,255,255,0.7)`, line-height `1.6` |
| Breadcrumb | system sans-serif, `13px`, `rgba(255,255,255,0.5)` |
| Tag count | system sans-serif, `14px`, `rgba(255,255,255,0.5)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| H1 | fade-in + `translateY(16px)` → `0` | Page load | `500ms ease` |
| Subtitle | fade-in + `translateY(12px)` → `0` | Page load | `500ms ease`, delay `150ms` |
| Breadcrumb | fade-in | Page load | `300ms ease` |
| Breadcrumb link | color transition → `#E8614A` | Hover | `150ms ease` |
| Background glow | subtle pulse scale `1` → `1.05` → `1` | Loop | `4s ease-in-out infinite` |
| Scroll indicator (nếu có) | bounce `translateY(0)` → `translateY(8px)` → `0` | Loop | `1.5s ease-in-out infinite` |

---

## 7. Business Rules

- Text H1 phải chính xác: `"See how we helped customers scale their assets and real estate"` — không thay đổi tùy ý
- H1 là heading duy nhất level 1 trên trang (SEO requirement)
- Breadcrumb phải có `aria-label="Breadcrumb"` và structured data JSON-LD (schema.org BreadcrumbList)
- Subtitle text có thể linh hoạt nhưng phải nhắc đến ít nhất 1 trong các ngành: hospitality, real estate, property management
- Background không được ảnh hưởng đến legibility của H1 (contrast ratio ≥ 4.5:1)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Mobile (< 640px) | H1 `28px`, subtitle `16px`, padding giảm |
| Background image không load | Fallback về gradient `#0f0f0f → #1a1a1a` |
| Reduced motion | Bỏ tất cả entrance animations, hiển thị nội dung ngay |
| Scroll indicator click | Scroll mượt đến section filter (FEAT-021) bằng `scrollIntoView({ behavior: 'smooth' })` |
| Viewport rất nhỏ (< 375px) | H1 `24px`, không wrap heading quá xấu |

---

## 9. Security Requirements

- H1 text là hardcoded string — không từ user input, không rủi ro XSS
- Nếu subtitle từ CMS: escape HTML
- Background image URL từ `/public` — không dynamic, không cần sanitize

---

## 10. Acceptance Criteria

- [ ] H1 hiển thị chính xác text: `"See how we helped customers scale their assets and real estate"`
- [ ] H1 là heading level 1 duy nhất trên trang
- [ ] Breadcrumb hiển thị: `Home > Case Studies` với link đúng
- [ ] Breadcrumb có `aria-label="Breadcrumb"`
- [ ] Subtitle text hiển thị, màu `rgba(255,255,255,0.7)`
- [ ] Background section màu tối, H1 màu trắng — contrast đạt WCAG AA
- [ ] Entrance animation H1 và subtitle hoạt động khi page load
- [ ] `prefers-reduced-motion`: không animation
- [ ] Mobile responsive: font size giảm đúng theo spec
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Background image (tùy chọn) | `public/images/case-studies/hero-bg.jpg` | 1920×480px | Mờ, dark overlay |

---

## 12. Data Structure

```typescript
interface CaseStudiesHeroProps {
  heading: string;      // cố định, không thay đổi
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
}

interface BreadcrumbItem {
  label: string;
  href?: string; // undefined nếu là current page
}

// JSON-LD structured data:
interface BreadcrumbJsonLd {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string; // URL — undefined cho current page
  }>;
}
```

---

## 13. Implementation Notes

- Component là Server Component — nội dung static, SEO-friendly
- JSON-LD breadcrumb: inject qua `<script type="application/ld+json">` trong component hoặc qua Next.js `generateMetadata`
- Entrance animation (nếu cần `"use client"`): tách thành `CaseStudiesHeroClient.tsx`, giữ Server Component là wrapper
- `prefers-reduced-motion`: dùng Tailwind `motion-safe:` modifier cho tất cả animation classes
- H1 font size: dùng Tailwind responsive `text-[28px] md:text-[36px] lg:text-[52px]`
- Không dùng `<h2>` hay heading khác trong component này — chỉ H1
