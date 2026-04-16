# FEAT-072 — Khối Nhỏ Quyền Lợi 4: Bảo Hiểm Rủi Ro Trộm Cướp & Cháy Nổ

## Tổng quan
- **Trang:** Trang chủ — nằm trong accordion của FEAT-068
- **Vị trí:** Phần tử thứ năm khi accordion mở rộng (hàng dưới-phải trên desktop)
- **Loại:** Sub-accordion
- **Business Spec:** `docs/spec-business/Thẻ thành viên/Feature 1.4 Khối nhỏ Quyền lợi 4 - Bảo hiểm rủi ro trộm cướp & cháy nổ.md`

---

## Mô tả UI

### Trạng thái đóng
- **Icon:** khiên bảo vệ / ô dù bảo hiểm (bên trái)
- **Văn bản chính:** `Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở`
- **Dấu `+`** bên phải

### Trạng thái mở rộng
Nội dung chi tiết đúng nguyên văn:

> *"Gói Home Care đã bao gồm bảo hiểm toàn diện cho mọi rủi ro trộm cướp và cháy nổ, với mức bồi thường lên đến hàng trăm triệu đồng. Bạn không phải lo lắng về chi phí sửa chữa, thay thế tài sản hay mất mát lớn. Đây là sự bảo vệ tài chính thực sự, giúp bạn yên tâm tận hưởng cuộc sống mà không sợ hãi những rủi ro bất ngờ. Chỉ với mức phí hợp lý, bạn đã có lớp bảo vệ kép: công nghệ + bảo hiểm!"*

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
- Nội dung nhấn mạnh: bảo hiểm toàn diện, bồi thường cao, bảo vệ tài chính, yên tâm
- Định dạng nhất quán với FEAT-069, FEAT-070, FEAT-071

---

## Acceptance Criteria

### AC-01: Trạng thái đóng đúng
- Tiêu đề: "Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở"
- Icon bên trái, dấu `+` bên phải

### AC-02: Mở rộng hiển thị nội dung thuyết phục
- Nội dung đúng nguyên văn, `+` → `–`

### AC-03: Thu gọn khi nhấn lần hai — đóng lại, `–` → `+`

### AC-04: Responsive mobile — full width, dễ chạm

### AC-05: JS bị tắt — hiển thị toàn bộ nội dung ngay từ đầu
