# Feature: Logo "As featured on" 

## 1. Business Goal
Chứng minh uy tín thương hiệu qua các báo chí lớn, tăng độ tin cậy cho khách hàng doanh nghiệp khi xem tổng quan giải pháp.

## 2. Actors
- Visitor quan tâm uy tín thương hiệu

## 3. Preconditions
- Trang Overview load thành công

## 4. Main Flow
1. Hiển thị tiêu đề "As featured on"
2. Hiển thị danh sách logo báo chí: Digital Trends, TechCrunch, The Wall Street Journal, HuffPost, GQ, Forbes, PC...

## 5. Business Rules
- Logo hiển thị theo thứ tự cố định: Digital Trends, TechCrunch, The Wall Street Journal, HuffPost, GQ, Forbes, PC Magazine
- Hình ảnh logo có alt text theo định dạng "Featured on [Tên báo]" (ví dụ "Featured on Forbes")
- Logo grayscale mặc định (opacity 0.55), chuyển sang màu gốc khi hover (300ms ease)
- Logo không clickable trừ khi có yêu cầu riêng từ brand partnership
- Logo lỗi được ẩn (onError), các logo khác vẫn hiển thị bình thường

## 6. Edge Cases
- Logo không tải → placeholder hoặc ẩn logo đó
- JavaScript tắt → danh sách logo hiển thị tĩnh

## 7. Security Requirements
- Hình ảnh logo dùng HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị tiêu đề "As featured on"

Given
- Visitor truy cập trang Overview

When
- Trang được tải

Then
- Hệ thống hiển thị tiêu đề "As featured on"

### AC-02: Hiển thị danh sách logo báo chí

Given
- Phần "As featured on" đang hiển thị

When
- Visitor xem danh sách logo

Then
- Hệ thống hiển thị logo của các báo chí:
- Digital Trends
- TechCrunch
- The Wall Street Journal
- HuffPost
- GQ
- Forbes
- PC

### AC-03: Hình ảnh logo có alt text

Given
- Logo báo chí đang hiển thị

When
- Trình duyệt tải hình ảnh logo

Then
- Mỗi logo có alt text mô tả nguồn báo chí tương ứng

### AC-04: Xử lý khi logo không tải được

Given
- Một logo báo chí không tải được

When
- Trang được hiển thị

Then
- Hệ thống hiển thị placeholder hoặc ẩn logo đó