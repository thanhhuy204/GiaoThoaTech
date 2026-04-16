# Feature: Phần "How it works" + diagram flowchart

## 1. Business Goal
Minh họa luồng hoạt động công nghệ offline để khách hàng hình dung rõ cách sử dụng.

## 2. Actors
- Visitor muốn hiểu cách hoạt động

## 3. Preconditions
- Trang Technology load thành công

## 4. Main Flow
1. Hiển thị tiêu đề "How it works"
2. Hiển thị diagram flowchart:
   - Initial pairing: Thiết lập → sync cloud → lưu credentials
   - Generation process: Tạo mã → validate offline
3. Mô tả chi tiết bên dưới diagram

## 5. Business Rules

- Section phải có `id="how-it-works"` để hỗ trợ anchor scroll từ nút CTA (FEAT-010)
- Diagram hiển thị đúng 2 luồng theo thứ tự: Initial Pairing (3 bước) → Generation Process (3 bước)
- Diagram xây dựng thuần HTML/CSS — không dùng thư viện chart (D3, Recharts, Mermaid...)
- Diagram dùng mũi tên CSS, icon cloud và device dùng SVG inline
- Mô tả chi tiết bên dưới phải khớp với nội dung diagram (không mâu thuẫn)
- Toàn bộ text dùng tiếng Anh

## 6. Edge Cases
- Diagram không tải → fallback mô tả chữ

## 7. Security Requirements
- Hình ảnh diagram dùng HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị phần "How it works"

Given
- Visitor truy cập trang Technology

When
- Trang được tải và cuộn đến phần nội dung

Then
- Hệ thống hiển thị tiêu đề "How it works"

### AC-02: Hiển thị diagram flowchart

Given
- Phần "How it works" đang hiển thị

When
- Visitor xem diagram

Then
- Hệ thống hiển thị flowchart minh họa luồng hoạt động
- Diagram thể hiện các bước Initial pairing và Generation process

### AC-03: Hiển thị mô tả chi tiết

Given
- Diagram đang hiển thị

When
- Visitor xem nội dung bên dưới

Then
- Hệ thống hiển thị mô tả chi tiết giải thích luồng hoạt động
- Nội dung mô tả khớp với các bước trong diagram

### AC-04: Xử lý khi diagram không tải

Given
- Hình ảnh diagram không tải được

When
- Trang được hiển thị

Then
- Hệ thống hiển thị mô tả bằng văn bản thay thế
- Visitor vẫn hiểu được luồng hoạt động