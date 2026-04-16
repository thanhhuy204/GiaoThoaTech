# Feature: Nút "Load more" / "Read all success stories"

## 1. Business Goal

Khuyến khích visitor tiếp tục duyệt các case studies sau khi xem lượt đầu tiên (12 cards), giúp tăng thời gian ở lại trang và khả năng tìm thấy case study phù hợp với ngành của họ.

## 2. Actors

- Visitor (khách hàng tiềm năng) — đã xem 12 case đầu và muốn xem thêm
- Decision maker (B2B) — cần tìm thêm case study cùng ngành

## 3. Preconditions

- Người dùng đang truy cập trang /case-studies
- Danh sách case studies (FEAT-022) đang hiển thị
- Còn case studies chưa được render (tổng số case > số card đang hiển thị)
- Nút nằm ngay bên dưới grid case studies (FEAT-022)

## 4. Main Flow

1. Trang load với 12 card đầu → nút "Load more" hiển thị bên dưới grid (nếu tổng > 12)
2. Visitor click nút → loading spinner xuất hiện trong nút, nút disabled
3. 12 case tiếp theo append vào grid với fade-in animation
4. Spinner biến mất, nút trở về trạng thái bình thường
5. Nếu đã load hết tất cả case → nút ẩn hoàn toàn
6. Khi filter tag thay đổi (FEAT-021): nút reset về trạng thái ban đầu với count mới

## 5. Business Rules

- Nút chỉ hiển thị khi: số card đang hiển thị < tổng số case sau filter
- Mỗi lần click: load thêm PAGE_SIZE = 12 cases (đồng bộ với FEAT-022)
- Khi filter tag thay đổi: reset displayedCount về PAGE_SIZE, nút re-evaluate visibility
- Không double-load: disable nút trong khi đang loading
- Label nút: "Read all success stories" (lần đầu) hoặc "Load more" (lần sau)
- Navigate kèm ref param nếu có (?ref=case-studies-loadmore)
- Nút style outlined (không phải màu cam solid) — tạo contrast phù hợp với context list

## 6. Edge Cases

- Tổng số case ≤ 12 → không hiển thị nút ngay từ đầu
- Sau filter → ≤ 12 kết quả → nút ẩn tức thì
- Click nhanh 2 lần → lần click thứ 2 bị block (nút disabled khi loading)
- Đã load hết → nút ẩn, tùy chọn hiển thị text "You've seen all N success stories"
- Mobile → nút căn giữa, dễ bấm (min-width 200px hoặc full-width)
- Mạng chậm → nút disabled + spinner trong suốt thời gian load

## 7. Security Requirements

- Nút không submit form — không có rủi ro CSRF
- Pagination state là client-side slice — không call API mới
- Không dùng inline style

## 8. Acceptance Criteria

### AC-01: Hiển thị nút đúng điều kiện

Given
- Visitor truy cập trang /case-studies

When
- Tổng số case > 12

Then
- Nút "Read all success stories" hiển thị bên dưới grid

When
- Tổng số case ≤ 12

Then
- Nút không hiển thị

### AC-02: Load thêm case

Given
- Nút "Load more" đang hiển thị

When
- Visitor click nút

Then
- Spinner xuất hiện, nút disabled
- 12 card mới append vào grid với fade-in animation
- Spinner biến mất, nút re-enable

### AC-03: Ẩn khi đã load hết

Given
- Tất cả case đã được hiển thị

When
- Load more hoàn thành

Then
- Nút ẩn hoàn toàn (hoặc hiện text "You've seen all N success stories")

### AC-04: Reset khi filter thay đổi

Given
- Filter tag thay đổi (FEAT-021)

When
- Tag mới được chọn

Then
- Nút re-evaluate: hiện nếu filtered count > 12, ẩn nếu ≤ 12

### AC-05: Ngăn double-click

Given
- Nút đang trong trạng thái loading

When
- Visitor click lần 2

Then
- Click bị block — không load thêm lần nữa
