# Feature: Teaser trích dẫn khách hàng liên quan

## 1. Business Goal

Tăng lòng tin và social proof bằng trích dẫn thực tế từ khách hàng đã sử dụng đúng sản phẩm đang xem. Quote liên quan trực tiếp đến sản phẩm tạo sự tin tưởng mạnh hơn so với testimonial chung chung, từ đó thúc đẩy visitor tiếp tục xuống CTA.

## 2. Actors

- Visitor — đọc testimonial để validate quyết định
- Prospect B2B — quan tâm đến tên công ty/logo khách hàng để đánh giá mức độ tin cậy

## 3. Preconditions

- Trang chi tiết sản phẩm load thành công
- ProductDetail.customerQuote được populate từ dữ liệu
- Nếu customerQuote === null, section không render

## 4. Main Flow

1. Kiểm tra customerQuote !== null — nếu null, return null (không render)
2. Render layout quote:
   - Logo khách hàng (horizontal, max-height: 40px), grayscale mặc định → màu khi hover
   - Nội dung quote (decorative quotation mark lớn màu cam)
   - Attribution: tên người, chức vụ, công ty
   - Tag sản phẩm liên quan (optional)
3. Section render sau SecurityCommitment (FEAT-028)

## 5. Business Rules

- Nếu customerQuote === null hoặc undefined → ẩn hoàn toàn section (không render placeholder)
- Quote phải liên quan trực tiếp đến sản phẩm (customerQuote.productSlug === product.slug)
- Logo khách hàng bắt buộc có alt text là tên công ty
- Không hiển thị quá 1 quote trên trang chi tiết sản phẩm
- Quote text tối đa 3 câu — nếu dài hơn, truncate với nút "Read more"
- Logo khách hàng grayscale mặc định (opacity 0.6), chuyển màu khi hover

## 6. Edge Cases

- customerQuote === null → ẩn hoàn toàn section
- Logo không tải được → thay bằng text tên công ty (font-weight: 700)
- Quote text quá dài (>3 câu) → hiển thị 3 câu + nút "Read more"
- Không có avatar người dùng → ẩn avatar, chỉ hiển thị tên + chức vụ

## 7. Security Requirements

- Quote content không render qua dangerouslySetInnerHTML
- Logo URL validate — chỉ cho phép internal path hoặc allowlist CDN domain
- Không expose thông tin cá nhân nhạy cảm của người để quote

## 8. Acceptance Criteria

### AC-01: Hiển thị teaser trích dẫn khách hàng

Given
- Visitor truy cập trang chi tiết sản phẩm có customerQuote

When
- Trang được tải

Then
- Section hiển thị đầy đủ: logo khách hàng, quote text, attribution (tên, chức vụ, công ty)
- Decorative quotation mark lớn hiển thị màu cam
- Tag sản phẩm liên quan hiển thị nếu có

### AC-02: Logo khách hàng có alt text và hiệu ứng hover

Given
- Section đang hiển thị

When
- Visitor xem logo khách hàng

Then
- Logo hiển thị grayscale mặc định (opacity 0.6)
- Hover: logo chuyển sang màu đầy đủ (opacity 1)
- Alt text là tên công ty khách hàng

### AC-03: Section ẩn khi không có trích dẫn

Given
- Trang chi tiết sản phẩm không có customerQuote (null)

When
- Trang được tải

Then
- Section ẩn hoàn toàn, không hiển thị placeholder hay empty container
