# FEAT-068 — Khối Gói Dịch Vụ An Ninh Home Care (Teaser + Accordion)

## Tổng quan
- **Trang:** Trang chủ (public landing page)
- **Vị trí:** Ngay dưới hero banner
- **Loại:** Accordion block (teaser → mở rộng chi tiết + CTA)
- **Business Spec:** `docs/spec-business/Thẻ thành viên/Feature 1 Khối Gói dịch vụ an ninh Home Care.md`

---

## Mô tả UI

### Trạng thái đóng (Teaser)
- Hiển thị một card/row nổi bật với:
  - Hình ảnh minh họa (khóa điện tử + camera + ngôi nhà an toàn)
  - Tiêu đề chính: **"Mua gói dịch vụ an ninh Home Care hàng năm được tặng khóa điện tử & camera"**
  - Dòng phụ: **"Quyền lợi dịch vụ an ninh Home Care gồm:"**
  - Icon mở rộng (mũi tên xuống ↓ hoặc dấu `+`) ở góc phải
  - (Tùy chọn) nút nhỏ "Xem chi tiết"
- Toàn bộ vùng card có `cursor: pointer` và hiệu ứng hover nhẹ
- Toàn bộ vùng đều clickable (tiêu đề, ảnh, dòng phụ, icon, nút)

### Trạng thái mở rộng
Khi người dùng nhấn bất kỳ đâu trên teaser → accordion mở rộng tại chỗ (animation mượt), hiển thị **5 phần con** theo thứ tự, rồi **nút CTA ở cuối**:

> **Lưu ý thứ tự layout:** Business Rule quy định layout 2 cột: "quyền lợi 1 & 2 trên, quyền lợi 3 & 4 dưới, **giá nằm giữa**". UI Spec theo Business Rule (Giá ở giữa, vị trí 3).

| Thứ tự | Component | FEAT |
|---|---|---|
| 1 | Quyền lợi 1 — Lịch sử ra vào nhà 24/7 | FEAT-069 |
| 2 | Quyền lợi 2 — Trộm cướp báo công an | FEAT-070 |
| 3 | Giá gói dịch vụ (nổi bật, full width, vị trí giữa 2 hàng) | FEAT-073 |
| 4 | Quyền lợi 3 — Cháy nổ báo tự động | FEAT-071 |
| 5 | Quyền lợi 4 — Bảo hiểm rủi ro | FEAT-072 |
| — | **Nút CTA "Đăng ký ngay"** (nổi bật, full width, dưới cùng) | — |

> **Layout desktop:** Quyền lợi 1 & 2 hàng trên (2 cột), khối giá giữa (full width nổi bật), Quyền lợi 3 & 4 hàng dưới (2 cột), nút CTA full width dưới cùng.
> **Layout mobile:** Xếp dọc 1 cột, full width.

### Nút CTA "Đăng ký ngay"
- Hiển thị **dưới toàn bộ 5 phần nội dung** khi accordion đang mở
- Nổi bật: màu sắc tương phản, bo góc, kích thước dễ nhấn
- Khi nhấn → hiển thị **popup chọn gói** với 2 card riêng biệt:

| Card | Gói năm (highlight) | Gói tháng |
|---|---|---|
| Giá | **1.900.000 VNĐ/năm** | 200.000 VNĐ/tháng |
| Badge | "Tiết kiệm nhất – Tặng khóa điện tử & camera" | "Linh hoạt, không cam kết dài hạn" |
| CTA | Nút "Chọn gói này" | Nút "Chọn gói này" |

- Có nút "Quay lại" để đóng popup, không mất trạng thái khối đã mở
- Nhấn "Chọn gói này" → chuyển đến trang thanh toán

### Thu gọn
- Nhấn lại vùng tiêu đề hoặc icon mũi tên lên ↑ → accordion đóng lại (animation mượt), nội dung + CTA ẩn hoàn toàn

---

## Behavior

| Hành động | Kết quả |
|---|---|
| Nhấn bất kỳ đâu trên teaser (đang đóng) | Mở rộng accordion, icon ↓ → ↑ |
| Nhấn tiêu đề / icon (đang mở) | Thu gọn accordion, nội dung + CTA ẩn, icon ↑ → ↓ |
| Nhấn nhanh liên tiếp | Toggle mượt mà, không gây lỗi hiển thị |
| Nhấn "Đăng ký ngay" | Mở popup 2 gói |
| Nhấn "Quay lại" trong popup | Đóng popup, khối vẫn mở |
| Nhấn "Chọn gói này" | Chuyển đến trang thanh toán |
| Popup đóng đột ngột (click ngoài / Esc) | Quay lại khối đã mở, không mất trạng thái |
| Quay lại từ trang thanh toán | Khối ở trạng thái đóng |
| JS bị tắt | Hiển thị toàn bộ 5 phần + nút CTA ngay từ đầu, không có toggle |
| Mạng chậm | Teaser hiển thị trước, nội dung chi tiết + CTA load sau |

---

## Business Rules
- Toàn bộ vùng teaser phải clickable để mở rộng
- Thứ tự hiển thị khi mở: quyền lợi 1 & 2 trên → giá giữa (nổi bật nhất) → quyền lợi 3 & 4 dưới → nút CTA cuối cùng
- Nút "Đăng ký ngay" phải hiển thị **dưới toàn bộ nội dung chi tiết**, nổi bật (màu tương phản, bo góc, kích thước dễ nhấn)
- Khi nhấn CTA phải luôn hiển thị **đúng 2 gói** (không mặc định chọn gói nào)
- Gói năm phải được highlight ưu đãi rõ ràng
- Popup chọn gói phải có nút đóng rõ ràng
- Văn bản phải chính xác 100% (tiêu đề, dòng phụ)
- Desktop: 2 cột cho quyền lợi; Mobile: 1 cột xếp dọc
- Nội dung không bị cắt cụt, khoảng cách hợp lý

---

## Edge Cases
- Icon không tải → hiển thị đầy đủ văn bản, không ảnh hưởng nội dung
- Nội dung dài hơn dự kiến → khối mở rộng hỗ trợ scroll, không vỡ layout
- JS tắt → fallback: hiển thị toàn bộ nội dung chi tiết + nút CTA ngay từ đầu
- Mạng chậm → teaser hiển thị trước, chi tiết và nút CTA load sau
- Popup bị đóng đột ngột (Esc / click ngoài) → quay lại khối đã mở, không mất dữ liệu
- Người dùng quay lại từ trang thanh toán → khối ở trạng thái đóng

---

## Acceptance Criteria

### AC-01: Teaser hiển thị đúng và clickable
- Tiêu đề: "Mua gói dịch vụ an ninh Home Care hàng năm được tặng khóa điện tử & camera"
- Dòng phụ: "Quyền lợi dịch vụ an ninh Home Care gồm:"
- Có hình ảnh minh họa và icon mở rộng
- Toàn bộ vùng có thể nhấn

### AC-02: Nhấn bất kỳ phần nào → mở rộng đúng 5 phần + nút CTA
- Khối mở rộng tại chỗ với animation mượt
- Hiển thị đúng 5 phần theo thứ tự, mỗi phần có icon minh họa và văn bản đúng:
  - "Quản lý lịch sử ra vào nhà 24/7" (icon đồng hồ)
  - "Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực nơi ở" (icon còi báo động)
  - "Giá gói dịch vụ an ninh Home Care 1,9 triệu đồng/năm hoặc 200.000 đ/tháng" (nổi bật, full width)
  - "Gặp sự cố cháy nổ nhà tự động báo cho chủ nhà & cảnh sát phòng cháy chữa cháy" (icon lửa)
  - "Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở" (icon khiên)
- Dưới cùng: nút "Đăng ký ngay" hiển thị nổi bật, dễ nhận biết
- Nội dung chính xác từ ngữ và dấu câu

### AC-03: Nhấn "Đăng ký ngay" → popup 2 gói riêng biệt
- Hiển thị popup với 2 card:
  - Gói năm: 1.900.000 VNĐ/năm (highlight ưu đãi tặng khóa & camera)
  - Gói tháng: 200.000 VNĐ/tháng (linh hoạt)
- Mỗi card có giá rõ ràng, mô tả ưu đãi, nút "Chọn gói này"
- Có nút "Quay lại" để đóng mà không mất trạng thái khối mở rộng

### AC-04: Thu gọn khi nhấn lần hai
- Nhấn vùng tiêu đề hoặc icon mũi tên → accordion đóng
- Nội dung chi tiết và nút CTA ẩn hoàn toàn, không thừa

### AC-05: Responsive mobile
- Full width, 5 phần xếp dọc 1 cột, chữ wrap tự nhiên, dễ chạm
- Nút CTA dễ chạm bằng ngón tay
- Popup chọn 2 gói hiển thị tốt, dễ thao tác trên mobile

### AC-06: JS bị tắt
- Khối Home Care hiển thị toàn bộ nội dung chi tiết + nút CTA ngay từ đầu (không có toggle, không dấu +/–)
- Không có khoảng trắng thừa hoặc lỗi giao diện

---

## Ghi chú kỹ thuật
- Dùng React state: `useState(false)` cho `isOpen`, toggle bằng onClick trên wrapper
- Animation: `max-height` transition hoặc `framer-motion`
- Nút CTA điều kiện: `{isOpen && <button>Đăng ký ngay</button>}` — render dưới cùng của expanded panel
- Popup chọn gói: dùng `<dialog>` HTML native hoặc Modal component trong `components/ui/`
- Highlight gói năm: thêm prop `featured={true}` hoặc class CSS `plan-card--featured`
