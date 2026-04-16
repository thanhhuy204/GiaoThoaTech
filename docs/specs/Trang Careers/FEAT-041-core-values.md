# FEAT-041 — Core Values

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | Medium |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#core-values`) |

---

## 1. Business Goal
Giới thiệu các giá trị cốt lõi của igloohome để thu hút ứng viên có cùng mindset và định hướng.

## 2. Actors
- Visitor quan tâm đến văn hóa công ty

## 3. Preconditions
- Trang `/careers` tải thành công

## 4. Main Flow
1. Visitor cuộn đến section
2. Hiển thị background kem ấm (`#F5F4F1`)
3. Hiển thị label tag "Our Values"
4. Hiển thị H2: **"Our core values"**
5. Hiển thị subtitle ngắn
6. Hiển thị grid 4–6 value cards, mỗi card có: icon, tiêu đề màu đỏ cam, mô tả ngắn

## 5. UI Specification

### Layout
```
background: #F5F4F1
padding: 96px 0
─────────────────────────────────────
  [label] Our Values
  [H2] Our core values
  [subtitle]

  ┌──────────┬──────────┬──────────┐
  │ [icon]   │ [icon]   │ [icon]   │
  │ Customer │Ownership │ Integrity│
  │ First    │          │          │
  │ desc     │ desc     │ desc     │
  ├──────────┼──────────┼──────────┤
  │ [icon]   │ [icon]   │ [icon]   │
  │Innovation│Teamwork  │Excellence│
  │ desc     │ desc     │ desc     │
  └──────────┴──────────┴──────────┘
─────────────────────────────────────
grid: 3 cols desktop → 2 cols tablet → 1 col mobile
```

### Core Values data
```ts
[
  {
    icon: '🎯',
    title: 'Customer First',
    description: 'Every decision starts with the question: does this make life better for our customers?',
  },
  {
    icon: '🏆',
    title: 'Ownership',
    description: 'We take full responsibility for our work — celebrating wins and learning from failures together.',
  },
  {
    icon: '🔐',
    title: 'Integrity',
    description: 'We build trust through transparency, honesty, and doing the right thing even when no one is watching.',
  },
  {
    icon: '⚡',
    title: 'Innovation',
    description: 'We challenge the status quo and embrace bold ideas that push the boundaries of what\'s possible.',
  },
  {
    icon: '🤝',
    title: 'Teamwork',
    description: 'Diverse perspectives make us stronger. We collaborate openly across borders and disciplines.',
  },
  {
    icon: '✨',
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards — in our products, our processes, and our people.',
  },
]
```

### Màu sắc
| Element | Value |
|---|---|
| Background | `#F5F4F1` |
| H2 | `var(--dark)` |
| Subtitle | `var(--gray)` |
| Card background | `#fff` |
| Card border | `rgba(0,0,0,0.08)` |
| Card icon | `1.75rem` emoji |
| Card title | `var(--primary)` ← đỏ cam theo spec gốc |
| Card description | `var(--gray)` |

### Hover state (card)
- `transform: translateY(-3px)`
- `box-shadow: 0 6px 20px rgba(0,0,0,0.1)`

## 6. Interactions & Animations
- Cards fade up khi vào viewport với stagger

## 7. Business Rules
- Card title **phải dùng màu `var(--primary)`** (đỏ cam) — theo spec gốc
- Hiển thị đủ 6 values, không được bỏ bất kỳ card nào

## 8. Edge Cases
- Mobile: 1 col, cards stack dọc

## 9. Acceptance Criteria

### AC-01: Hiển thị tiêu đề section
**Given** visitor cuộn đến section
**When** section hiển thị
**Then** H2 "Our core values" hiển thị trên nền kem

### AC-02: Card title màu primary
**Given** section đang hiển thị
**When** visitor xem cards
**Then** tiêu đề mỗi card hiển thị màu `var(--primary)` (đỏ cam)

### AC-03: Đủ 6 value cards
**Given** section đang hiển thị
**When** visitor đếm số cards
**Then** có đúng 6 value cards với icon, title, description
