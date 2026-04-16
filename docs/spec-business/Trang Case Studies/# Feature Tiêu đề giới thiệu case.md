# Feature: Tiêu đề giới thiệu trang Case Studies

## 1. Business Goal

Tạo ấn tượng đầu tiên mạnh mẽ cho trang Case Studies. Tiêu đề truyền đạt ngay lập tức rằng trang này chứa các câu chuyện thành công thực tế của khách hàng igloo — giúp visitor định hướng nội dung, tăng thời gian ở lại trang, và khuyến khích đọc tiếp để tìm ví dụ phù hợp với ngành nghề của mình.

## 2. Actors

- Visitor (khách hàng tiềm năng) — tìm kiếm bằng chứng thực tế trước khi quyết định mua
- Decision maker (B2B) — cần case study cụ thể để thuyết phục nội bộ

## 3. Preconditions

- Người dùng truy cập trang /case-studies
- Hero section là phần đầu tiên hiển thị khi trang load (above the fold)
- Dưới hero là bộ lọc tag (FEAT-021) và danh sách case studies (FEAT-022)

## 4. Main Flow

1. Người dùng truy cập /case-studies
2. Trang load → Hero section render ngay lập tức (above the fold)
3. Hiển thị breadcrumb: Home > Case Studies
4. Hiển thị H1: "See how we helped customers scale their assets and real estate"
5. Hiển thị subtitle mô tả ngắn về nội dung trang
6. Hiển thị background visual (gradient tối hoặc pattern)

## 5. Business Rules

- H1 phải chính xác: "See how we helped customers scale their assets and real estate" — không thay đổi tùy ý
- H1 là heading duy nhất level 1 trên trang (SEO requirement)
- Breadcrumb phải có aria-label="Breadcrumb" và structured data JSON-LD (schema.org BreadcrumbList)
- Subtitle text phải nhắc đến ít nhất 1 trong các ngành: hospitality, real estate, property management
- Background không được ảnh hưởng đến legibility của H1 (contrast ratio ≥ 4.5:1)
- Màu chữ H1: trắng (#ffffff), nền tối (#0f0f0f → #1a1a1a)
- Font H1: Playfair Display, bold, 52px desktop / 36px tablet / 28px mobile

## 6. Edge Cases

- Mobile (<640px) → H1 28px, subtitle 16px, padding giảm
- Background image không load → fallback về gradient #0f0f0f → #1a1a1a
- Reduced motion → bỏ tất cả entrance animations, hiển thị nội dung ngay
- Viewport rất nhỏ (<375px) → H1 24px, không wrap heading quá xấu

## 7. Security Requirements

- H1 text là hardcoded string — không từ user input, không rủi ro XSS
- Nếu subtitle từ CMS: escape HTML
- Background image URL từ /public — không dynamic, không cần sanitize

## 8. Acceptance Criteria

### AC-01: Hiển thị hero section đúng nội dung

Given
- Visitor truy cập trang /case-studies

When
- Trang được tải

Then
- H1 hiển thị chính xác: "See how we helped customers scale their assets and real estate"
- H1 là heading level 1 duy nhất trên trang
- Breadcrumb hiển thị: Home > Case Studies với link đúng
- Breadcrumb có aria-label="Breadcrumb"

### AC-02: Typography và màu sắc đúng spec

Given
- Hero section đang hiển thị

When
- Visitor xem phần đầu trang

Then
- H1 dùng font Playfair Display, màu trắng (#ffffff)
- Background section màu tối — contrast H1 đạt WCAG AA (≥4.5:1)
- Subtitle text hiển thị màu rgba(255,255,255,0.7)

### AC-03: Responsive đúng breakpoint

Given
- Hero section đang hiển thị

When
- Visitor xem trên các thiết bị khác nhau

Then
- Desktop: H1 52px
- Tablet: H1 36px
- Mobile (<640px): H1 28px, subtitle 16px
- Tiêu đề không bị cắt hoặc lỗi hiển thị ở bất kỳ viewport nào

### AC-04: Animation và reduced motion

Given
- Hero section render

When
- Trang load lần đầu

Then
- Entrance animation H1 và subtitle hoạt động khi page load
- prefers-reduced-motion: không animation, nội dung hiển thị ngay
