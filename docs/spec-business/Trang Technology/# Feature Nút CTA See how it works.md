# Feature: Nút CTA "See how it works" 

## 1. Business Goal
Khuyến khích người xem xem chi tiết luồng hoạt động, tăng thời gian ở lại trang.

## 2. Actors
- Visitor muốn hiểu sâu hơn

## 3. Preconditions
- Trang Technology load thành công

## 4. Main Flow
1. Hiển thị nút "See how it works"
2. Click nút → scroll tự động xuống phần "How it works" + diagram

## 5. Business Rules

- Nút màu cam nổi bật (`#E8614A`) — không dùng màu khác
- Click phải smooth scroll đến `#how-it-works` — không reload trang
- Text nút cố định: "See how it works" — không thay đổi
- Nút phải có `aria-label`: "Xem cách công nghệ igloo hoạt động"
- Khi JavaScript tắt: nút render là `<a href="#how-it-works">` — browser jump đến anchor
- Không kèm `?ref=` tracking param vì đây là scroll nội bộ

## 6. Edge Cases
- JavaScript tắt → nút là anchor link

## 7. Security Requirements
- Không có (scroll nội bộ)

## 8. Acceptance Criteria

### AC-01: Hiển thị nút "See how it works"

Given
- Visitor truy cập trang Technology

When
- Trang được tải

Then
- Hệ thống hiển thị nút "See how it works"

### AC-02: Scroll đến phần "How it works"

Given
- Nút "See how it works" đang hiển thị

When
- Visitor nhấn vào nút

Then
- Trang cuộn xuống phần "How it works"
- Phần diagram hiển thị cho Visitor xem
- Trang không bị reload

### AC-03: Hoạt động khi JavaScript tắt

Given
- JavaScript bị tắt trên trình duyệt

When
- Visitor nhấn vào nút "See how it works"

Then
- Hệ thống chuyển đến anchor của phần "How it works"
- Visitor vẫn được đưa đến đúng phần nội dung