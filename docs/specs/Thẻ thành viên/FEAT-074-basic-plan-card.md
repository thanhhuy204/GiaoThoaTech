# FEAT-074 — Gói Cơ Bản Home Care (Free) — Thẻ Thành Viên

## Tổng quan
- **Trang:** Dashboard / Account page (`/account`)
- **Vị trí:** Tab/mục "Thẻ thành viên" trong sidebar trái của trang Account
- **Loại:** Plan card + Modal kích hoạt
- **Business Spec:** `docs/spec-business/Thẻ thành viên/Feature 2 Khối Gói cơ bản an ninh Home Care.md`

---

## Mô tả UI

### Danh sách gói (Thẻ thành viên section)
Hiển thị 2 gói xếp theo thứ tự dọc:
1. **Gói Cơ Bản (Free)** — đầu tiên (FEAT-074)
2. **Gói Cao Cấp (có phí)** — bên dưới

Không hiển thị gói nào khác ngoài 2 gói này.

### Card Gói Cơ Bản

| Trường | Nội dung |
|---|---|
| Tiêu đề | **Gói Cơ Bản** |
| Mô tả | "Tài khoản miễn phí để sử dụng dịch vụ cơ bản" |
| Giá | **Free** (nổi bật) |
| Trạng thái chưa kích hoạt | Có thể nhấn để mở popup |
| Trạng thái đã kích hoạt | Badge "Đã kích hoạt" (màu xanh), nhấn vào không mở popup |

- Toàn bộ card có `cursor: pointer` (khi chưa kích hoạt), hiệu ứng hover nhẹ

### Modal Kích Hoạt (chỉ hiện khi chưa kích hoạt)

| Trường | Nội dung |
|---|---|
| Tiêu đề | **"Đăng ký Gói Cơ Bản – Miễn phí"** |
| Mô tả | "Bạn sẽ có tài khoản để sử dụng dịch vụ cơ bản mà không mất phí. Chỉ cần vài bước là xong!" |
| Nút chính | **"Đăng ký miễn phí"** (nổi bật, màu xanh dương) |
| Nút phụ | **"Hủy"** hoặc **"Đóng"** (màu xám) |
| Đóng modal | Nút X góc trên phải, hoặc click overlay nền, hoặc phím Esc |

### Sau khi kích hoạt thành công
- Modal đóng tự động
- Toast notification: **"Đã kích hoạt Gói Cơ Bản miễn phí!"**
- Badge trên card cập nhật thành **"Đã kích hoạt"**
- Người dùng có thể sử dụng ngay các tính năng cơ bản

---

## Behavior

| Hành động | Kết quả |
|---|---|
| Nhấn vào Gói Cơ Bản (chưa kích hoạt) | Mở modal đăng ký |
| Nhấn "Đăng ký miễn phí" | Kích hoạt gói, modal đóng, toast success, badge cập nhật |
| Nhấn "Hủy" / "Đóng" / click ngoài / Esc | Modal đóng, trạng thái không thay đổi |
| Nhấn vào Gói Cơ Bản (đã kích hoạt) | Không mở modal |
| Refresh trang sau khi kích hoạt | Trạng thái vẫn là "Đã kích hoạt" |
| Mạng chậm | Danh sách 2 gói hiển thị trước, popup và xử lý load sau |

---

## Business Rules
- Gói Cơ Bản hoàn toàn **miễn phí**, không thu phí khi kích hoạt
- Chỉ hiển thị **đúng 2 gói** trong phần "Thẻ thành viên"
- Sau khi kích hoạt: hiển thị "Đã kích hoạt", **không cho mở popup kích hoạt lại** (chống double request)
- Modal phải có nút đóng rõ ràng
- Responsive: danh sách gói và modal dễ đọc, dễ chạm trên mobile

---

## Edge Cases
- Đã kích hoạt → nhấn vào card → không có phản ứng (hoặc tooltip "Đã kích hoạt")
- Popup đóng đột ngột (click ngoài hoặc Esc) → quay lại danh sách, trạng thái không thay đổi
- Mạng chậm → hiển thị loading state trên nút "Đăng ký miễn phí" trong lúc chờ API
- Refresh sau khi kích hoạt → trạng thái "Đã kích hoạt" persist (từ server/localStorage)
- JS bị tắt → hiển thị danh sách gói, không mở modal (hoặc fallback link đến trang riêng)

---

## Acceptance Criteria

### AC-01: Phần "Thẻ thành viên" hiển thị đúng
- Mục "Thẻ thành viên" trong sidebar/tab có thể nhấn
- Nhấn vào → hiển thị danh sách 2 gói: Cơ Bản (Free) đầu, Cao Cấp dưới
- Không hiển thị gói nào khác

### AC-02: Card Gói Cơ Bản đúng
- Tiêu đề: "Gói Cơ Bản"
- Mô tả: "Tài khoản miễn phí để sử dụng dịch vụ cơ bản"
- Giá: "Free" (nổi bật)
- Toàn bộ card clickable (khi chưa kích hoạt)

### AC-03: Nhấn → mở modal đăng ký miễn phí
- Tiêu đề modal: "Đăng ký Gói Cơ Bản – Miễn phí"
- Mô tả modal đúng nguyên văn
- Nút "Đăng ký miễn phí" (xanh dương) và nút "Hủy"/"Đóng"

### AC-04: Kích hoạt thành công
- Modal đóng tự động
- Toast: "Đã kích hoạt Gói Cơ Bản miễn phí!"
- Badge "Đã kích hoạt" trên card
- Không lỗi xử lý hoặc chuyển hướng sai

### AC-05: Responsive mobile
- 2 gói xếp dọc full width
- Modal chiếm gần full màn hình, nút dễ chạm

### AC-06: Đã kích hoạt — nhấn vào card không mở modal

---

## Ghi chú kỹ thuật
- State: `isActivated` (từ API hoặc Redux store)
- Modal: dùng `components/ui/Modal` hoặc `<dialog>` native
- Toast: dùng toast library hoặc component `components/ui/Toast`
- API: có thể gọi `POST /membership/activate` với `{ plan: 'basic' }` (cần confirm với BE)
- Sau khi activate thành công: dispatch Redux action cập nhật trạng thái gói
