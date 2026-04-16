# FEAT-018: Nút "Join our team" (Trang About us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Nên có sau launch
**File implement:** `app/components/about/JoinOurTeamCTA.tsx`
**Page file:** `app/(pages)/about/page.tsx`

---

## 1. Business Goal

Khuyến khích các visitor quan tâm đến văn hóa công ty và đội ngũ igloo (đã đọc các section trước) chuyển sang hành động cụ thể: tìm hiểu cơ hội nghề nghiệp và ứng tuyển. CTA này là điểm chuyển đổi cuối cùng của trang About trước khi người dùng rời trang.

---

## 2. Actors

- **Ứng viên tiềm năng** — muốn ứng tuyển sau khi tìm hiểu về công ty
- **Visitor quan tâm D&I và văn hóa** — đang cân nhắc gia nhập igloo

---

## 3. Preconditions

- Người dùng đang truy cập trang `/about`
- Section CTA nằm ở cuối trang, sau phần D&I (FEAT-017) hoặc là section kết thúc trang About
- Trang `/careers` tồn tại (happy path) hoặc trang `/contact` là fallback

---

## 4. Main Flow

1. Người dùng scroll xuống cuối trang About → section CTA render
2. Hiển thị background nổi bật (màu primary `#E8614A` hoặc dark)
3. Hiển thị heading kêu gọi ("Want to be part of something great?")
4. Hiển thị subtext ngắn (1 câu động viên)
5. Hiển thị nút "Join our team" màu nổi bật
6. Người dùng click nút → điều hướng đến `/careers?ref=about-join-cta`
7. Nếu trang `/careers` không tồn tại → điều hướng đến `/contact?ref=about-join-cta`

---

## 5. UI Specification

### Layout

- Section full-width, background `#E8614A` (primary color — high-impact CTA)
- Padding: `80px 24px` (desktop), `56px 24px` (mobile)
- Container max-width: `800px`, căn giữa
- Toàn bộ nội dung căn giữa (text-center)
- Thứ tự: heading → subtext → nút

### Heading

- H2, Playfair Display, `40px` (desktop) / `28px` (mobile), màu `#ffffff`, `font-weight: 700`
- Ví dụ text: "Want to be part of something great?"
- Margin-bottom: `16px`

### Subtext

- body, system sans-serif, `16px`, `rgba(255,255,255,0.85)`, line-height `1.6`
- Ví dụ: "We're always looking for passionate people to join the igloo family."
- Margin-bottom: `32px`

### Nút "Join our team"

- Style: **outlined** (viền trắng, background trong suốt) — tạo contrast với background cam
- Border: `2px solid #ffffff`
- Color: `#ffffff`
- Background: `transparent`
- Border-radius: `4px`
- Padding: `14px 40px`
- Font: system sans-serif, `16px`, `font-weight: 600`
- Hover: background `#ffffff`, color `#E8614A` (đảo màu)
- Transition: `background 200ms ease, color 200ms ease`
- Tối thiểu width: `180px`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background section | `#E8614A` |
| Heading | `#ffffff` |
| Subtext | `rgba(255,255,255,0.85)` |
| Nút border | `#ffffff` |
| Nút text | `#ffffff` |
| Nút hover background | `#ffffff` |
| Nút hover text | `#E8614A` |

### Typography

| Yếu tố | Style |
|---|---|
| Heading | H2, Playfair Display, `40px` (desktop) / `28px` (mobile), `#ffffff`, `font-weight: 700` |
| Subtext | body, system sans-serif, `16px`, `rgba(255,255,255,0.85)`, line-height `1.6` |
| Nút label | system sans-serif, `16px`, `font-weight: 600` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section | fade-in + `translateY(20px)` → `0` | Vào viewport | `400ms ease` |
| Nút | Background `transparent` → `#ffffff`, color `#ffffff` → `#E8614A` | Hover | `200ms ease` |
| Nút | scale `0.98` | Active/press | `100ms ease` |

---

## 7. Business Rules

- Nút phải điều hướng kèm `?ref=about-join-cta` tracking param
- Happy path: điều hướng đến `/careers?ref=about-join-cta`
- Fallback (không có trang Careers): điều hướng đến `/contact?ref=about-join-cta`
- Destination URL được cấu hình qua constant, không hardcode trực tiếp trong JSX
- Nút phải là thẻ `<a>` (Next.js `<Link>`) — không phải `<button>` vì đây là navigation
- Aria-label: `"Join our team at igloo"` (nếu cần rõ hơn ngữ cảnh)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Trang `/careers` chưa tồn tại | Điều hướng đến `/contact?ref=about-join-cta` |
| Mobile (< 640px) | Heading nhỏ lại `28px`, nút full-width (`width: 100%`) |
| Người dùng đã ở trang `/careers` | Link vẫn hoạt động bình thường (reload trang với ref param) |
| Reduced motion preference | Bỏ qua fade-in animation, hiển thị ngay |

---

## 9. Security Requirements

- Link sử dụng Next.js `<Link>` — không có rủi ro XSS
- `ref` param là hardcoded string — không lấy từ user input
- Không có form hoặc input — rủi ro thấp

---

## 10. Acceptance Criteria

- [ ] Section hiển thị với background `#E8614A`
- [ ] Heading H2 hiển thị đúng text, font Playfair Display, màu `#ffffff`
- [ ] Subtext hiển thị bên dưới heading
- [ ] Nút "Join our team" có border trắng, text trắng, background transparent
- [ ] Hover nút: background trắng, text cam `#E8614A`
- [ ] Click nút → điều hướng đến `/careers?ref=about-join-cta`
- [ ] Nếu không có `/careers`: fallback đến `/contact?ref=about-join-cta`
- [ ] Mobile: heading nhỏ lại, nút full-width
- [ ] `prefers-reduced-motion`: không có fade-in animation
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

Không cần asset riêng cho section này — nền màu solid.

---

## 12. Data Structure

```typescript
interface JoinOurTeamCTAProps {
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string; // '/careers' hoặc '/contact'
  ctaRef: string;  // tracking param value, ví dụ: 'about-join-cta'
}

// Config constant (đặt tại lib/config/navigation.ts):
const JOIN_CTA_CONFIG: JoinOurTeamCTAProps = {
  heading: 'Want to be part of something great?',
  subtext: "We're always looking for passionate people to join the igloo family.",
  ctaLabel: 'Join our team',
  ctaHref: '/careers',
  ctaRef: 'about-join-cta',
};
```

---

## 13. Implementation Notes

- Component là Server Component — không cần `"use client"` (không có state/event phức tạp)
- Dùng Next.js `<Link>` với `href={${ctaHref}?ref=${ctaRef}}`
- Destination URL (`ctaHref`) đặt trong constant tại `lib/config/navigation.ts` để dễ cập nhật khi có trang Careers
- Fade-in animation: dùng CSS `@keyframes` + Tailwind arbitrary class hoặc CSS module nếu cần — không dùng JS animation library
- `prefers-reduced-motion`: wrap animation class trong `motion-safe:` Tailwind modifier
- Section này là cố định nội dung — không cần fetch data, phù hợp với static rendering
