# FEAT-070 — Khối Nhỏ Quyền Lợi 2: Gặp Sự Cố Trộm Cướp Báo Công An

## Tổng quan
- **Trang:** Trang chủ — nằm trong accordion của FEAT-068
- **Vị trí:** Phần tử thứ hai khi accordion mở rộng (hàng trên-phải trên desktop)
- **Loại:** Sub-accordion
- **Business Spec:** `docs/spec-business/Thẻ thành viên/Feature 1.2 Khối nhỏ Quyền lợi 2 - Gặp sự cố trộm cướp báo công an.md`

---

## Mô tả UI

### Trạng thái đóng
- **Icon:** hình khiên (bên trái)
- **Văn bản chính:** `Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực nơi ở`
- **Dấu `+`** bên phải

### Trạng thái mở rộng
Nội dung chi tiết đúng nguyên văn:

> *"Khi phát hiện dấu hiệu bất thường như mở cửa trái phép, nhập sai mã nhiều lần hoặc tác động lên khóa, hệ thống sẽ kích hoạt cảnh báo ngay lập tức. Bạn nhận được thông báo tức thì trên điện thoại, giúp nắm rõ tình hình dù không có ở nhà. Nhờ đó, bạn có thể chủ động kiểm tra, liên hệ người thân hoặc báo cho bảo vệ khu vực khi cần thiết, xử lý kịp thời mọi tình huống. Giảm thiểu rủi ro mất mát và bảo vệ an toàn cho gia đình bạn một cách chủ động."*

- Dấu `+` → `–`

---

## Behavior

| Hành động | Kết quả |
|---|---|
| Nhấn bất kỳ đâu trên khối (đang đóng) | Mở rộng |
| Nhấn `–` hoặc toàn khối (đang mở) | Thu gọn |
| Mở nhiều khối cùng lúc | Mỗi khối độc lập, không ảnh hưởng nhau |
| JS bị tắt | Hiển thị toàn bộ nội dung ngay từ đầu |

---

## Business Rules
- Toàn bộ khối clickable (không chỉ dấu `+`)
- Nội dung nhấn mạnh: phát hiện bất thường, thông báo tức thì, hỗ trợ xử lý kịp thời, bảo vệ gia đình
- Định dạng nhất quán với FEAT-069, FEAT-071, FEAT-072

---

## Acceptance Criteria

### AC-01: Trạng thái đóng đúng
- Tiêu đề: "Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực nơi ở"
- Icon khiên bên trái, dấu `+` bên phải

### AC-02: Mở rộng hiển thị nội dung thuyết phục
- Nội dung chi tiết đúng nguyên văn, `+` → `–`

### AC-03: Thu gọn khi nhấn lần hai
- Đóng lại, `–` → `+`, không lỗi

### AC-04: Responsive mobile — full width, dễ chạm

### AC-05: JS bị tắt — hiển thị toàn bộ nội dung ngay từ đầu, không lỗi
