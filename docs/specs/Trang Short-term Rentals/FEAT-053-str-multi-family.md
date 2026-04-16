# FEAT-053: Short-term Rentals — Multi-Family Properties

**Trạng thái:** Planned
**Ưu tiên:** P1
**File implement:** `app/components/solutions/short-term-rental/STRMultiFamily.tsx`
**Page file:** `app/[locale]/solutions/short-term-rental/page.tsx`

---

## 1. Business Goal

Mở rộng đối tượng từ chủ nhà đơn lẻ sang quản lý tòa nhà nhiều căn hộ, nhấn mạnh tính mở rộng (scalability) của giải pháp.

---

## 2. Main Flow

1. Người dùng cuộn đến section
2. Hiển thị banner full-width, ảnh nền tối
3. Headline căn giữa: `"Smart security tailored for multi-family properties"`
4. Subtext mô tả giải pháp cho tòa nhà
5. CTA Button màu đỏ
6. Carousel dots (2 chấm điều hướng) hình ảnh 

---

## 3. UI Specification

### Layout
- Full-width, min-height: `520px`
- Nội dung căn giữa (text-align: center)
- Ảnh nền: cửa khóa thông minh + ảnh khuôn mặt người dùng (facial recognition / app unlock)
- Overlay: `rgba(0,0,0,0.5)`

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Overlay nền | `rgba(0,0,0,0.50)` |
| Headline | `#ffffff` |
| Subtext | `rgba(255,255,255,0.75)` |
| CTA Button | `var(--primary)` |
| Carousel dots active | `var(--primary)` |
| Carousel dots inactive | `rgba(255,255,255,0.4)` |

### Typography
| Yếu tố | Style |
|---|---|
| Headline H2 | `clamp(1.8rem, 4vw, 2.8rem)`, font-weight 700, max-width 600px |
| Subtext | `1rem`, max-width `520px`, margin auto |

### Nội dung
- **Headline:** `"Smart security tailored for multi-family properties"`
- **Subtext:** Mô tả về quản lý tập trung nhiều căn hộ, kiểm soát truy cập từng tầng/phòng
- **CTA:** "Learn More" → `/solutions/multi-family`

### Carousel
- 2 dots điều hướng (có thể là 2 variant: short-term và multi-family)
- Dot active: `8px`, dot inactive: `6px`
- Nằm phía dưới CTA, `margin-top: 32px`

---

## 4. Animations

| Element | Animation |
|---|---|
| Headline | `fadeUp` khi vào viewport |
| CTA | `fadeUp` delay 0.15s |
| Carousel | Slide left/right khi chuyển |

---

## 5. Acceptance Criteria

- [ ] Full-width banner, ảnh nền có overlay tối
- [ ] Headline căn giữa, rõ ràng
- [ ] CTA button màu đỏ/cam
- [ ] 2 carousel dots hiển thị bên dưới
- [ ] Responsive đúng trên mobile

---

## 6. Assets cần thiết

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Ảnh nền multi-family | `public/images/Solutions/short-term rentals/deadbolt-2e-open_jzffva.webp` | Đã có |
| Ảnh nền multi-family | `public/images/Solutions/short-term rentals/deadbolt-installed-on-the-door_glakaj.webp` | Đã có |
|Ảnh nền multi-family|`public/images/Solutions/short-term rentals/deadbolt-lock-phone_fckvzv.webp`|Đã có|
|Ảnh nền |`public/images/Solutions/short-term rentals/maunen.webp`|Đã có|
