# Feature: Teaser trích dẫn khách hàng

## 1. Business Goal

Tăng lòng tin và giảm lo ngại của prospect bằng cách hiển thị trích dẫn thực tế từ các khách hàng đã triển khai thành công. Khác với FEAT-029 (1 quote liên quan sản phẩm), section này trên trang Contact hiển thị nhiều quotes từ nhiều doanh nghiệp khác nhau để tạo breadth của social proof, khuyến khích visitor hoàn tất submit form.

## 2. Actors

- Prospect B2B — đang cân nhắc submit form, cần validation từ peer companies
- Decision maker — nhận ra tên công ty quen thuộc (Loftaffair, Hornbach...) tăng trust

## 3. Preconditions

- Dữ liệu quotes được populate (static data hoặc từ CMS)
- Logo khách hàng tồn tại tại `public/images/customers/` hoặc CDN URL
- Section render trên trang /contact, cạnh hoặc dưới form

## 4. Main Flow

1. Render tiêu đề section: "What our customers say"
2. Render danh sách quotes (tối thiểu 2, tối đa 6), mỗi item gồm:
   - Logo khách hàng (grayscale mặc định, color khi hover)
   - Quote text ngắn (1–3 câu, italic)
   - Attribution: tên người, chức vụ, công ty
   - (Optional) Tag sản phẩm liên quan
3. Desktop: grid 3 cột (2 cột nếu chỉ có 2 quotes)
4. Tablet: 2 cột
5. Mobile: horizontal scroll snap — 1 card visible, `scroll-snap-type: x mandatory`
6. Ví dụ quotes: Loftaffair, Kayakomat, Hornbach

## 5. Business Rules

- Hiển thị tối thiểu 2, tối đa 6 quotes
- Nếu có nhiều hơn 6, chỉ hiển thị 6 đầu (sorted by `isFeatured`, rồi theo `order`)
- Nếu có 0 quotes → ẩn toàn bộ section
- Logo khách hàng bắt buộc có `alt` text là tên công ty
- Quote text tối đa 3 câu — nếu dài hơn, truncate với `-webkit-line-clamp: 4` (không cần "Read more")
- Quote không cần linked đến product detail (không navigate khi click card)
- Quote content không render qua `dangerouslySetInnerHTML`

## 6. Edge Cases

| Tình huống | Hành vi mong đợi |
| --- | --- |
| Quotes array rỗng | Ẩn toàn bộ section |
| Chỉ có 1 quote | Render 1 card, full-width hoặc centered |
| Logo không load | Fallback: text tên công ty bold |
| Quote text quá dài | Clamp với `-webkit-line-clamp: 4` |
| Mobile: chỉ có 2 quotes | Horizontal scroll với 2 cards, centered |
| Card không có product tag | Ẩn tag area, attribution flush bottom |

## 7. Security Requirements

- Quote content không render qua `dangerouslySetInnerHTML`
- Logo URL validate — chỉ internal path hoặc allowlist CDN
- Không expose email hay thông tin cá nhân trong quotes
- Hình ảnh logo dùng HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị teaser trích dẫn khách hàng

Given

- Visitor truy cập trang "/contact"

When

- Trang được tải

Then

- Section hiển thị đúng số quotes (2–6)
- Tiêu đề "What our customers say"
- Grid 3 cột desktop, 2 cột tablet, horizontal scroll mobile

### AC-02: Logo và hover effect

Given

- Teaser trích dẫn đang hiển thị

When

- Visitor hover vào card

Then

- Logo grayscale mặc định (opacity 0.55), chuyển sang màu đầy đủ khi hover card
- Card lift effect + shadow khi hover
- Staggered fade-in animation khi scroll vào viewport

### AC-03: Section ẩn khi không có quote

Given

- Quotes array rỗng

When

- Trang được tải

Then

- Section ẩn hoàn toàn, không hiển thị placeholder hay empty container

### AC-04: Mobile horizontal scroll

Given

- Visitor dùng thiết bị mobile

When

- Visitor xem section quotes

Then

- Horizontal scroll snap hoạt động mượt (scroll-snap-type: x mandatory)
- Scroll dots indicator hiển thị
