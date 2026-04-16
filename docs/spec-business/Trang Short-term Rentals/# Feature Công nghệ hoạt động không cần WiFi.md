# Feature: Công nghệ hoạt động không cần WiFi

## 1. Business Goal
Xử lý trực tiếp objection phổ biến nhất của khách hàng khi cân nhắc khóa thông minh: yêu cầu kết nối internet liên tục. Section này chủ động giải tỏa lo ngại bằng cách làm nổi bật lợi thế công nghệ algoPIN™ — hoạt động hoàn toàn offline, không cần WiFi, Bluetooth, hay sóng di động.

## 2. Actors
- **Property Manager / Host** — đang cân nhắc rào cản triển khai khóa thông minh
- **Visitor** — tìm hiểu về độ tin cậy của giải pháp

## 3. Preconditions
- Visitor đã xem qua các section trước và cuộn tiếp xuống
- Trang Short-term Rentals tải thành công

## 4. Main Flow
1. Visitor cuộn đến section "No WiFi No Issue"
2. Hệ thống hiển thị banner tối full-width với headline nổi bật
3. Hệ thống hiển thị mô tả ngắn về công nghệ algoPIN™
4. Hệ thống hiển thị badge "algoPIN™ Technology" để nhấn mạnh thương hiệu công nghệ
5. Visitor hiểu rằng khóa hoạt động độc lập, không phụ thuộc hạ tầng mạng

## 5. Business Rules
- Phải đề cập rõ tên công nghệ **algoPIN™** trong phần mô tả
- Thông điệp cốt lõi phải trả lời được câu hỏi: "Nếu mất WiFi, khóa có hoạt động không?"
- Câu trả lời phải rõ ràng: mã PIN được tạo offline, không cần bất kỳ kết nối nào
- Badge thương hiệu "algoPIN™ Technology" phải hiển thị để tăng nhận diện công nghệ độc quyền
- Nội dung không được gây hiểu nhầm về khả năng offline — chỉ đề cập những gì đã được kiểm chứng

## 6. Edge Cases
- Hình ảnh sản phẩm bên phải không tải → nội dung text và badge vẫn hiển thị đủ, không mất thông điệp chính
- Trên mobile, hình ảnh và text xếp dọc, thứ tự ưu tiên: text trước, hình sau

## 7. Security Requirements
- Không có yêu cầu bảo mật đặc thù (nội dung tĩnh, không thu thập dữ liệu người dùng)
- Không được claim tính năng bảo mật vượt quá thực tế đã kiểm chứng

## 8. Acceptance Criteria

### AC-01: Thông điệp offline rõ ràng

Given
- Visitor cuộn đến section "No WiFi No Issue"

When
- Section hiển thị trong viewport

Then
- Headline "No WiFi No Issue" hiển thị rõ ràng, dễ đọc
- Subtext giải thích công nghệ algoPIN™ tạo mã PIN offline
- Badge "algoPIN™ Technology" hiển thị

### AC-02: Không yêu cầu kết nối mạng trong thông điệp

Given
- Visitor đọc phần mô tả công nghệ

When
- Nội dung được hiển thị đầy đủ

Then
- Nội dung đề cập rõ không cần WiFi, Bluetooth, hoặc sóng di động
- Thông điệp tạo sự yên tâm cho Property Manager về độ tin cậy của hệ thống

### AC-03: Responsive layout

Given
- Visitor truy cập từ thiết bị mobile

When
- Section hiển thị

Then
- Text và hình ảnh xếp dọc, thứ tự hợp lý
- Toàn bộ thông điệp vẫn đọc được
