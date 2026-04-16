# Feature: Nút CTA "Get a demo"

## 1. Business Goal

Khuyến khích visitor liên hệ xin demo sau khi đã xem đầy đủ thông tin sản phẩm, chuyển đổi họ thành qualified lead. CTA section là điểm chốt quan trọng nhất của trang — phải nổi bật, rõ ràng, và đơn giản để kích hoạt hành động ngay.

## 2. Actors

- Visitor quan tâm — đã đọc đủ thông tin và muốn tìm hiểu thêm qua demo
- Decision maker — muốn đặt lịch demo chính thức với đội sales

## 3. Preconditions

- Người dùng đang ở trang /products/[slug]
- slug hợp lệ và được truyền vào component
- Trang /contact tồn tại và nhận query param ref và product

## 4. Main Flow

1. Render section CTA với headline: "Ready to see it in action?"
2. Render sub-text: "Book a personalized demo with our team."
3. Render nút primary "Get a demo" màu cam (#E8614A)
4. Render nút secondary "Download Data Sheet" (chỉ khi datasheetUrl không null)
5. Người dùng click "Get a demo" → navigate đến /contact?ref=product-detail&product=[slug]

## 5. Business Rules

- URL navigate khi click: /contact?ref=product-detail&product=[slug] — slug lấy từ props
- ref param bắt buộc là "product-detail" (không thay đổi)
- product param là slug sản phẩm hiện tại (dynamic)
- Dùng Next.js Link — không dùng window.location hay router.push
- Nút "Get a demo" là primary action — phải nổi bật hơn nút secondary
- Nút "Download Data Sheet" chỉ hiển thị nếu datasheetUrl !== null
- Hai nút render cùng nhau trong 1 button group
- slug được encode bằng encodeURIComponent trước khi đưa vào URL

## 6. Edge Cases

- datasheetUrl === null → chỉ hiển thị nút "Get a demo", không có secondary button
- Viewport <400px → buttons stack thành 1 cột, full width
- Slug chứa ký tự đặc biệt → encode bằng encodeURIComponent

## 7. Security Requirements

- slug được sanitize — chỉ [a-z0-9-] hợp lệ trước khi đưa vào URL param
- Dùng encodeURIComponent(slug) khi build URL để tránh injection
- Không có input user trong section này

## 8. Acceptance Criteria

### AC-01: Hiển thị nút "Get a demo"

Given
- Visitor truy cập trang chi tiết sản phẩm

When
- Trang được tải

Then
- Nút "Get a demo" màu cam (#E8614A), text trắng hiển thị rõ ràng
- Headline "Ready to see it in action?" và sub-text hiển thị bên trên

### AC-02: Chuyển đến trang liên hệ với đúng params

Given
- Nút "Get a demo" đang hiển thị

When
- Visitor click nút

Then
- Hệ thống navigate đến /contact?ref=product-detail&product=[slug]
- ref=product-detail có trong URL
- product=[slug] đúng với slug trang hiện tại
- Không reload toàn trang (client-side navigation)

### AC-03: Nút secondary "Download Data Sheet"

Given
- Trang có datasheetUrl không null

When
- Visitor xem button group

Then
- Nút "Download Data Sheet" hiển thị bên cạnh "Get a demo" (style outlined)

When datasheetUrl === null

Then
- Chỉ hiển thị 1 nút "Get a demo", không có secondary button

### AC-04: Responsive mobile

Given
- Viewport nhỏ hơn 400px

When
- Visitor xem button group

Then
- Buttons stack thành 1 cột dọc, full width
