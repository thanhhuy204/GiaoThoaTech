# Feature: Sản phẩm nổi bật cho thuê ngắn hạn

## 1. Business Goal
Spotlight sản phẩm phù hợp nhất cho mô hình cho thuê ngắn hạn, giúp visitor ra quyết định nhanh hơn bằng cách giới thiệu tập trung một sản phẩm cụ thể kèm thông tin tóm tắt và lối dẫn đến trang chi tiết.

## 2. Actors
- **Property Manager / Host** — đang đánh giá sản phẩm khóa thông minh
- **Visitor** — muốn xem sản phẩm cụ thể phù hợp với nhu cầu cho thuê ngắn hạn

## 3. Preconditions
- Visitor đã tìm hiểu về giải pháp và muốn xem sản phẩm cụ thể
- Trang Short-term Rentals tải thành công

## 4. Main Flow
1. Visitor cuộn đến section Product Highlight
2. Hệ thống hiển thị label định danh "Featured Product"
3. Hệ thống hiển thị headline "Best smart locks for short term rentals"
4. Hệ thống hiển thị hình ảnh sản phẩm nổi bật (Deadbolt Go) cùng tên model và mô tả ngắn
5. Visitor xem thông tin sản phẩm và có thể chuyển đến trang chi tiết qua CTA

## 5. Business Rules
- Sản phẩm được spotlight phải là sản phẩm được đánh giá phù hợp nhất cho short-term rental, hiện tại là **Deadbolt Go**
- CTA phải navigate đến trang chi tiết sản phẩm tương ứng (`/products/` + slug sản phẩm)
- Label "Featured Product" phải hiển thị phía trên headline để định hướng ngay cho visitor
- Mô tả sản phẩm tập trung vào tính năng nổi bật liên quan đến cho thuê ngắn hạn (không phải tất cả spec kỹ thuật)
- Nếu sản phẩm featured thay đổi trong tương lai, chỉ cần cập nhật slug và hình ảnh — không thay đổi cấu trúc nghiệp vụ

## 6. Edge Cases
- Hình ảnh sản phẩm không tải → tên model và mô tả vẫn hiển thị đủ để visitor hiểu sản phẩm
- Trang chi tiết sản phẩm không tồn tại → CTA vẫn hiển thị, hệ thống xử lý lỗi 404 theo chuẩn chung
- JavaScript tắt → thông tin sản phẩm tĩnh vẫn hiển thị

## 7. Security Requirements
- Không lộ ID nội bộ sản phẩm trong URL (dùng slug thân thiện)
- Hình ảnh sản phẩm phục vụ qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị sản phẩm nổi bật đúng

Given
- Visitor cuộn đến section Product Highlight

When
- Section hiển thị trong viewport

Then
- Label "Featured Product" hiển thị phía trên
- Headline "Best smart locks for short term rentals" hiển thị rõ ràng
- Hình ảnh Deadbolt Go hiển thị cùng tên model và mô tả ngắn

### AC-02: CTA dẫn đến trang chi tiết sản phẩm

Given
- Visitor xem thông tin sản phẩm nổi bật

When
- Visitor nhấn nút CTA

Then
- Hệ thống chuyển hướng đến trang chi tiết sản phẩm tương ứng (`/products/[slug]`)

### AC-03: Thông tin sản phẩm đầy đủ

Given
- Section Product Highlight đang hiển thị

When
- Visitor xem nội dung

Then
- Hình ảnh sản phẩm rõ nét
- Tên model hiển thị ("Deadbolt Go")
- Mô tả ngắn về tính năng nổi bật hiển thị
