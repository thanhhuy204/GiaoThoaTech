# FEAT-052: Short-term Rentals — "No WiFi No Issue"

**Trạng thái:** Planned
**Ưu tiên:** P1
**File implement:** `app/components/solutions/short-term-rental/STRNoWifi.tsx`
**Page file:** `app/[locale]/solutions/short-term-rental/page.tsx`

---

## 1. Business Goal

Xử lý objection phổ biến nhất: "Khóa thông minh có cần WiFi không?". Section này trực tiếp trả lời và làm nổi bật lợi thế công nghệ algoPIN™ offline.

---

## 2. Main Flow

1. Người dùng cuộn đến section
2. Hiển thị banner tối full-width
3. Headline lớn: `"No WiFi No Issue"`
4. Mô tả ngắn về khả năng hoạt động offline
5. Hình ảnh: điện thoại + thiết bị khóa icon wifi bị gạch

---

## 3. UI Specification

### Layout
- Full-width banner
- Nền: `#0f0f0f` (tối)
- Min-height: `480px`
- 2 cột: text trái (40%), hình ảnh phải (60%)

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Nền | `#0f0f0f` hoặc `#111210` |
| Headline | `#ffffff` |
| Highlight word | `var(--primary)` |
| Subtext | `rgba(255,255,255,0.65)` |
| Icon WiFi | `var(--primary)`, size `48px` |

### Typography
| Yếu tố | Style |
|---|---|
| Headline H2 | `clamp(2rem, 4vw, 3rem)`, font-weight 700 |
| Subtext | `1rem`, line-height 1.7 |

### Nội dung
- **Headline:** `"No WiFi No Issue"`
- **Subtext:** Giải thích công nghệ algoPIN™ tạo mã PIN offline, không cần kết nối mạng, Bluetooth hay sóng di động
- **Icon:** WiFi có gạch chéo , hoặc biểu tượng shield/lock
- **Badge nhỏ:** "algoPIN™ Technology"

### Hình ảnh
- Smartphone + khóa thông minh đặt trên nền tối
- Có hiệu ứng glow ánh sáng nhẹ xung quanh sản phẩm

---

## 4. Animations

| Element | Animation |
|---|---|
| Headline | `fadeUp` khi scroll vào |
| Icon WiFi | Gạch chéo xuất hiện với `drawLine` animation |
| Hình ảnh | `fadeIn` từ phải |

---

## 5. Acceptance Criteria

- [ ] Nền tối (`#0f0f0f`), chữ trắng/cam
- [ ] Headline: `"No WiFi No Issue"` — rõ, lớn
- [ ] Icon WiFi offline hoặc shield
- [ ] Hình ảnh sản phẩm bên phải
- [ ] Đề cập algoPIN™ trong subtext
- [ ] Responsive: xếp dọc trên mobile

---

## 6. Assets cần thiết

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Ảnh sản phẩm offline scene | `public/images/Solutions/short-term rentals/no-wifi.webp` | Đã có |
