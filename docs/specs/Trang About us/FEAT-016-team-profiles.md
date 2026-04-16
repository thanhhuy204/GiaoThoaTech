# FEAT-016: Giới thiệu đội ngũ (Trang About us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Nên có sau launch
**File implement:** `app/components/about/TeamProfiles.tsx`
**Page file:** `app/(pages)/about/page.tsx`

---

## 1. Business Goal

Cho khách hàng và đối tác thấy đội ngũ chuyên nghiệp đứng sau sản phẩm igloo. Việc công khai thông tin nhân sự tăng độ tin cậy về năng lực hỗ trợ, phát triển sản phẩm, và cam kết lâu dài với khách hàng.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — muốn biết ai là người chịu trách nhiệm sản phẩm và hỗ trợ
- **Đối tác doanh nghiệp** — đánh giá độ credibility trước khi ký hợp đồng
- **Ứng viên tiềm năng** — tìm hiểu đội ngũ trước khi ứng tuyển

---

## 3. Preconditions

- Người dùng đang truy cập trang `/about`
- Section Team nằm sau phần Core Values (FEAT-015)
- Dữ liệu đội ngũ đã được chuẩn bị (tên, role, ảnh, bio, LinkedIn URL)

---

## 4. Main Flow

1. Trang `/about` load → section Team Profiles render
2. Hiển thị tiêu đề section ("Meet our team" hoặc "The people behind igloo")
3. Hiển thị grid 6–8 profile cards
4. Mỗi profile card hiển thị: ảnh, tên, role
5. Người dùng hover/click dấu "+" (expand button) → bio ngắn xuất hiện với animation slide-down
6. Người dùng click icon LinkedIn → mở tab mới tới trang LinkedIn của thành viên
7. Nhấn lại dấu "+" (hoặc "×") → bio thu lại

---

## 5. UI Specification

### Layout

- Section full-width, background `#ffffff`
- Padding: `80px 0` (desktop), `48px 0` (mobile)
- Container max-width: `1200px`, căn giữa, padding ngang `24px`
- Tiêu đề section căn giữa, margin-bottom `48px`
- Grid: 4 cột (desktop ≥ 1024px), 3 cột (tablet 640–1023px), 2 cột (mobile 375–639px), 1 cột (< 375px)
- Gap: `32px` ngang, `40px` dọc

### Profile Card

- Background: `#ffffff`
- Border: `1px solid rgba(0,0,0,0.08)`
- Border-radius: `8px`
- Overflow: `hidden`
- Không có fixed height — chiều cao tự động theo nội dung

**Ảnh:**
- Tỉ lệ `1:1` (vuông), border-radius `8px 8px 0 0`
- Kích thước hiển thị: `100%` chiều rộng card
- `object-fit: cover`
- Alt text: `"[Tên] — [Role] tại igloo"`

**Thông tin chính:**
- Padding: `16px`
- Tên: H3, Playfair Display, `16px`, `#0f0f0f`, `font-weight: 600`
- Role: body, system sans-serif, `13px`, `rgba(0,0,0,0.6)`, `font-weight: 400`
- Margin giữa tên và role: `4px`

**Row actions (tên + role + icons):**
- Layout flex, `justify-between`, `align-items: flex-start`
- Nhóm bên phải: icon LinkedIn + nút expand "+"
- Icon LinkedIn: `20px × 20px`, màu `rgba(0,0,0,0.4)`, hover `#0A66C2`
- Nút "+": `24px × 24px`, hình tròn, border `1px solid rgba(0,0,0,0.2)`, font `16px`, màu `rgba(0,0,0,0.6)`, hover background `#E8614A`, hover màu chữ `#ffffff`

**Bio section (hidden by default):**
- Padding: `0 16px 16px`
- Border-top: `1px solid rgba(0,0,0,0.06)` (khi mở)
- Text: system sans-serif, `13px`, `rgba(0,0,0,0.6)`, line-height `1.6`
- Tối đa 50 từ

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background section | `#ffffff` |
| Card background | `#ffffff` |
| Card border | `rgba(0,0,0,0.08)` |
| Tên thành viên | `#0f0f0f` |
| Role | `rgba(0,0,0,0.6)` |
| Bio text | `rgba(0,0,0,0.6)` |
| LinkedIn icon default | `rgba(0,0,0,0.4)` |
| LinkedIn icon hover | `#0A66C2` |
| Nút "+" default | `rgba(0,0,0,0.6)` |
| Nút "+" hover bg | `#E8614A` |
| Card hover shadow | `0 8px 24px rgba(0,0,0,0.12)` |

### Typography

| Yếu tố | Style |
|---|---|
| Section title | H2, Playfair Display, `36px`, `#0f0f0f`, `font-weight: 700` |
| Section subtitle | body, system sans-serif, `16px`, `rgba(0,0,0,0.6)` |
| Tên thành viên | H3, Playfair Display, `16px`, `#0f0f0f`, `font-weight: 600` |
| Role | body, system sans-serif, `13px`, `rgba(0,0,0,0.6)` |
| Bio | body, system sans-serif, `13px`, `rgba(0,0,0,0.6)`, line-height `1.6` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Profile card | `translateY(-4px)` + shadow | Hover | `200ms ease` |
| Bio section | `max-height: 0` → `max-height: 200px` + `opacity: 0` → `1` | Click nút "+" | `250ms ease` |
| Nút "+" | Rotate `0deg` → `45deg` (thành "×") | Click expand | `200ms ease` |
| LinkedIn icon | color transition → `#0A66C2` | Hover | `150ms ease` |
| Section cards | stagger fade-in + `translateY(16px)` → `0` | Vào viewport | `300ms ease`, delay `80ms` mỗi card |

---

## 7. Business Rules

- Số lượng profile: tối thiểu 6, tối đa 8 người
- Ảnh thành viên phải có alt text theo format: `"[Tên] — [Role] tại igloo"`
- Link LinkedIn bắt buộc mở tab mới (`target="_blank"` + `rel="noopener noreferrer"`)
- Nếu thành viên không có LinkedIn, ẩn icon LinkedIn (không hiển thị broken link)
- Bio hiển thị trong expand panel, tối đa 50 từ
- Không hiển thị thông tin liên lạc cá nhân (email, số điện thoại)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Ảnh thành viên không load | Hiển thị placeholder màu `#f9f9f9` với icon avatar (SVG) màu `rgba(0,0,0,0.2)` |
| Thành viên không có LinkedIn | Ẩn icon LinkedIn — không để link trống hoặc placeholder |
| Bio quá dài (> 50 từ) | Truncate tại 50 từ và thêm "..." |
| Mobile (< 640px) | Grid 2 cột; nút expand luôn visible thay vì chỉ hiện khi hover |
| JavaScript tắt | Ẩn nút expand, hiển thị bio trực tiếp dưới tên |
| 7 thành viên (lẻ trong grid 4 cột) | Card cuối căn trái, không stretch full-width |

---

## 9. Security Requirements

- Link LinkedIn phải validate format URL trước khi render (`href` chỉ chấp nhận `https://linkedin.com/...`)
- `rel="noopener noreferrer"` bắt buộc trên tất cả external links
- Nếu dữ liệu lấy từ CMS: escape HTML trong bio để tránh XSS
- Không render HTML raw trong bio — chỉ plain text

---

## 10. Acceptance Criteria

- [ ] Hiển thị 6–8 profile cards trong grid responsive
- [ ] Mỗi card có ảnh (1:1), tên (H3), role, icon LinkedIn (nếu có), nút expand "+"
- [ ] Ảnh có alt text đúng format `"[Tên] — [Role] tại igloo"`
- [ ] Click "+" → bio slide-down mượt, nút rotate thành "×"
- [ ] Click "×" → bio thu lại, nút rotate về "+"
- [ ] Click LinkedIn icon → mở tab mới với `rel="noopener noreferrer"`
- [ ] Hover card: `translateY(-4px)` + shadow trong `200ms`
- [ ] Grid responsive: 4 cột (desktop) → 3 (tablet) → 2 (mobile)
- [ ] Ảnh lỗi: hiển thị placeholder avatar
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Ảnh từng thành viên | `public/images/team/[first-last].jpg` | 400×400px | Optimized, JPG/WebP |
| Avatar placeholder | `public/images/team/placeholder.svg` | 400×400px | SVG đơn giản |
| LinkedIn icon | `public/icons/linkedin.svg` | 20×20px | Monochrome SVG |

---

## 12. Data Structure

```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string; // tối đa 50 từ
  imagePath: string;
  linkedInUrl?: string; // optional — nếu undefined thì ẩn icon
}

interface TeamProfilesProps {
  members: TeamMember[];
}

// Ví dụ data shape (đặt tại lib/data/about.ts):
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Jane Doe',
    role: 'Chief Executive Officer',
    bio: 'Jane has 15+ years of experience in proptech and IoT, leading igloo from a startup to a regional leader in smart access solutions.',
    imagePath: '/images/team/jane-doe.jpg',
    linkedInUrl: 'https://linkedin.com/in/janedoe',
  },
  // ... thêm 5–7 thành viên
];
```

---

## 13. Implementation Notes

- Dùng `next/image` cho tất cả ảnh thành viên: `width={400} height={400}`, `quality={85}`
- State expand per card: dùng `useState<string | null>` lưu `id` của card đang mở (chỉ 1 card mở tại 1 thời điểm) hoặc `Set<string>` nếu cho phép mở nhiều card
- Component cần `"use client"` vì có state expand
- Dữ liệu `TEAM_MEMBERS` đặt trong `lib/data/about.ts`
- Animation bio dùng CSS `max-height` transition — không dùng `display: none` (gây layout shift)
- `TeamProfileCard` tách thành sub-component riêng trong cùng file hoặc `app/components/about/TeamProfileCard.tsx`
- Stagger animation: dùng inline CSS custom property `--delay: calc(index * 80ms)` hoặc IntersectionObserver với setTimeout
