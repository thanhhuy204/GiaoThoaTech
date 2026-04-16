# Feature: Inclusivity Section

## 1. Business Goal

Thể hiện cam kết về sự đa dạng và hòa nhập của igloohome — thu hút ứng viên từ mọi nền tảng và tăng độ tin tưởng của thương hiệu.

## 2. Actors

- Visitor quan tâm đến văn hóa công ty và giá trị DEI (Diversity, Equity & Inclusion)

## 3. Preconditions

- Trang /careers tải thành công

## 4. Main Flow

1. Visitor cuộn đến section
2. Hiển thị background kem ấm (`#F5F4F1`)
3. Hiển thị layout 2 cột: trái là text content, phải là stats
4. Hiển thị label tag "Diversity & Inclusion"
5. Hiển thị H2: "Where we value inclusivity"
6. Hiển thị đoạn văn 2–3 câu về cam kết DEI
7. Hiển thị 3 inclusion stats dọc

## 5. Business Rules

- H2 text cố định: "Where we value inclusivity"
- Nội dung không quá 3 câu
- Stats cố định (phải có thực — không dùng số giả tạo nếu không có data):
  - 40% Women in leadership roles
  - 20+ Nationalities on our team
  - 100% Equal pay commitment
- Stat value màu `var(--primary)`
- Layout 2 cột (55/45) trên desktop (>=768px)
- Mobile (<768px): 2 cột → 1 cột, stats hiển thị dưới text

## 6. Edge Cases

- Mobile (<768px): 1 cột, stats xuống dưới text

## 7. Security Requirements

- Nội dung tải qua HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị tiêu đề inclusivity

Given

- Visitor cuộn đến section

When

- Section vào viewport

Then

- "Where we value inclusivity" hiển thị trên nền kem (`#F5F4F1`)

### AC-02: Hiển thị 3 inclusion stats

Given

- Section đang hiển thị

When

- Visitor xem phần stats

Then

- 3 stats với value màu primary và label hiển thị đầy đủ: "40% Women in leadership roles", "20+ Nationalities on our team", "100% Equal pay commitment"

### AC-03: Layout 2 cột trên desktop

Given

- Viewport >= 768px

When

- Section render

Then

- Text content và stats hiển thị song song 2 cột (tỉ lệ 55/45)
