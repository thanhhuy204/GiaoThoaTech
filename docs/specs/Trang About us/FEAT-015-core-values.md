# FEAT-015: Core Values (Trang About us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Nên có sau launch
**File implement:** `app/components/about/CoreValues.tsx`
**Page file:** `app/(pages)/about/page.tsx`

---

## 1. Business Goal

Truyền tải giá trị văn hóa công ty igloo, giúp khách hàng và ứng viên tiềm năng hiểu rõ DNA thương hiệu. Phần này củng cố hình ảnh igloo là đối tác đáng tin cậy, có văn hóa làm việc tích cực và bền vững.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — tìm hiểu về văn hóa công ty trước khi quyết định hợp tác
- **Ứng viên tiềm năng** — đánh giá môi trường làm việc trước khi ứng tuyển

---

## 3. Preconditions

- Người dùng đang truy cập trang `/about`
- Section này nằm sau phần mission/vision của trang About

---

## 4. Main Flow

1. Trang `/about` load → section Core Values render
2. Hiển thị tiêu đề section ("Our Core Values" hoặc "What we stand for")
3. Hiển thị grid 5 giá trị: Have fun, Resilient, Empathy, Teamwork, Action-oriented
4. Mỗi value card hiển thị: icon SVG, tên value (H3), mô tả 1–2 câu
5. Hover vào card → hiệu ứng nâng nhẹ + shadow

---

## 5. UI Specification

### Layout

- Section full-width, background `#f9f9f9`
- Padding: `80px 0` (desktop), `48px 0` (mobile)
- Container max-width: `1200px`, căn giữa, padding ngang `24px`
- Tiêu đề section căn giữa, margin-bottom `48px`
- Grid: 5 cột trên desktop (`grid-cols-5`), 2-3 cột trên tablet (`grid-cols-3`), 1 cột trên mobile (`grid-cols-1`)
- Gap giữa các card: `24px`

### Card

- Background: `#ffffff`
- Border: `1px solid rgba(0,0,0,0.08)`
- Border-radius: `8px`
- Padding: `32px 24px`
- Căn nội dung giữa theo trục dọc và ngang (`text-center`)
- Icon: `48px × 48px`, màu `#E8614A`, margin-bottom `16px`
- Tên value: H3, Playfair Display, `18px`, `#0f0f0f`
- Mô tả: body, system sans-serif, `14px`, `rgba(0,0,0,0.6)`, line-height `1.6`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background section | `#f9f9f9` |
| Card background | `#ffffff` |
| Card border | `rgba(0,0,0,0.08)` |
| Icon | `#E8614A` |
| Tên value | `#0f0f0f` |
| Mô tả text | `rgba(0,0,0,0.6)` |
| Card hover shadow | `0 8px 24px rgba(0,0,0,0.12)` |

### Typography

| Yếu tố | Style |
|---|---|
| Section title | H2, Playfair Display, `36px`, `#0f0f0f`, `font-weight: 700` |
| Section subtitle | body, system sans-serif, `16px`, `rgba(0,0,0,0.6)` |
| Card title (value name) | H3, Playfair Display, `18px`, `#0f0f0f`, `font-weight: 600` |
| Card description | body, system sans-serif, `14px`, `rgba(0,0,0,0.6)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Value card | `translateY(-4px)` + shadow `0 8px 24px rgba(0,0,0,0.12)` | Hover | `200ms ease` |
| Icon | scale `1.1` | Card hover | `200ms ease` |
| Section | fade-in + slide-up `translateY(20px)` → `translateY(0)` | Vào viewport (IntersectionObserver) | `400ms ease` |

---

## 7. Business Rules

- Danh sách bao gồm đúng 5 giá trị theo thứ tự: Have fun, Resilient, Empathy, Teamwork, Action-oriented
- Mỗi giá trị bắt buộc có icon SVG riêng biệt (không dùng emoji)
- Mỗi giá trị có mô tả ngắn 1–2 câu, tối đa 30 từ
- Icon phải có `aria-hidden="true"` vì tên đã mô tả đủ nội dung
- Không thay đổi tên hoặc thứ tự các value mà không có sự phê duyệt từ stakeholder

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Màn hình mobile (< 640px) | Grid chuyển thành 1 cột, card full-width |
| Màn hình tablet (640–1024px) | Grid 2–3 cột tùy chiều rộng |
| Icon SVG không load được | Hiển thị placeholder `48px × 48px` màu `#E8614A` với opacity `0.2` |
| Text mô tả quá dài (CMS override) | Truncate sau 2 dòng với `line-clamp-2`, tooltip hiển thị full text |

---

## 9. Security Requirements

- Không có input người dùng — không cần sanitize
- Nếu nội dung lấy từ CMS: escape HTML để tránh XSS
- Icon SVG inline: chỉ dùng SVG từ trusted source, không dùng SVG từ user input

---

## 10. Acceptance Criteria

- [ ] Hiển thị đúng 5 value cards theo thứ tự: Have fun, Resilient, Empathy, Teamwork, Action-oriented
- [ ] Mỗi card có icon SVG riêng, tên value, và mô tả 1–2 câu
- [ ] Grid responsive: 5 cột (desktop) → 3 cột (tablet) → 1 cột (mobile)
- [ ] Hover card: `translateY(-4px)` + shadow xuất hiện mượt mà trong `200ms`
- [ ] Icon có `aria-hidden="true"`
- [ ] Section có `aria-label` hoặc heading đúng level H2
- [ ] Animation vào viewport hoạt động với IntersectionObserver
- [ ] Không dùng inline style — thuần Tailwind classes
- [ ] TypeScript strict: không có `any`

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Icon Have fun | `public/icons/value-have-fun.svg` | 48×48px | Biểu tượng vui vẻ/ngôi sao |
| Icon Resilient | `public/icons/value-resilient.svg` | 48×48px | Biểu tượng sức mạnh/cây |
| Icon Empathy | `public/icons/value-empathy.svg` | 48×48px | Biểu tượng trái tim |
| Icon Teamwork | `public/icons/value-teamwork.svg` | 48×48px | Biểu tượng nhóm người |
| Icon Action-oriented | `public/icons/value-action.svg` | 48×48px | Biểu tượng tên lửa/mũi tên |

---

## 12. Data Structure

```typescript
interface CoreValue {
  id: string;
  name: string;
  description: string;
  iconPath: string; // path to SVG in /public/icons/
}

const CORE_VALUES: CoreValue[] = [
  {
    id: 'have-fun',
    name: 'Have fun',
    description: 'We believe joy and laughter fuel creativity. Work should be something you look forward to every day.',
    iconPath: '/icons/value-have-fun.svg',
  },
  {
    id: 'resilient',
    name: 'Resilient',
    description: 'We embrace challenges and bounce back stronger. Every setback is a setup for a comeback.',
    iconPath: '/icons/value-resilient.svg',
  },
  {
    id: 'empathy',
    name: 'Empathy',
    description: 'We listen deeply and act with care. Understanding others drives better products and stronger relationships.',
    iconPath: '/icons/value-empathy.svg',
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    description: 'We win together or not at all. Collaboration and trust are the foundation of everything we build.',
    iconPath: '/icons/value-teamwork.svg',
  },
  {
    id: 'action-oriented',
    name: 'Action-oriented',
    description: 'We move fast and ship with intent. Ideas matter, but execution is what creates real impact.',
    iconPath: '/icons/value-action.svg',
  },
];
```

---

## 13. Implementation Notes

- Dùng `next/image` nếu icon là file PNG/WebP; dùng inline SVG hoặc `<img>` nếu là SVG thuần
- Dữ liệu `CORE_VALUES` nên đặt trong `lib/data/about.ts` — không hardcode trong component
- Dùng CSS animation class thuần (`transition-transform duration-200 ease-out`) — không dùng Framer Motion
- IntersectionObserver trigger: `threshold: 0.2`, stagger delay giữa các card `60ms` mỗi card
- Component là Server Component (không cần state/event) — không thêm `"use client"` trừ khi cần animation phức tạp
- Nếu cần `"use client"` cho IntersectionObserver, tách thành `CoreValuesClient.tsx` wrapper
