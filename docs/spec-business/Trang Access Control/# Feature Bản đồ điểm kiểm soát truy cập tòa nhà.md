# Feature: Bản đồ điểm kiểm soát truy cập tòa nhà

## 1. Business Goal
Giúp khách hàng hiểu trực quan toàn bộ phạm vi kiểm soát của hệ thống Access Control trong một tòa nhà chung cư. Chứng minh rằng igloohome bao phủ được mọi điểm truy cập — từ cổng chính đến từng cửa căn hộ — nhằm tăng niềm tin vào tính toàn diện của giải pháp.

## 2. Actors
- **Building Manager** — cần thấy được phạm vi kiểm soát trước khi đầu tư
- **Property Developer** — muốn đánh giá khả năng bao phủ của hệ thống
- **Security Officer** — cần xác nhận tất cả điểm quan trọng đều được kiểm soát

## 3. Preconditions
- Visitor đã xem qua sản phẩm và tính năng cốt lõi
- Trang Access Control tải thành công

## 4. Main Flow
1. Visitor cuộn đến section bản đồ access points
2. Hệ thống hiển thị headline và subtext mô tả phạm vi kiểm soát
3. Hệ thống hiển thị hình ảnh 3D isometric của tòa nhà chung cư với các điểm access point được đánh dấu
4. Visitor nhìn vào hình ảnh và hiểu toàn bộ hệ sinh thái kiểm soát truy cập trong một tòa nhà

## 5. Business Rules
- Hình ảnh phải là mô hình 3D isometric thể hiện tòa nhà chung cư điển hình với đầy đủ loại điểm truy cập
- Các điểm access point phải được đánh dấu rõ ràng trên hình để truyền tải thông điệp "kiểm soát mọi điểm vào"
- Headline phải nhấn mạnh phạm vi toàn diện: "Control and Have Visibility Over Every Multifamily Access Point"
- Subtext phải đề cập rõ phạm vi từ cổng chính đến cửa căn hộ: "From the main entrance to individual unit doors"
- Hình ảnh phải có alt text mô tả đầy đủ cho accessibility
- Đây là section thông tin thuần túy — không yêu cầu CTA, không thu thập dữ liệu

## 6. Edge Cases
- Hình ảnh 3D map không tải → headline và subtext vẫn hiển thị đủ thông điệp
- Trên mobile, hình ảnh thu nhỏ tự động theo chiều rộng màn hình, không bị cắt

## 7. Security Requirements
- Hình ảnh phục vụ qua HTTPS
- Alt text không lộ thông tin kỹ thuật nhạy cảm của hệ thống

## 8. Acceptance Criteria

### AC-01: Hình ảnh bản đồ hiển thị đúng

Given
- Visitor cuộn đến section bản đồ access points

When
- Section hiển thị trong viewport

Then
- Hình ảnh 3D isometric tòa nhà chung cư hiển thị rõ ràng, căn giữa
- Các điểm access point được đánh dấu trên hình

### AC-02: Thông điệp phạm vi kiểm soát rõ ràng

Given
- Section đang hiển thị

When
- Visitor đọc headline và subtext

Then
- Headline "Control and Have Visibility Over Every Multifamily Access Point" hiển thị
- Subtext đề cập phạm vi từ cổng chính đến cửa từng căn hộ

### AC-03: Accessibility

Given
- Hình ảnh bản đồ đang hiển thị

When
- Visitor dùng screen reader hoặc hình ảnh không tải

Then
- Alt text mô tả đầy đủ nội dung hình ảnh hiển thị

### AC-04: Responsive

Given
- Visitor truy cập từ mobile

When
- Section hiển thị

Then
- Hình ảnh thu nhỏ theo chiều rộng màn hình, không bị cắt hoặc tràn layout
