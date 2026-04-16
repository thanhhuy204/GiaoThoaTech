# Feature: Giải pháp cho tòa nhà nhiều căn hộ

## 1. Business Goal
Mở rộng đối tượng khách hàng từ chủ nhà đơn lẻ sang phân khúc quản lý tòa nhà nhiều căn hộ (multi-family properties). Nhấn mạnh khả năng mở rộng theo quy mô (scalability) của giải pháp, đồng thời cung cấp lối dẫn sang trang giải pháp chuyên biệt.

## 2. Actors
- **Building Manager** — quản lý tòa nhà hoặc complex nhiều căn hộ
- **Property Developer** — chủ đầu tư bất động sản đa căn hộ
- **Visitor** — đang tìm giải pháp mở rộng quy mô

## 3. Preconditions
- Visitor đã xem qua các section trước trên trang Short-term Rentals
- Trang Short-term Rentals tải thành công

## 4. Main Flow
1. Visitor cuộn đến section Multi-family Properties
2. Hệ thống hiển thị banner full-width với ảnh nền liên quan đến tòa nhà nhiều tầng
3. Hệ thống hiển thị headline và subtext nhấn mạnh khả năng quản lý tập trung
4. Hệ thống hiển thị CTA dẫn sang trang giải pháp multi-family chuyên biệt
5. Visitor có thể điều hướng sang trang `/solutions/multi-family` để tìm hiểu sâu hơn

## 5. Business Rules
- CTA "Learn More" dẫn đến `/solutions/multi-family` — đây là cross-sell sang phân khúc sản phẩm khác
- Thông điệp phải nhấn mạnh: quản lý tập trung, kiểm soát truy cập từng tầng/phòng, mở rộng không giới hạn
- Section này đóng vai trò chuyển tiếp (upsell bridge) từ short-term rental sang multi-family — không mô tả lại sản phẩm đã có ở section trên
- Carousel (nếu có) chỉ là điều hướng hình ảnh, không ảnh hưởng đến luồng nghiệp vụ chính

## 6. Edge Cases
- Ảnh nền không tải → overlay màu tối vẫn đảm bảo chữ đọc được
- Trang `/solutions/multi-family` chưa tồn tại → CTA vẫn hiển thị, hệ thống xử lý 404 theo chuẩn chung
- Trên mobile, nội dung căn giữa, font size thu nhỏ vừa màn hình

## 7. Security Requirements
- Liên kết CTA sử dụng internal routing, không mở tab mới
- Không thu thập dữ liệu người dùng tại section này

## 8. Acceptance Criteria

### AC-01: Hiển thị đề xuất giải pháp multi-family

Given
- Visitor cuộn đến section Multi-family Properties

When
- Section hiển thị trong viewport

Then
- Headline "Smart security tailored for multi-family properties" hiển thị rõ ràng
- Subtext mô tả khả năng quản lý tập trung nhiều căn hộ

### AC-02: CTA chuyển hướng đúng trang giải pháp

Given
- Visitor đang xem section Multi-family Properties

When
- Visitor nhấn nút "Learn More"

Then
- Hệ thống chuyển hướng đến `/solutions/multi-family`

### AC-03: Responsive layout

Given
- Visitor truy cập từ thiết bị mobile

When
- Section hiển thị

Then
- Headline, subtext và CTA căn giữa, dễ đọc
- Không bị tràn layout hay cắt nội dung
