# Feature: Tích hợp hệ thống quản lý bất động sản PMS

## 1. Business Goal
Thuyết phục property managers rằng igloohome kết nối liền mạch với hệ thống PMS (Property Management System) họ đang dùng. Giảm rào cản chuyển đổi bằng cách chứng minh tính tương thích với hệ sinh thái công cụ hiện có, đồng thời dẫn sang trang Integrations để tìm hiểu sâu hơn.

## 2. Actors
- **Property Manager** — đang dùng PMS và muốn tích hợp khóa thông minh
- **Operations Team** — cần quản lý access log và dashboard tập trung

## 3. Preconditions
- Visitor đã được thuyết phục về giải pháp và muốn kiểm chứng khả năng tích hợp
- Trang Short-term Rentals tải thành công

## 4. Main Flow
1. Visitor cuộn đến section PMS Integration
2. Hệ thống hiển thị logo các đối tác PMS nổi tiếng bên cạnh headline trung tâm
3. Hệ thống hiển thị ảnh chụp dashboard/marketplace để minh chứng tích hợp thực tế
4. Hệ thống hiển thị sub-section: bên trái là real-time access dashboard, bên phải là danh sách tính năng tích hợp
5. Visitor thấy CTA "Explore Integrations" để đi sâu vào danh sách đối tác đầy đủ
6. Visitor nhấn CTA → chuyển đến trang `/integrations`

## 5. Business Rules
- Logo đối tác PMS phải là logo chính thức của các thương hiệu có partnership thực tế
- Không hiển thị logo của đối tác chưa có tích hợp chính thức
- Dashboard screenshot phải là giao diện thực của hệ thống igloohome/iglooconnect — không dùng mockup giả
- Danh sách tính năng tích hợp phải liệt kê tối thiểu 5 tính năng nghiệp vụ thực tế
- CTA "Explore Integrations" dẫn đến `/integrations`
- Trên mobile, logo đối tác có thể ẩn hoặc xếp dọc để ưu tiên nội dung chính

## 6. Edge Cases
- Logo đối tác PMS không tải được → tên đối tác hiển thị dưới dạng text fallback
- Dashboard image không tải → phần sub-section vẫn hiển thị đủ danh sách tính năng
- Trang `/integrations` không tồn tại → CTA vẫn hiển thị, xử lý 404 theo chuẩn

## 7. Security Requirements
- Logo và ảnh đối tác phải được sử dụng có sự cho phép (licensing)
- Không hiển thị thông tin nhạy cảm từ dashboard thật (dữ liệu khách hàng, access token)

## 8. Acceptance Criteria

### AC-01: Hiển thị đối tác PMS

Given
- Visitor cuộn đến section PMS Integration

When
- Section hiển thị trong viewport

Then
- Headline "Connect to your PMS seamlessly" hiển thị rõ ràng
- Logo ít nhất một số đối tác PMS hiển thị cạnh headline

### AC-02: Hiển thị minh chứng tích hợp thực tế

Given
- Section PMS Integration đang hiển thị

When
- Visitor xem nội dung

Then
- Ảnh dashboard/marketplace hiển thị bên dưới headline
- Sub-section hiển thị: real-time access dashboard bên trái, danh sách tính năng bên phải

### AC-03: CTA dẫn đến trang Integrations

Given
- Visitor muốn tìm hiểu thêm về đối tác tích hợp

When
- Visitor nhấn "Explore Integrations"

Then
- Hệ thống chuyển hướng đến `/integrations`

### AC-04: Danh sách tính năng tích hợp đầy đủ

Given
- Sub-section tính năng đang hiển thị

When
- Visitor xem cột phải

Then
- Ít nhất 5 tính năng tích hợp được liệt kê với icon tick
