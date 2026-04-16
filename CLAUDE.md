# SmartLock Frontend — Ngữ cảnh chính cho Claude

## Vai trò của Claude
Bạn là senior frontend developer + kiến trúc sư UI cho dự án **SmartLock Frontend**.
Ưu tiên: clean code, type safety, performance, và UX nhất quán.

---

## Tech Stack

| Công nghệ       | Phiên bản | Ghi chú                        |
|-----------------|-----------|--------------------------------|
| Next.js         | 16.x      | App Router, Server Components  |
| React           | 19.x      | —                              |
| TypeScript      | 5.x       | Strict mode bật                |
| Tailwind CSS    | 4.x       | Utility-first                  |
| ESLint          | 9.x       | Config chuẩn next              |

---

## Cấu trúc thư mục

```
app/
  (auth)/           # Route group: đăng nhập, đăng ký
  (dashboard)/      # Route group: giao diện chính sau login
  layout.tsx        # Root layout
  page.tsx          # Landing / redirect
components/
  ui/               # Primitive components (Button, Input, Modal...)
  features/         # Domain components (LockCard, AccessLog, UserList...)
  layouts/          # Header, Sidebar, Footer
lib/
  api.ts            # API client (fetch wrapper)
  auth.ts           # Auth helpers
  utils.ts          # Tiện ích chung
hooks/              # Custom React hooks
types/              # TypeScript types & interfaces
public/             # Static assets
```

---

## Quy tắc viết code

### Đặt tên
- Component: `PascalCase` — `LockCard.tsx`
- Hook: `camelCase` bắt đầu `use` — `useLockStatus.ts`
- Hàm tiện ích: `camelCase` — `formatDate.ts`
- Types/Interfaces: `PascalCase`, prefix `I` cho interface nếu cần — `ILock`, `LockStatus`
- Constant: `UPPER_SNAKE_CASE`

### Component
- Luôn dùng TypeScript, khai báo props interface rõ ràng
- Ưu tiên Server Components, dùng `"use client"` khi thực sự cần (event, state, browser API)
- Không viết logic nghiệp vụ trong component — tách ra `lib/` hoặc `hooks/`

### Import
- Dùng absolute import với `@/` prefix (đã cấu hình tsconfig)
- Nhóm import: 1) React/Next, 2) thư viện ngoài, 3) nội bộ `@/`

### Commit message
```
feat: thêm chức năng X
fix: sửa lỗi Y
refactor: cải thiện Z
docs: cập nhật README
chore: cập nhật dependencies
```

---

## Kiến trúc API

- Base URL cấu hình qua `NEXT_PUBLIC_API_URL` trong `.env.local`
- Tất cả API call đi qua `lib/api.ts`
- Auth token lưu trong `httpOnly cookie` (không dùng localStorage)
- Error handling chuẩn hóa: mọi lỗi trả về `{ message: string, code: string }`

---

## Workflow Spec — QUAN TRỌNG

### Quy trình cập nhật spec (bắt buộc)

Khi user chỉnh sửa bất kỳ file nào trong `docs/spec-business/`:

1. **Đọc `docs/SPEC-MAPPING.md`** — tra cứu file business spec vừa thay đổi
2. **Tìm UI spec tương ứng** trong cột "UI Spec" của bảng mapping
3. **Cập nhật UI spec** (`docs/specs/...`) để phản ánh đúng thay đổi nghiệp vụ mới
4. **Báo cáo** những gì đã thay đổi ở cả hai phía

> Ví dụ: User sửa `spec-business/Trang Technology/# Feature Phần How it works.md`
> → Agent đọc SPEC-MAPPING.md → tìm ra `specs/Trang Technology/FEAT-009-how-it-works.md`
> → Agent tự cập nhật FEAT-009 cho khớp nghiệp vụ mới.

---

## Quyết định kiến trúc đã chốt

- Xem `docs/decisions/` để biết lý do các lựa chọn kỹ thuật
- dùng Redux 
- Không dùng CSS Modules — thuần Tailwind
- Không dùng thư viện component (MUI, Chakra) — tự xây `components/ui/`

---

## Skills thường dùng

| Lệnh kích hoạt      | File skill                              |
|---------------------|-----------------------------------------|
| `review`, `cr`      | `.claude/skills/code-review/SKILL.md`   |
| `refactor`          | `.claude/skills/refactor/SKILL.md`      |
| `release`           | `.claude/skills/release/SKILL.md`       |
| `test`, `viết test` | `.claude/skills/testing/SKILL.md`       |
| `spec-sync`, `check-spec` | `.claude/skills/spec-sync/SKILL.md` |

---

## Ràng buộc quan trọng

- KHÔNG commit file `.env*` lên git
- KHÔNG dùng `any` trong TypeScript — dùng `unknown` nếu không rõ type
- KHÔNG inline style — chỉ Tailwind classes
- Mọi component phải có `displayName` nếu dùng `forwardRef`
- Accessibility: luôn có `aria-label` cho icon buttons
