# Feature: Job Details

## 1. Business Goal

Cung cấp đầy đủ thông tin về vị trí tuyển dụng để ứng viên đưa ra quyết định ứng tuyển, đồng thời tạo trải nghiệm chuyên nghiệp và nhất quán với brand igloohome.

## 2. Actors

- Visitor (ứng viên tiềm năng)

## 3. Preconditions

- Visitor truy cập /careers/[slug]
- Job slug tồn tại trong data
- Trang tải thành công

## 4. Main Flow

1. Visitor click vào tên job ở trang /careers#openings
2. Điều hướng đến /careers/[slug]
3. Hiển thị breadcrumb: Careers > [Department] > [Job Title]
4. Hiển thị Job Header: tên job (H1), department badge, location, type
5. Hiển thị nút "Apply for This Job" (CTA nổi bật, sticky trên desktop)
6. Hiển thị nội dung chi tiết job theo thứ tự:
   - Job Purpose (đoạn văn)
   - Job Responsibilities (danh sách)
   - Job Requirements (danh sách)
   - What We Can Offer You (danh sách)
7. Hiển thị section CTA cuối trang với nút Apply
8. Visitor nhấn nút "Apply for This Job" → điều hướng đến /careers/[slug]/apply hoặc external ATS link

## 5. Business Rules

- Tất cả 4 sections (Purpose, Responsibilities, Requirements, Offers) phải hiển thị đầy đủ
- Nút Apply phải luôn visible — cả ở sidebar (desktop) và cuối trang (mobile)
- Desktop: layout 2 cột — 65% content / 35% sidebar sticky
- Sidebar sticky: `position: sticky; top: 96px`
- Job không tồn tại → hiển thị "This position is no longer available" + link về /careers
- Mobile (<768px): sidebar ẩn, Apply button sticky bottom của viewport
- "Back to all openings" link → /careers#openings

## 6. Edge Cases

- `slug` không khớp với bất kỳ job nào → hiển thị thông báo + link /careers
- Mobile (<768px): 1 cột, Apply button sticky bottom bar
- Danh sách dài → không paginate, hiển thị toàn bộ

## 7. Security Requirements

- Trang chi tiết công việc phải sử dụng HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị đầy đủ thông tin job

Given

- Visitor truy cập /careers/senior-frontend-engineer

When

- Trang tải

Then

- H1 tên job, breadcrumb, department badge, location, type hiển thị đầy đủ
- 4 sections nội dung hiển thị: Job Purpose, Job Responsibilities, Job Requirements, What We Can Offer You

### AC-02: Nút Apply luôn visible

Given

- Visitor đang đọc job details

When

- Visitor scroll qua nội dung dài

Then

- Nút "Apply for This Job" vẫn visible (sticky sidebar desktop / sticky bottom mobile)

### AC-03: Job không tồn tại → fallback

Given

- Visitor truy cập slug không hợp lệ

When

- Trang tải

Then

- Hiển thị thông báo "This position is no longer available" và link về /careers

### AC-04: Breadcrumb điều hướng đúng

Given

- Trang job details đang hiển thị

When

- Visitor click "Careers" trong breadcrumb

Then

- Điều hướng về /careers
