# Tích hợp Claude Code vào Dự án SmartLock Frontend

> Tài liệu trình bày cách tổ chức, cấu hình và tận dụng Claude Code trong một dự án Next.js thực tế.

---

## 1. Tổng quan dự án

**SmartLock Frontend** là website marketing + quản lý đa ngôn ngữ cho sản phẩm khóa thông minh igloohome.

| Thông tin         | Chi tiết                              |
|-------------------|---------------------------------------|
| Framework         | Next.js 16.x (App Router)             |
| UI Library        | React 19.x + Tailwind CSS 4.x         |
| Ngôn ngữ          | TypeScript 5.x (strict mode)          |
| State Management  | Redux Toolkit 2.x                     |
| i18n              | next-intl (Tiếng Anh + Tiếng Việt)   |
| Linting           | ESLint 9.x                            |

---

## 2. Cấu trúc dự án

```
smartlock-frontend/
│
├── .claude/                        ← Cấu hình Claude Code cho dự án
│   ├── settings.json               ← Project settings, hooks config
│   ├── hooks/                      ← Pre/Post-response automation hooks
│   └── skills/                     ← Skill scripts tùy chỉnh
│       ├── code-review/SKILL.md
│       ├── refactor/SKILL.md
│       ├── release/SKILL.md
│       └── testing/SKILL.md
│
├── app/                            ← Next.js App Router
│   ├── [locale]/                   ← Dynamic i18n routing (en / vi)
│   │   ├── about/
│   │   ├── careers/
│   │   ├── products/[slug]/        ← Dynamic product pages
│   │   ├── solutions/
│   │   │   ├── access-control/
│   │   │   └── short-term-rental/
│   │   ├── page.tsx                ← Homepage
│   │   └── layout.tsx              ← Locale-aware root layout
│   ├── components/
│   │   ├── layout/                 ← Navbar, Footer
│   │   ├── trangchu/               ← Homepage sections (Hero, Products...)
│   │   └── ui/                     ← Primitive UI components
│   ├── globals.css
│   ├── layout.tsx                  ← Root layout
│   ├── page.tsx                    ← Redirect → /en
│   └── providers.tsx               ← Redux Provider wrapper
│
├── lib/                            ← State management & utilities
│   ├── store.ts                    ← Redux store configuration
│   └── taskSlice.ts                ← Task reducer
│
├── features/                       ← Redux feature slices
│   └── counter/counterSlice.ts
│
├── src/
│   └── i18n.ts                     ← next-intl locale config
│
├── messages/                       ← Translation files
│   ├── en.json
│   └── vi.json
│
├── public/                         ← Static assets
│   ├── images/                     ← 125+ ảnh sản phẩm, giải thưởng...
│   └── video/                      ← Video demo sản phẩm
│
├── docs/                           ← Tài liệu kỹ thuật
│   ├── architecture.md
│   ├── decisions/                  ← Architecture Decision Records (ADRs)
│   │   ├── 0001-nextjs-app-router.md
│   │   ├── 0002-no-component-library.md
│   │   └── 0003-httponly-cookie-auth.md
│   └── specs/                      ← 62+ Feature Specifications
│
├── CLAUDE.md                       ← Ngữ cảnh chính cho Claude Code
├── middleware.ts                   ← i18n routing middleware
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Kiến trúc tích hợp Claude Code

### 3.1 File CLAUDE.md — Trung tâm ngữ cảnh

`CLAUDE.md` là file quan trọng nhất. Claude Code đọc file này **đầu tiên** trong mỗi conversation để hiểu dự án.

```
CLAUDE.md chứa:
├── Vai trò của Claude trong dự án
├── Tech stack & phiên bản
├── Cấu trúc thư mục
├── Quy tắc đặt tên (Component, Hook, Type, Constant)
├── Quy tắc viết component
├── Kiến trúc API
├── Quyết định kiến trúc đã chốt
├── Skills thường dùng (trigger keywords)
└── Ràng buộc quan trọng (NO any, NO inline style...)
```

**Ví dụ thực tế trong CLAUDE.md:**
```markdown
## Ràng buộc quan trọng
- KHÔNG dùng `any` trong TypeScript — dùng `unknown` nếu không rõ type
- KHÔNG inline style — chỉ Tailwind classes
- Mọi component phải có `displayName` nếu dùng `forwardRef`
- Accessibility: luôn có `aria-label` cho icon buttons
```

---

### 3.2 Thư mục `.claude/` — Cấu hình nâng cao

```
.claude/
├── settings.json     ← Project metadata + hooks toggle
├── hooks/            ← Shell scripts tự động chạy
└── skills/           ← Prompt templates tái sử dụng
```

#### settings.json

```json
{
  "project": "smartlock-frontend",
  "description": "SmartLock Frontend — Next.js 16 + React 19 + Tailwind CSS",
  "language": "vi",
  "codeLanguage": "typescript",
  "hooks": {
    "pre-response": { "enabled": false },
    "post-response": { "enabled": false }
  }
}
```

---

### 3.3 Skills — Prompt Templates tái sử dụng

Skills là các file `.md` định nghĩa workflow chuyên biệt. Trigger bằng keyword ngắn.

| Keyword trigger     | File skill                            | Mục đích                          |
|---------------------|---------------------------------------|-----------------------------------|
| `review`, `cr`      | `.claude/skills/code-review/SKILL.md` | Code review theo checklist        |
| `refactor`          | `.claude/skills/refactor/SKILL.md`    | Cải thiện cấu trúc code           |
| `release`           | `.claude/skills/release/SKILL.md`     | Quy trình release                 |
| `test`, `viết test` | `.claude/skills/testing/SKILL.md`     | Viết unit/integration tests       |

**Ví dụ: code-review/SKILL.md checklist**
```markdown
## Code Review Checklist
- [ ] Single Responsibility Principle
- [ ] Server Component vs Client Component đúng chỗ
- [ ] TypeScript types đầy đủ, không có `any`
- [ ] Tailwind classes (không inline style)
- [ ] aria-label cho icon buttons
- [ ] Không có business logic trong component
```

---

### 3.4 Hooks — Tự động hóa

Hooks là shell scripts chạy tự động theo sự kiện:

```
Pre-response hooks  → Chạy TRƯỚC khi Claude trả lời
Post-response hooks → Chạy SAU khi Claude trả lời
```

**Use cases thực tế:**
- Pre-response: Tự động chạy `eslint` trước khi review code
- Post-response: Validate naming conventions sau mỗi file được tạo

---

## 4. Luồng dữ liệu & Kiến trúc hệ thống

```
Browser
  │
  ▼
Next.js App Router (Server Components mặc định)
  │
  ├── middleware.ts ──────────────── i18n routing (/ → /vi)
  │
  ├── app/[locale]/layout.tsx ────── NextIntlClientProvider + Redux Provider
  │
  ├── Server Components ──────────── Fetch data, render HTML
  │
  └── Client Components ("use client")
        │
        ├── Redux Store (lib/store.ts)
        │   └── Reducers: task, counter
        │
        └── API calls → lib/api.ts → NEXT_PUBLIC_API_URL
                                       (httpOnly cookie auth)
```

---

## 5. Quy tắc code được enforce bởi CLAUDE.md

### Naming Conventions

| Loại              | Convention        | Ví dụ                    |
|-------------------|-------------------|--------------------------|
| Component         | `PascalCase`      | `LockCard.tsx`           |
| Hook              | `camelCase` + use | `useLockStatus.ts`       |
| Utility function  | `camelCase`       | `formatDate.ts`          |
| Type / Interface  | `PascalCase`      | `ILock`, `LockStatus`    |
| Constant          | `UPPER_SNAKE_CASE`| `MAX_RETRY_COUNT`        |

### Component Architecture

```typescript
// ✅ Đúng — Server Component, props interface rõ ràng
interface LockCardProps {
  lockId: string
  status: LockStatus
}

export default function LockCard({ lockId, status }: LockCardProps) {
  // Không có business logic ở đây
  return <div className="rounded-xl p-4">...</div>
}

// ❌ Sai — dùng any, inline style
export default function LockCard({ data }: { data: any }) {
  return <div style={{ padding: '16px' }}>...</div>
}
```

### Import Order

```typescript
// 1. React / Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. Thư viện ngoài
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'

// 3. Internal — absolute import với @/
import { LockCard } from '@/components/features/LockCard'
import { useLockStatus } from '@/hooks/useLockStatus'
import type { ILock } from '@/types'
```

---

## 6. Kiến trúc API

```
NEXT_PUBLIC_API_URL (env var)
        │
        ▼
   lib/api.ts          ← Tất cả API calls đi qua đây
        │
        ├── Auth: httpOnly cookie (không dùng localStorage)
        │
        └── Error format chuẩn hóa:
            { message: string, code: string }
```

---

## 7. i18n Architecture

```
middleware.ts
  └── next-intl middleware → route /en/*, /vi/*

src/i18n.ts
  └── Định nghĩa locales: ['en', 'vi'], default: 'vi'

messages/
  ├── en.json    ← English translations
  └── vi.json    ← Vietnamese translations

app/[locale]/layout.tsx
  └── NextIntlClientProvider → load messages theo locale
```

---

## 8. State Management với Redux Toolkit

```typescript
// lib/store.ts
export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Type-safe hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

```typescript
// app/providers.tsx
'use client'
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
```

---

## 9. Architecture Decision Records (ADRs)

Tài liệu hóa lý do các quyết định kiến trúc trong `docs/decisions/`:

| ADR  | Quyết định                          | Lý do                                              |
|------|-------------------------------------|----------------------------------------------------|
| 0001 | Next.js App Router                  | SEO tốt hơn, Server Components, streaming          |
| 0002 | Không dùng MUI/Chakra               | Bundle size, tự kiểm soát UI, học Tailwind thuần   |
| 0003 | httpOnly cookie cho auth token      | Bảo mật: chống XSS attack từ JavaScript            |

---

## 10. Feature Specification Workflow

```
docs/specs/
  ├── Layout/
  │   ├── FEAT-048-navbar.md
  │   └── FEAT-049-footer.md
  ├── Trang chu/           (8 features)
  ├── Trang About us/      (5 features)
  ├── Trang Careers/       (10 features)
  ├── Trang Case Studies/  (5 features)
  └── ...                 (62+ specs tổng cộng)
```

Mỗi spec chứa: requirements, UI elements, interactions, acceptance criteria.

---

## 11. Lợi ích thực tế của tích hợp Claude Code

| Vấn đề trước đây                     | Giải pháp với Claude Code              |
|--------------------------------------|----------------------------------------|
| Mỗi dev hiểu dự án khác nhau         | CLAUDE.md là single source of truth    |
| Code review mất nhiều thời gian      | `/review` skill với checklist chuẩn hóa|
| Onboarding developer mới chậm        | Claude đọc CLAUDE.md + docs/ tự động  |
| Naming convention không nhất quán    | Claude enforce rules từ CLAUDE.md      |
| Viết spec & test tốn công            | `/test` và spec templates từ skills    |

---

## 12. Best Practices — Tích hợp Claude Code hiệu quả

1. **CLAUDE.md phải luôn up-to-date** — là nguồn sự thật duy nhất về dự án
2. **Viết ADR** cho mọi quyết định kiến trúc quan trọng
3. **Skills = DRY cho prompts** — tái sử dụng workflow thường dùng
4. **Spec trước, code sau** — dùng `docs/specs/` làm foundation
5. **Constraints rõ ràng** — "KHÔNG dùng X" hiệu quả hơn "nên dùng Y"
6. **Absolute imports** — `@/` prefix giúp Claude hiểu cấu trúc dự án

---

*Tài liệu được tổng hợp từ codebase SmartLock Frontend — 2026-03-19*
