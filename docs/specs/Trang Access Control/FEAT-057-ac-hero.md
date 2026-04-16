# FEAT-057: Access Control — Hero Section

**Trạng thái:** Planned
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/solutions/access-control/AccessControlPage.tsx`
**Page file:** `app/[locale]/solutions/access-control/page.tsx`

---

## 1. Business Goal

Tạo ấn tượng đầu tiên mạnh mẽ với nhóm khách hàng quản lý tòa nhà chung cư, apartment complex, và doanh nghiệp cần kiểm soát truy cập linh hoạt. Nhấn mạnh khả năng mở rộng theo quy mô và khuyến khích đặt lịch demo.

---

## 2. Actors

- **Building Manager** — quản lý tòa nhà chung cư/apartment complex
- **Property Developer** — chủ đầu tư bất động sản thương mại
- **Security Officer** — người phụ trách an ninh tòa nhà
- **Visitor** — khách truy cập website

---

## 3. Preconditions

- Website hoạt động bình thường (HTTPS)
- Trang load thành công trên trình duyệt

---

## 4. Main Flow

1. Người dùng truy cập `/solutions/access-control`
2. Hệ thống hiển thị Hero chiếm toàn màn hình (100vh)
3. Hiển thị ảnh nền: tòa nhà chung cư/apartment complex nhiều tầng, màu be/trắng, cây xanh, bầu trời xanh — góc rộng ngang
4. Hiển thị headline: `"Flexible Smart Access Control That Grows with Your Business"`
5. Hiển thị subtext mô tả ngắn
6. Hiển thị 2 nút CTA nằm ngang

---

## 5. UI Specification

### Layout
- Chiều cao: `100vh`, `min-height: 640px`
- Ảnh nền: full-width, `object-fit: cover`, overlay tối nhẹ `rgba(0,0,0,0.35)`
- Nội dung: căn trái, `max-width: 680px`, căn giữa dọc

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Overlay nền | `rgba(0,0,0,0.35)` |
| Headline | `#ffffff` |
| Subtext | `rgba(255,255,255,0.8)` |
| CTA Primary | `var(--primary)` — `#E8614A` |
| CTA Secondary | outline trắng |
| Fallback bg | `#1a1f2e` |

### Typography
| Yếu tố | Style |
|---|---|
| Headline H1 | `clamp(2.2rem, 5vw, 3.5rem)`, font-weight 700 |
| Subtext | `1.05rem`, line-height 1.6 |
| CTA | `0.95rem`, font-weight 600 |

### Nội dung text
- **heroBadge:** `"Access Control Solutions"`
- **heroTitle:** `"Flexible Smart Access Control That Grows with Your Business"`
- **heroSubtitle:** `"Manage every door, floor, and gate from a single platform — whether you run 10 units or 10,000."`
- **heroCta:** `"Request a Demo"`
- **heroCtaSecondary:** `"See Products"`

---

## 6. Animations

| Element | Animation | Mô tả |
|---|---|---|
| Badge | `fadeUp` 0.4s | Xuất hiện trước |
| Headline | `fadeUp` 0.6s delay 0.1s | Fade + slide lên |
| Subtext | `fadeUp` 0.6s delay 0.2s | Stagger sau headline |
| CTAs | `fadeUp` 0.6s delay 0.3s | Stagger sau subtext |

---

## 7. Business Rules

- Ảnh nền compress ≤ 200KB (WebP)
- CTA tracking: navigate `/contact?ref=ac-hero`
- Responsive: nội dung căn giữa trên mobile

---

## 8. Assets

| Asset | Đường dẫn |
|---|---|
| Ảnh nền tòa nhà | `public/images/Solutions/access-contro/hinh-hero.webp` |

---

## 9. Acceptance Criteria

- [ ] Hero chiếm đúng 100vh
- [ ] Headline hiển thị đúng
- [ ] 2 nút CTA hiển thị ngang nhau
- [ ] Animation fadeUp khi load
- [ ] Responsive đúng trên mobile
