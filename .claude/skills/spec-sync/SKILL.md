# Kỹ năng: Spec Sync — Kiểm tra & Đồng bộ Business Spec ↔ UI Spec

## Nguyên tắc cốt lõi

> **Business Spec là nguồn sự thật (source of truth).** Nếu có sai lệch, luôn cập nhật UI Spec cho khớp Business Spec — không làm ngược lại.

---

## Quy trình bắt buộc

### Bước 1 — Đọc bản đồ mapping
Đọc `docs/SPEC-MAPPING.md` để lấy danh sách toàn bộ cặp (business spec → UI spec).

Nếu user chỉ định phạm vi (ví dụ: "chỉ kiểm tra Trang Technology"), chỉ xử lý các cặp trong phạm vi đó.
Nếu không chỉ định → kiểm tra toàn bộ.

---

### Bước 2 — So sánh từng cặp

Với mỗi cặp `(business_file, ui_file)`:

1. Đọc cả hai file
2. So sánh theo các tiêu chí sau:

| Tiêu chí | Mô tả |
|---|---|
| **Business Goal** | UI spec có phản ánh đúng mục tiêu trong Business spec không? |
| **Actors** | Các actor có khớp không? |
| **Main Flow** | UI flow có đủ các bước so với Business spec không? |
| **Business Rules** | Các rule trong Business spec có được thể hiện trong UI spec không? |
| **Edge Cases** | Edge case quan trọng trong Business spec có trong UI spec không? |
| **Acceptance Criteria** | AC trong UI spec có tương ứng với AC trong Business spec không? |

---

### Bước 3 — Phân loại lệch

| Mức độ | Ký hiệu | Định nghĩa |
|---|---|---|
| Thiếu hoàn toàn | 🔴 MISSING | UI spec thiếu một khái niệm/rule/AC quan trọng có trong Business spec |
| Sai / mâu thuẫn | 🟠 CONFLICT | UI spec ghi sai, mâu thuẫn với Business spec |
| Mô tả chưa đủ | 🟡 INCOMPLETE | Có đề cập nhưng quá sơ sài so với Business spec |
| Đồng bộ tốt | ✅ OK | Hai file nhất quán |

---

### Bước 4 — Cập nhật UI Spec

Với mỗi lỗi 🔴 / 🟠 / 🟡:
- **Cập nhật trực tiếp file UI spec** để bổ sung hoặc sửa nội dung
- Chỉ thêm/sửa phần bị lệch — không rewrite toàn bộ file
- Giữ nguyên cấu trúc và ngôn ngữ hiện có của UI spec
- Không xóa thông tin UI/UX đặc thù đang có trong UI spec (dù Business spec không nhắc đến)

---

### Bước 5 — Báo cáo kết quả

Sau khi xử lý xong, xuất báo cáo theo cấu trúc:

```
## Kết quả Spec Sync

### Tổng quan
- Tổng cặp kiểm tra: X
- ✅ OK: X
- 🔴 MISSING (đã sửa): X
- 🟠 CONFLICT (đã sửa): X
- 🟡 INCOMPLETE (đã sửa): X

---

### Chi tiết thay đổi

#### [Tên trang] — [tên UI spec file]
**Business Spec:** `docs/spec-business/.../...md`

| # | Mức độ | Vấn đề | Đã cập nhật |
|---|---|---|---|
| 1 | 🔴 MISSING | Thiếu Business Rule: "..." | ✅ Đã thêm vào UI spec mục 5 |
| 2 | 🟠 CONFLICT | AC-02 mô tả sai flow so với Business spec | ✅ Đã sửa |

---

### Các cặp còn thiếu UI Spec
(liệt kê các Business spec chưa có UI spec tương ứng)
```

---

## Trường hợp đặc biệt

- **UI spec chưa tồn tại** (ví dụ Trang Access Control, Short-term Rentals): Thông báo cho user, không tự tạo file — chờ user xác nhận trước.
- **Business spec chưa tồn tại** nhưng UI spec có: Đánh dấu `⚠️ Business spec chưa có` trong báo cáo, không xóa UI spec.
- **Mapping chưa có trong SPEC-MAPPING.md**: Báo cáo để user cập nhật mapping.

---

## Câu lệnh kích hoạt

`spec-sync`, `sync-spec`, `check-spec`, `kiểm tra spec`, `đồng bộ spec`

Ví dụ:
- `/spec-sync` — kiểm tra toàn bộ
- `/spec-sync Trang Technology` — chỉ kiểm tra một trang
- `/spec-sync Layout` — chỉ kiểm tra Layout
