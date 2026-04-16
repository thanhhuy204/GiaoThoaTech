# FEAT-024: Nút CTA Demo/Contact (Trang Case Studies)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Cần có khi launch
**File implement:** `app/components/case-studies/CaseStudiesCTA.tsx`
**Trang:** `/case-studies` — section cuối trang Case Studies

---

## 1. Business Goal

Chuyển đổi visitor đã bị thuyết phục bởi các case stories thành lead thực sự. Sau khi đọc các câu chuyện thành công, đây là thời điểm tối ưu để kêu gọi hành động — liên hệ nhận demo miễn phí. CTA section này là điểm chuyển đổi cuối cùng của trang Case Studies trước khi người dùng rời trang.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — đã đọc case studies và muốn tìm hiểu thêm hoặc mua
- **Decision maker (B2B)** — cần demo để thuyết phục team nội bộ

---

## 3. Preconditions

- Người dùng đang truy cập trang `/case-studies`
- CTA section nằm ở cuối trang, sau danh sách case studies và nút Load more (FEAT-022, FEAT-023)
- Trang `/contact` tồn tại và có form liên hệ

---

## 4. Main Flow

1. Visitor scroll xuống cuối trang Case Studies → CTA section vào viewport
2. Animation fade-in xuất hiện
3. Hiển thị heading kêu gọi hành động
4. Hiển thị subtext ngắn (lợi ích cụ thể)
5. Hiển thị nút CTA "Speak to us — get a free demo" màu cam `#E8614A`
6. Visitor click nút → điều hướng đến `/contact?ref=case-studies-cta`
7. Trang `/contact` nhận ref param, có thể pre-select form field "Request a demo"

---

## 5. UI Specification

### Layout

- Section full-width
- Background: `#E8614A` (solid primary color — high-impact, consistent với brand CTA sections)
- Padding: `80px 24px` (desktop), `56px 24px` (mobile)
- Container max-width: `800px`, căn giữa
- Toàn bộ nội dung căn giữa (`text-align: center`)
- Thứ tự: eyebrow label → heading → subtext → nút CTA

### Eyebrow label

- Text: `"Ready to scale your operations?"`
- Font: system sans-serif, `13px`, `rgba(255,255,255,0.8)`, uppercase, letter-spacing `0.08em`
- Margin-bottom: `12px`

### Heading

- H2, Playfair Display, `40px` (desktop) / `28px` (mobile)
- Color: `#ffffff`
- Font-weight: `700`
- Line-height: `1.2`
- Margin-bottom: `16px`
- Ví dụ text: "Join hundreds of businesses that trust igloo"

### Subtext

- Font: system sans-serif, `17px` (desktop) / `15px` (mobile)
- Color: `rgba(255,255,255,0.85)`
- Line-height: `1.6`
- Max-width: `520px`, căn giữa
- Margin-bottom: `36px`
- Ví dụ text: "See how igloo's smart access technology can work for your business. No commitment required — just a conversation."

### Nút CTA "Speak to us — get a free demo"

- Kiểu: **outlined** trên nền cam (white outline)
- Border: `2px solid #ffffff`
- Background: `transparent`
- Color: `#ffffff`
- Border-radius: `4px`
- Padding: `15px 48px`
- Font: system sans-serif, `16px`, `font-weight: 600`
- Min-width: `260px`
- Hover: background `#ffffff`, color `#E8614A`
- Transition: `background 200ms ease, color 200ms ease`

### Trust signals (tùy chọn)

- Bên dưới nút, margin-top `24px`
- Row icons nhỏ: `"No credit card required"`, `"Free 30-min demo"`, `"Cancel anytime"`
- Font: `12px`, `rgba(255,255,255,0.7)`, icon checkmark `✓` màu `rgba(255,255,255,0.8)`
- Gap giữa các trust signal: `24px`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background section | `#E8614A` |
| Eyebrow label | `rgba(255,255,255,0.8)` |
| Heading | `#ffffff` |
| Subtext | `rgba(255,255,255,0.85)` |
| Nút border | `#ffffff` |
| Nút text | `#ffffff` |
| Nút hover background | `#ffffff` |
| Nút hover text | `#E8614A` |
| Trust signal text | `rgba(255,255,255,0.7)` |
| Trust signal icon | `rgba(255,255,255,0.8)` |

### Typography

| Yếu tố | Style |
|---|---|
| Eyebrow label | system sans-serif, `13px`, uppercase, `letter-spacing: 0.08em` |
| Heading | H2, Playfair Display, `40px` (desktop) / `28px` (mobile), `font-weight: 700` |
| Subtext | system sans-serif, `17px` (desktop) / `15px` (mobile), line-height `1.6` |
| Nút label | system sans-serif, `16px`, `font-weight: 600` |
| Trust signals | system sans-serif, `12px` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section | fade-in + `translateY(20px)` → `0` | Vào viewport | `400ms ease` |
| Heading + subtext | stagger fade-in | Vào viewport | `300ms ease`, delay `100ms` giữa các element |
| Nút | background + color transition | Hover | `200ms ease` |
| Nút | scale `0.98` | Active/press | `100ms ease` |

---

## 7. Business Rules

- Nút phải điều hướng kèm ref param: `/contact?ref=case-studies-cta`
- Ref param là hardcoded string `"case-studies-cta"` — không lấy từ user input
- Nút phải là `<Link>` (Next.js) thay vì `<button>` vì đây là navigation action
- `aria-label` nút: `"Speak to us and get a free demo"` (loại bỏ em dash cho screen reader)
- CTA section này là section cuối cùng của trang — không có content nào bên dưới (ngoại trừ footer)
- Heading text có thể điều chỉnh theo A/B test nhưng phải được approve trước

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Mobile (< 640px) | Heading `28px`, subtext `15px`, nút full-width |
| Trang `/contact` down | Nút vẫn render và navigate — error handling ở trang contact |
| Reduced motion | Bỏ fade-in/stagger animation, hiển thị nội dung ngay |
| Viewport rất rộng (> 1440px) | Container max-width giữ `800px`, section background vẫn full-width |
| Trust signals text overflow (mobile nhỏ) | Stack dọc, căn giữa mỗi trust signal |

---

## 9. Security Requirements

- Link `/contact` là internal Next.js route — không cần `rel="noopener"`
- Ref param là hardcoded string — không lấy từ user input, không rủi ro injection
- Không có form trong component này — rủi ro CSRF không áp dụng

---

## 10. Acceptance Criteria

- [ ] Section hiển thị với background `#E8614A`
- [ ] Eyebrow label, heading H2, subtext hiển thị đúng thứ tự và style
- [ ] Nút "Speak to us — get a free demo" hiển thị với border trắng, text trắng, background transparent
- [ ] Hover nút: background trắng, text `#E8614A`, transition `200ms ease`
- [ ] Click nút → điều hướng đến `/contact?ref=case-studies-cta`
- [ ] Ref param `?ref=case-studies-cta` được đính kèm đúng
- [ ] `aria-label` trên nút đúng: `"Speak to us and get a free demo"`
- [ ] Fade-in animation khi section vào viewport
- [ ] `prefers-reduced-motion`: không animation
- [ ] Mobile: heading `28px`, nút full-width
- [ ] Trust signals hiển thị (nếu implement)
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

Không cần asset hình ảnh — nền màu solid.

---

## 12. Data Structure

```typescript
interface TrustSignal {
  text: string;
}

interface CaseStudiesCTAProps {
  eyebrow: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  ctaRef: string;
  ctaAriaLabel: string;
  trustSignals?: TrustSignal[]; // optional
}

// Config constant (đặt tại lib/config/cta.ts):
const CASE_STUDIES_CTA: CaseStudiesCTAProps = {
  eyebrow: 'Ready to scale your operations?',
  heading: 'Join hundreds of businesses that trust igloo',
  subtext: "See how igloo's smart access technology can work for your business. No commitment required — just a conversation.",
  ctaLabel: 'Speak to us — get a free demo',
  ctaHref: '/contact',
  ctaRef: 'case-studies-cta',
  ctaAriaLabel: 'Speak to us and get a free demo',
  trustSignals: [
    { text: 'No credit card required' },
    { text: 'Free 30-min demo' },
    { text: 'Cancel anytime' },
  ],
};
```

---

## 13. Implementation Notes

- Component là Server Component — nội dung static, không cần `"use client"`
- Nếu cần IntersectionObserver cho fade-in: tách `CaseStudiesCTAClient.tsx` wrapper
- `prefers-reduced-motion`: dùng Tailwind `motion-safe:` modifier cho tất cả animation classes
- Nút link: `<Link href={`${ctaHref}?ref=${ctaRef}`} aria-label={ctaAriaLabel}>`
- Em dash trong label nút (`—`): dùng HTML entity `&mdash;` hoặc Unicode `—` trực tiếp trong JSX string
- Trust signals layout: `flex flex-wrap justify-center gap-6` — tự wrap trên mobile
- CTA config constant đặt trong `lib/config/cta.ts` để tất cả CTA sections trong dự án có thể reference và dễ thay đổi tập trung
- Section này tái sử dụng pattern tương tự FEAT-018 (JoinOurTeamCTA) — cân nhắc abstract thành component chung `CTASection` với props nếu có ≥ 3 section dùng cùng layout
