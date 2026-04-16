# FEAT-050: Short-term Rentals — Hero Section

**Trạng thái:** Planned
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/solutions/short-term-rental/STRHero.tsx`
**Page file:** `app/[locale]/solutions/short-term-rental/page.tsx`

---

## 1. Business Goal

Tạo ấn tượng đầu tiên mạnh mẽ với nhóm khách hàng quản lý cho thuê ngắn hạn (Airbnb, VRBO, villa...), nhấn mạnh giải pháp quản lý dễ dàng, và khuyến khích đặt lịch demo.

---

## 2. Actors

- **Property Manager** — quản lý nhiều bất động sản cho thuê ngắn hạn
- **Host** — chủ nhà Airbnb / villa cá nhân
- **Visitor** — khách truy cập website

---

## 3. Preconditions

- Website hoạt động bình thường (HTTPS)
- Trang load thành công trên trình duyệt

---

## 4. Main Flow

1. Người dùng truy cập `/solutions/short-term-rental`
2. Hệ thống hiển thị Hero chiếm toàn màn hình (100vh)
3. Hiển thị ảnh nền: villa/căn hộ sang trọng, cây xanh, ánh nắng
4. Hiển thị headline: `"Manage short-term rentals with ease"`
5. Hiển thị subtext mô tả ngắn giải pháp
6. Hiển thị CTA Button màu đỏ/cam


---

## 5. UI Specification

### Layout
- Chiều cao: `100vh`
- Ảnh nền: full-width, `object-fit: cover`, overlay tối nhẹ để chữ nổi
- Nội dung: căn trái hoặc giữa, `max-width: 680px`
- Product strip bên dưới: flex row, 3 items, nền trắng, `padding: 24px 0`

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Overlay nền | `rgba(0,0,0,0.35)` |
| Headline | `#ffffff` |
| Subtext | `rgba(255,255,255,0.8)` |
| CTA Button | `var(--primary)` — đỏ/cam `#E8614A` |
| Product strip nền | `#ffffff` |
| Product name | `#1a1a1a` |

### Typography
| Yếu tố | Style |
|---|---|
| Headline H1 | `clamp(2.2rem, 5vw, 3.5rem)`, font-weight 700 |
| Subtext | `1.05rem`, line-height 1.6 |
| CTA | `0.95rem`, font-weight 600, uppercase |
| Product name | `0.8rem`, font-weight 500 |

### Partner Badge
- Vị trí: top-right của hero, absolute
- Nội dung: logo Airbnb + text "Official Partner" hoặc tương tự
- Background: `rgba(255,255,255,0.15)`, backdrop-blur
- Border-radius: `8px`, padding: `8px 12px`

### Product Strip
- 3 sản phẩm: Deadbolt Go, Keybox 3, Padlock 2
- Mỗi item: ảnh sản phẩm `80×80px` + tên bên dưới
- Layout: `display: flex`, `justify-content: center`, `gap: 48px`

### CTA Button
| Nút | Navigate | aria-label |
|---|---|---|
| "Get Started" hoặc "Request Demo" | `/contact?ref=str-hero` | `"Đặt lịch demo cho thuê ngắn hạn"` |

---

## 6. Animations

| Element | Animation | Mô tả |
|---|---|---|
| Headline | `fadeUp` 0.6s | Fade + slide lên khi mount |
| Subtext | `fadeUp` 0.6s delay 0.1s | Stagger sau headline |
| CTA | `fadeUp` 0.6s delay 0.2s | Stagger sau subtext |
| Product strip | `fadeIn` 0.5s delay 0.4s | Hiện sau hero content |

---

## 7. Business Rules

- Ảnh nền phải compress ≤ 200KB (WebP), tải nhanh
- CTA tracking: navigate `/contact?ref=str-hero`
- Badge đối tác chỉ hiển thị khi có partnership chính thức
- Responsive: Product strip scroll ngang trên mobile

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Ảnh nền không tải | Hiện màu nền fallback `#1a2b1a` (xanh đậm) |
| Product image lỗi | Hiện placeholder icon khóa |
| Mobile `<480px` | Partner badge ẩn, product strip scroll ngang |

---

## 9. Acceptance Criteria

- [ ] Hero chiếm đúng 100vh
- [ ] Headline hiển thị: `"Manage short-term rentals with ease"`
- [ ] CTA button màu đỏ/cam, navigate đúng
- [ ] Animation fadeUp khi load
- [ ] Responsive đúng trên mobile
- [ ] Không dùng inline style — chỉ Tailwind hoặc CSS class

---

## 10. Assets cần thiết

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Ảnh nền villa | `public/images/Solutions/short-term rentals/short-term-rental-igloo.webp` | Đã có |

