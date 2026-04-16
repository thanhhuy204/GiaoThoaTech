# FEAT-017: Khối Đa dạng & Hòa nhập (Trang About us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Nên có sau launch
**File implement:** `app/components/about/DiversityInclusivity.tsx`
**Page file:** `app/(pages)/about/page.tsx`

---

## 1. Business Goal

Thể hiện cam kết của igloo về xây dựng môi trường làm việc đa dạng và hòa nhập. Phần này tăng cường hình ảnh thương hiệu tích cực với khách hàng, đối tác quốc tế, và ứng viên tiềm năng — đặc biệt quan trọng với thị trường Bắc Mỹ và châu Âu, nơi D&I là tiêu chí đánh giá đối tác kinh doanh.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — đánh giá giá trị thương hiệu và trách nhiệm xã hội của igloo
- **Đối tác doanh nghiệp quốc tế** — kiểm tra cam kết D&I trước khi hợp tác
- **Ứng viên tiềm năng** — tìm hiểu môi trường làm việc có inclusivity không

---

## 3. Preconditions

- Người dùng đang truy cập trang `/about`
- Section D&I nằm sau phần Team Profiles (FEAT-016)

---

## 4. Main Flow

1. Trang `/about` load → section Diversity & Inclusivity render
2. Hiển thị tiêu đề section "Diversity & Inclusivity"
3. Hiển thị visual minh họa (ảnh hoặc illustration thể hiện đa dạng)
4. Hiển thị đoạn văn cam kết của công ty (2–3 câu ngắn)
5. Tùy chọn: hiển thị 3–4 stat/metric (tỉ lệ % nhân sự nữ, số quốc gia, số ngôn ngữ, ...)

---

## 5. UI Specification

### Layout

- Section full-width, background `#1a1a1a` (dark section để tạo contrast với sections xung quanh)
- Padding: `80px 0` (desktop), `48px 0` (mobile)
- Container max-width: `1200px`, căn giữa, padding ngang `24px`
- Layout 2 cột trên desktop: cột trái (visual/illustration) 50%, cột phải (text content) 50%, gap `64px`
- Trên mobile: stack dọc, visual trước, text sau

### Visual (cột trái)

- Ảnh hoặc illustration thể hiện đội ngũ đa dạng
- Tỉ lệ `4:3` hoặc `1:1`
- Border-radius: `8px`
- `object-fit: cover`

### Text content (cột phải)

- Tag label trên tiêu đề: text nhỏ `12px`, uppercase, letter-spacing `0.1em`, màu `#E8614A`
- Tiêu đề: H2, Playfair Display, `36px`, `#ffffff`, `font-weight: 700`
- Body text: system sans-serif, `16px`, `rgba(255,255,255,0.7)`, line-height `1.7`
- Margin giữa heading và body: `24px`

### Stats row (tùy chọn)

- Grid `4 cột` (desktop), `2 cột` (mobile), margin-top `40px`
- Mỗi stat: số lớn `48px` Playfair Display màu `#E8614A`, label nhỏ `13px` màu `rgba(255,255,255,0.6)`
- Divider dọc `1px solid rgba(255,255,255,0.1)` giữa các stat (desktop only)

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background section | `#1a1a1a` |
| Tiêu đề | `#ffffff` |
| Body text | `rgba(255,255,255,0.7)` |
| Tag label | `#E8614A` |
| Stat number | `#E8614A` |
| Stat label | `rgba(255,255,255,0.6)` |
| Stat divider | `rgba(255,255,255,0.1)` |

### Typography

| Yếu tố | Style |
|---|---|
| Tag label | body, system sans-serif, `12px`, `#E8614A`, uppercase, `letter-spacing: 0.1em` |
| Section title | H2, Playfair Display, `36px`, `#ffffff`, `font-weight: 700` |
| Body paragraph | body, system sans-serif, `16px`, `rgba(255,255,255,0.7)`, line-height `1.7` |
| Stat number | display, Playfair Display, `48px`, `#E8614A`, `font-weight: 700` |
| Stat label | body, system sans-serif, `13px`, `rgba(255,255,255,0.6)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section | fade-in + `translateY(20px)` → `0` | Vào viewport | `400ms ease` |
| Stat numbers | count-up từ `0` → giá trị thực | Vào viewport | `1200ms ease-out` |
| Visual/ảnh | scale `1.02` | Hover | `300ms ease` |

---

## 7. Business Rules

- Nội dung mang tính chung chung, tích cực, không dẫn chứng số liệu nếu không có data xác thực
- Không đề cập đến chính trị, tôn giáo, hoặc các vấn đề nhạy cảm cụ thể
- Ngôn ngữ: inclusive language, tránh dùng "he/she" — dùng "they/their" hoặc tên cụ thể
- Nếu hiển thị stats: chỉ dùng số liệu đã được xác minh nội bộ
- Visual/ảnh minh họa phải thể hiện sự đa dạng thực sự (giới tính, quốc tịch, độ tuổi)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Ảnh minh họa không load | Hiển thị background gradient `#2a2a2a` thay thế |
| Không có stats data | Ẩn stats row hoàn toàn — không hiển thị số `0` |
| Mobile (< 640px) | Stack dọc, visual full-width, text đầy đủ bên dưới |
| Stats count-up nếu JS tắt | Hiển thị giá trị cuối ngay lập tức (không animate) |

---

## 9. Security Requirements

- Không có input người dùng — rủi ro bảo mật thấp
- Nếu nội dung từ CMS: escape HTML, không render raw HTML trong body text
- Ảnh từ external CDN: chỉ whitelist domain đã cấu hình trong `next.config.ts`

---

## 10. Acceptance Criteria

- [ ] Section hiển thị tiêu đề "Diversity & Inclusivity" (hoặc variant được approve)
- [ ] Layout 2 cột (desktop): visual bên trái, text bên phải
- [ ] Layout 1 cột (mobile): visual trên, text dưới
- [ ] Body text hiển thị đủ 2–3 câu cam kết
- [ ] Background section màu `#1a1a1a`, tạo dark contrast với sections khác
- [ ] Nếu có stats: count-up animation khi vào viewport
- [ ] Ảnh không load: hiển thị fallback background
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Ảnh/illustration D&I | `public/images/about/diversity.jpg` | 800×600px | Đội ngũ đa dạng, JPG/WebP |

---

## 12. Data Structure

```typescript
interface DiversityStat {
  value: number;
  suffix: string; // ví dụ: "%", "+"
  label: string;
}

interface DiversityInclusivityProps {
  heading: string;
  body: string; // plain text, 2–3 câu
  imagePath: string;
  imageAlt: string;
  stats?: DiversityStat[]; // optional, tối đa 4 items
}

// Ví dụ content (đặt tại lib/data/about.ts):
const DIVERSITY_CONTENT: DiversityInclusivityProps = {
  heading: 'Diversity & Inclusivity',
  body: 'At igloo, we believe diverse perspectives drive better innovation. We are committed to building a team where everyone — regardless of background, identity, or experience — feels valued, heard, and empowered to do their best work.',
  imagePath: '/images/about/diversity.jpg',
  imageAlt: 'Diverse igloo team members collaborating',
  stats: [
    { value: 40, suffix: '%', label: 'Women in leadership' },
    { value: 15, suffix: '+', label: 'Nationalities' },
    { value: 8, suffix: '+', label: 'Languages spoken' },
    { value: 3, suffix: '', label: 'Global offices' },
  ],
};
```

---

## 13. Implementation Notes

- Component là Server Component nếu không có stats count-up; cần `"use client"` nếu có count-up animation
- Count-up animation: dùng `requestAnimationFrame` với easing function — không dùng thư viện ngoài
- Dùng `next/image` cho ảnh minh họa: `priority={false}`, `loading="lazy"`
- Dark section contrast: đảm bảo color contrast ratio ≥ 4.5:1 cho body text (`rgba(255,255,255,0.7)` trên `#1a1a1a` đạt ~7:1)
- Nếu stats không có data, truyền `stats={undefined}` — component tự ẩn stats row
