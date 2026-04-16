# Feature: Danh sách case studies (logo, quote, tag)

## 1. Business Goal

Hiển thị toàn bộ câu chuyện thành công của khách hàng igloo dưới dạng lưới có thể duyệt và lọc. Mỗi case study là bằng chứng thực tế về giá trị sản phẩm — giúp xây dựng lòng tin, trả lời nghi ngờ của khách hàng tiềm năng, và thúc đẩy họ liên hệ demo.

## 2. Actors

- Visitor (khách hàng tiềm năng) — tìm kiếm case study ngành của mình để tham khảo
- Decision maker (B2B) — cần proof-of-concept từ công ty cùng ngành

## 3. Preconditions

- Người dùng đang truy cập trang /case-studies
- Filter tag (FEAT-021) đã được render phía trên
- State activeTag từ FEAT-021 được truyền xuống hoặc shared qua parent component
- Dữ liệu case studies đã sẵn sàng (static data hoặc API)

## 4. Main Flow

1. Trang load → hiển thị skeleton loading cards (3×3 grid)
2. Data load xong → skeleton replace bằng case study cards thực
3. Mặc định hiển thị 12 card đầu tiên
4. Mỗi card hiển thị: logo khách hàng, quote ngắn, tag ngành, sản phẩm liên quan, "Made possible with"
5. Filter tag active (từ FEAT-021) → list re-render chỉ hiển thị case match tag, pagination reset về trang 1
6. Scroll xuống / click "Load more" → hiển thị thêm 12 case tiếp theo
7. Không có case match tag → hiển thị empty state: "No case studies found" + nút "View all"

## 5. Business Rules

- Mặc định hiển thị 12 card mỗi lần load (PAGE_SIZE = 12)
- Load more thêm PAGE_SIZE cards mỗi lần
- Khi filter thay đổi: reset về trang 1 (hiển thị lại từ đầu filtered list)
- Mỗi card phải có đủ: logo khách hàng, quote (line-clamp-2), tag ngành, tên sản phẩm
- Tag ngành trên card phải khớp với tag trong filter (FEAT-021) để lọc đúng
- Logo khách hàng phải có alt text
- Quote tối đa 2 dòng (line-clamp-2)
- Không có link chi tiết case study trong MVP
- Grid responsive: 3 cột desktop (≥1024px), 2 cột tablet (640–1023px), 1 cột mobile (<640px)

## 6. Edge Cases

- Logo khách hàng không load → hiển thị tên công ty dạng text thay thế
- Quote quá dài → line-clamp-2, không cần expand trong MVP
- Filter → 0 kết quả → empty state với nút "View all"
- Filter → ít hơn 12 kết quả → hiển thị đủ số card, ẩn nút "Load more"
- Tổng số case ít hơn 12 → không hiển thị nút "Load more"
- Data fetch lỗi → error state: "Unable to load case studies. Please try again."
- Mobile (<640px) → grid 1 cột, card full-width
- JavaScript tắt → danh sách tĩnh, hiển thị toàn bộ

## 7. Security Requirements

- Logo URL từ /public hoặc whitelist CDN domain trong next.config.ts
- Nếu data từ API: sanitize quote text trước khi render (escape HTML)
- Không render raw HTML từ API response

## 8. Acceptance Criteria

### AC-01: Hiển thị danh sách case studies

Given
- Visitor truy cập trang /case-studies

When
- Trang được tải

Then
- Skeleton loading hiển thị trong khi data chưa sẵn sàng
- Sau khi load: 12 card đầu tiên hiển thị trong grid

### AC-02: Thông tin mỗi case study đầy đủ

Given
- Danh sách case studies đang hiển thị

When
- Visitor xem một case study

Then
- Card hiển thị: logo khách hàng, quote ngắn (line-clamp-2), tag ngành, "Made possible with" + tên/logo sản phẩm
- Logo có alt text đúng format "[Tên công ty] logo"

### AC-03: Lọc theo tag (kết hợp FEAT-021)

Given
- Filter tag đang active

When
- Tag thay đổi

Then
- List re-render realtime chỉ hiển thị case match tag
- Pagination reset về đầu

### AC-04: Empty state

Given
- Tag được chọn không có case study nào

When
- Filter áp dụng

Then
- Empty state hiển thị: "No case studies found"
- Nút "View all" để reset filter

### AC-05: Logo không tải được

Given
- Logo khách hàng không load

When
- Card hiển thị

Then
- Tên công ty dạng text thay thế
- Layout card không bị vỡ

### AC-06: Responsive grid

Given
- Danh sách đang hiển thị

When
- Visitor xem trên các thiết bị khác nhau

Then
- Desktop (≥1024px): 3 cột
- Tablet (640–1023px): 2 cột
- Mobile (<640px): 1 cột
