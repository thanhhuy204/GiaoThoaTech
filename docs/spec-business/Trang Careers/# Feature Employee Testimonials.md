# Feature: Employee Testimonials

## 1. Business Goal

Tạo độ tin cậy bằng cách để chính nhân viên igloohome chia sẻ trải nghiệm thực tế, giúp ứng viên hình dung rõ văn hóa làm việc.

## 2. Actors

- Visitor đang tìm hiểu môi trường làm việc

## 3. Preconditions

- Trang /careers tải thành công

## 4. Main Flow

1. Visitor cuộn đến section
2. Hiển thị background trắng (`#fff`)
3. Hiển thị label tag "Our People"
4. Hiển thị H2: "Hear from the team"
5. Hiển thị grid 3 testimonial cards, mỗi card có: avatar/initials, tên, vai trò, quote

## 5. Business Rules

- Avatar initials là 2 chữ cái đầu của tên (background `var(--dark)`, font Cormorant Garamond bold)
- Nếu có ảnh thực: dùng `<Image>` với fill và sizes
- Quote hiển thị đầy đủ, không bị truncate
- Role hiển thị màu `var(--primary)` để tạo điểm nhấn
- Tenure badge hiển thị (bg `rgba(232,97,74,0.1)`, color `var(--primary)`)
- Cards fade up khi vào viewport với stagger
- Layout: 3 cột desktop → 1 cột mobile

## 6. Edge Cases

- Ảnh avatar không load → fallback về initials div
- Mobile: 1 cột, cards stack dọc

## 7. Security Requirements

- Hình ảnh tải qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị 3 employee testimonials

Given

- Visitor cuộn đến section

When

- Section hiển thị

Then

- 3 cards với avatar/initials, tên, vai trò, quote hiển thị đầy đủ
- H2 "Hear from the team" hiển thị

### AC-02: Avatar initials hiển thị đúng

Given

- Chưa có ảnh thực

When

- Card render

Then

- Initials 2 chữ cái hiển thị trên nền tối, font Cormorant Garamond

### AC-03: Role màu primary

Given

- Card đang hiển thị

When

- Visitor nhìn vào role text

Then

- Role text có màu `var(--primary)` (đỏ cam)
