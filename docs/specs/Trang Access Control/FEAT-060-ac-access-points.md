# FEAT-060: Access Control — Multifamily Access Points Map

**Trạng thái:** Planned
**Ưu tiên:** P1
**File implement:** `app/components/solutions/access-control/AccessControlPage.tsx`

---

## 1. Business Goal

Giúp khách hàng hiểu trực quan các điểm kiểm soát truy cập trong một tòa nhà chung cư. Sử dụng hình ảnh 3D isometric map để minh họa toàn bộ hệ sinh thái access control.

---

## 2. UI Specification

### Layout
- Nền: `#ffffff`
- Padding: `80px 0`
- Headline căn giữa, chữ đậm
- Hình ảnh 3D map chiếm phần lớn chiều rộng, căn giữa

### Nội dung
- **mapTitle:** `"Control and Have Visibility Over Every Multifamily Access Point"`
- **mapSubtitle:** `"From the main entrance to individual unit doors — every access point under your control."`

### Hình ảnh
- **Ảnh:** `public/images/Solutions/access-contro/0-default-map.webp`
- 3D Isometric: mô hình tòa chung cư nhìn từ góc 45°
- Màu be/kem, hồ bơi xanh phía trước, cây xanh xung quanh
- Các điểm access point được đánh dấu trên mô hình
- `max-width: 900px`, căn giữa, border-radius: 16px

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Section bg | `#ffffff` |
| Headline | `#1a1a1a` |
| Subtext | `#6b7280` |

---

## 3. Business Rules

- Hình ảnh responsive: `width: 100%` trên mobile
- Alt text mô tả đầy đủ cho accessibility

---

## 4. Assets

| Asset | Đường dẫn |
|---|---|
| 3D Map | `public/images/Solutions/access-contro/0-default-map.webp` |

---

## 5. Acceptance Criteria

- [ ] Hình ảnh 3D map hiển thị đúng, căn giữa
- [ ] Headline + subtext căn giữa
- [ ] Responsive đúng trên mobile
