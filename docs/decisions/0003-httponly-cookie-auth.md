# 0003 — Lưu auth token trong httpOnly cookie

## Trạng thái: Đã chấp nhận

## Bối cảnh
- Ứng dụng cần xác thực người dùng để truy cập dashboard
- Cần bảo vệ chống XSS attacks

## Quyết định
Lưu JWT trong **httpOnly cookie** thay vì localStorage hoặc sessionStorage.

## Lý do
- httpOnly cookie không accessible từ JavaScript → chống XSS
- Cookie tự động gửi kèm mọi request → tiện lợi
- Server Components có thể đọc cookie trực tiếp

## Hậu quả
- Cần cấu hình CORS và SameSite cookie đúng cách
- Cần CSRF protection (Next.js middleware)
- Không thể đọc token từ JS client (đây là điều mong muốn)
