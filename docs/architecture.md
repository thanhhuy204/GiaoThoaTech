# Kiến trúc hệ thống — SmartLock Frontend

## Tổng quan

SmartLock Frontend là ứng dụng web quản lý khóa thông minh, cho phép người dùng:
- Xem trạng thái khóa theo thời gian thực
- Cấp/thu hồi quyền truy cập
- Xem lịch sử ra vào
- Quản lý người dùng và thiết bị

---

## Sơ đồ kiến trúc

```
┌─────────────────────────────────────────────────────┐
│                   Browser / Client                   │
│                                                      │
│   ┌──────────────┐    ┌──────────────────────────┐   │
│   │  Next.js App │    │   Static Assets (CDN)    │   │
│   │  (App Router)│    │   Images, fonts, icons   │   │
│   └──────┬───────┘    └──────────────────────────┘   │
│          │                                            │
│   ┌──────▼───────┐                                   │
│   │  React Server│                                   │
│   │  Components  │  ← Server-side rendering          │
│   └──────┬───────┘                                   │
└──────────┼──────────────────────────────────────────┘
           │ HTTP / WebSocket
┌──────────▼──────────────────────────────────────────┐
│                  SmartLock Backend API               │
│             REST API + WebSocket (realtime)          │
└─────────────────────────────────────────────────────┘
```

---

## Luồng dữ liệu

### Authentication
```
User → Login Form → POST /api/auth/login
                  → Backend trả JWT
                  → Set httpOnly cookie
                  → Redirect dashboard
```

### Real-time lock status
```
Dashboard load → WebSocket connect → Subscribe lock events
                                   → Update UI state
```

### API calls
```
Component → Custom Hook → lib/api.ts → Backend API
                       ↑
              Error handling, loading state
```

---

## Phân tầng ứng dụng

| Tầng            | Vị trí              | Trách nhiệm                              |
|-----------------|---------------------|------------------------------------------|
| Presentation    | `app/`, `components/` | UI, routing, layout                    |
| Feature Logic   | `hooks/`            | State, side effects, business logic UI   |
| Data Access     | `lib/api.ts`        | HTTP calls, cache, error normalization   |
| Auth            | `lib/auth.ts`       | Token, session, middleware               |
| Types           | `types/`            | Shared TypeScript interfaces             |

---

## Modules chính

### `(auth)` — Xác thực
- `/login` — Đăng nhập
- `/register` — Đăng ký (nếu có)
- `/forgot-password` — Quên mật khẩu

### `(dashboard)` — Giao diện chính
- `/dashboard` — Tổng quan, tất cả khóa
- `/dashboard/locks/[id]` — Chi tiết 1 khóa
- `/dashboard/access-logs` — Lịch sử truy cập
- `/dashboard/users` — Quản lý người dùng
- `/dashboard/settings` — Cài đặt tài khoản

---

## Bảo mật

- Token lưu `httpOnly cookie`, không expose ra JS
- CSRF protection qua Next.js middleware
- Route bảo vệ qua `middleware.ts` (kiểm tra session)
- Không log thông tin nhạy cảm ra console production
---

## Performance

- Server Components mặc định → giảm JS bundle
- Image optimization qua `next/image`
- Font optimization qua `next/font`
- Code splitting tự động theo route
