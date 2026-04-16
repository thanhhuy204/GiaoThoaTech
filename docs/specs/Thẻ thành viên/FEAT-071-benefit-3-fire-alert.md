# FEAT-071 — Khối Nhỏ Quyền Lợi 3: Gặp Sự Cố Cháy Nổ Báo Tự Động

## Tổng quan
- **Trang:** Trang chủ — nằm trong accordion của FEAT-068
- **Vị trí:** Phần tử thứ tư khi accordion mở rộng (hàng dưới-trái trên desktop)
- **Loại:** Sub-accordion
- **Business Spec:** `docs/spec-business/Thẻ thành viên/Feature 1.3 Khối nhỏ Quyền lợi 3 - Gặp sự cố cháy nổ báo tự động.md`

---

## Mô tả UI

### Trạng thái đóng
- **Icon:** ngọn lửa 🔥 (bên trái)
- **Văn bản chính:** `Gặp sự cố cháy nổ nhà tự động báo cho chủ nhà & cảnh sát phòng cháy chữa cháy`
- **Dấu `+`** bên phải

### Trạng thái mở rộng
Nội dung chi tiết đúng nguyên văn:

> *"Cảm biến nhiệt độ và khói thông minh phát hiện bất thường chỉ trong 3 giây. Bạn nhận thông báo khẩn cấp ngay trên điện thoại. Đồng thời hệ thống tự động báo cho đội phòng cháy chữa cháy gần nhất với đầy đủ thông tin vị trí. Giúp bạn và gia đình có thời gian thoát hiểm an toàn, giảm thiểu tối đa thiệt hại tài sản và rủi ro tính mạng. An tâm hơn bao giờ hết khi có hệ thống bảo vệ chủ động 24/7!"*

- Dấu `+` → `–`

---

## Behavior

| Hành động | Kết quả |
|---|---|
| Nhấn bất kỳ đâu trên khối (đang đóng) | Mở rộng |
| Nhấn `–` hoặc toàn khối (đang mở) | Thu gọn |
| Mở nhiều khối cùng lúc | Mỗi khối độc lập |
| JS bị tắt | Hiển thị toàn bộ nội dung ngay từ đầu |

---

## Business Rules
- Nội dung nhấn mạnh: phát hiện nhanh (3 giây), thông báo realtime, hỗ trợ PCCC, an tâm, bảo vệ gia đình
- Định dạng nhất quán với FEAT-069, FEAT-070, FEAT-072

---

## Acceptance Criteria

### AC-01: Trạng thái đóng đúng
- Tiêu đề: "Gặp sự cố cháy nổ nhà tự động báo cho chủ nhà & cảnh sát phòng cháy chữa cháy"
- Icon ngọn lửa bên trái, dấu `+` bên phải

### AC-02: Mở rộng hiển thị nội dung thuyết phục
- Nội dung đúng nguyên văn, `+` → `–`

### AC-03: Thu gọn khi nhấn lần hai — đóng lại, `–` → `+`

### AC-04: Responsive mobile — full width, dễ chạm

### AC-05: JS bị tắt — hiển thị toàn bộ nội dung ngay từ đầu
