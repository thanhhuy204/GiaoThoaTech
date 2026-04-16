# Feature : Nút CTA (Get a demo & See products)

## 1. Business Goal
Khuyến khích người xem thực hiện hành động ngay: yêu cầu demo miễn phí hoặc xem sản phẩm, nhằm tăng số lượng liên hệ và chuyển đổi khách hàng.

## 2. Actors
- Visitor (khách truy cập website)
- Potential User (người quan tâm demo hoặc sản phẩm)

## 3. Preconditions
- Trang chủ load thành công
- Biểu ngữ chính hiển thị

## 4. Main Flow
1. Người dùng thấy 2 nút dưới dòng phụ của biểu ngữ
2. Nút "Get a demo" (màu cam) → chuyển đến trang "/contact".
3. Nút "See products" (màu trắng viền) → chuyển đến trang "/products".

## 5. Business Rules
- Chuyển trang kèm ref param để theo dõi nguồn lead

## 6. Edge Cases
- Bấm nút khi mạng chậm → chuyển trang vẫn hoạt động
- JavaScript bị tắt → nút vẫn click được như liên kết bình thường

## 7. Security Requirements
- Chuyển trang dùng HTTPS
- Không truyền dữ liệu cá nhân qua đường dẫn

## 8. Acceptance Criteria

### AC-01: Hiển thị hai nút CTA

Given
- Visitor truy cập trang chủ

When
- Trang được tải và Hero Banner hiển thị

Then
- Hệ thống hiển thị nút "Get a demo"
- Hệ thống hiển thị nút "See products"
- Hai nút nằm dưới dòng phụ của biểu ngữ

### AC-02: Chuyển đến trang liên hệ

Given
- Nút "Get a demo" đang hiển thị

When
- Visitor nhấn vào nút "Get a demo"

Then
- Hệ thống chuyển đến trang "/contact"

### AC-03: Chuyển đến trang sản phẩm

Given
- Nút "See products" đang hiển thị

When
- Visitor nhấn vào nút "See products"

Then
- Hệ thống chuyển đến trang "/products"

### AC-04: Hoạt động khi mạng chậm hoặc không có JavaScript

Given
- Visitor nhấn vào một trong hai nút CTA

When
- Mạng chậm hoặc JavaScript bị tắt

Then
- Hệ thống vẫn chuyển đến trang đích tương ứng
