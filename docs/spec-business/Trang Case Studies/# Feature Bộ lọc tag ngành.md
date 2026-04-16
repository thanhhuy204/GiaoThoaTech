# Feature: Bộ lọc tag ngành

## 1. Business Goal

Cho phép visitor lọc case studies theo ngành nghề liên quan đến họ, giúp họ tìm ngay ví dụ phù hợp với nhu cầu kinh doanh. Giảm cognitive load khi có 40+ case studies — visitor không cần đọc toàn bộ, chỉ xem những case đúng ngành.

## 2. Actors

- Visitor (khách hàng tiềm năng) — muốn xem case studies trong ngành của mình
- Decision maker (B2B) — cần tìm nhanh case study để thuyết phục nội bộ

## 3. Preconditions

- Người dùng đang truy cập trang /case-studies
- Filter nằm ngay dưới Hero section (FEAT-020), trên danh sách case (FEAT-022)
- Danh sách case studies đã được render và lắng nghe state của filter này

## 4. Main Flow

1. Trang load → hiển thị tag "All" đang active + các tag ngành
2. Mặc định tag "All" active → toàn bộ case studies hiển thị
3. Visitor click tag ngành (ví dụ "Hospitality") → tag đó active, "All" deactivate
4. Danh sách case studies cập nhật realtime — chỉ hiển thị case có tag match
5. Visitor click tag khác → filter thay đổi, danh sách cập nhật lại
6. Visitor click "All" → reset filter, hiển thị toàn bộ case
7. Visitor click tag đang active → deactivate (về "All")

## 5. Business Rules

- Tag "All" luôn là tag đầu tiên, không thể xóa hoặc ẩn
- Chỉ có thể active 1 tag tại một thời điểm (single-select)
- Click tag đang active → trở về "All" (toggle off)
- Lọc realtime — không reload trang, không gọi API mới
- Tag active: background #E8614A, text trắng
- Tag default: background #f9f9f9, border rgba(0,0,0,0.12)
- Tag hover non-active: background cam nhạt rgba(232,97,74,0.08), text #E8614A
- 6 tag ngành theo thứ tự: All, Hospitality, Single Family Rental, Sharing Economy, Multi-Family Residential, Short-Term Rental, Commercial Real Estate
- JavaScript tắt → toàn bộ case hiển thị, tags vẫn render nhưng không có chức năng

## 6. Edge Cases

- Không có case match tag → tag vẫn clickable, list chuyển sang empty state ("No case studies found")
- JavaScript tắt → hiển thị toàn bộ case studies, tags render nhưng không có click handler
- Nhiều tag không vừa 1 dòng (mobile) → flex-wrap tự động xuống dòng
- URL có ?industry=hospitality khi load → pre-select tag "Hospitality", list filter ngay

## 7. Security Requirements

- Tag values là hardcoded enum — không từ user input, không rủi ro injection
- Nếu filter state đồng bộ qua URL param: validate param value trước khi dùng (chỉ accept giá trị trong whitelist)
- Không có form submit

## 8. Acceptance Criteria

### AC-01: Hiển thị các tag ngành

Given
- Visitor truy cập trang /case-studies

When
- Trang được tải

Then
- Hệ thống hiển thị tag "All" + đủ 6 tag ngành theo đúng thứ tự
- Tag "All" active mặc định khi trang load

### AC-02: Lọc case studies theo tag

Given
- Danh sách case studies đang hiển thị

When
- Visitor click một tag ngành

Then
- Tag đó chuyển active (background cam, text trắng)
- "All" deactivate
- Hệ thống chỉ hiển thị các case studies thuộc tag đã chọn (realtime, không reload)

### AC-03: Toggle off tag đang active

Given
- Một tag ngành đang active

When
- Visitor click lại tag đó

Then
- Tag deactivate, trở về "All"
- Toàn bộ case studies hiển thị lại

### AC-04: Reset bộ lọc

Given
- Visitor đang lọc theo một tag ngành

When
- Visitor click "All"

Then
- Tất cả tag ngành deactivate, "All" active
- Toàn bộ case studies hiển thị lại

### AC-05: Không có case match

Given
- Một tag ngành không có case study nào

When
- Visitor click tag đó

Then
- Tag vẫn clickable
- Danh sách chuyển sang empty state: "No case studies found" + nút "View all"

### AC-06: Responsive

Given
- Danh sách tag đang hiển thị

When
- Visitor xem trên mobile

Then
- Tags flex-wrap tự động xuống dòng
- Không bị overflow ngang
