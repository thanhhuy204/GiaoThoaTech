# Feature: Explore careers Button

## 1. Business Goal
Cho phép visitor nhanh chóng truy cập danh sách các vị trí tuyển dụng.

## 2. Actors
- Visitor 

## 3. Preconditions
- Trang /careers tải thành công

## 4. Main Flow
- Hệ thống hiển thị nút "Explore careers"
- Visitor nhấn vào nút
- Trang cuộn đến phần danh sách vị trí tuyển dụng

## 5. Business Rules
- Nút phải hiển thị rõ ràng và dễ nhận biết

## 6. Edge Cases
- Không có vị trí tuyển dụng → hiển thị thông báo phù hợp

## 7. Security Requirements
- Điều hướng sử dụng HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị nút Explore roles

Given
- Visitor truy cập trang /careers

When
- Trang được tải

Then
- Nút "Explore careers" phải hiển thị

### AC-02: Cuộn đến danh sách công việc

Given
- Nút "Explore careers" đang hiển thị

When
- Visitor nhấn nút

Then
- Trang cuộn đến phần danh sách công việc