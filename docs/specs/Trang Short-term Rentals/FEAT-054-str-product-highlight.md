# FEAT-054: Short-term Rentals — Product Highlight

**Trạng thái:** Planned
**Ưu tiên:** P0
**File implement:** `app/components/solutions/short-term-rental/STRProductHighlight.tsx`
**Page file:** `app/[locale]/solutions/short-term-rental/page.tsx`

---

## 1. Business Goal

Spotlight sản phẩm khóa phù hợp nhất cho cho thuê ngắn hạn, kèm thông tin model và CTA mua/tìm hiểu.

---

## 2. Main Flow

1. Người dùng cuộn đến section
2. Nền trắng, nội dung căn giữa
3. Label nhỏ màu đỏ phía trên
4. Headline: `"Best smart locks for short term rentals"`
5. Hình ảnh sản phẩm lớn: khóa bàn phím số màu đen, LED xanh 
6. Tên model + mô tả ngắn + tab chuyển đổi hình ảnh
7. CTA Button màu đỏ

---

## 3. UI Specification

### Layout
- Nền: `#ffffff`
- Nội dung căn giữa (`text-align: center`)
- Padding: `80px 24px`
- Product image: max-width `320px`, margin auto

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Nền | `#ffffff` |
| Label | `var(--primary)` |
| Headline | `#1a1a1a` |
| Model name | `#111` |
| Description | `#555` |
| CTA | `var(--primary)` |

### Typography
| Yếu tố | Style |
|---|---|
| Label | `0.7rem`, uppercase, letter-spacing `0.12em`, font-weight 600 |
| Headline H2 | `clamp(1.8rem, 4vw, 2.6rem)`, font-weight 700 |
| Model name | `1.1rem`, font-weight 600 |
| Description | `0.95rem`, line-height 1.6, max-width `440px` |

### Nội dung
- **Label:** "Featured Product"
- **Headline:** `"Best smart locks for short term rentals"`
- **Product:** Deadbolt Go (keypad, màu đen, LED xanh ở đáy)
- **Model name:** "Deadbolt Go"
- **Description:** Mô tả ngắn 2 dòng về tính năng nổi bật
- **CTA:** Chuyển đến trang chi tiết sản phẩm tương ứng → `/products/`

### Product Image
- Ảnh hero sản phẩm, nền trắng hoặc transparent
- Size hiển thị: `280×360px`
- Drop shadow nhẹ

---

## 4. Animations

| Element | Animation |
|---|---|
| Product image | `fadeIn` + `scale(0.95 → 1)` khi scroll vào |
| Text block | `fadeUp` stagger |

---

## 5. Acceptance Criteria

- [ ] Nền trắng, layout căn giữa
- [ ] Label màu đỏ/cam phía trên headline
- [ ] Headline: `"Best smart locks for short term rentals"`
- [ ] Ảnh sản phẩm lớn, rõ nét
- [ ] Model name + description
- [ ] CTA button màu đỏ

---

## 6. Assets cần thiết

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Ảnh Deadbolt Go  | `public/images/Solutions/short-term rentals/deadbolt-go_1.webp` | Đã có |
| Ảnh Deadbolt 2E | `public/images/Solutions/short-term rentals/deadbolt-2e.webp` | Đã có |
| Ảnh Keybox 3| `public/images/Solutions/short-term rentals/keybox3.webp` | Đã có |
| Ảnh Retrofit Lock | `public/images/Solutions/short-term rentals/retrofit-and-keypad.webp` | Đã có |
