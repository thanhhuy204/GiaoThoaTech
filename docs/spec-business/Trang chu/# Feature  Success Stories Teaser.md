# Feature: Success Stories Teaser

## 1. Business Goal
Chứng minh giá trị thực tế qua câu chuyện khách hàng thành công, xây dựng lòng tin bằng trích dẫn cụ thể, khuyến khích người xem đọc thêm hoặc liên hệ.

## 2. Actors
- Visitor đang cân nhắc sử dụng sản phẩm
- Potential User doanh nghiệp (ngành khách sạn, nhà ở cho thuê...)

## 3. Preconditions
- Trang chủ load thành công
- Phần này hiển thị sau khối bảo mật

## 4. Main Flow
1. Hiển thị tiêu đề: "See how we helped customers scale their assets and real estate"
2. Hiển thị lưới hoặc carousel 5-6 trích dẫn từ khách hàng (Loftaffair, Kayakomat, Hornbach...)
3. Mỗi trích dẫn có: logo khách hàng, nội dung ngắn, tag ngành (Hospitality...), sản phẩm liên quan (Keybox 3, Padlock 2E...)
4. Nút "Đọc tất cả câu chuyện thành công" → chuyển đến trang /case-studies

## 5. Business Rules
- Trích dẫn ngắn gọn, chân thực từ khách hàng thật
- Tag ngành hiển thị dạng nhãn màu

## 6. Edge Cases
- JavaScript bị tắt → hiển thị danh sách tĩnh (2-3 trích dẫn đầu)
- Không có trích dẫn → ẩn phần hoặc hiển thị nút liên hệ thay thế

## 7. Security Requirements
- Liên kết "Đọc tất cả" dùng HTTPS
- Không chứa thông tin nhạy cảm trong trích dẫn

## 8. Acceptance Criteria

### AC-01: Hiển thị tiêu đề Success Stories

Given
- Visitor truy cập trang chủ

When
- Trang được tải và cuộn đến phần Success Stories

Then
- Hệ thống hiển thị tiêu đề "See how we helped customers scale their assets and real estate"

### AC-02: Hiển thị các trích dẫn khách hàng

Given
- Phần Success Stories đang hiển thị

When
- Visitor xem các trích dẫn

Then
- Hệ thống hiển thị 5–6 trích dẫn khách hàng
- Mỗi trích dẫn hiển thị logo khách hàng
- Mỗi trích dẫn hiển thị nội dung trích dẫn ngắn
- Mỗi trích dẫn hiển thị tag ngành
- Mỗi trích dẫn hiển thị sản phẩm liên quan

### AC-03: Chuyển đến trang case studies

Given
- Nút "Read all success stories" đang hiển thị

When
- Visitor nhấn vào nút

Then
- Hệ thống chuyển đến trang "/case-studies"

### AC-04: Xử lý khi không có trích dẫn

Given
- Hệ thống không có dữ liệu trích dẫn khách hàng

When
- Trang được tải

Then
- Hệ thống ẩn phần Success Stories
- Hoặc hiển thị nút liên hệ thay thế