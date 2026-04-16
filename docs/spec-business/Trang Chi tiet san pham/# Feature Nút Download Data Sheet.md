# Feature: Nút "Download Data Sheet"

## 1. Business Goal

Cho phép khách hàng tiềm năng — đặc biệt là kỹ sư, procurement officer, và decision maker kỹ thuật — tải tài liệu kỹ thuật chi tiết (datasheet) để tự nghiên cứu thông số sản phẩm offline. Đây là tài liệu hỗ trợ quyết định mua quan trọng trong quy trình B2B.

## 2. Actors

- Technical evaluator — kỹ sư hoặc IT người cần thông số kỹ thuật đầy đủ
- Procurement officer — người so sánh spec để ra quyết định mua
- Decision maker — muốn lưu tài liệu để chia sẻ nội bộ

## 3. Preconditions

- Trang chi tiết sản phẩm load thành công
- ProductDetail.datasheetUrl không phải null và là URL hợp lệ
- Nút chỉ hiển thị khi datasheetUrl !== null

## 4. Main Flow

1. Kiểm tra datasheetUrl !== null — nếu null, không render nút
2. Render nút "Download Data Sheet" với icon download bên trái
3. Người dùng click nút:
   - Nếu PDF là internal path → trigger download trực tiếp (attribute download)
   - Nếu PDF là external URL → mở tab mới (target="_blank" rel="noopener noreferrer")
4. Trình duyệt xử lý download hoặc mở file trong tab mới

## 5. Business Rules

- Nút ẩn hoàn toàn khi datasheetUrl === null — không render disabled state
- PDF internal path (/pdfs/[product]-datasheet.pdf): dùng thẻ a với attribute download
- PDF external URL (CDN): dùng thẻ a với target="_blank" rel="noopener noreferrer"
- Tên file download (nếu internal): [product-slug]-datasheet.pdf — lowercase, hyphen
- Nút luôn là secondary style (outlined) — không bao giờ dùng primary cam filled
- Click event không gọi API — download xử lý bởi browser natively
- Nút có aria-label: "Download [Product Name] Data Sheet"

## 6. Edge Cases

- datasheetUrl === null → ẩn nút hoàn toàn, không render gì
- PDF URL không tồn tại (404) → browser hiện lỗi tự nhiên (không custom handle)
- Người dùng click nhiều lần nhanh → mỗi click mở 1 download/tab — chấp nhận được
- File PDF quá lớn (>50MB) → vẫn trigger download — không có size limit ở frontend
- Browser chặn popup → nếu external URL, browser có thể chặn tab mới — không xử lý thêm

## 7. Security Requirements

- datasheetUrl validate là URL hợp lệ trước khi render trong href
- External URL: chỉ cho phép allowlist domain (CDN domain của igloo)
- Không redirect qua unknown domains
- rel="noopener noreferrer" bắt buộc với target="_blank"

## 8. Acceptance Criteria

### AC-01: Hiển thị nút "Download Data Sheet"

Given
- Visitor truy cập trang chi tiết sản phẩm có datasheetUrl hợp lệ

When
- Trang được tải

Then
- Nút "Download Data Sheet" hiển thị với style outlined (cam border, cam text, transparent background)
- Icon download hiển thị bên trái label
- aria-label là "Download [Product Name] Data Sheet"

### AC-02: Tải hoặc mở file datasheet

Given
- Nút "Download Data Sheet" đang hiển thị

When
- Visitor click nút

Then
- Internal URL → browser trigger download file PDF
- External URL → mở tab mới với rel="noopener noreferrer"

### AC-03: Xử lý khi không có datasheet

Given
- Trang chi tiết sản phẩm có datasheetUrl === null

When
- Trang được tải

Then
- Nút "Download Data Sheet" ẩn hoàn toàn — không render, không hiện disabled state
