# Feature: Core Values

## 1. Business Goal

Truyền tải giá trị văn hóa công ty igloo, giúp khách hàng và ứng viên tiềm năng hiểu rõ DNA thương hiệu. Phần này củng cố hình ảnh igloo là đối tác đáng tin cậy, có văn hóa làm việc tích cực và bền vững.

## 2. Actors

- Visitor (khách hàng tiềm năng) — tìm hiểu về văn hóa công ty trước khi quyết định hợp tác
- Ứng viên tiềm năng — đánh giá môi trường làm việc trước khi ứng tuyển

## 3. Preconditions

- Người dùng đang truy cập trang /about
- Section này nằm sau phần mission/vision của trang About

## 4. Main Flow

1. Trang /about load → section Core Values render
2. Hiển thị tiêu đề section "Our Core Values" (hoặc "What we stand for")
3. Hiển thị grid 5 giá trị theo thứ tự cố định: Have fun, Resilient, Empathy, Teamwork, Action-oriented
4. Mỗi value card hiển thị: icon SVG riêng biệt (không dùng emoji), tên giá trị (H3), mô tả 1–2 câu
5. Hover vào card → hiệu ứng nâng nhẹ (translateY(-4px)) + shadow

## 5. Business Rules

- Hiển thị đúng 5 giá trị theo thứ tự: Have fun, Resilient, Empathy, Teamwork, Action-oriented
- Mỗi giá trị bắt buộc có icon SVG riêng biệt (không dùng emoji)
- Mỗi giá trị có mô tả ngắn 1–2 câu, tối đa 30 từ
- Icon phải có aria-hidden="true" vì tên đã mô tả đủ nội dung
- Không thay đổi tên hoặc thứ tự các value mà không có sự phê duyệt từ stakeholder

## 6. Edge Cases

- Màn hình mobile (< 640px) → grid chuyển thành 1 cột, card full-width
- Màn hình tablet (640–1024px) → grid 2–3 cột tùy chiều rộng
- Icon SVG không load → placeholder 48×48px màu #E8614A với opacity 0.2
- Text mô tả quá dài → truncate sau 2 dòng với line-clamp-2

## 7. Security Requirements

- Không có input người dùng — không cần sanitize
- Nếu nội dung lấy từ CMS: escape HTML để tránh XSS
- Icon SVG inline: chỉ dùng SVG từ trusted source, không dùng SVG từ user input

## 8. Acceptance Criteria

### AC-01: Hiển thị danh sách Core Values

Given
- Visitor truy cập trang /about

When
- Trang About được tải

Then
- Hệ thống hiển thị tiêu đề section "Our Core Values"
- Hiển thị đúng 5 value cards theo thứ tự: Have fun, Resilient, Empathy, Teamwork, Action-oriented

### AC-02: Mỗi Core Value có icon và mô tả

Given
- Section Core Values đang được hiển thị

When
- Visitor xem danh sách các giá trị

Then
- Mỗi Core Value hiển thị: icon SVG riêng biệt, tên giá trị (H3), mô tả 1–2 câu
- Icon có aria-hidden="true"

### AC-03: Responsive grid

Given
- Section Core Values đang hiển thị

When
- Visitor xem trên các thiết bị khác nhau

Then
- Desktop: 5 cột
- Tablet: 2–3 cột
- Mobile: 1 cột

### AC-04: Hover animation

Given
- Value card đang hiển thị

When
- Visitor hover vào card

Then
- Card nâng lên (translateY(-4px)) + shadow xuất hiện trong 200ms
- Animation mượt mà, không giật

### AC-05: Icon không tải được

Given
- Icon SVG không load được

When
- Trang hiển thị card

Then
- Placeholder 48×48px màu #E8614A (opacity 0.2) thay thế icon
- Tên và mô tả vẫn hiển thị đầy đủ
