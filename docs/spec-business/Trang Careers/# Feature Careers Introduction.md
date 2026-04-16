# Feature: Careers Introduction (Hero)

## 1. Business Goal

Tạo ấn tượng đầu tiên mạnh mẽ, định vị igloohome là nơi làm việc hấp dẫn và thúc đẩy visitor khám phá cơ hội nghề nghiệp.

## 2. Actors

- Visitor (job seeker, fresh graduate, experienced professional)

## 3. Preconditions

- Trang /careers tải thành công
- Font Cormorant Garamond và DM Sans đã load

## 4. Main Flow

1. Visitor truy cập /careers
2. Hero section hiển thị full-width với background tối (`#0f0f0f`)
3. Hiển thị label tag "Join Our Team"
4. Hiển thị H1: "Build the keyless future with us"
5. Hiển thị subtitle mô tả văn hóa công ty (1–2 câu)
6. Hiển thị 2 nút CTA:
   - "Explore careers" (primary, cam) → smooth scroll đến `#openings`
   - "Learn about us" (ghost) → /about

## 5. Business Rules

- H1 bắt buộc hiển thị, không được truncate
- H1 text cố định: "Build the keyless future with us"
- Nút "Explore careers" luôn visible ngay khi trang load
- Background không dùng ảnh nền, giữ clean (#0f0f0f)
- Fade-up animation: label → H1 → subtitle → buttons (stagger)
- "Explore careers" scroll: smooth scroll đến `#openings`, không phải navigate đến URL mới

## 6. Edge Cases

- Font chưa load → fallback serif / sans-serif
- Section `#openings` không tồn tại → scroll xuống cuối trang

## 7. Security Requirements

- Nội dung được tải qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị tiêu đề Hero

Given

- Visitor truy cập /careers

When

- Trang được tải

Then

- H1 "Build the keyless future with us" hiển thị nổi bật trên nền tối (`#0f0f0f`)
- Label tag "Join Our Team" hiển thị
- Subtitle mô tả văn hóa công ty hiển thị

### AC-02: Nút Explore careers hoạt động

Given

- Hero đang hiển thị

When

- Visitor click "Explore careers"

Then

- Trang smooth scroll đến section `#openings`
- Không reload trang

### AC-03: Nút Learn about us điều hướng đúng

Given

- Hero đang hiển thị

When

- Visitor click "Learn about us"

Then

- Điều hướng đến /about
