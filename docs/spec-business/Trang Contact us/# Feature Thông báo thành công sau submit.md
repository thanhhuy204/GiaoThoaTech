# Feature: Thông báo thành công sau submit

## 1. Business Goal

Xác nhận rõ ràng với người dùng rằng form đã gửi thành công, tạo cảm giác hoàn tất và tin cậy. Thông báo thành công cũng là cơ hội cuối để reinforce brand và set expectation về bước tiếp theo (đội sales sẽ liên hệ trong 1 business day).

## 2. Actors

- Visitor — vừa submit form, đang chờ xác nhận

## 3. Preconditions

- ContactForm (FEAT-032) vừa nhận response `200 OK` từ API `POST /api/contact`
- Component nhận `submissionState === 'success'` từ parent (`ContactForm`)
- (Optional) API trả về `leadId` — có thể hiển thị reference number

## 4. Main Flow

1. API trả về `{ success: true }`:
   - Parent `ContactForm` set state: `submissionState = 'success'`
   - Form container fade out (300ms)
   - `SuccessNotification` fade in thay thế vị trí form
2. Success notification hiển thị:
   - Icon check mark lớn (animated draw stroke)
   - Headline: "Thank you!"
   - Message: "Our team will reach out shortly. We typically respond within 1 business day."
   - (Optional) Reference: "Your reference: #[leadId]" nếu API trả về
   - Sub-action: "In the meantime, explore our products →" dẫn đến /products
3. Không reload trang
4. Không có auto-redirect

## 5. Business Rules

- Thông báo KHÔNG tự dismiss hay auto-redirect — người dùng kiểm soát hoàn toàn
- Form ẩn hoàn toàn (display: none sau animation) khi success — không chỉ invisible
- Message text cố định: "Our team will reach out shortly. We typically respond within 1 business day." — không thay đổi tùy user
- `leadId` hiển thị chỉ khi API trả về — không hardcode placeholder
- Sub-action link dẫn đến /products — internal link, không mở tab mới
- Không có "Submit another form" button — nếu user muốn submit lại, phải refresh trang
- Check mark màu cam `#E8614A` — không dùng màu xanh
- Animation sequence: circle draw → check mark → headline → message → reference + sub-action

## 6. Edge Cases

| Tình huống | Hành vi mong đợi |
| --- | --- |
| API thất bại (500, timeout) | Không hiện success notification — hiện error state thay vào đó |
| `leadId` không có trong response | Ẩn reference row hoàn toàn |
| User nhấn browser Back sau success | Quay lại trang trước (không phải form) |
| User refresh trang sau success | Form hiện lại (empty) — success state bị reset |
| Screen reader | Announce "Form submitted successfully. Thank you!" khi success state mount |

## 7. Security Requirements

- `leadId` từ API chỉ hiển thị text — không link đến bất kỳ dashboard nào
- Không expose thông tin form đã submit trong success message
- Không auto-redirect đến URL từ `?redirect=` param (phòng open redirect)

## 8. Acceptance Criteria

### AC-01: Hiển thị thông báo thành công

Given

- Visitor đã gửi form liên hệ thành công

When

- Hệ thống nhận response 200 OK từ API

Then

- Form fade out, success notification fade in thay thế vị trí form
- Check circle animated (draw stroke), màu cam `#E8614A`
- Headline "Thank you!" dùng Playfair Display
- Message text chính xác: "Our team will reach out shortly. We typically respond within 1 business day."

### AC-02: Hiển thị reference và sub-action

Given

- API trả về `leadId`

When

- Thông báo thành công hiển thị

Then

- Reference row hiện: "Your reference: #[leadId]"
- Sub-action link "/products" hoạt động, không mở tab mới

Given

- API không trả về `leadId`

Then

- Reference row ẩn hoàn toàn

### AC-03: Không reload trang

Given

- Visitor gửi form thành công

When

- Thông báo được hiển thị

Then

- Trang không bị reload
- Screen reader announce thành công (role="status", aria-live="polite")

### AC-04: Error state khi API thất bại

Given

- API trả về lỗi 500 hoặc timeout

When

- Visitor submit form

Then

- Không hiện success notification — hiện error state với nút "Try again"
- Nút "Try again" reset về idle state, form visible lại
