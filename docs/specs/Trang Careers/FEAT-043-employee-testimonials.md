# FEAT-043 — Employee Testimonials

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | Medium |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#employee-stories`) |

---

## 1. Business Goal
Tạo độ tin cậy bằng cách để chính nhân viên igloohome chia sẻ trải nghiệm thực tế, giúp ứng viên hình dung rõ văn hóa làm việc.

## 2. Actors
- Visitor đang tìm hiểu môi trường làm việc

## 3. Preconditions
- Trang `/careers` tải thành công

## 4. Main Flow
1. Visitor cuộn đến section
2. Hiển thị background trắng (`#fff`)
3. Hiển thị label tag "Our People"
4. Hiển thị H2: **"Hear from the team"**
5. Hiển thị grid 3 testimonial cards, mỗi card có: avatar/initials, tên, vai trò, quote

## 5. UI Specification

### Layout
```
background: #fff
padding: 96px 0
─────────────────────────────────────
  [label] Our People
  [H2] Hear from the team

  ┌──────────┬──────────┬──────────┐
  │ [avatar] │ [avatar] │ [avatar] │
  │ Name     │ Name     │ Name     │
  │ Role     │ Role     │ Role     │
  │ "quote"  │ "quote"  │ "quote"  │
  └──────────┴──────────┴──────────┘
─────────────────────────────────────
grid: 3 cols desktop → 1 col mobile
```

### Employee data
```ts
[
  {
    initials: 'AL',
    name: 'Alex Lim',
    role: 'Senior Software Engineer',
    quote: 'The problems we solve here are genuinely hard and meaningful. I wake up every day knowing my work helps real people access their homes and businesses securely.',
    tenure: '3 years',
  },
  {
    initials: 'SW',
    name: 'Sarah Wong',
    role: 'Product Manager',
    quote: 'What I love most is the ownership. From day one, I was trusted to make real decisions. The team is brilliant, collaborative, and always pushing each other to grow.',
    tenure: '2 years',
  },
  {
    initials: 'RC',
    name: 'Raj Chandra',
    role: 'Hardware Engineer',
    quote: 'Building physical products that connect to the digital world is a rare challenge. igloo gives us the resources, the trust, and the freedom to do our best work.',
    tenure: '4 years',
  },
]
```

### Màu sắc
| Element | Value |
|---|---|
| Background | `#fff` |
| H2 | `var(--dark)` |
| Card background | `#F5F4F1` |
| Card border | `rgba(0,0,0,0.06)` |
| Avatar bg | `var(--dark)` |
| Avatar text | `#fff` |
| Name | `var(--dark)` |
| Role | `var(--primary)` |
| Quote | `rgba(0,0,0,0.7)` |
| Tenure badge | bg `rgba(232,97,74,0.1)`, color `var(--primary)` |

### Avatar
- Nếu không có ảnh: initials trong div 52×52, background `var(--dark)`, font Cormorant Garamond bold
- Khi có assets: dùng `<Image>` với `fill` và `sizes`

### Hover state (card)
- `transform: translateY(-4px)`
- `box-shadow: 0 8px 24px rgba(0,0,0,0.1)`

## 6. Interactions & Animations
- Cards fade up khi vào viewport với stagger `delay-1..3`

## 7. Business Rules
- Avatar initials là 2 chữ cái đầu của tên
- Quote hiển thị đầy đủ, không bị truncate
- Role hiển thị màu `var(--primary)` để tạo điểm nhấn

## 8. Edge Cases
- Ảnh avatar không load → fallback về initials div
- Mobile: 1 col, cards stack dọc

## 9. Acceptance Criteria

### AC-01: Hiển thị 3 employee testimonials
**Given** visitor cuộn đến section
**When** section hiển thị
**Then** 3 cards với avatar, tên, vai trò, quote hiển thị đầy đủ

### AC-02: Avatar initials hiển thị đúng
**Given** chưa có ảnh thực
**When** card render
**Then** initials 2 chữ cái hiển thị trên nền tối, font Cormorant Garamond

### AC-03: Role màu primary
**Given** card đang hiển thị
**When** visitor nhìn vào role text
**Then** role text có màu `var(--primary)` (đỏ cam)
