# FEAT-073 — Khối Giá Gói Dịch Vụ Home Care

## Tổng quan
- **Trang:** Trang chủ — nằm trong accordion của FEAT-068
- **Vị trí:** Vị trí thứ ba (giữa danh sách), full width, nổi bật hơn các khối quyền lợi
- **Loại:** Sub-accordion (hiển thị giá, không có CTA — nút "Đăng ký ngay" nằm ở FEAT-068)
- **Business Spec:** `docs/spec-business/Thẻ thành viên/Feature 1.5 Khối nhỏ 5 - Giá gói dịch vụ Home Care.md`

---

## Mô tả UI

### Trạng thái đóng (mặc định)
- **Icon:** biểu tượng tiền tệ (nổi bật)
- **Văn bản chính:** `Giá gói dịch vụ an ninh Home Care 1,9 triệu đồng/năm hoặc 200.000 đ/tháng`
- **Phong cách nổi bật** so với các khối quyền lợi: background khác biệt, border nổi bật, font lớn hơn
- Dấu `+` bên phải, toàn bộ card có `cursor: pointer`, hiệu ứng hover nhẹ

### Trạng thái mở rộng
Nội dung chi tiết đúng nguyên văn:

> *"Chỉ với 200.000đ mỗi tháng, bạn đã sở hữu toàn bộ quyền lợi cao cấp:*
> *+ Giám sát 24/7*
> *+ Báo động trộm cướp & cháy nổ tự động*
> *+ Bảo hiểm rủi ro lên đến hàng trăm triệu đồng*
>
> *Tặng ngay khóa điện tử và camera hiện đại nếu thanh toán năm. Đây là mức giá cực kỳ cạnh tranh so với lắp đặt riêng lẻ (có thể tốn gấp 2-3 lần).*
>
> *Tiết kiệm chi phí nhưng được bảo vệ toàn diện – lựa chọn thông minh nhất hiện nay!"*

- Dấu `+` → `–`
- **Không có nút CTA** — nút "Đăng ký ngay" nằm ở cuối toàn bộ khối cha (FEAT-068)

---

## Behavior

| Hành động | Kết quả |
|---|---|
| Nhấn bất kỳ đâu trên card giá (đang đóng) | Mở rộng, `+` → `–` |
| Nhấn `–` hoặc toàn card (đang mở) | Thu gọn, `–` → `+` |
| Nhấn nhanh liên tiếp | Toggle mượt mà, không lỗi |
| JS bị tắt | Hiển thị toàn bộ nội dung chi tiết ngay từ đầu, không có dấu +/– |
| Mạng chậm | Trạng thái đóng hiển thị trước, nội dung chi tiết load sau |

---

## Business Rules
- Toàn bộ card clickable để toggle mở/đóng
- Dấu `+` bên phải khi đóng → chuyển `–` khi mở
- Khối giá nổi bật hơn các khối quyền lợi (background khác, border nổi bật, font lớn hơn, vị trí giữa)
- Văn bản chính xác 100% (giá, đơn vị tiền tệ, từ ngữ, dấu câu)
- Không có nút CTA trong khối này — CTA thuộc về FEAT-068

---

## Edge Cases
- Nhấn ngoài vùng text/icon (khoảng trống card) → vẫn mở rộng bình thường
- JS bị tắt → hiển thị toàn bộ nội dung chi tiết ngay từ đầu, không có dấu +/–
- Mạng chậm → trạng thái đóng (icon + text + dấu +) hiển thị trước, nội dung load sau

---

## Acceptance Criteria

### AC-01: Trạng thái đóng nổi bật và đúng
- Văn bản: "Giá gói dịch vụ an ninh Home Care 1,9 triệu đồng/năm hoặc 200.000 đ/tháng"
- Khối nổi bật hơn các khối quyền lợi (background, border, font)
- Dấu `+` bên phải rõ ràng

### AC-02: Mở rộng hiển thị nội dung chi tiết
- Nội dung chi tiết đúng nguyên văn, `+` → `–`
- Nội dung wrap tốt, dễ đọc, không chồng lấn
- Không có nút CTA trong khối này

### AC-04: Thu gọn khi nhấn lần hai
- Đóng lại, nội dung ẩn, `–` → `+`
- Không lỗi hiển thị thừa hoặc layout vỡ

### AC-05: Responsive mobile
- Khối chiếm full width, nội dung wrap tự nhiên
- Dấu `+`/`–` và vùng nhấn đủ lớn để chạm ngón tay

### AC-06: JS bị tắt
- Hiển thị toàn bộ nội dung chi tiết ngay từ đầu, không có trạng thái đóng

---

## Ghi chú kỹ thuật
- Dùng React state: `useState(false)` cho `isOpen`, toggle bằng onClick
- Nút CTA **không** render trong component này — xem FEAT-068 để biết vị trí CTA
