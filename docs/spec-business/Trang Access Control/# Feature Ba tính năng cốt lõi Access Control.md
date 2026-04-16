# Feature: Ba tính năng cốt lõi Access Control

## 1. Business Goal
Trình bày 3 tính năng cốt lõi của giải pháp Access Control một cách dễ scan và dễ hiểu. Giúp khách hàng doanh nghiệp nhận ra ngay giá trị chính của hệ thống: tự động hóa truy cập, kiểm soát toàn bộ điểm vào, và giám sát thời gian thực.

## 2. Actors
- **Building Manager** — cần hiểu nhanh hệ thống có giải quyết được vấn đề của mình không
- **Security Officer** — quan tâm đến audit log và kiểm soát từng điểm truy cập
- **Visitor** — đang so sánh giải pháp

## 3. Preconditions
- Visitor đã xem qua Hero section và cuộn xuống
- Trang Access Control tải thành công

## 4. Main Flow
1. Visitor cuộn xuống sau Hero section
2. Hệ thống hiển thị section với label định danh và headline tổng quan
3. Hệ thống hiển thị 3 cột tính năng song song với icon, tiêu đề và mô tả
4. Visitor đọc và nắm được 3 lợi ích chính: tự động hóa, kiểm soát đa điểm, cảnh báo thời gian thực

## 5. Business Rules
- Phải hiển thị đúng 3 tính năng cốt lõi theo thứ tự cố định:
  1. **Automate Access to Your Property** — tích hợp PMS, tự động check-in/out, không cần handover thủ công
  2. **Access Control for Every Entry Point** — quản lý cửa, cổng, thang máy, khu tiện ích từ một dashboard duy nhất
  3. **Get Real-Time Alerts and Audit Logs** — thông báo tức thì cho mỗi sự kiện truy cập, duy trì audit trail cho tuân thủ và điều tra
- Logo đối tác PMS chỉ hiển thị ở cột 1 (Automate Access) — không hiển thị ở 2 cột còn lại
- Cột 1 cần thể hiện tính tích hợp hệ sinh thái (ecosystem integration), không chỉ là tính năng độc lập
- Cột 3 cần nhấn mạnh giá trị compliance và audit — phù hợp với yêu cầu doanh nghiệp và tòa nhà lớn

## 6. Edge Cases
- Icon SVG không tải → tiêu đề và mô tả cột vẫn hiển thị đủ
- Logo đối tác PMS (cột 1) không tải → cột vẫn hiển thị đầy đủ nội dung chính
- Trên mobile, 3 cột xếp thành 1 cột dọc theo thứ tự: Automate Access → Access Control → Real-time Alerts

## 7. Security Requirements
- Không có yêu cầu bảo mật đặc thù (nội dung tĩnh, không xử lý dữ liệu người dùng)
- Logo đối tác phải được sử dụng có sự cho phép

## 8. Acceptance Criteria

### AC-01: Hiển thị đủ 3 tính năng cốt lõi

Given
- Visitor cuộn đến section Security Essentials

When
- Section hiển thị trong viewport

Then
- 3 cột tính năng hiển thị song song trên desktop
- Mỗi cột có icon, tiêu đề và mô tả riêng biệt

### AC-02: Nội dung tính năng đúng theo spec

Given
- Section đang hiển thị

When
- Visitor đọc từng cột

Then
- Cột 1: "Automate Access to Your Property" với đề cập PMS integration
- Cột 2: "Access Control for Every Entry Point" với đề cập dashboard thống nhất
- Cột 3: "Get Real-Time Alerts and Audit Logs" với đề cập audit trail và compliance

### AC-03: Logo đối tác chỉ hiển thị ở cột 1

Given
- Section đang hiển thị

When
- Visitor xem 3 cột

Then
- Logo đối tác PMS hiển thị bên dưới cột 1
- Cột 2 và cột 3 không có logo đối tác

### AC-04: Responsive layout

Given
- Visitor truy cập từ mobile

When
- Section hiển thị

Then
- 3 cột xếp thành 1 cột dọc, không bị chồng nội dung
