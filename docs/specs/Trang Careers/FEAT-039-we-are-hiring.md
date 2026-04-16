# FEAT-039 — We Are Hiring Section

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | High |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#we-are-hiring`) |

---

## 1. Business Goal
Tạo cảm xúc tích cực và khuyến khích visitor ứng tuyển bằng cách thể hiện văn hóa công ty cởi mở, đầy cơ hội phát triển.

## 2. Actors
- Visitor quan tâm đến cơ hội nghề nghiệp

## 3. Preconditions
- Trang `/careers` tải thành công

## 4. Main Flow
1. Visitor cuộn qua Hero section
2. Section hiển thị với background kem ấm (`#F5F4F1`)
3. Hiển thị label tag "Opportunities"
4. Hiển thị H2: **"We are hiring"**
5. Hiển thị tagline: *"Unlock your potential"*
6. Hiển thị đoạn mô tả 2–3 câu về môi trường làm việc
7. Hiển thị 3 stat highlights ngang hàng (số liệu nổi bật)

## 5. UI Specification

### Layout
```
background: #F5F4F1
padding: 96px 0
─────────────────────────────────────
  [label] Opportunities
  [H2] We are hiring
  [tagline] Unlock your potential
  [description paragraph]

  ┌──────────┬──────────┬──────────┐
  │  500+    │  25+     │  #1      │
  │ Customers│Countries │  in APAC │
  └──────────┴──────────┴──────────┘
─────────────────────────────────────
```

### Màu sắc
| Element | Value |
|---|---|
| Background | `#F5F4F1` |
| H2 | `var(--dark)` |
| Tagline | `var(--primary)` |
| Description | `var(--gray)` |
| Stat number | `var(--dark)` |
| Stat label | `var(--gray)` |
| Stat divider | `var(--border)` |

### Typography
| Element | Font | Size | Weight |
|---|---|---|---|
| H2 | Cormorant Garamond | `clamp(2rem, 3.5vw, 3rem)` | 700 |
| Tagline | DM Sans | `1.1rem` | 500 |
| Description | DM Sans | `1rem` | 400 |
| Stat number | Cormorant Garamond | `2.5rem` | 700 |
| Stat label | DM Sans | `0.85rem` | 500 |

### Stats data
```ts
[
  { value: '500+', label: 'Enterprise customers' },
  { value: '25+',  label: 'Countries served' },
  { value: '#1',   label: 'Smart lock in APAC' },
]
```

## 6. Interactions & Animations
- Fade-up animation cho label, H2, tagline, description (stagger `delay-1..4`)
- Stats fade in cùng lúc sau description (`delay-5`)

## 7. Business Rules
- Stats phải hiển thị đầy đủ 3 cột, không được wrap thành 1 cột trừ mobile
- Tagline hiển thị màu primary để tạo điểm nhấn

## 8. Edge Cases
- Mobile (<600px): stats stack thành 1 cột, border thay bằng margin

## 9. Acceptance Criteria

### AC-01: Hiển thị tiêu đề và tagline
**Given** visitor cuộn đến section
**When** section vào viewport
**Then** "We are hiring" và "Unlock your potential" hiển thị đúng style

### AC-02: Hiển thị stats
**Given** section đang hiển thị
**When** visitor xem nội dung
**Then** 3 stat blocks với số liệu và label hiển thị đầy đủ
