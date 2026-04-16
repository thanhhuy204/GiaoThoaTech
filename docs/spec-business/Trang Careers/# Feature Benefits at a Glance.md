# Feature: Benefits at a Glance

## 1. Business Goal

Thu hút ứng viên bằng cách trình bày rõ ràng các phúc lợi cạnh tranh của igloohome.

## 2. Actors

- Visitor đang đánh giá cơ hội nghề nghiệp

## 3. Preconditions

- Trang /careers được tải thành công

## 4. Main Flow

1. Visitor cuộn đến section
2. Hiển thị background tối ấm (`#1a1916`)
3. Hiển thị label tag "Perks & Benefits"
4. Hiển thị H2: "Benefits at a glance"
5. Hiển thị subtitle ngắn
6. Hiển thị grid 6 benefit items, mỗi item có: icon lớn, tên phúc lợi, mô tả ngắn

## 5. Business Rules

- Hiển thị đúng 6 benefits theo thứ tự:
  1. Dental Coverage
  2. Paid Time Off
  3. Well-being
  4. Medical Insurance
  5. Casual Work Setting
  6. Flexible Work
- Icon có thể là emoji placeholder, thay bằng SVG sau khi có design assets
- Layout: 3 cột desktop → 2 cột tablet → 1 cột mobile
- Hover: border highlight `rgba(232,97,74,0.3)`, background `#2e2b27`
- Cards fade up khi vào viewport, stagger theo hàng

## 6. Edge Cases

- Mobile: 1 cột, cards full-width
- Icon không tải được → hiển thị icon mặc định

## 7. Security Requirements

- Hình ảnh và nội dung được tải qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị đủ 6 benefits

Given

- Visitor cuộn đến section

When

- Section hiển thị

Then

- 6 benefit cards với icon, title, description hiển thị trên nền tối ấm (`#1a1916`)

### AC-02: Nội dung đúng theo spec

Given

- Section đang hiển thị

When

- Visitor xem từng card

Then

- 6 benefits bao gồm: Dental Coverage, Paid Time Off, Well-being, Medical Insurance, Casual Work Setting, Flexible Work
