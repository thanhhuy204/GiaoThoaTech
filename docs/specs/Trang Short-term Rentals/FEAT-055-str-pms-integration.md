# FEAT-055: Short-term Rentals — PMS Integration

**Trạng thái:** Planned
**Ưu tiên:** P0
**File implement:** `app/components/solutions/short-term-rental/ShortTermRentalPage.tsx`
**Page file:** `app/[locale]/solutions/short-term-rental/page.tsx`

---

## 1. Business Goal

Thuyết phục property managers rằng igloohome kết nối liền mạch với hệ thống PMS họ đang dùng, giảm rào cản chuyển đổi.

---

## 2. Main Flow

1. Người dùng cuộn đến section
2. Nền tối, layout 3 cột: logos trái — headline giữa — logos phải
3. Dashboard/marketplace image full-width bên dưới headline
4. Sub-section 2 cột bên dưới

---

## 3. UI Specification

### Layout
- Nền: `#0f0f0f` (tối)
- Padding: `80px 0`

### Headline row — 3 cột song song
- **Trái:** `logos-left.webp` — logo các đối tác PMS bên trái
- **Giữa:** Label + Headline + Subtext căn giữa
- **Phải:** `logos-right.webp` — logo các đối tác PMS bên phải

### Dashboard image
- `iglooconnect-marketplace-avantio.webp` — full-width, max 960px
- Border-radius `12px`, box-shadow tối

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Nền | `#0f0f0f` |
| Headline | `#ffffff` |
| Subtext | `rgba(255,255,255,0.65)` |

### Typography
| Yếu tố | Style |
|---|---|
| Headline H2 | `clamp(1.8rem, 4vw, 2.8rem)`, font-weight 700 |
| Subtext | `1rem`, max-width `560px` |

### Nội dung
- **Headline:** `"Connect to your PMS seamlessly"`
- **Subtext:** Mô tả tích hợp tự động với các nền tảng quản lý bất động sản hàng đầu

### Sub-section (2 cột bên dưới)

**Cột trái — Real-time dashboard**
- Ảnh `iglooaccess-dashboard.webp`
- Label: "Real-time access log"

**Cột phải — Feature List**
- Danh sách 5 tính năng tích hợp với icon tick
- CTA Button: "Explore Integrations" → `/integrations`

---

## 4. Animations

| Element | Animation |
|---|---|
| Sub-section | `fadeUp` khi scroll vào |

---

## 5. Acceptance Criteria

- [ ] Nền tối, logos trái/phải song song với headline
- [ ] Dashboard image hiển thị full-width bên dưới headline
- [ ] Sub-section 2 cột bên dưới
- [ ] CTA "Explore Integrations"
- [ ] Responsive: logos ẩn hoặc xếp dọc trên mobile

---

## 6. Assets cần thiết

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Logos trái | `public/images/Solutions/short-term rentals/logos-left.webp` | Đã có |
| Logos phải | `public/images/Solutions/short-term rentals/logos-right.webp` | Đã có |
| Dashboard | `public/images/Solutions/short-term rentals/iglooconnect-marketplace-avantio.webp` | Đã có |
| Real-time dashboard | `public/images/Solutions/short-term rentals/iglooaccess-dashboard_whngao.webp` | Đã có |
