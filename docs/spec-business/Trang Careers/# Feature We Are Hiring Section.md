# Feature: We Are Hiring Section

## 1. Business Goal

Tạo cảm xúc tích cực và khuyến khích visitor ứng tuyển bằng cách thể hiện văn hóa công ty cởi mở, đầy cơ hội phát triển.

## 2. Actors

- Visitor quan tâm đến cơ hội nghề nghiệp

## 3. Preconditions

- Trang /careers tải thành công

## 4. Main Flow

1. Visitor cuộn qua Hero section
2. Section hiển thị với background kem ấm (`#F5F4F1`)
3. Hiển thị label tag "Opportunities"
4. Hiển thị H2: "We are hiring"
5. Hiển thị tagline: "Unlock your potential" (màu primary)
6. Hiển thị đoạn mô tả 2–3 câu về môi trường làm việc
7. Hiển thị 3 stat highlights ngang hàng

## 5. Business Rules

- H2 text cố định: "We are hiring"
- Tagline text cố định: "Unlock your potential"
- Tagline hiển thị màu primary (`var(--primary)`) để tạo điểm nhấn
- Stats cố định:
  - 500+ Enterprise customers
  - 25+ Countries served
  - \#1 Smart lock in APAC
- Stats phải hiển thị đầy đủ 3 cột, không được wrap thành 1 cột trừ mobile
- Mobile (<600px): stats stack thành 1 cột, border thay bằng margin

## 6. Edge Cases

- Mobile (<600px): stats stack thành 1 cột

## 7. Security Requirements

- Nội dung được tải qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị tiêu đề và tagline

Given

- Visitor cuộn đến section

When

- Section vào viewport

Then

- "We are hiring" hiển thị đúng style trên nền kem (`#F5F4F1`)
- "Unlock your potential" hiển thị màu `var(--primary)`

### AC-02: Hiển thị 3 stats

Given

- Section đang hiển thị

When

- Visitor xem nội dung

Then

- 3 stat blocks hiển thị đầy đủ: "500+ Enterprise customers", "25+ Countries served", "#1 Smart lock in APAC"
