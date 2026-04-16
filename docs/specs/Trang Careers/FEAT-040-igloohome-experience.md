# FEAT-040 — The igloohome Experience

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | Medium |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#experience`) |

---

## 1. Business Goal
Truyền đạt trải nghiệm làm việc thực tế tại igloohome — môi trường linh hoạt, sáng tạo, và có tầm ảnh hưởng toàn cầu.

## 2. Actors
- Visitor đang cân nhắc ứng tuyển

## 3. Preconditions
- Trang `/careers` tải thành công

## 4. Main Flow
1. Visitor cuộn đến section
2. Hiển thị background tối (`#0f0f0f`)
3. Hiển thị label tag "Life at igloo"
4. Hiển thị H2: **"The igloohome experience"**
5. Hiển thị subtitle ngắn
6. Hiển thị grid 4 experience cards, mỗi card có: icon, tiêu đề, mô tả ngắn

## 5. UI Specification

### Layout
```
background: #0f0f0f
padding: 96px 0
─────────────────────────────────────
  [label] Life at igloo
  [H2] The igloohome experience
  [subtitle]

  ┌──────┬──────┬──────┬──────┐
  │ 🌍   │ 🚀   │ 🤝   │ 💡   │
  │Global│Scale │Team  │Impact│
  │desc  │desc  │desc  │desc  │
  └──────┴──────┴──────┴──────┘
─────────────────────────────────────
grid: 4 cols desktop → 2 cols tablet → 1 col mobile
```

### Experience Cards data
```ts
[
  {
    icon: '🌍',
    title: 'Global Reach',
    description: 'Work on products used in 25+ countries. Your code unlocks doors worldwide.',
  },
  {
    icon: '🚀',
    title: 'Scale Fast',
    description: 'Join a high-growth company scaling from startup to global market leader.',
  },
  {
    icon: '🤝',
    title: 'Collaborative Culture',
    description: 'Flat hierarchy, open communication, and genuine teamwork across time zones.',
  },
  {
    icon: '💡',
    title: 'Meaningful Impact',
    description: 'Your work directly shapes how millions of people access their homes and offices.',
  },
]
```

### Màu sắc
| Element | Value |
|---|---|
| Background | `#0f0f0f` |
| H2 | `#fff` |
| Subtitle | `rgba(255,255,255,0.6)` |
| Card background | `#1a1916` |
| Card border | `rgba(255,255,255,0.07)` |
| Card icon | `2rem` emoji hoặc SVG |
| Card title | `#fff` |
| Card description | `rgba(255,255,255,0.6)` |

### Hover state (card)
- `transform: translateY(-4px)`
- `border-color: rgba(232,97,74,0.3)`
- `box-shadow: 0 8px 32px rgba(0,0,0,0.4)`

## 6. Interactions & Animations
- Cards fade up với stagger khi vào viewport
- Hover: lift + border highlight

## 7. Business Rules
- Luôn hiển thị đủ 4 cards
- Icon không bắt buộc là emoji — có thể thay bằng SVG icon khi có assets

## 8. Edge Cases
- Tablet (600–900px): 2 cols grid
- Mobile (<600px): 1 col stack

## 9. Acceptance Criteria

### AC-01: Hiển thị 4 experience cards
**Given** visitor cuộn đến section
**When** section vào viewport
**Then** 4 cards với icon, title, description hiển thị đầy đủ trên nền tối

### AC-02: Hover effect hoạt động
**Given** desktop visitor hover lên card
**When** mouse enter
**Then** card lift lên và viền sáng lên
