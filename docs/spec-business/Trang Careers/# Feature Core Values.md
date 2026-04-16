# Feature: Core Values

## 1. Business Goal

Giới thiệu các giá trị cốt lõi của igloohome để thu hút ứng viên có cùng mindset và định hướng.

## 2. Actors

- Visitor quan tâm đến văn hóa công ty

## 3. Preconditions

- Trang /careers tải thành công

## 4. Main Flow

1. Visitor cuộn đến section
2. Hiển thị background kem ấm (`#F5F4F1`)
3. Hiển thị label tag "Our Values"
4. Hiển thị H2: "Our core values"
5. Hiển thị subtitle ngắn
6. Hiển thị grid 6 value cards, mỗi card có: icon, tiêu đề màu đỏ cam (`var(--primary)`), mô tả ngắn

## 5. Business Rules

- Hiển thị đúng 6 values theo thứ tự:
  1. Customer First
  2. Ownership
  3. Integrity
  4. Innovation
  5. Teamwork
  6. Excellence
- Card title phải dùng màu `var(--primary)` (đỏ cam) — không được thay đổi
- Không được bỏ bất kỳ card nào
- Layout: 3 cột desktop → 2 cột tablet → 1 cột mobile
- Cards fade up khi vào viewport với stagger

## 6. Edge Cases

- Mobile: 1 cột, cards stack dọc
- Icon không tải được → icon mặc định

## 7. Security Requirements

- Hình ảnh tải qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị tiêu đề section

Given

- Visitor cuộn đến section

When

- Section hiển thị

Then

- H2 "Our core values" hiển thị trên nền kem (`#F5F4F1`)

### AC-02: Card title màu primary

Given

- Section đang hiển thị

When

- Visitor xem cards

Then

- Tiêu đề mỗi card hiển thị màu `var(--primary)` (đỏ cam)

### AC-03: Đủ 6 value cards

Given

- Section đang hiển thị

When

- Visitor đếm số cards

Then

- Có đúng 6 value cards với icon, title, description
- Thứ tự: Customer First, Ownership, Integrity, Innovation, Teamwork, Excellence
