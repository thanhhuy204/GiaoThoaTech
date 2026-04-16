# Feature: Diversity & Inclusivity Section

## 1. Business Goal

Thể hiện cam kết của igloo về xây dựng môi trường làm việc đa dạng và hòa nhập. Phần này tăng cường hình ảnh thương hiệu tích cực với khách hàng, đối tác quốc tế, và ứng viên tiềm năng — đặc biệt quan trọng với thị trường Bắc Mỹ và châu Âu, nơi D&I là tiêu chí đánh giá đối tác kinh doanh.

## 2. Actors

- Visitor (khách hàng tiềm năng) — đánh giá giá trị thương hiệu và trách nhiệm xã hội của igloo
- Đối tác doanh nghiệp quốc tế — kiểm tra cam kết D&I trước khi hợp tác
- Ứng viên tiềm năng — tìm hiểu môi trường làm việc có inclusivity không

## 3. Preconditions

- Người dùng đang truy cập trang /about
- Section D&I nằm sau phần Team Profiles (FEAT-016)

## 4. Main Flow

1. Trang /about load → section Diversity & Inclusivity render
2. Hiển thị tiêu đề section "Diversity & Inclusivity"
3. Hiển thị visual minh họa (ảnh hoặc illustration thể hiện đa dạng) ở cột trái
4. Hiển thị đoạn văn cam kết của công ty (2–3 câu ngắn) ở cột phải
5. Tùy chọn: hiển thị 3–4 stat/metric (tỉ lệ % nhân sự nữ, số quốc gia, số ngôn ngữ, ...)

## 5. Business Rules

- Nội dung mô tả ngắn gọn, dễ đọc, 2–3 câu, không dẫn chứng số liệu nếu không có data xác thực
- Không đề cập đến chính trị, tôn giáo, hoặc các vấn đề nhạy cảm cụ thể
- Ngôn ngữ: inclusive language, tránh dùng "he/she" — dùng "they/their" hoặc tên cụ thể
- Nếu hiển thị stats: chỉ dùng số liệu đã được xác minh nội bộ; nếu không có data thì ẩn stats row
- Visual/ảnh minh họa phải thể hiện sự đa dạng thực sự (giới tính, quốc tịch, độ tuổi)
- Nền section tối (#1a1a1a) để tạo contrast với các sections khác
- Layout 2 cột desktop: visual trái 50%, text phải 50%; mobile stack dọc (visual trên, text dưới)

## 6. Edge Cases

- Ảnh minh họa không load → hiển thị background gradient #2a2a2a thay thế
- Không có stats data → ẩn stats row hoàn toàn — không hiển thị số 0
- Mobile (<640px) → stack dọc, visual full-width, text đầy đủ bên dưới
- Stats count-up nếu JS tắt → hiển thị giá trị cuối ngay lập tức (không animate)

## 7. Security Requirements

- Không có input người dùng — rủi ro bảo mật thấp
- Nếu nội dung từ CMS: escape HTML, không render raw HTML trong body text
- Ảnh từ external CDN: chỉ whitelist domain đã cấu hình trong next.config.ts

## 8. Acceptance Criteria

### AC-01: Hiển thị khối Diversity & Inclusivity

Given
- Visitor truy cập trang /about

When
- Trang About được tải thành công

Then
- Hệ thống hiển thị section "Diversity & Inclusivity"
- Section nằm sau phần Team Profiles
- Nền section màu #1a1a1a tạo dark contrast với sections khác

### AC-02: Hiển thị nội dung mô tả

Given
- Section "Diversity & Inclusivity" đang hiển thị

When
- Visitor xem nội dung của section

Then
- Hệ thống hiển thị visual minh họa đội ngũ đa dạng
- Hệ thống hiển thị đoạn văn cam kết 2–3 câu về đa dạng và hòa nhập
- Mô tả ngắn gọn, dễ đọc, không bị cắt hoặc lỗi hiển thị

### AC-03: Layout responsive

Given
- Trang About đang hiển thị

When
- Người dùng xem trên desktop hoặc mobile

Then
- Desktop: layout 2 cột (visual trái, text phải)
- Mobile: stack dọc (visual trên, text dưới), không cắt chữ, không overflow

### AC-04: Ảnh minh họa không tải được

Given
- Ảnh diversity không load được

When
- Trang hiển thị section

Then
- Hiển thị background gradient #2a2a2a thay thế
- Text content vẫn hiển thị đầy đủ

### AC-05: Stats row (nếu có)

Given
- Có stats data được cấu hình

When
- Section vào viewport

Then
- Stats hiển thị với count-up animation từ 0 đến giá trị thực
- Nếu không có data: stats row ẩn hoàn toàn
