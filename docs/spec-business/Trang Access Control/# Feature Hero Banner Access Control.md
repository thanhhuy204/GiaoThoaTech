# Feature: Hero Banner Access Control

## 1. Business Goal
Tạo ấn tượng đầu tiên mạnh mẽ với phân khúc khách hàng doanh nghiệp: quản lý tòa nhà chung cư, apartment complex, và các tổ chức cần kiểm soát truy cập quy mô lớn. Nhấn mạnh khả năng mở rộng theo quy mô (scalability) của giải pháp và khuyến khích đặt lịch demo.

## 2. Actors
- **Building Manager** — quản lý tòa nhà chung cư / apartment complex
- **Property Developer** — chủ đầu tư bất động sản thương mại
- **Security Officer** — người phụ trách an ninh tòa nhà
- **Visitor** — khách truy cập website lần đầu

## 3. Preconditions
- Khách truy cập URL `/solutions/access-control`
- Website hoạt động bình thường (HTTPS)
- Trang tải thành công trên trình duyệt

## 4. Main Flow
1. Visitor truy cập trang Access Control
2. Hệ thống hiển thị hero section toàn màn hình với ảnh nền tòa nhà chung cư quy mô lớn
3. Hệ thống hiển thị badge định danh giải pháp "Access Control Solutions"
4. Hệ thống hiển thị headline và subtext nhấn mạnh quy mô quản lý từ 10 đến 10.000 căn hộ
5. Hệ thống hiển thị 2 CTA: CTA chính (Request a Demo) và CTA phụ (See Products)
6. Visitor nhấn CTA chính → chuyển đến trang Contact với ref tracking
7. Visitor nhấn CTA phụ → cuộn hoặc điều hướng đến phần sản phẩm

## 5. Business Rules
- CTA "Request a Demo" navigate đến `/contact?ref=ac-hero` để tracking nguồn lead
- CTA "See Products" điều hướng đến section sản phẩm trong cùng trang hoặc trang sản phẩm
- Headline phải truyền tải rõ USP về scalability: "Flexible Smart Access Control That Grows with Your Business"
- Subtext phải đề cập phạm vi quy mô: "10 units or 10,000"
- Badge "Access Control Solutions" hiển thị để định danh đây là giải pháp chuyên biệt cho phân khúc này
- Ảnh nền phải được nén ≤ 200KB (WebP)

## 6. Edge Cases
- Ảnh nền không tải → hiển thị màu fallback tối (`#1a1f2e`) để chữ vẫn đọc được
- JavaScript bị tắt → hero vẫn hiển thị tĩnh với đầy đủ headline và CTA
- Trên mobile, nội dung căn giữa, 2 CTA xếp dọc hoặc giữ hàng ngang tùy kích thước màn hình

## 7. Security Requirements
- Tất cả hình ảnh và liên kết sử dụng HTTPS
- Không lộ thông tin hệ thống nội bộ trong URL
- CTA tracking dùng query param rõ ràng, không dùng script theo dõi phía client ẩn

## 8. Acceptance Criteria

### AC-01: Hiển thị hero section đầy đủ

Given
- Visitor truy cập trang Access Control

When
- Trang được tải thành công

Then
- Hero section chiếm toàn màn hình (100vh)
- Badge "Access Control Solutions" hiển thị
- Headline "Flexible Smart Access Control That Grows with Your Business" hiển thị rõ ràng
- 2 CTA hiển thị cạnh nhau (Request a Demo, See Products)

### AC-02: CTA chính chuyển hướng đúng

Given
- Visitor đang xem hero section

When
- Visitor nhấn "Request a Demo"

Then
- Hệ thống chuyển hướng đến `/contact?ref=ac-hero`

### AC-03: Thông điệp scalability rõ ràng

Given
- Visitor là Building Manager đang đánh giá giải pháp quy mô lớn

When
- Visitor đọc subtext của hero

Then
- Subtext đề cập rõ khả năng quản lý từ 10 đến 10.000 căn hộ
- Thông điệp tạo sự tin tưởng về tính mở rộng

### AC-04: Responsive layout

Given
- Visitor truy cập từ thiết bị mobile

When
- Hero section hiển thị

Then
- Nội dung căn giữa, dễ đọc
- 2 CTA vẫn hiển thị và có thể nhấn
