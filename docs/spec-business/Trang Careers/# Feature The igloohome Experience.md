# Feature: The igloohome Experience

## 1. Business Goal

Truyền đạt trải nghiệm làm việc thực tế tại igloohome — môi trường linh hoạt, sáng tạo, và có tầm ảnh hưởng toàn cầu.

## 2. Actors

- Visitor đang cân nhắc ứng tuyển

## 3. Preconditions

- Trang /careers tải thành công

## 4. Main Flow

1. Visitor cuộn đến section
2. Hiển thị background tối (`#0f0f0f`)
3. Hiển thị label tag "Life at igloo"
4. Hiển thị H2: "The igloohome experience"
5. Hiển thị subtitle ngắn
6. Hiển thị grid 4 experience cards, mỗi card có: icon, tiêu đề, mô tả ngắn

## 5. Business Rules

- Luôn hiển thị đủ 4 cards theo thứ tự: Global Reach, Scale Fast, Collaborative Culture, Meaningful Impact
- Icon không bắt buộc là emoji — có thể thay bằng SVG icon khi có assets
- Cards fade up với stagger khi vào viewport
- Hover: card lift lên (`translateY(-4px)`) và viền sáng lên (`border-color: rgba(232,97,74,0.3)`)
- Layout: 4 cột desktop → 2 cột tablet (600–900px) → 1 cột mobile (<600px)

## 6. Edge Cases

- Tablet (600–900px): 2 cột grid
- Mobile (<600px): 1 cột stack
- Icon không tải được → icon mặc định

## 7. Security Requirements

- Hình ảnh tải qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị 4 experience cards

Given

- Visitor cuộn đến section

When

- Section vào viewport

Then

- 4 cards với icon, title, description hiển thị đầy đủ trên nền tối (`#0f0f0f`)
- Cards: Global Reach, Scale Fast, Collaborative Culture, Meaningful Impact

### AC-02: Hover effect hoạt động

Given

- Desktop visitor hover lên card

When

- Mouse enter

Then

- Card lift lên và viền sáng lên màu `rgba(232,97,74,0.3)`
