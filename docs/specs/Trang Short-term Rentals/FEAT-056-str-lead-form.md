# FEAT-056: Short-term Rentals — Lead Form / Ebook Download

**Trạng thái:** Planned
**Ưu tiên:** P0
**File implement:** `app/components/solutions/short-term-rental/ShortTermRentalPage.tsx`
**Page file:** `app/[locale]/solutions/short-term-rental/page.tsx`

---

## 1. Business Goal

Thu thập email lead từ property managers quan tâm thông qua tài liệu hướng dẫn (ebook), tạo điểm tiếp xúc đầu tiên với sales funnel.

---

## 2. Actors

- **Property Manager / Host** — điền form để nhận ebook
- **Marketing Team** — nhận email lead

---

## 3. Main Flow

1. Người dùng cuộn đến section cuối
2. Nền `#f9f8f5`, layout 2 cột
3. Cột trái: ảnh ebook 
4. Cột phải: tiêu đề + 3 bullet pointsform đơn giản (Name + Email)
5. Người dùng điền và nhấn submit
6. Hiển thị success state

---

## 4. UI Specification

### Layout
- 2 cột: `50% / 50%`, `gap: 64px`
- Nền: `#f9f8f5`
- Padding: `80px 0`
- Mobile: xếp dọc, form xuống dưới

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Nền | `#f9f8f5` |
| Form title | `#1a1a1a` |
| Label | `#374151` |
| Input focus | `var(--primary)` |
| CTA Button | `var(--primary)` |

### Cột trái — Ebook Visual
- Ảnh `ebook-igloohome-integration-1.webp`
- Border-radius `12px`, drop shadow nhẹ
- Bên dưới ảnh: tiêu đề ebook + 3 bullet points với icon tick

**Tiêu đề ebook:**
`"Your Guide to Effortless Check-ins with Smart Locks & PMS Integration"`

**Bullet points:**
1. Automate access and reclaim your time.
2. Quick install and direct connection to Airbnb/PMS — no manual messaging needed.
3. Manage 1 or 1000 properties with zero hassle — even when you're offline.

### Cột phải — Form
**Tiêu đề form:** `"Get the Guide"`
**Subtext:** Mô tả ngắn về giá trị ebook

**Các trường nhập liệu:**

| Field | Type | Placeholder | Required |
|---|---|---|---|
| Full Name | text | "John Smith" | ✓ |
| Email | email | "john@company.com" | ✓ |

**CTA Button:** "Get the Guide" — `var(--primary)`, full-width

### Success State
- Thay form bằng success card
- Title: "Check your inbox!"
- Desc: "Your guide is on its way."

---

## 5. Validation

| Field | Rule |
|---|---|
| Email | Regex email hợp lệ |
| Full Name | Không trống |

---

## 6. Animations

| Element | Animation |
|---|---|
| Section khi scroll vào | `fadeUp` 0.5s |
| Success card | `fadeIn` + `scale(0.95 → 1)` |

---

## 7. Acceptance Criteria

- [ ] Layout 2 cột: ebook trái, form phải
- [ ] Ảnh ebook + tiêu đề + 3 bullet points bên trái
- [ ] Form chỉ có 2 trường: Name và Email
- [ ] CTA Button màu đỏ/cam, full-width
- [ ] Success state sau submit
- [ ] Responsive: xếp dọc trên mobile

---

## 8. Assets cần thiết

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Ebook cover | `public/images/Solutions/short-term%20rentals/ebook-igloohome-integration-1.webp` | Đã có |
