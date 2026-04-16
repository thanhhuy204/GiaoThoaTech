# Feature: Form nhận tài liệu hướng dẫn Lead Form

## 1. Business Goal
Thu thập thông tin liên hệ (email lead) từ property managers và host đang quan tâm đến giải pháp, thông qua việc cung cấp tài liệu hướng dẫn có giá trị (ebook). Đây là điểm tiếp xúc đầu tiên chính thức với sales funnel — chuyển đổi visitor vô danh thành lead có thể tiếp thị được.

## 2. Actors
- **Property Manager / Host** — điền form để nhận ebook hướng dẫn
- **Marketing Team** — nhận email lead từ form submission để nurture
- **Sales Team** — sử dụng danh sách lead để follow-up

## 3. Preconditions
- Visitor đã đọc qua nội dung trang và có đủ quan tâm để để lại thông tin
- Trang Short-term Rentals tải thành công
- Hệ thống backend nhận form submission hoạt động

## 4. Main Flow
1. Visitor cuộn đến section cuối trang
2. Hệ thống hiển thị ảnh bìa ebook và 3 bullet points mô tả giá trị nội dung
3. Hệ thống hiển thị form với 2 trường: Full Name và Email
4. Visitor điền đầy đủ thông tin và nhấn "Get the Guide"
5. Hệ thống validate dữ liệu đầu vào
6. Nếu hợp lệ: hệ thống gửi thông tin đến marketing team và hiển thị success state
7. Nếu không hợp lệ: hệ thống hiển thị thông báo lỗi inline tại trường tương ứng

## 5. Business Rules
- Form chỉ yêu cầu 2 trường tối thiểu: **Full Name** và **Email** — không thu thập dữ liệu thừa
- Email phải hợp lệ theo định dạng chuẩn (regex validation)
- Full Name không được để trống
- Sau khi submit thành công, form được thay thế bằng success state — không cho submit lại trong cùng phiên
- Ebook miêu tả phải nêu rõ giá trị: tự động hóa check-in, tích hợp PMS, quản lý nhiều bất động sản offline
- Dữ liệu lead phải được gửi đến hệ thống CRM/Marketing của team — không lưu ở frontend
- Tiêu đề ebook: "Your Guide to Effortless Check-ins with Smart Locks & PMS Integration"

## 6. Edge Cases
- Visitor submit với email đã tồn tại trong hệ thống → hiển thị success state bình thường (không cần thông báo trùng để tránh lộ thông tin)
- Kết nối mạng bị gián đoạn khi submit → hiển thị thông báo lỗi và cho phép thử lại
- Form submit nhưng backend trả lỗi → hiển thị thông báo lỗi chung, không mất dữ liệu đã nhập
- JavaScript bị tắt → form hiển thị tĩnh nhưng không submit được; hiển thị hướng dẫn liên hệ thay thế

## 7. Security Requirements
- Form phải có cơ chế chống spam (rate limiting hoặc honeypot field ẩn)
- Dữ liệu form phải gửi qua HTTPS
- Không lưu email/tên người dùng vào localStorage hay sessionStorage
- Không hiển thị email người dùng trong URL sau submit
- Tuân thủ quy định thu thập dữ liệu cá nhân (GDPR/PDPA): hiển thị consent rõ ràng trước hoặc tại form

## 8. Acceptance Criteria

### AC-01: Hiển thị form và thông tin ebook đầy đủ

Given
- Visitor cuộn đến section Lead Form

When
- Section hiển thị trong viewport

Then
- Ảnh bìa ebook hiển thị cùng tiêu đề ebook
- 3 bullet points mô tả giá trị nội dung hiển thị
- Form với 2 trường Name và Email hiển thị bên phải

### AC-02: Validation dữ liệu đầu vào

Given
- Visitor nhấn submit với email không hợp lệ hoặc tên để trống

When
- Hệ thống thực hiện validation

Then
- Thông báo lỗi inline hiển thị tại trường tương ứng
- Form không được gửi đi

### AC-03: Submit thành công và hiển thị success state

Given
- Visitor điền đầy đủ Name và Email hợp lệ

When
- Visitor nhấn "Get the Guide"

Then
- Hệ thống gửi thông tin đến marketing team
- Form biến mất và success state "Check your inbox!" hiển thị thay thế
- Visitor không thể submit lại trong cùng phiên

### AC-04: Bảo vệ dữ liệu người dùng

Given
- Visitor đã submit form

When
- Thông tin được xử lý

Then
- Dữ liệu gửi qua HTTPS
- Không có email/tên nào xuất hiện trong URL hoặc localStorage
