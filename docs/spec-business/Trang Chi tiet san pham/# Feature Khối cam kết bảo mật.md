# Feature: Khối cam kết bảo mật

## 1. Business Goal

Nhấn mạnh cam kết bảo vệ dữ liệu người dùng (GDPR, không bán dữ liệu, lưu trữ an toàn), xây dựng lòng tin đặc biệt cho khách hàng doanh nghiệp và tổ chức lớn vốn rất nhạy cảm với vấn đề dữ liệu.

## 2. Actors

- Enterprise decision maker — người ra quyết định mua, cần đảm bảo tuân thủ compliance
- IT/Security officer — người đánh giá rủi ro bảo mật của giải pháp
- Visitor thông thường — được reassure về quyền riêng tư cá nhân

## 3. Preconditions

- Trang chi tiết sản phẩm load thành công
- Section là static content — không lấy từ API, không thay đổi theo sản phẩm
- Hiển thị trên tất cả trang chi tiết sản phẩm bất kể slug

## 4. Main Flow

1. Render headline nổi bật: "Data privacy. Nothing else matters."
2. Render mô tả ngắn cam kết bảo vệ dữ liệu
3. Render 3 badge cam kết chính:
   - GDPR Compliant — tuân thủ GDPR đầy đủ
   - AWS Singapore — dữ liệu lưu trữ trên AWS Singapore
   - No Data Sale — không bán dữ liệu người dùng cho bên thứ ba
4. Render link "Read our Privacy Policy →" dẫn đến /privacy (optional)

## 5. Business Rules

- Nội dung headline cố định: "Data privacy. Nothing else matters." — không thay đổi
- 3 badge cam kết bắt buộc hiển thị đúng và đầy đủ: GDPR Compliant, AWS Singapore, No Data Sale
- Section hiển thị trên mọi trang chi tiết sản phẩm
- Link "Privacy Policy" là internal link — /privacy — không mở tab mới
- Không bỏ qua hoặc thay thế bất kỳ điểm nào trong 3 cam kết
- Nền section tối (#0f0f0f), chữ trắng

## 6. Edge Cases

- Không có link /privacy → ẩn link, giữ nguyên 3 badges và nội dung
- Màn hình nhỏ (<360px) → badges stack thành 1 cột, text-align center
- High contrast mode (OS) → đảm bảo tỉ lệ tương phản đạt WCAG AA (≥4.5:1) trên nền tối

## 7. Security Requirements

- Nội dung section là static — không có input, không có API call
- Link Privacy Policy validate đúng internal route, không redirect external
- Không có form hay user input trong section này

## 8. Acceptance Criteria

### AC-01: Khối cam kết bảo mật hiển thị đúng tiêu đề và mô tả

Given
- Trang chi tiết sản phẩm đã load thành công

When
- Người dùng scroll đến phần cam kết bảo mật

Then
- Hiển thị tiêu đề chính xác: "Data privacy. Nothing else matters."
- Hiển thị mô tả cam kết bảo vệ dữ liệu
- Nền section màu tối #0f0f0f

### AC-02: 3 badge cam kết đầy đủ và đúng

Given
- Section đang hiển thị

When
- Visitor xem 3 điểm cam kết

Then
- Hiển thị đúng 3 badge: GDPR Compliant, AWS Singapore, No Data Sale
- Không thiếu hoặc thay thế badge nào

### AC-03: Nút "Read more" / link Privacy Policy hoạt động đúng

Given
- Trang chi tiết sản phẩm đã load thành công

When
- Người dùng click link "Read our Privacy Policy"

Then
- Hệ thống chuyển đến trang /privacy (internal, không mở tab mới)
- Trang đích hiển thị đúng (không lỗi 404)

### AC-04: Khối hiển thị đầy đủ trên mọi thiết bị

Given
- Trang đang hiển thị trên desktop hoặc mobile

When
- Người dùng resize cửa sổ hoặc mở trên thiết bị mobile

Then
- Toàn bộ khối (nền tối, tiêu đề, mô tả, 3 badge, link) hiển thị đầy đủ
- Không bị cắt chữ, không overflow, không lỗi layout
