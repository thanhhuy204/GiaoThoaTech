# Feature: Lợi ích chính (bullet points)

## 1. Business Goal

Liệt kê lợi ích nổi bật của sản phẩm để khách hàng thấy giá trị ngay lập tức, ngay sau khi đọc hero section. Mỗi bullet point phải truyền tải một lợi thế cạnh tranh rõ ràng, dễ scan, hỗ trợ quyết định mua hàng nhanh hơn.

## 2. Actors

- Visitor — khách đang scan trang để đánh giá sản phẩm nhanh
- Prospect — khách hàng tiềm năng so sánh sản phẩm với đối thủ
- Decision maker — người ra quyết định mua, cần thấy spec kỹ thuật nổi bật ngay

## 3. Preconditions

- Trang chi tiết sản phẩm load thành công
- ProductDetail.benefits được populate đầy đủ
- Section này render ngay sau ProductHero (FEAT-025) trên trang

## 4. Main Flow

1. Render tiêu đề section: "Key Benefits" hoặc "Why [Product Name]?"
2. Render danh sách benefit, mỗi item gồm:
   - Icon check SVG custom màu primary (#E8614A)
   - Tiêu đề ngắn (bold)
   - Mô tả ngắn (optional, 1 dòng)
3. Ví dụ benefits cho Padlock 2: IP67 chống nước & bụi, Chịu nhiệt -20°C đến 50°C, 150,000+ chu kỳ khóa/mở, Bluetooth 4.2 + algoPIN™ offline, Military-grade AES-128 encryption
4. Layout 2 cột trên desktop, 1 cột trên mobile

## 5. Business Rules

- Danh sách benefits lấy từ ProductDetail.benefits — không hardcode trong component
- Hiển thị tối đa 8 benefits; nếu nhiều hơn 8, ẩn phần thừa sau nút "Show all"
- Mỗi benefit bắt buộc có title; trường description là optional
- Icon check là SVG nội tuyến — không dùng thư viện icon ngoài, không dùng Unicode ✓
- Section chỉ render khi benefits.length > 0
- Layout 2 cột desktop (≥1024px), 1 cột mobile (<1024px)

## 6. Edge Cases

- benefits mảng rỗng → ẩn toàn bộ section, không render placeholder
- Benefit title quá dài (>80 ký tự) → wrap xuống dòng, không truncate
- Chỉ có 1 benefit → layout 1 cột, không tạo cột trống
- Số benefits lẻ → cột cuối chỉ có 1 item, layout không bị vỡ
- description bị null/undefined → chỉ render title, bỏ qua description
- Nhiều hơn 8 benefits → hiển thị 8 đầu, nút "Show all X benefits" mở rộng danh sách
- Mobile → bullet tự động responsive, chữ không bị cắt hoặc overflow

## 7. Security Requirements

- Không render title hoặc description qua dangerouslySetInnerHTML
- Content từ API phải được escape — dùng React text rendering thông thường

## 8. Acceptance Criteria

### AC-01: Danh sách bullet lợi ích hiển thị đầy đủ và đúng

Given
- Trang chi tiết sản phẩm đã load thành công

When
- Người dùng scroll đến phần lợi ích chính

Then
- Hiển thị danh sách bullet points đúng với sản phẩm
- Mỗi bullet ngắn gọn, rõ ràng, không bị cắt chữ
- Icon check SVG màu #E8614A cho mỗi item

### AC-02: Layout và responsive

Given
- Section đang hiển thị

When
- Người dùng xem trên desktop và mobile

Then
- Desktop (≥1024px): 2 cột
- Mobile (<1024px): 1 cột
- Bullet points không bị lệch hàng, chữ không bị cắt hoặc overflow

### AC-03: Section ẩn khi không có benefits

Given
- ProductDetail.benefits là mảng rỗng

When
- Trang render

Then
- Section bị ẩn hoàn toàn, không hiển thị placeholder
