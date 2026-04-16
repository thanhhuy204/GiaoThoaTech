# FEAT-044 — Inclusivity Section

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | Medium |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#inclusivity`) |

---

## 1. Business Goal
Thể hiện cam kết về sự đa dạng và hòa nhập của igloohome — thu hút ứng viên từ mọi nền tảng và tăng độ tin tưởng của thương hiệu.

## 2. Actors
- Visitor quan tâm đến văn hóa công ty và giá trị DEI (Diversity, Equity & Inclusion)

## 3. Preconditions
- Trang `/careers` tải thành công

## 4. Main Flow
1. Visitor cuộn đến section
2. Hiển thị background kem ấm (`#F5F4F1`)
3. Hiển thị layout 2 cột: trái là text content, phải là visual/stats
4. Hiển thị label tag "Diversity & Inclusion"
5. Hiển thị H2: **"Where we value inclusivity"**
6. Hiển thị đoạn văn 2–3 câu về cam kết DEI
7. Hiển thị 3 inclusion stats dọc (hoặc ngang trên mobile)

## 5. UI Specification

### Layout
```
background: #F5F4F1
padding: 96px 0
─────────────────────────────────────
  ┌────────────────────┬─────────────┐
  │ [label] D&I        │  ┌────────┐ │
  │ [H2] Where we      │  │  40%   │ │
  │  value inclusivity │  │ Women  │ │
  │                    │  ├────────┤ │
  │ [description]      │  │  20+   │ │
  │                    │  │Natl.   │ │
  │                    │  ├────────┤ │
  │                    │  │  100%  │ │
  │                    │  │ Equal  │ │
  │                    │  │  Pay   │ │
  └────────────────────┴──┴────────┘─┘
col ratio: 55% / 45%
```

### Inclusion Stats data
```ts
[
  { value: '40%',  label: 'Women in leadership roles' },
  { value: '20+',  label: 'Nationalities on our team' },
  { value: '100%', label: 'Equal pay commitment' },
]
```

### Description text
> "At igloohome, we believe that diverse teams build better products. We actively cultivate an environment where every voice is heard, every background is respected, and every person has equal opportunity to grow and succeed."

### Màu sắc
| Element | Value |
|---|---|
| Background | `#F5F4F1` |
| H2 | `var(--dark)` |
| Description | `var(--gray)` |
| Stat value | `var(--primary)` |
| Stat label | `var(--dark)` |
| Stat divider | `var(--border)` |

### Typography
| Element | Font | Size | Weight |
|---|---|---|---|
| H2 | Cormorant Garamond | `clamp(2rem, 3vw, 2.8rem)` | 700 |
| Description | DM Sans | `1rem` | 400 |
| Stat value | Cormorant Garamond | `2.2rem` | 700 |
| Stat label | DM Sans | `0.85rem` | 500 |

## 6. Interactions & Animations
- Text col fade in từ trái, stats col fade in từ phải
- Counter animation cho stat numbers khi vào viewport (optional enhancement)

## 7. Business Rules
- Nội dung ngắn gọn, không quá 3 câu
- Stats phải có thực — không được dùng số giả tạo nếu không có data thực; dùng placeholder rõ ràng

## 8. Edge Cases
- Mobile (<768px): 2 cột → 1 cột, stats hiển thị dưới text

## 9. Acceptance Criteria

### AC-01: Hiển thị tiêu đề inclusivity
**Given** visitor cuộn đến section
**When** section vào viewport
**Then** "Where we value inclusivity" hiển thị trên nền kem

### AC-02: Hiển thị 3 inclusion stats
**Given** section đang hiển thị
**When** visitor xem phần stats
**Then** 3 stats với value màu primary và label hiển thị đầy đủ

### AC-03: Layout 2 cột trên desktop
**Given** viewport ≥ 768px
**When** section render
**Then** text content và stats hiển thị song song 2 cột
