# Feature: Tuyên bố sứ mệnh thương hiệu

## 1. Business Goal
Kết thúc trang Access Control bằng một tuyên bố sứ mệnh thương hiệu mạnh mẽ. Tạo ấn tượng cuối cùng tích cực với khách hàng trước khi họ rời trang, đồng thời củng cố định vị thương hiệu igloohome là giải pháp bảo mật toàn cầu, đáng tin cậy, không bị ràng buộc bởi hạ tầng.

## 2. Actors
- **Visitor** — đang đọc toàn bộ trang và cần ấn tượng cuối để ra quyết định tiếp theo
- **Building Manager / Property Developer** — cần cảm nhận được tầm nhìn dài hạn của nhà cung cấp

## 3. Preconditions
- Visitor đã cuộn qua toàn bộ nội dung trang Access Control
- Trang Access Control tải thành công

## 4. Main Flow
1. Visitor cuộn đến section cuối trang
2. Hệ thống hiển thị logo igloohome (icon + wordmark)
3. Hệ thống hiển thị tuyên bố sứ mệnh đầy đủ
4. Hệ thống hiển thị link dẫn đến trang About Us với thông điệp "Complete freedom about constraints"
5. Visitor đọc sứ mệnh → có thể nhấn link để tìm hiểu thêm về công ty

## 5. Business Rules
- Tuyên bố sứ mệnh phải hiển thị nguyên văn chính thức: "igloohome revolutionizes the way property owners secure and manage access for their homes, buildings and shared assets, that works every time and anywhere in the world."
- Link "Complete freedom about constraints" dẫn đến `/about` — đây là internal navigation, không mở tab mới
- Logo igloohome phải hiển thị phiên bản màu trắng (phù hợp nền tối)
- Section này là section kết thúc trang — không có CTA mua hàng, không thu thập dữ liệu
- Divider line phía trên section giúp tách biệt rõ ràng với section Integrations phía trên

## 6. Edge Cases
- Logo igloohome không tải → tên "igloohome" dưới dạng text vẫn hiển thị
- Trên mobile, nội dung căn giữa tự động, không bị tràn

## 7. Security Requirements
- Link dẫn đến `/about` là internal routing — không có rủi ro bảo mật đặc thù
- Không thu thập dữ liệu người dùng tại section này
- Logo igloohome là tài sản thương hiệu — không được sử dụng sai tỷ lệ hoặc màu sắc

## 8. Acceptance Criteria

### AC-01: Hiển thị sứ mệnh thương hiệu đầy đủ

Given
- Visitor cuộn đến section cuối trang Access Control

When
- Section hiển thị trong viewport

Then
- Logo igloohome hiển thị màu trắng
- Tuyên bố sứ mệnh đầy đủ hiển thị rõ ràng

### AC-02: Link About Us hoạt động đúng

Given
- Sứ mệnh thương hiệu đang hiển thị

When
- Visitor nhấn "Complete freedom about constraints"

Then
- Hệ thống chuyển hướng đến `/about` trong cùng tab

### AC-03: Divider tách biệt section

Given
- Visitor cuộn từ section Integrations xuống section Mission

When
- Hai section hiển thị liền kề

Then
- Có divider line rõ ràng tách biệt 2 section

### AC-04: Responsive layout

Given
- Visitor truy cập từ mobile

When
- Section Mission hiển thị

Then
- Nội dung căn giữa, không bị tràn layout
- Logo, sứ mệnh và link đều hiển thị và đọc được
