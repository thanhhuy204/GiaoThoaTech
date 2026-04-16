# Feature: Current Openings

## 1. Business Goal

Cho phép visitor xem và lọc các vị trí tuyển dụng đang mở, dễ dàng tìm kiếm job phù hợp và truy cập trang chi tiết để ứng tuyển.

## 2. Actors

- Visitor (job seeker)

## 3. Preconditions

- Trang /careers được tải thành công
- Có dữ liệu job listings (mock data hoặc API)

## 4. Main Flow

1. Visitor cuộn đến hoặc được scroll đến `#openings` (từ nút Hero)
2. Hiển thị background trắng (`#fff`)
3. Hiển thị label tag "Open Roles"
4. Hiển thị H2: "Current openings"
5. Hiển thị filter tabs theo department: All | Engineering | Product | Sales | Operations
6. Hiển thị danh sách job rows theo filter đang active
7. Mỗi job row hiển thị: tên vị trí, phòng ban, địa điểm, loại công việc (badge), arrow icon
8. Visitor click tên job → điều hướng đến /careers/[slug]

## 5. Business Rules

- Default filter = "All"
- Section `id="openings"` bắt buộc để Hero CTA smooth scroll đến đúng
- Tên job là `<a href="/careers/[slug]">` — không phải button
- `type` luôn hiển thị dưới dạng badge
- Filter tabs: All, Engineering, Product, Sales, Operations (thứ tự cố định)
- Filter click: instant filter với fade transition
- Row hover: title màu primary, arrow slide right 4px
- Empty state khi filter không có kết quả: "No openings in this department right now. Check back soon!"
- Danh sách rỗng (không có job nào): "We're always looking for great people. Send us your CV at careers@igloohome.co"

## 6. Edge Cases

- Filter không có kết quả → empty state text phù hợp
- Danh sách rỗng (không có job nào) → thông báo email

## 7. Security Requirements

- Liên kết đến trang chi tiết công việc phải sử dụng HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị danh sách jobs

Given

- Visitor tới section openings

When

- Filter "All" đang active

Then

- Hiển thị đầy đủ tất cả job listings với title, department, location, type badge

### AC-02: Filter theo department

Given

- Danh sách đang hiển thị

When

- Visitor click tab "Engineering"

Then

- Chỉ hiển thị các jobs có `department === 'Engineering'`

### AC-03: Click job → trang chi tiết

Given

- Danh sách đang hiển thị

When

- Visitor click tên job

Then

- Điều hướng đến /careers/[slug] tương ứng

### AC-04: Empty state khi filter rỗng

Given

- Visitor chọn department không có openings

When

- Filter áp dụng

Then

- Hiển thị thông báo empty state: "No openings in this department right now. Check back soon!"

### AC-05: Scroll từ Hero CTA

Given

- Visitor click "Explore careers" ở Hero

When

- Smooth scroll xảy ra

Then

- Trang cuộn đến đúng section `#openings`
