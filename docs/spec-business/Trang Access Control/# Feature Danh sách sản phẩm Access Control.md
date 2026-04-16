# Feature: Danh sách sản phẩm Access Control

## 1. Business Goal
Giới thiệu các sản phẩm phần cứng và phần mềm trong hệ sinh thái Access Control của igloohome. Khuyến khích khách hàng tìm hiểu sâu từng sản phẩm thông qua CTA dẫn đến trang chi tiết, từ đó hỗ trợ quá trình ra quyết định mua hàng.

## 2. Actors
- **Building Manager / Property Developer** — đang đánh giá phần cứng và phần mềm phù hợp
- **Security Officer** — cần hiểu sản phẩm nào kiểm soát loại thiết bị nào
- **Visitor** — muốn xem sản phẩm cụ thể trước khi liên hệ

## 3. Preconditions
- Visitor đã đọc qua các tính năng cốt lõi và muốn xem sản phẩm cụ thể
- Trang Access Control tải thành công

## 4. Main Flow
1. Visitor cuộn đến section "Meet our Access Control Products"
2. Hệ thống hiển thị label "Our Products" và headline tổng quan
3. Hệ thống hiển thị 2 card sản phẩm song song: Switch Door Controller và iglooworks
4. Mỗi card hiển thị hình ảnh sản phẩm, tên, tag phân loại, mô tả ngắn và CTA riêng
5. Visitor nhấn CTA trên card → chuyển đến trang chi tiết sản phẩm tương ứng

## 5. Business Rules
- Phải hiển thị đúng 2 sản phẩm trong hệ sinh thái Access Control:
  1. **Switch Door Controller** — phần cứng compact, tích hợp khóa điện 9–24V vào hệ sinh thái igloo
  2. **iglooworks** — phần mềm quản lý truy cập thống nhất, tích hợp data insights
- Tag sản phẩm phải phân biệt rõ vai trò:
  - Switch: "Super Compact and Adaptable"
  - iglooworks: "igloo's Software"
- CTA của Switch dẫn đến `/products/switch`
- CTA của iglooworks dẫn đến `/products/iglooworks`
- Không được thêm sản phẩm ngoài hệ sinh thái Access Control vào section này
- Mô tả sản phẩm tập trung vào giá trị nghiệp vụ, không liệt kê spec kỹ thuật chi tiết

## 6. Edge Cases
- Hình ảnh sản phẩm không tải → tên, tag và mô tả vẫn hiển thị đủ
- Trang chi tiết sản phẩm không tồn tại → CTA vẫn hiển thị, xử lý 404 theo chuẩn
- Trên mobile, 2 card xếp dọc

## 7. Security Requirements
- Không lộ ID nội bộ sản phẩm trong URL (dùng slug)
- Hình ảnh phục vụ qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị 2 sản phẩm đúng

Given
- Visitor cuộn đến section sản phẩm Access Control

When
- Section hiển thị trong viewport

Then
- 2 card sản phẩm hiển thị song song: Switch Door Controller và iglooworks
- Mỗi card có hình ảnh, tên, tag, mô tả và CTA

### AC-02: CTA dẫn đến trang chi tiết đúng

Given
- Visitor đang xem card sản phẩm

When
- Visitor nhấn CTA của Switch Door Controller

Then
- Hệ thống chuyển hướng đến `/products/switch`

When
- Visitor nhấn CTA của iglooworks

Then
- Hệ thống chuyển hướng đến `/products/iglooworks`

### AC-03: Phân biệt rõ phần cứng và phần mềm

Given
- Visitor xem 2 card sản phẩm

When
- Visitor đọc tag phân loại

Then
- Switch: tag "Super Compact and Adaptable" hiển thị
- iglooworks: tag "igloo's Software" hiển thị rõ ràng

### AC-04: Responsive layout

Given
- Visitor truy cập từ mobile

When
- Section hiển thị

Then
- 2 card xếp dọc, không chồng lên nhau
