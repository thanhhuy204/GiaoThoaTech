# Feature : Hero Banner

## 1. Business Goal
Tạo ấn tượng đầu tiên mạnh mẽ về thương hiệu, nhấn mạnh công nghệ truy cập thông minh hoạt động đáng tin cậy mọi lúc mọi nơi, nhằm thu hút người xem và khuyến khích bấm nút liên hệ hoặc xem sản phẩm.

## 2. Actors
- Visitor (khách truy cập website, không đăng nhập)
- Potential User (chủ nhà cho thuê, quản lý bất động sản, doanh nghiệp)

## 3. Preconditions
- Website hoạt động bình thường (HTTPS)
- Trang chủ load thành công trên trình duyệt web

## 4. Main Flow
1. Người dùng truy cập trang chủ (/)
2. Hệ thống hiển thị Hero Banner chiếm toàn màn hình (100vh) với nền tối kiểu vũ trụ (thuần CSS — không dùng ảnh nền nặng)
3. Hiển thị badge nhỏ phía trên tiêu đề: "Smart Access Technology" (có dot nhấp nháy)
4. Hiển thị tiêu đề chính: "Smart Access That Works Every Time."
5. Hiển thị dòng phụ: "Even in space." — chữ "space." màu cam, italic
6. Hiển thị ổ khóa thông minh lơ lửng (floating) ở hai bên nội dung — ẩn trên mobile (≤768px)
7. Hiển thị 2 nút CTA:
   - Nút 1: "Get a Demo" (màu cam primary) → navigate /contact?ref=hero-banner
   - Nút 2: "See Products" (màu trắng/outline) → navigate /products?ref=hero-banner
8. Hiển thị thanh thống kê phía dưới cùng banner: 100K+ Testing Cycles | 50+ Countries | 8+ Awards Won
9. Hiển thị scroll indicator (chữ "SCROLL" + đường kẻ dọc mờ) ở dưới cùng

## 5. Business Rules
- Nền vũ trụ dùng thuần CSS (star rain 3 layer parallax, glow cam, grid mờ, vignette) — không dùng ảnh nền nặng, WebGL, canvas
- Chữ màu trắng/cam, nổi bật trên nền tối, tỉ lệ tương phản đạt WCAG AA
- Không dùng hiệu ứng phức tạp làm chậm trang
- CTA tracking: nút "Get a Demo" navigate /contact?ref=hero-banner, nút "See Products" navigate /products?ref=hero-banner
- Floating locks ẩn trên mobile (≤768px)
- Nút CTA dùng <Link> (Next.js) thay vì <button> để có semantics điều hướng đúng
- Cả 2 nút có aria-label rõ ràng

## 6. Edge Cases
- Ảnh padlock không tải được → khu vực lock trống, text và CTA vẫn hiện đầy đủ
- JavaScript bị tắt → banner hiển thị đầy đủ (text, CTA), không có animation — chấp nhận được
- Màn hình rất nhỏ (<400px) → floating locks ẩn, text scale nhỏ hơn, CTA xếp dọc
- Kết nối chậm → CSS load trước (nền tối hiện ngay), ảnh lock lazy-load sau

## 7. Security Requirements
- Toàn bộ nội dung và hình ảnh dùng HTTPS
- Không chứa mã hoặc dữ liệu nhạy cảm trong biểu ngữ

## 8. Acceptance Criteria

### AC-01: Hiển thị Hero Banner

Given
- Visitor truy cập trang chủ

When
- Trang chủ được tải

Then
- Hệ thống hiển thị Hero Banner chiếm phần đầu trang
- Hệ thống hiển thị hình nền vũ trụ với ổ khóa

### AC-02: Hiển thị nội dung tiêu đề

Given
- Hero Banner đang hiển thị

When
- Visitor xem phần Hero Banner

Then
- Hệ thống hiển thị badge "Smart Access Technology" (có dot nhấp nháy)
- Hệ thống hiển thị tiêu đề H1 "Smart Access That Works Every Time."
- Hệ thống hiển thị dòng phụ "Even in space." — chữ "space." màu cam italic

### AC-03: Hiển thị nút CTA

Given
- Hero Banner đang hiển thị

When
- Visitor xem phần CTA

Then
- Hệ thống hiển thị nút "Get a Demo" (màu cam, có icon mũi tên SVG)
- Hệ thống hiển thị nút "See Products" (outline trắng)
- Cả 2 nút có aria-label và không có gạch chân (text-decoration: none)

### AC-04: Hiển thị thanh thống kê và scroll indicator

Given
- Hero Banner đang hiển thị

When
- Visitor xem cuối banner

Then
- Thanh thống kê hiển thị: 100K+ Testing Cycles | 50+ Countries | 8+ Awards Won
- Scroll indicator ("SCROLL" + đường kẻ dọc) hiển thị ở dưới cùng

### AC-05: Responsive — floating locks ẩn trên mobile

Given
- Trang hiển thị trên thiết bị mobile (≤768px)

When
- Visitor xem Hero Banner

Then
- Floating lock images ẩn hoàn toàn
- Text và CTA vẫn hiển thị đầy đủ, không lỗi layout

### AC-06: Xử lý khi ảnh lock không tải

Given
- Ảnh padlock không tải được

When
- Trang được tải

Then
- Khu vực lock trống (không hiện broken image)
- Nội dung tiêu đề, badge, thống kê và các nút CTA vẫn hiển thị đầy đủ