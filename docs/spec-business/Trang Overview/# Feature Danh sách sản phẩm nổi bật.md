# Feature: Danh sách sản phẩm nổi bật 

## 1. Business Goal
Hiển thị nhanh 5 sản phẩm chính để khách hàng thấy ngay dòng sản phẩm nổi bật, khuyến khích click vào chi tiết sản phẩm hoặc yêu cầu demo.

## 2. Actors
- Visitor doanh nghiệp
- Potential B2B User

## 3. Preconditions
- Trang Overview load thành công
- Danh sách sản phẩm đã publish

## 4. Main Flow
1. Hiển thị lưới 5 sản phẩm: Deadbolt Go, Keybox 3, Padlock 2, Cellular Deadbolt, Padlock Lite
2. Mỗi sản phẩm có hình ảnh lớn, tên sản phẩm, mô tả ngắn 1 dòng
3. Click ảnh hoặc tên → chuyển đến trang chi tiết sản phẩm tương ứng

## 5. Business Rules
- Chỉ hiển thị đúng 5 sản phẩm featured theo thứ tự cố định: Deadbolt Go → Keybox 3 → Padlock 2 → Cellular Deadbolt → Padlock Lite
- Hình ảnh có alt text đầy đủ (ví dụ "Khóa Deadbolt Go vân tay của igloo")
- Không có nút "Xem tất cả sản phẩm" (không có trang list tổng hợp)
- CTA tracking: Link sản phẩm kèm `?ref=overview-product-list`
- Click ảnh hoặc tên đều dẫn đến cùng URL trang chi tiết `/products/[slug]?ref=overview-product-list`

## 6. Edge Cases
- Hình ảnh không tải → placeholder + tên vẫn rõ
- JavaScript tắt → lưới hiển thị tĩnh

## 7. Security Requirements
- Hình ảnh và liên kết dùng HTTPS
- Không lộ ID nội bộ sản phẩm

## 8. Acceptance Criteria

### AC-01: Hiển thị danh sách sản phẩm nổi bật

Given
- Visitor truy cập trang Overview

When
- Trang được tải

Then
- Hệ thống hiển thị lưới 5 sản phẩm nổi bật
- Bao gồm Deadbolt Go, Keybox 3, Padlock 2, Cellular Deadbolt và Padlock Lite

### AC-02: Hiển thị thông tin mỗi sản phẩm

Given
- Lưới sản phẩm đang hiển thị

When
- Visitor xem một sản phẩm

Then
- Hệ thống hiển thị hình ảnh sản phẩm
- Hệ thống hiển thị tên sản phẩm
- Hệ thống hiển thị mô tả ngắn một dòng

### AC-03: Chuyển đến trang chi tiết sản phẩm

Given
- Một sản phẩm đang hiển thị trong danh sách

When
- Visitor nhấn vào hình ảnh hoặc tên sản phẩm

Then
- Hệ thống chuyển đến trang chi tiết của sản phẩm tương ứng

### AC-04: Hình ảnh sản phẩm có alt text

Given
- Hình ảnh sản phẩm đang hiển thị

When
- Visitor xem hoặc trình duyệt tải hình ảnh

Then
- Hình ảnh có alt text mô tả sản phẩm