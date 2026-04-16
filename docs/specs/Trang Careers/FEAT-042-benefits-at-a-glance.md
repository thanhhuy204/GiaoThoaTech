# FEAT-042 — Benefits at a Glance

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | Medium |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#benefits`) |

---

## 1. Business Goal
Thu hút ứng viên bằng cách trình bày rõ ràng các phúc lợi cạnh tranh của igloohome.

## 2. Actors
- Visitor đang đánh giá cơ hội nghề nghiệp

## 3. Preconditions
- Trang `/careers` tải thành công

## 4. Main Flow
1. Visitor cuộn đến section
2. Hiển thị background tối ấm (`#1a1916`)
3. Hiển thị label tag "Perks & Benefits"
4. Hiển thị H2: **"Benefits at a glance"**
5. Hiển thị subtitle ngắn
6. Hiển thị grid 6 benefit items, mỗi item có: icon lớn, tên phúc lợi, mô tả ngắn

## 5. UI Specification

### Layout
```
background: #1a1916
padding: 96px 0
─────────────────────────────────────
  [label] Perks & Benefits
  [H2] Benefits at a glance
  [subtitle]

  ┌──────────┬──────────┬──────────┐
  │  🦷      │  🏖️      │  🧘      │
  │ Dental   │ Paid     │ Well-    │
  │ Coverage │ Time Off │ being    │
  ├──────────┼──────────┼──────────┤
  │  🏥      │  👕      │  🏡      │
  │ Medical  │ Casual   │ Flexible │
  │ Insurance│ Setting  │ Work     │
  └──────────┴──────────┴──────────┘
─────────────────────────────────────
grid: 3 cols desktop → 2 cols tablet → 1 col mobile
```

### Benefits data
```ts
[
  {
    icon: '🦷',
    title: 'Dental Coverage',
    description: 'Comprehensive dental plan for you and your dependents.',
  },
  {
    icon: '🏖️',
    title: 'Paid Time Off',
    description: 'Generous leave policy including annual leave, public holidays, and personal days.',
  },
  {
    icon: '🧘',
    title: 'Well-being',
    description: 'Monthly wellness allowance for gym, mental health apps, or any activity you love.',
  },
  {
    icon: '🏥',
    title: 'Medical Insurance',
    description: 'Full medical coverage with access to quality healthcare providers.',
  },
  {
    icon: '👕',
    title: 'Casual Work Setting',
    description: 'No dress code — come as you are. We care about results, not appearances.',
  },
  {
    icon: '🏡',
    title: 'Flexible Work',
    description: 'Hybrid work options available. Balance your home and office time your way.',
  },
]
```

### Màu sắc
| Element | Value |
|---|---|
| Background | `#1a1916` |
| H2 | `#fff` |
| Subtitle | `rgba(255,255,255,0.6)` |
| Card background | `#262320` |
| Card border | `rgba(255,255,255,0.06)` |
| Icon | `2.5rem` emoji, `margin-bottom: 12px` |
| Title | `#fff` |
| Description | `rgba(255,255,255,0.6)` |

### Hover state (card)
- `border-color: rgba(232,97,74,0.3)`
- `background: #2e2b27`

## 6. Interactions & Animations
- Cards fade up khi vào viewport, stagger theo hàng

## 7. Business Rules
- Hiển thị đủ 6 benefits theo spec gốc: Dental, Paid time off, Well-being, Medical, Casual work setting, Flexible work arrangements
- Icon có thể là emoji placeholder, thay bằng SVG sau khi có design assets

## 8. Edge Cases
- Mobile: 1 col, cards full-width

## 9. Acceptance Criteria

### AC-01: Hiển thị đủ 6 benefits
**Given** visitor cuộn đến section
**When** section hiển thị
**Then** 6 benefit cards với icon, title, description hiển thị trên nền tối ấm

### AC-02: Nội dung đúng theo spec
**Given** section đang hiển thị
**When** visitor xem từng card
**Then** 6 benefits bao gồm: Dental, Paid Time Off, Well-being, Medical, Casual Work Setting, Flexible Work
