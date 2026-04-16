# Feature: Hero sản phẩm

## 1. Business Goal

Tạo ấn tượng mạnh đầu tiên về sản phẩm cụ thể, hiển thị hình ảnh đẹp và tên + mô tả ngắn để thu hút người xem tiếp tục đọc. Hero section phải truyền tải ngay lập tức giá trị cốt lõi của sản phẩm và kích thích người dùng cuộn xuống tìm hiểu thêm.

## 2. Actors

- Visitor — khách vãng lai truy cập trang chi tiết sản phẩm qua link trực tiếp hoặc từ trang danh sách
- Prospect — khách hàng tiềm năng đang nghiên cứu sản phẩm để đưa ra quyết định mua

## 3. Preconditions

- Route /products/[slug] được truy cập với slug hợp lệ (ví dụ: padlock-2)
- Dữ liệu sản phẩm đã được fetch từ API hoặc CMS trước khi render
- File ảnh hero của sản phẩm tồn tại

## 4. Main Flow

1. Người dùng truy cập /products/padlock-2 (hoặc slug bất kỳ)
2. Server Component fetch dữ liệu sản phẩm theo slug
3. Render breadcrumb navigation: Home > Products > [Tên sản phẩm]
4. Render split layout:
   - Trái (60%): Hình ảnh hero sản phẩm lớn, full-height, object-cover
   - Phải (40%): Tên sản phẩm (H1), badge danh mục, mô tả ngắn 1–2 dòng, nhóm CTA (Get a demo + Download Data Sheet)
5. Hero chiếm 55–65% chiều cao màn hình (min-height: 60vh)
6. Ảnh có alt text đầy đủ
7. Mobile: stack column — ảnh trên, nội dung dưới

## 5. Business Rules

- Slug không hợp lệ → redirect notFound() (Next.js 404)
- Ảnh hero bắt buộc có alt text mô tả sản phẩm (không để trống)
- Hero chiếm 50–70% chiều cao màn hình đầu tiên trên desktop
- Breadcrumb luôn hiển thị: Home > Products > [Product Name]
- H1 là heading duy nhất trên trang — không có H1 khác
- Breadcrumb cần nav với aria-label="Breadcrumb"
- Desktop: split 60/40, tablet: 50/50, mobile: stack dọc
- Font H1: Playfair Display, clamp(2rem, 4vw, 3.5rem), màu #0f0f0f

## 6. Edge Cases

- Slug không tồn tại → gọi notFound() → Next.js render trang 404
- Ảnh hero bị lỗi / không tải được → placeholder màu #f0f0f0 với icon camera, không crash trang
- Tên sản phẩm quá dài (>60 ký tự) → wrap xuống dòng, không truncate
- Mô tả trống → ẩn phần description, CTA group dịch lên
- Fetch API thất bại → render error boundary, hiện fallback UI "Product unavailable"

## 7. Security Requirements

- Slug được sanitize trước khi dùng làm key fetch API (chỉ cho phép [a-z0-9-])
- Không render HTML từ CMS trực tiếp vào dangerouslySetInnerHTML
- Alt text không chứa script injection

## 8. Acceptance Criteria

### AC-01: Hero hiển thị đầy đủ hình ảnh, tên và mô tả

Given
- Trang chi tiết sản phẩm đã load thành công

When
- Người dùng xem phần đầu trang (hero)

Then
- Hiển thị hình ảnh sản phẩm lớn đúng với sản phẩm (không bị lỗi 404 hoặc placeholder)
- Hiển thị tên sản phẩm (H1) dùng Playfair Display, màu #0f0f0f
- Hiển thị breadcrumb: Home > Products > [Tên sản phẩm] với aria-label="Breadcrumb"
- Hiển thị mô tả ngắn 1–2 dòng đúng nội dung sản phẩm
- Hiển thị badge danh mục sản phẩm

### AC-02: Alt text của hình ảnh hero đầy đủ và đúng

Given
- Trang chi tiết sản phẩm đã load thành công

When
- Người dùng kiểm tra thuộc tính alt của hình hero

Then
- Alt text hiển thị đầy đủ và mô tả đúng sản phẩm
- Alt text không trống, không generic

### AC-03: Responsive đúng breakpoint

Given
- Trang chi tiết sản phẩm đang hiển thị

When
- Người dùng xem trên các thiết bị khác nhau

Then
- Desktop (≥1280px): split layout 60/40
- Tablet (768px–1279px): split layout 50/50
- Mobile (<768px): stack dọc, ảnh trên nội dung dưới
- Hero chiếm min 50% chiều cao viewport trên desktop

### AC-04: Slug không hợp lệ

Given
- Người dùng truy cập URL với slug không tồn tại

When
- Trang cố render

Then
- Hệ thống hiển thị trang 404 (Next.js notFound())

### AC-05: Ảnh lỗi

Given
- Ảnh hero không tải được

When
- Trang hiển thị

Then
- Placeholder hiển thị thay thế
- Trang không crash, tên và mô tả vẫn hiển thị
