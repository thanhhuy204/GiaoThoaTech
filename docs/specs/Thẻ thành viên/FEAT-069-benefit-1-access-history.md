# FEAT-069 — Khối Nhỏ Quyền Lợi 1: Quản Lý Lịch Sử Ra Vào Nhà 24/7

## Tổng quan
- **Trang:** Trang chủ — nằm trong accordion của FEAT-068
- **Vị trí:** Phần tử đầu tiên khi accordion mở rộng (hàng trên-trái trên desktop)
- **Loại:** Sub-accordion (accordion con lồng trong accordion cha)
- **Business Spec:** `docs/spec-business/Thẻ thành viên/Feature 1.1 Khối nhỏ Quyền lợi 1 - Quản lý lịch sử ra vào nhà.md`

---

## Mô tả UI

### Trạng thái đóng (mặc định khi cha vừa mở)
- **Icon:** đồng hồ tròn màu cam (bên trái)
- **Văn bản chính:** `+ quản lý lịch sử ra vào nhà 24/7`
- **Dấu `+`** bên phải, rõ ràng, đủ kích thước để chạm ngón tay (≥ 44×44px touch target)
- Toàn bộ khối có `cursor: pointer`, hiệu ứng hover nhẹ

### Trạng thái mở rộng
- Khối mở rộng xuống dưới tại chỗ (animation mượt)
- Hiển thị nội dung chi tiết đúng nguyên văn:

> *"Lịch sử ra vào – Kiểm soát an ninh 24/7*
>
> *Theo dõi toàn bộ lịch sử ra vào nhà mọi lúc, mọi nơi ngay trên điện thoại của bạn.*
> *Biết chính xác ai đã vào nhà, vào lúc nào – dù bạn không có mặt.*
>
> *Phân biệt rõ ràng người thân và người lạ, giúp bạn luôn chủ động trong mọi tình huống.*
> *Không còn nỗi lo quên khóa cửa hay những nghi ngờ không đáng có.*
>
> *Nắm quyền kiểm soát an ninh ngôi nhà của bạn – 24/7, chỉ với một chạm."*

- Dấu `+` chuyển thành `–`

### Thu gọn
- Nhấn dấu `–` hoặc bất kỳ đâu trên khối → thu gọn, dấu `–` → `+`

---

## Behavior

| Hành động | Kết quả |
|---|---|
| Nhấn bất kỳ đâu trên khối (đang đóng) | Mở rộng, `+` → `–` |
| Nhấn `–` hoặc toàn khối (đang mở) | Thu gọn, `–` → `+` |
| Nhấn nhanh liên tiếp | Toggle mượt mà, không lỗi |
| Icon không tải | Văn bản vẫn đầy đủ |
| JS bị tắt | Hiển thị toàn bộ nội dung chi tiết ngay từ đầu |

---

## Business Rules
- Toàn bộ khối nhỏ (không chỉ dấu `+`) phải clickable
- Dấu `+` bên phải khi đóng → chuyển `–` khi mở
- Nội dung chi tiết giữ nguyên văn bản thuyết phục, tập trung lợi ích cảm xúc
- Mobile: touch target dấu `+`/`–` ≥ 44×44px
- Văn bản không bị cắt, line-height hợp lý

---

## Acceptance Criteria

### AC-01: Trạng thái đóng đúng
- Icon đồng hồ màu cam bên trái
- Dòng chữ: `+ quản lý lịch sử ra vào nhà 24/7`
- Dấu `+` rõ bên phải, chưa mở rộng

### AC-02: Mở rộng hiển thị nội dung thuyết phục
- Khối mở xuống dưới, dấu `+` → `–`
- Nội dung chi tiết đúng nguyên văn, dễ đọc, không cắt

### AC-03: Thu gọn khi nhấn lần hai
- Khối đóng lại, nội dung ẩn, `–` → `+`, không thừa

### AC-04: Responsive mobile
- Full width, nội dung wrap tự nhiên, vùng chạm đủ lớn
