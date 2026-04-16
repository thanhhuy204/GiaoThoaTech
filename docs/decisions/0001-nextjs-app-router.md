# 0001 — Sử dụng Next.js App Router

## Trạng thái: Đã Chấp Nhận

## Bối cảnh
- Dự án cần SEO tốt cho trang landing
- Cần Server-side rendering cho dashboard (dữ liệu nhạy cảm, không muốn expose)
- Team quen thuộc với React ecosystem

## Quyết định
Sử dụng **Next.js 16 với App Router** thay vì Pages Router hoặc SPA thuần.

## Lý do
- App Router cho phép kết hợp Server Components + Client Components linh hoạt
- Giảm JS bundle size đáng kể so với Pages Router
- Routing theo file system dễ bảo trì
- Hỗ trợ tốt Streaming, Suspense, và Partial Prerendering

## Hậu quả
- Phải phân biệt rõ Server vs Client Component (`"use client"`)
- Một số thư viện cũ chưa hỗ trợ Server Components
- Learning curve cao hơn cho thành viên mới
