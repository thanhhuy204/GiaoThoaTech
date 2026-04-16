# FEAT-045 — Current Openings

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | High |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#openings`) |

---

## 1. Business Goal
Cho phép visitor xem và lọc các vị trí tuyển dụng đang mở, dễ dàng tìm kiếm job phù hợp và truy cập trang chi tiết để ứng tuyển.

## 2. Actors
- Visitor (job seeker)

## 3. Preconditions
- Trang `/careers` tải thành công
- Có dữ liệu job listings (mock data hoặc API)

## 4. Main Flow
1. Visitor cuộn đến hoặc được scroll đến `#openings` (từ nút Hero)
2. Hiển thị background trắng (`#fff`)
3. Hiển thị label tag "Open Roles"
4. Hiển thị H2: **"Current openings"**
5. Hiển thị filter tabs theo department: **All | Engineering | Product | Sales | Operations**
6. Hiển thị danh sách job cards theo filter đang active
7. Visitor click tên job → điều hướng đến `/careers/[slug]`

## 5. UI Specification

### Layout
```
background: #fff
padding: 96px 0
id: openings  ← scroll target từ Hero CTA
─────────────────────────────────────
  [label] Open Roles
  [H2] Current openings

  [All] [Engineering] [Product] [Sales] [Operations]
  ──────── filter tabs ────────

  ┌─────────────────────────────────────────────────────┐
  │ Senior Frontend Engineer          Engineering · SG  │
  │ Full-time                                    →      │
  ├─────────────────────────────────────────────────────┤
  │ Product Manager - Access Solutions  Product · Remote│
  │ Full-time                                    →      │
  ├─────────────────────────────────────────────────────┤
  │ ...                                                  │
  └─────────────────────────────────────────────────────┘
─────────────────────────────────────
```

### Job Listings mock data
```ts
[
  { slug: 'senior-frontend-engineer', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Singapore', type: 'Full-time' },
  { slug: 'backend-engineer-iot', title: 'Backend Engineer (IoT)', department: 'Engineering', location: 'Singapore', type: 'Full-time' },
  { slug: 'product-manager-access', title: 'Product Manager – Access Solutions', department: 'Product', location: 'Remote', type: 'Full-time' },
  { slug: 'ux-designer', title: 'UX Designer', department: 'Product', location: 'Singapore', type: 'Full-time' },
  { slug: 'enterprise-sales-apac', title: 'Enterprise Sales Manager – APAC', department: 'Sales', location: 'Singapore', type: 'Full-time' },
  { slug: 'customer-success-manager', title: 'Customer Success Manager', department: 'Sales', location: 'Remote', type: 'Full-time' },
  { slug: 'supply-chain-analyst', title: 'Supply Chain Analyst', department: 'Operations', location: 'Singapore', type: 'Full-time' },
  { slug: 'firmware-engineer', title: 'Firmware Engineer', department: 'Engineering', location: 'Singapore', type: 'Full-time' },
]
```

### Department tabs
```ts
['All', 'Engineering', 'Product', 'Sales', 'Operations']
```

### Job Row styling
| Element | Value |
|---|---|
| Row background | `#fff` |
| Row border bottom | `1px solid var(--border)` |
| Row padding | `20px 24px` |
| Job title | `var(--dark)`, `font-weight: 600`, `1rem` |
| Job title hover | `color: var(--primary)` |
| Meta (dept · location) | `var(--gray)`, `0.85rem` |
| Type badge | bg `rgba(232,97,74,0.1)`, color `var(--primary)` |
| Arrow icon | `var(--gray)` → `var(--primary)` on row hover |

### Filter tab styling
| State | Style |
|---|---|
| Default | bg `transparent`, color `var(--gray)`, border `1px solid var(--border)` |
| Active | bg `var(--dark)`, color `#fff` |
| Hover | bg `#F5F4F1` |

## 6. Interactions & Animations
- Filter click: instant filter với fade transition `opacity 200ms`
- Row hover: title màu primary, arrow slide right `4px`
- Khi không có job trong filter → hiển thị empty state

## 7. Business Rules
- Default filter = "All"
- Tên job là `<a href="/careers/[slug]">` (không phải button)
- `type` luôn hiển thị dưới dạng badge
- Section `id="openings"` bắt buộc để Hero CTA scroll đến đúng

## 8. Edge Cases
- Filter không có kết quả → empty state: "No openings in this department right now. Check back soon!"
- Danh sách rỗng (không có job nào) → hiển thị: "We're always looking for great people. Send us your CV at careers@igloohome.co"

## 9. Data Structure
```ts
interface Job {
  slug: string
  title: string
  department: 'Engineering' | 'Product' | 'Sales' | 'Operations'
  location: string
  type: 'Full-time' | 'Part-time' | 'Contractor'
}
```

## 10. Acceptance Criteria

### AC-01: Hiển thị danh sách jobs
**Given** visitor tới section openings
**When** filter "All" đang active
**Then** hiển thị đầy đủ tất cả job listings với title, dept, location, type

### AC-02: Filter theo department
**Given** danh sách đang hiển thị
**When** visitor click tab "Engineering"
**Then** chỉ hiển thị các jobs có `department === 'Engineering'`

### AC-03: Click job → trang chi tiết
**Given** danh sách đang hiển thị
**When** visitor click tên job
**Then** điều hướng đến `/careers/[slug]` tương ứng

### AC-04: Empty state khi filter rỗng
**Given** visitor chọn department không có openings
**When** filter áp dụng
**Then** hiển thị thông báo empty state phù hợp

### AC-05: Scroll từ Hero CTA
**Given** visitor click "Explore careers" ở Hero
**When** smooth scroll xảy ra
**Then** trang cuộn đến đúng section `#openings`
