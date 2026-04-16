# FEAT-019: Teaser Công nghệ AccessAnywhere (Trang About us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Nên có sau launch
**File implement:** `app/components/about/TechTeaser.tsx`
**Page file:** `app/(pages)/about/page.tsx`

---

## 1. Business Goal

Củng cố sứ mệnh công ty bằng cách nhắc lại công nghệ độc quyền AccessAnywhere và algoPIN™ ngay trong trang About. Phần này liên kết triết lý kinh doanh của igloo với năng lực kỹ thuật thực tế, giúp khách hàng hiểu rằng igloo không chỉ là một đội ngũ tốt mà còn sở hữu công nghệ độc quyền tạo lợi thế cạnh tranh.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — tìm hiểu điểm khác biệt của igloo so với đối thủ
- **Decision maker (B2B)** — đánh giá năng lực kỹ thuật trước khi mua

---

## 3. Preconditions

- Người dùng đang truy cập trang `/about`
- Section Tech Teaser nằm sau phần Core Values (FEAT-015) hoặc sau Mission/Vision, trước Team Profiles
- Trang chi tiết công nghệ `/technology` đã tồn tại để link đến

---

## 4. Main Flow

1. Trang `/about` load → section Tech Teaser render
2. Hiển thị label tag "Our Technology"
3. Hiển thị heading về AccessAnywhere
4. Hiển thị mô tả ngắn về algoPIN™ và offline access
5. Hiển thị grid 4 loại PIN: One-time, Duration, Recurring, Permanent
6. Mỗi loại PIN có icon, tên, mô tả 1 câu
7. Hiển thị CTA link "Learn more about our technology" → `/technology`

---

## 5. UI Specification

### Layout

- Section full-width, background `#0f0f0f` (dark, tạo contrast mạnh)
- Padding: `80px 0` (desktop), `48px 0` (mobile)
- Container max-width: `1200px`, căn giữa, padding ngang `24px`
- Layout 2 cột (desktop): text content bên trái 45%, PIN grid bên phải 55%, gap `64px`
- Mobile: stack dọc, text trên, grid dưới

### Text Content (cột trái)

- Tag label: `"Our Technology"`, `12px`, uppercase, letter-spacing `0.1em`, màu `#E8614A`
- Heading: H2, Playfair Display, `36px`, `#ffffff`, `font-weight: 700`
  - Text gợi ý: "AccessAnywhere — access without limits"
- Subheading tech name: `"algoPIN™"`, Playfair Display, `20px`, `#E8614A`, `font-weight: 600`
- Body: system sans-serif, `15px`, `rgba(255,255,255,0.7)`, line-height `1.7`
  - Nội dung: giải thích công nghệ tạo mã truy cập offline, không cần Wi-Fi
- CTA link: `"Learn more about our technology →"`, `14px`, `#E8614A`, hover underline, margin-top `24px`

### PIN Grid (cột phải)

- Grid `2×2` (2 cột, 2 hàng), gap `16px`
- Mỗi PIN card:
  - Background: `rgba(255,255,255,0.05)` (glass effect)
  - Border: `1px solid rgba(255,255,255,0.1)`
  - Border-radius: `8px`
  - Padding: `20px`
  - Icon: `32px × 32px`, màu `#E8614A`
  - Tên PIN: `"One-time PIN"` / `"Duration PIN"` / `"Recurring PIN"` / `"Permanent PIN"`, system sans-serif, `14px`, `#ffffff`, `font-weight: 600`
  - Mô tả: system sans-serif, `12px`, `rgba(255,255,255,0.6)`, line-height `1.5`
- Hover PIN card: border `rgba(232,97,74,0.4)`, background `rgba(232,97,74,0.08)`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background section | `#0f0f0f` |
| Tag label | `#E8614A` |
| Heading | `#ffffff` |
| algoPIN™ name | `#E8614A` |
| Body text | `rgba(255,255,255,0.7)` |
| CTA link | `#E8614A` |
| PIN card background | `rgba(255,255,255,0.05)` |
| PIN card border | `rgba(255,255,255,0.1)` |
| PIN card hover border | `rgba(232,97,74,0.4)` |
| PIN icon | `#E8614A` |
| PIN name | `#ffffff` |
| PIN description | `rgba(255,255,255,0.6)` |

### Typography

| Yếu tố | Style |
|---|---|
| Tag label | system sans-serif, `12px`, `#E8614A`, uppercase, `letter-spacing: 0.1em` |
| Section heading | H2, Playfair Display, `36px`, `#ffffff`, `font-weight: 700` |
| algoPIN™ name | Playfair Display, `20px`, `#E8614A`, `font-weight: 600` |
| Body text | system sans-serif, `15px`, `rgba(255,255,255,0.7)`, line-height `1.7` |
| CTA link | system sans-serif, `14px`, `#E8614A`, `font-weight: 500` |
| PIN card name | system sans-serif, `14px`, `#ffffff`, `font-weight: 600` |
| PIN card description | system sans-serif, `12px`, `rgba(255,255,255,0.6)`, line-height `1.5` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section | fade-in + `translateY(20px)` → `0` | Vào viewport | `400ms ease` |
| PIN cards | stagger fade-in `translateY(12px)` → `0` | Vào viewport | `300ms ease`, delay `80ms` mỗi card |
| PIN card | border color + background transition | Hover | `200ms ease` |
| CTA link "→" | `translateX(0)` → `translateX(4px)` | Hover | `150ms ease` |

---

## 7. Business Rules

- Tên công nghệ phải chính xác: `AccessAnywhere` và `algoPIN™` (có ký hiệu ™)
- 4 loại PIN theo thứ tự cố định: One-time → Duration → Recurring → Permanent
- Mô tả ngắn mỗi PIN tối đa 12 từ
- CTA link phải trỏ đến `/technology` kèm ref param `?ref=about-tech-teaser`
- Không thay đổi tên công nghệ hoặc số lượng loại PIN mà không có approval

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Mobile (< 640px) | Stack dọc: text trên, PIN grid (2×2) dưới |
| Trang `/technology` chưa tồn tại | Ẩn CTA link hoặc link về `/contact?ref=about-tech-teaser` |
| Icon PNG/SVG không load | Hiển thị placeholder `32px` màu `#E8614A` opacity `0.3` |
| Reduced motion | Bỏ qua stagger animation, hiển thị tất cả ngay lập tức |

---

## 9. Security Requirements

- Nội dung static, không có input người dùng — rủi ro thấp
- CTA link dùng Next.js `<Link>` nội bộ — không cần `rel="noopener"`
- Tên trademark `algoPIN™` hardcoded — không từ CMS để tránh sai sót

---

## 10. Acceptance Criteria

- [ ] Hiển thị tag label "Our Technology" màu `#E8614A`
- [ ] Heading H2 đề cập đến AccessAnywhere
- [ ] Tên `algoPIN™` hiển thị đúng với ký hiệu ™, màu `#E8614A`
- [ ] Body text giải thích offline access, không cần Wi-Fi
- [ ] Grid 4 PIN cards theo đúng thứ tự: One-time, Duration, Recurring, Permanent
- [ ] Mỗi PIN card có icon, tên, mô tả ngắn
- [ ] Hover PIN card: border + background thay đổi màu nhẹ
- [ ] CTA link "Learn more about our technology" link đến `/technology?ref=about-tech-teaser`
- [ ] Layout 2 cột (desktop) → 1 cột (mobile)
- [ ] Section background `#0f0f0f`
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Icon One-time PIN | `public/icons/pin-one-time.svg` | 32×32px | Biểu tượng 1 lần dùng |
| Icon Duration PIN | `public/icons/pin-duration.svg` | 32×32px | Biểu tượng đồng hồ/thời gian |
| Icon Recurring PIN | `public/icons/pin-recurring.svg` | 32×32px | Biểu tượng lặp/vòng tròn |
| Icon Permanent PIN | `public/icons/pin-permanent.svg` | 32×32px | Biểu tượng khóa vĩnh viễn |

---

## 12. Data Structure

```typescript
interface PinType {
  id: string;
  name: string;
  description: string;
  iconPath: string;
}

interface TechTeaserProps {
  heading: string;
  techName: string;       // 'algoPIN™'
  bodyText: string;
  ctaLabel: string;
  ctaHref: string;
  pinTypes: PinType[];
}

// Data constant (đặt tại lib/data/about.ts):
const TECH_TEASER_DATA: TechTeaserProps = {
  heading: 'AccessAnywhere — access without limits',
  techName: 'algoPIN™',
  bodyText: 'Our proprietary algoPIN™ technology generates secure access codes that work offline — no Wi-Fi or internet connection required. Grant the right access to the right people, every time.',
  ctaLabel: 'Learn more about our technology',
  ctaHref: '/technology',
  pinTypes: [
    {
      id: 'one-time',
      name: 'One-time PIN',
      description: 'Single-use code that expires immediately after use.',
      iconPath: '/icons/pin-one-time.svg',
    },
    {
      id: 'duration',
      name: 'Duration PIN',
      description: 'Valid only within a defined date and time window.',
      iconPath: '/icons/pin-duration.svg',
    },
    {
      id: 'recurring',
      name: 'Recurring PIN',
      description: 'Repeats on a set schedule — daily, weekly, or custom.',
      iconPath: '/icons/pin-recurring.svg',
    },
    {
      id: 'permanent',
      name: 'Permanent PIN',
      description: 'Always-valid code for trusted long-term users.',
      iconPath: '/icons/pin-permanent.svg',
    },
  ],
};
```

---

## 13. Implementation Notes

- Component là Server Component — nội dung static, không cần `"use client"`
- Nếu cần stagger animation với IntersectionObserver, tách `TechTeaserClient.tsx` wrapper dùng `"use client"`
- Ký hiệu `™` trong `algoPIN™`: dùng HTML entity `&trade;` hoặc trực tiếp ký tự Unicode `™` trong JSX string
- CTA link: `<Link href={`${ctaHref}?ref=about-tech-teaser`}>` — append ref param theo chuẩn dự án
- PIN grid dùng Tailwind `grid grid-cols-2 gap-4` — đơn giản, không cần custom CSS
- Dark section: đảm bảo contrast ratio đạt WCAG AA cho tất cả text elements
