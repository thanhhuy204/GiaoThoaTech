# FEAT-051: Short-term Rentals — Features / Lợi ích

**Trạng thái:** Planned
**Ưu tiên:** P0
**File implement:** `app/components/solutions/short-term-rental/STRFeatures.tsx`
**Page file:** `app/[locale]/solutions/short-term-rental/page.tsx`

---

## 1. Business Goal

Trình bày các lợi ích cụ thể của giải pháp igloohome cho cho thuê ngắn hạn, giúp property manager thấy ngay giá trị sản phẩm mang lại.

---

## 2. Main Flow

1. Người dùng cuộn xuống sau Hero
2. Hiển thị section 2 cột: text trái , các lợi ích ở bên phải
3. Cột trái: tiêu đề 
4. Cột phải: danh sách tính năng có icon tick để xem mô tả chi tiết 


---

## 3. UI Specification

### Layout
- 2 cột: `50% / 50%`, `gap: 64px`
- Mobile: xếp dọc
- Padding section: `80px 0`
- Nền: `#ffffff`

### Nội dung
| Yếu tố | Nội dung |
|---|---|
| Label nhỏ | "Solutions" — màu `var(--primary)`, uppercase |
| Headline | "Lease Operations More Efficiently" |
| Subtext | Mô tả ngắn tiêu đề |
| Feature list | 4–6 items, mỗi item có icon tick màu đỏ |

### Danh sách tính năng (gợi ý)
1. Easy PMS integrations
2. Automate Self Check-ins
3. Durable and built to last

### Icon tick
- SVG checkmark tròn, màu `var(--primary)`
- Size: `20×20px`
- Căn giữa dọc với text


## 4. Animations

| Element | Animation |
|---|---|
| Section khi scroll vào viewport | `fadeUp` 0.6s |
| Từng feature item | stagger `0.08s` |

---

## 5. Acceptance Criteria

- [ ] Layout 2 cột trên desktop, dọc trên mobile
- [ ] Hiển thị ≥ 4 tính năng với icon tick màu đỏ
- [ ] Danh sách tính năng với icon tick hiển thị bên phải
- [ ] Headline rõ ràng, nổi bật
- [ ] Animation khi scroll vào viewport

---


