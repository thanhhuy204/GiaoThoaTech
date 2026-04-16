# Feature: Hero Banner Short-term Rentals

## 1. Business Goal
Tạo ấn tượng đầu tiên mạnh mẽ với nhóm khách hàng quản lý cho thuê ngắn hạn (Airbnb, VRBO, villa...). Truyền tải thông điệp rõ ràng rằng igloohome là giải pháp quản lý khóa dễ dàng, phù hợp với mô hình cho thuê ngắn hạn. Khuyến khích hành động ngay bằng CTA đặt lịch demo.

## 2. Actors
- **Property Manager** — quản lý nhiều bất động sản cho thuê ngắn hạn
- **Host** — chủ nhà Airbnb / villa cá nhân
- **Visitor** — khách truy cập website lần đầu

## 3. Preconditions
- Khách truy cập URL `/solutions/short-term-rental`
- Website hoạt động bình thường (HTTPS)
- Trang tải thành công trên trình duyệt

## 4. Main Flow
1. Visitor truy cập trang Short-term Rentals
2. Hệ thống hiển thị hero section toàn màn hình với ảnh nền villa/căn hộ sang trọng
3. Hệ thống hiển thị badge đối tác chính thức (ví dụ: Airbnb Official Partner) nếu partnership đang có hiệu lực
4. Hệ thống hiển thị headline, subtext mô tả giải pháp và CTA button
5. Hệ thống hiển thị product strip gồm 3 sản phẩm phù hợp: Deadbolt Go, Keybox 3, Padlock 2
6. Visitor nhấn CTA → chuyển đến trang Contact với ref tracking

## 5. Business Rules
- Badge đối tác chỉ hiển thị khi có partnership chính thức đang có hiệu lực
- CTA navigate đến `/contact?ref=str-hero` để tracking nguồn lead
- Product strip chỉ hiển thị 3 sản phẩm cố định phù hợp cho thuê ngắn hạn: Deadbolt Go, Keybox 3, Padlock 2
- Ảnh nền phải được nén ≤ 200KB (WebP) để đảm bảo tốc độ tải trang
- Trên mobile, product strip cho phép scroll ngang; badge đối tác ẩn đi

## 6. Edge Cases
- Ảnh nền không tải được → hệ thống hiển thị màu nền fallback tối (`#1a2b1a`) để chữ vẫn đọc được
- Hình ảnh sản phẩm trong product strip lỗi → hiển thị placeholder icon khóa
- JavaScript bị tắt → hero và product strip vẫn hiển thị tĩnh, không bị vỡ layout

## 7. Security Requirements
- Tất cả hình ảnh và liên kết sử dụng HTTPS
- Không lộ ID nội bộ sản phẩm hoặc thông tin hệ thống trong URL

## 8. Acceptance Criteria

### AC-01: Hiển thị hero section đầy đủ

Given
- Visitor truy cập trang Short-term Rentals

When
- Trang được tải thành công

Then
- Hero section chiếm toàn màn hình (100vh)
- Headline "Manage short-term rentals with ease" hiển thị rõ ràng
- CTA button hiển thị và có thể nhấn

### AC-02: CTA chuyển hướng đúng

Given
- Visitor đang xem hero section

When
- Visitor nhấn nút CTA (Get Started / Request Demo)

Then
- Hệ thống chuyển hướng đến `/contact?ref=str-hero`

### AC-03: Hiển thị product strip

Given
- Hero section đang hiển thị

When
- Trang được tải

Then
- Product strip hiển thị đúng 3 sản phẩm: Deadbolt Go, Keybox 3, Padlock 2
- Mỗi sản phẩm có hình ảnh và tên

### AC-04: Badge đối tác chỉ hiển thị khi có partnership

Given
- Partnership chính thức đang không hoạt động

When
- Visitor xem hero section

Then
- Badge đối tác không hiển thị trên giao diện
