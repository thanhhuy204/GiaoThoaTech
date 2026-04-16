# Feature: Nút Submit form

## 1. Business Goal

Cho phép người dùng hoàn tất gửi thông tin liên hệ/demo một cách rõ ràng và an toàn. Nút Submit phải phản hồi ngay về trạng thái (loading, disabled, success) để tạo cảm giác tin cậy, tránh double-submit, và hướng dẫn người dùng qua quá trình gửi form.

## 2. Actors

- Visitor — người điền form liên hệ và muốn gửi thông tin

## 3. Preconditions

- Form ContactForm (FEAT-032) đã render và người dùng đang điền
- Component nhận `isLoading`, `isDisabled`, và `type="submit"` trong form

## 4. Main Flow

1. Nút render ở dưới cùng form với label "Submit"
2. Idle state (default): Nút màu cam `#E8614A`, text "Submit", enabled
3. Người dùng click nút:
   - Nếu form chưa valid → nút vẫn click được, form validate và hiển thị errors (nút không self-disable trước validate)
   - Nếu form valid → nút chuyển sang Loading state
4. Loading state: Text thay bằng spinner + "Submitting...", nút disabled, pointer-events none
5. API trả về:
   - Thành công → form ẩn, success notification hiện (FEAT-037). Nút không còn visible.
   - Thất bại → nút trở về Idle state để retry

## 5. Business Rules

- Nút KHÔNG tự disable khi form chưa valid — chỉ disable khi đang loading
- Double click prevention: Sau lần click đầu tiên (khi form valid), nút disable ngay lập tức trong loading state để tránh duplicate submit
- Sau thành công: nút không visible (toàn bộ form section thay bằng success state)
- Sau thất bại (API error): nút trở lại Idle state, user có thể retry
- `type="submit"` — không dùng `type="button"` với onClick riêng để đảm bảo accessibility form
- Submit không reload trang (AJAX)

### States của nút

| State | Background | Text | Cursor |
| --- | --- | --- | --- |
| Idle | `#E8614A` | `#ffffff` | pointer |
| Hover | `#d4503a` | `#ffffff` | pointer |
| Loading | `#E8614A` opacity 0.8 | `#ffffff` opacity 0.9 | not-allowed |
| Disabled | `rgba(0,0,0,0.12)` | `rgba(0,0,0,0.35)` | not-allowed |

## 6. Edge Cases

| Tình huống | Hành vi mong đợi |
| --- | --- |
| Double click nhanh | Lần click đầu trigger, lần 2 bị block vì loading state |
| Click khi form trống | Form hiện errors, nút không vào loading state |
| API timeout (>10s) | Sau timeout, nút trở về idle, hiện error message |
| JavaScript disabled | Form submit native HTML — nút vẫn hoạt động |
| User nhấn Enter trong form | Submit trigger (default browser behavior), cùng flow như click |

## 7. Security Requirements

- Không bypass validation khi submit bằng keyboard (Enter)
- Loading state ngăn double submit ở frontend
- Submit dùng HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị nút Submit màu cam

Given

- Visitor truy cập trang form liên hệ

When

- Form được hiển thị

Then

- Nút render màu cam `#E8614A`, label "Submit", full-width
- Hover background `#d4503a`
- Focus visible: ring outline `#E8614A`

### AC-02: Submit form thành công

Given

- Visitor đã nhập đầy đủ thông tin hợp lệ

When

- Visitor nhấn nút Submit

Then

- Nút chuyển loading (spinner + "Submitting...")
- Loading state: nút disabled, cursor not-allowed
- API success → nút biến mất cùng form

### AC-03: Form không hợp lệ

Given

- Form có trường bắt buộc chưa được điền hoặc dữ liệu không hợp lệ

When

- Visitor nhấn nút Submit

Then

- Form hiện errors, nút không vào loading state
- Form không được gửi

### AC-04: Xử lý khi submit thất bại

Given

- Visitor gửi form hợp lệ

When

- Xảy ra lỗi mạng hoặc lỗi server

Then

- Nút trở về idle state
- Visitor có thể thử gửi lại
- Double click không tạo duplicate API call
- `aria-disabled`, `aria-busy` đúng theo state
