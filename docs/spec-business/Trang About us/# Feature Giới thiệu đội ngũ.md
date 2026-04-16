# Feature: Giới thiệu đội ngũ (Team Profiles)

## 1. Business Goal

Cho khách hàng và đối tác thấy đội ngũ chuyên nghiệp đứng sau sản phẩm igloo. Việc công khai thông tin nhân sự tăng độ tin cậy về năng lực hỗ trợ, phát triển sản phẩm, và cam kết lâu dài với khách hàng.

## 2. Actors

- Visitor (khách hàng tiềm năng) — muốn biết ai là người chịu trách nhiệm sản phẩm và hỗ trợ
- Đối tác doanh nghiệp — đánh giá độ credibility trước khi ký hợp đồng
- Ứng viên tiềm năng — tìm hiểu đội ngũ trước khi ứng tuyển

## 3. Preconditions

- Người dùng đang truy cập trang /about
- Section Team nằm sau phần Core Values (FEAT-015)
- Dữ liệu đội ngũ đã được chuẩn bị (tên, role, ảnh, bio, LinkedIn URL)

## 4. Main Flow

1. Trang /about load → section Team Profiles render
2. Hiển thị tiêu đề section ("Meet our team" hoặc "The people behind igloo")
3. Hiển thị grid 6–8 profile cards
4. Mỗi profile card hiển thị: ảnh (1:1), tên, role
5. Người dùng hover/click dấu "+" (expand button) → bio ngắn xuất hiện với animation slide-down
6. Người dùng click icon LinkedIn → mở tab mới tới trang LinkedIn của thành viên
7. Nhấn lại dấu "+" (hoặc "×") → bio thu lại

## 5. Business Rules

- Số lượng profile: tối thiểu 6, tối đa 8 người
- Ảnh thành viên phải có alt text theo format: "[Tên] — [Role] tại igloo"
- Link LinkedIn bắt buộc mở tab mới (target="_blank" + rel="noopener noreferrer")
- Nếu thành viên không có LinkedIn, ẩn icon LinkedIn (không hiển thị broken link)
- Bio hiển thị trong expand panel, tối đa 50 từ
- Không hiển thị thông tin liên lạc cá nhân (email, số điện thoại)
- Grid responsive: 4 cột (desktop ≥1024px), 3 cột (tablet 640–1023px), 2 cột (mobile 375–639px), 1 cột (<375px)

## 6. Edge Cases

- Ảnh thành viên không load → placeholder màu #f9f9f9 với icon avatar SVG màu rgba(0,0,0,0.2)
- Thành viên không có LinkedIn → ẩn icon LinkedIn (không để link trống hoặc placeholder)
- Bio quá dài (>50 từ) → truncate tại 50 từ và thêm "..."
- Mobile (<640px) → grid 2 cột; nút expand luôn visible thay vì chỉ hiện khi hover
- JavaScript tắt → ẩn nút expand, hiển thị bio trực tiếp dưới tên
- 7 thành viên (lẻ trong grid 4 cột) → card cuối căn trái, không stretch full-width

## 7. Security Requirements

- Link LinkedIn phải validate format URL trước khi render (href chỉ chấp nhận https://linkedin.com/...)
- rel="noopener noreferrer" bắt buộc trên tất cả external links
- Nếu dữ liệu lấy từ CMS: escape HTML trong bio để tránh XSS
- Không render HTML raw trong bio — chỉ plain text

## 8. Acceptance Criteria

### AC-01: Hiển thị danh sách Team Profiles

Given
- Visitor truy cập trang /about

When
- Trang About được tải

Then
- Hệ thống hiển thị lưới Team Profiles
- Hiển thị đúng 6–8 thành viên trong đội ngũ

### AC-02: Thông tin mỗi profile hiển thị đầy đủ

Given
- Section Team Profiles đang hiển thị

When
- Visitor xem một profile trong danh sách

Then
- Profile hiển thị: ảnh đại diện (tỉ lệ 1:1), tên (H3), vai trò, icon LinkedIn (nếu có), nút expand "+"
- Ảnh có alt text đúng format "[Tên] — [Role] tại igloo"

### AC-03: Xem bio bằng nút "+"

Given
- Visitor đang xem danh sách Team Profiles

When
- Visitor click vào dấu "+"

Then
- Bio ngắn của thành viên slide-down mượt mà
- Nút "+" rotate thành "×"
- Bio không bị cắt, hiển thị đầy đủ (tối đa 50 từ)

### AC-04: Thu bio bằng nút "×"

Given
- Bio đang hiển thị

When
- Visitor click "×"

Then
- Bio thu lại (slide-up), nút rotate về "+"

### AC-05: Link LinkedIn hoạt động

Given
- Visitor đang xem profile có LinkedIn

When
- Visitor click icon LinkedIn

Then
- Trang LinkedIn của thành viên mở trong tab mới
- Link có rel="noopener noreferrer"

### AC-06: Ảnh không tải được

Given
- Ảnh profile không tải thành công

When
- Trang hiển thị profile

Then
- Hệ thống hiển thị placeholder avatar
- Tên, role, bio và link LinkedIn vẫn hiển thị đầy đủ, không lỗi layout

### AC-07: Responsive grid

Given
- Section Team Profiles đang hiển thị

When
- Visitor xem trên các thiết bị khác nhau

Then
- Desktop (≥1024px): 4 cột
- Tablet (640–1023px): 3 cột
- Mobile (375–639px): 2 cột
- Mobile nhỏ (<375px): 1 cột
