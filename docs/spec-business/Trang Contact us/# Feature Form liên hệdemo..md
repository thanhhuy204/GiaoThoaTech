# Feature: Form liên hệ/demo

## 1. Business Goal

Thu thập thông tin chi tiết và chất lượng cao từ khách hàng tiềm năng để đội sales có đủ context liên hệ tư vấn và đặt lịch demo phù hợp. Form đóng vai trò cửa ngõ chuyển đổi visitor → qualified lead, vì vậy phải cân bằng giữa đủ thông tin (để sales qualify) và không quá dài (để không nản).

## 2. Actors

- Visitor B2B — doanh nghiệp tìm giải pháp quản lý khóa thông minh
- Property manager — quản lý nhiều bất động sản, cần giải pháp access control
- IT/Procurement — người điền form theo yêu cầu của decision maker

## 3. Preconditions

- Trang /contact được load thành công
- FEAT-034 (reCAPTCHA v3) đã khởi tạo, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` có trong env
- API endpoint `POST /api/contact` đang hoạt động
- (Optional) Nếu người dùng đến từ link có `?ref=product-detail&product=[slug]`, pre-fill context ẩn

## 4. Main Flow

1. Render form với 10 trường theo thứ tự:
   - `name` — Text input, required (label: "Name")
   - `workEmail` — Email input, required (label: "Work Email")
   - `companyName` — Text input, required (label: "Company Name")
   - `country` — Dropdown (Select), required (label: "Country")
   - `phoneNumber` — Tel input, optional (label: "Phone Number")
   - `unitCount` — Number input, optional (label: "How many units/access points are you managing?")
   - `profile` — Dropdown (Select), required (label: "Choose the profile that best describes you")
   - `hearAboutUs` — Dropdown (Select), required (label: "How did you hear about us?")
   - `projectDescription` — Textarea, required (label: "Describe your project")
   - `privacyAgreed` — Checkbox, required (label: "I agree to the Privacy Policy")
2. Render reCAPTCHA v3 ẩn (FEAT-034)
3. Người dùng điền các trường required → tick checkbox privacy → click Submit
4. Frontend validate tất cả trường trước khi gọi API
5. Nếu valid → lấy reCAPTCHA token → gọi `POST /api/contact`
6. Thành công → hiện success notification (FEAT-037), ẩn form
7. Thất bại → hiện error message inline hoặc global error banner

## 5. Business Rules

### Validation từng field

| Field | Rule |
|---|---|
| `name` | Bắt buộc. Min 2 ký tự. Max 100 ký tự. Trim whitespace. |
| `workEmail` | Bắt buộc. Regex email chuẩn RFC 5322. |
| `companyName` | Bắt buộc. Min 2 ký tự. Max 150 ký tự. |
| `country` | Bắt buộc. Phải là giá trị trong danh sách country options. |
| `phoneNumber` | Tùy chọn. Nếu nhập: chỉ `+`, số, dấu cách, dấu gạch ngang. Min 7, max 20 ký tự. |
| `unitCount` | Tùy chọn. Nếu nhập: phải là số nguyên dương. |
| `profile` | Bắt buộc. Phải là giá trị trong danh sách options. |
| `hearAboutUs` | Bắt buộc. Phải là giá trị trong danh sách options. |
| `projectDescription` | Bắt buộc. Min 20 ký tự. Max 2000 ký tự. |
| `privacyAgreed` | Bắt buộc. Phải là `true`. |

- Validate onSubmit lần đầu, sau đó validate onChange cho trường đã bị touch
- Submit không reload trang (prevent default, gọi fetch/AJAX)
- Không dùng thư viện form ngoài (React Hook Form, Formik) — custom state management
- Không submit khi reCAPTCHA chưa sẵn sàng
- Character counter cho textarea: hiện từ 1500 ký tự trở đi
- `?ref` và `?product` URL params được capture và gửi kèm dưới dạng hidden fields `referrer` và `productContext`
- Layout: 2 cột trên desktop (≥768px), 1 cột trên mobile

## 6. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Trường bắt buộc trống khi submit | Hiện error inline ngay dưới field, focus vào field đầu tiên lỗi |
| Email sai định dạng | Lỗi "Please enter a valid work email address" |
| `projectDescription` vượt 2000 ký tự | Counter hiện "X/2000", submit bị block nếu vượt |
| API trả về 422 (validation error) | Map server errors vào từng field tương ứng |
| API trả về 500 | Hiện global error banner: "Something went wrong. Please try again." |
| Network timeout | Hiện lỗi với nút "Try again" |
| reCAPTCHA score thấp | Hiện lỗi: "Verification failed. Please refresh and try again." |
| User refresh sau khi điền form | Form bị reset (không dùng localStorage để persist) |
| `?ref=product-detail&product=[slug]` trong URL | Tự động set hidden field `referrer` và `productContext` |

## 7. Security Requirements

- Tất cả input sanitize trước khi gửi API (strip HTML tags, trim whitespace)
- reCAPTCHA token bắt buộc trong request body
- Không log form data ra console trong production
- CSRF protection: API endpoint phải validate `Origin` header
- `workEmail` validate kỹ để tránh email injection
- Submit dùng HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị form liên hệ đầy đủ 10 trường

Given

- Visitor truy cập trang "/contact"

When

- Trang được tải

Then

- Form hiển thị đủ 10 trường với label, placeholder, required indicator (*)
- Layout 2 cột trên desktop, 1 cột trên mobile

### AC-02: Submit form thành công

Given

- Visitor nhập đầy đủ các trường bắt buộc hợp lệ
- Checkbox privacy được chọn
- reCAPTCHA đã sẵn sàng

When

- Visitor nhấn nút Submit

Then

- API `POST /api/contact` được gọi với reCAPTCHA token trong body
- Form ẩn đi, success notification (FEAT-037) hiển thị
- Trang không reload

### AC-03: Thiếu trường bắt buộc

Given

- Visitor để trống một hoặc nhiều trường bắt buộc

When

- Visitor nhấn Submit

Then

- Hiển thị lỗi inline tại từng trường tương ứng
- Focus tự động vào field lỗi đầu tiên
- Form không submit

### AC-04: Email không hợp lệ

Given

- Visitor nhập email sai định dạng

When

- Visitor nhấn Submit

Then

- Hiển thị lỗi "Please enter a valid work email address"
- Form không submit

### AC-05: URL params được capture

Given

- Visitor đến trang /contact từ link có `?ref=product-detail&product=padlock-2`

When

- Visitor submit form hợp lệ

Then

- Request body chứa `referrer: "product-detail"` và `productContext: "padlock-2"`

### AC-06: API lỗi — retry

Given

- API trả về lỗi 500 hoặc network timeout

When

- Visitor submit form

Then

- Hiện error banner "Something went wrong. Please try again."
- Form vẫn có thể retry, data không mất

### AC-07: Không dùng thư viện form ngoài

Then

- Component không import React Hook Form, Formik, hoặc thư viện form tương tự
- State management dùng custom `useState`
