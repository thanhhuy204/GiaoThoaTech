# Feature: Nút "Join our team"

## 1. Business Goal

Khuyến khích các visitor quan tâm đến văn hóa công ty và đội ngũ igloo chuyển sang hành động cụ thể: tìm hiểu cơ hội nghề nghiệp và ứng tuyển. CTA này là điểm chuyển đổi cuối cùng của trang About trước khi người dùng rời trang.

## 2. Actors

- Ứng viên tiềm năng — muốn ứng tuyển sau khi tìm hiểu về công ty
- Visitor quan tâm D&I và văn hóa — đang cân nhắc gia nhập igloo

## 3. Preconditions

- Người dùng đang truy cập trang /about
- Section CTA nằm ở cuối trang, sau phần D&I (FEAT-017)
- Trang /careers tồn tại (happy path) hoặc trang /contact là fallback

## 4. Main Flow

1. Người dùng scroll xuống cuối trang About → section CTA render
2. Hiển thị background cam nổi bật (#E8614A)
3. Hiển thị heading: "Want to be part of something great?"
4. Hiển thị subtext ngắn: "We're always looking for passionate people to join the igloo family."
5. Hiển thị nút "Join our team" — style outlined (viền trắng, background trong suốt)
6. Người dùng click nút → điều hướng đến /careers?ref=about-join-cta
7. Nếu trang /careers không tồn tại → điều hướng đến /contact?ref=about-join-cta

## 5. Business Rules

- Nút phải điều hướng kèm ?ref=about-join-cta tracking param
- Happy path: điều hướng đến /careers?ref=about-join-cta
- Fallback (không có trang Careers): điều hướng đến /contact?ref=about-join-cta
- Destination URL được cấu hình qua constant, không hardcode trực tiếp trong JSX
- Nút phải là thẻ Link (Next.js) — không phải button vì đây là navigation
- Nút style outlined: viền trắng, text trắng, background transparent; hover đảo ngược (bg trắng, text cam)
- Background section: #E8614A (primary color — high-impact CTA)
- Aria-label: "Join our team at igloo"

## 6. Edge Cases

- Trang /careers chưa tồn tại → điều hướng đến /contact?ref=about-join-cta
- Mobile (<640px) → heading nhỏ lại (28px), nút full-width
- Người dùng đã ở trang /careers → link vẫn hoạt động bình thường
- Reduced motion preference → bỏ qua fade-in animation, hiển thị ngay

## 7. Security Requirements

- Link sử dụng Next.js Link — không có rủi ro XSS
- ref param là hardcoded string — không lấy từ user input
- Không có form hoặc input

## 8. Acceptance Criteria

### AC-01: Hiển thị section Join our team

Given
- Visitor truy cập trang /about

When
- Trang được tải và scroll đến cuối

Then
- Hệ thống hiển thị section với background #E8614A
- Heading H2 hiển thị đúng text, font Playfair Display, màu trắng
- Subtext hiển thị bên dưới heading

### AC-02: Hiển thị nút Join our team

Given
- Section CTA đang hiển thị

When
- Visitor xem nút

Then
- Nút "Join our team" có border trắng, text trắng, background transparent
- Nút có aria-label đầy đủ

### AC-03: Hover nút

Given
- Nút "Join our team" đang hiển thị

When
- Visitor hover vào nút

Then
- Background chuyển sang trắng, text chuyển sang cam (#E8614A)
- Transition mượt mà trong 200ms

### AC-04: Chuyển hướng đến trang Careers

Given
- Trang /careers tồn tại

When
- Visitor click nút "Join our team"

Then
- Hệ thống chuyển đến /careers?ref=about-join-cta
- Không reload toàn trang (client-side navigation)

### AC-05: Fallback khi không có trang Careers

Given
- Trang /careers chưa tồn tại

When
- Visitor click nút

Then
- Hệ thống chuyển đến /contact?ref=about-join-cta

### AC-06: Responsive

Given
- Section CTA đang hiển thị

When
- Visitor xem trên mobile (<640px)

Then
- Heading nhỏ lại (28px)
- Nút full-width
- Không lỗi layout
