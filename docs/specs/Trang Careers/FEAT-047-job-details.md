# FEAT-047 — Job Details Page

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | High |
| **Page file** | `app/(pages)/careers/[slug]/page.tsx` |
| **Component** | `app/components/careers/JobDetailsPage.tsx` |

---

## 1. Business Goal
Cung cấp đầy đủ thông tin về vị trí tuyển dụng để ứng viên đưa ra quyết định ứng tuyển, đồng thời tạo trải nghiệm chuyên nghiệp và nhất quán với brand igloohome.

## 2. Actors
- Visitor (ứng viên tiềm năng)

## 3. Preconditions
- Visitor truy cập `/careers/[slug]` (ví dụ: `/careers/senior-frontend-engineer`)
- Job `slug` tồn tại trong data
- Trang tải thành công

## 4. Main Flow
1. Visitor click vào tên job ở trang `/careers#openings`
2. Điều hướng đến `/careers/[slug]`
3. Hiển thị breadcrumb: `Careers > [Department] > [Job Title]`
4. Hiển thị Job Header: tên job, department badge, location, type
5. Hiển thị nút **"Apply for This Job"** (CTA nổi bật, sticky trên desktop)
6. Hiển thị nội dung chi tiết job theo thứ tự:
   - Job Purpose
   - Job Responsibilities (list)
   - Job Requirements (list)
   - What We Can Offer You (list)
7. Hiển thị section CTA cuối trang với nút Apply

## 5. UI Specification

### Layout (2 cột — desktop)
```
background: #fff
─────────────────────────────────────
  [Breadcrumb] Careers > Engineering > Senior Frontend Engineer

  ┌──────────────────────────┬──────────────────┐
  │ [H1] Senior Frontend     │ ┌──────────────┐ │
  │       Engineer           │ │ [dept badge] │ │
  │                          │ │ Engineering  │ │
  │ 📍 Singapore  🕐 Full-time│ │              │ │
  │                          │ │ [btn-primary]│ │
  │ ─────────────────────    │ │ Apply for    │ │
  │ Job Purpose              │ │ This Job     │ │
  │ [paragraph]              │ │              │ │
  │                          │ │ ──────────── │ │
  │ Job Responsibilities     │ │ Share:       │ │
  │ • item 1                 │ │ [LinkedIn]   │ │
  │ • item 2                 │ └──────────────┘ │
  │                          │ (sticky sidebar) │
  │ Job Requirements         │                  │
  │ • item 1                 │                  │
  │                          │                  │
  │ What We Can Offer You    │                  │
  │ • item 1                 │                  │
  │                          │                  │
  │ [Apply CTA bottom]       │                  │
  └──────────────────────────┴──────────────────┘
col ratio: 65% content / 35% sidebar
```

### Job Data structure
```ts
interface JobDetail {
  slug: string
  title: string
  department: 'Engineering' | 'Product' | 'Sales' | 'Operations'
  location: string
  type: 'Full-time' | 'Part-time' | 'Contractor'
  purpose: string
  responsibilities: string[]
  requirements: string[]
  offers: string[]
}
```

### Sample data (Senior Frontend Engineer)
```ts
{
  slug: 'senior-frontend-engineer',
  title: 'Senior Frontend Engineer',
  department: 'Engineering',
  location: 'Singapore',
  type: 'Full-time',
  purpose: 'You will be responsible for building and maintaining the web interfaces that power igloohome\'s products — from our marketing site to our enterprise dashboard. You\'ll work closely with Product and Design to ship high-quality, performant, and accessible experiences.',
  responsibilities: [
    'Build and maintain Next.js applications using React and TypeScript',
    'Collaborate with designers to implement pixel-perfect, responsive UI',
    'Write clean, well-tested code with a focus on performance and accessibility',
    'Participate in code reviews and contribute to frontend architecture decisions',
    'Mentor junior engineers and contribute to team knowledge sharing',
  ],
  requirements: [
    '5+ years of frontend development experience',
    'Strong proficiency in React, TypeScript, and modern CSS',
    'Experience with Next.js (App Router preferred)',
    'Familiarity with REST APIs and state management patterns',
    'Strong communication skills and ability to work in a collaborative team',
  ],
  offers: [
    'Competitive salary and equity package',
    'Comprehensive medical and dental coverage',
    'Flexible work arrangement (hybrid)',
    'Annual learning & development budget',
    'Opportunities to work on global-scale products',
  ],
}
```

### Màu sắc
| Element | Value |
|---|---|
| Page background | `#fff` |
| H1 | `var(--dark)` |
| Breadcrumb | `var(--gray)`, `0.85rem` |
| Breadcrumb current | `var(--dark)` |
| Section heading (h2) | `var(--dark)`, `1.1rem`, `font-weight: 700` |
| Section divider | `var(--border)` |
| List item text | `var(--gray)` |
| Sidebar background | `#F5F4F1` |
| Department badge | bg `rgba(232,97,74,0.1)`, color `var(--primary)` |
| Location/Type icons | `var(--gray)` |

### Apply Button
- Class `btn-primary` + `width: 100%` trong sidebar
- Sticky: `position: sticky; top: 96px` trên desktop
- `href="/careers/[slug]/apply"` hoặc external ATS link

## 6. Interactions & Animations
- Breadcrumb links: hover → `color: var(--primary)`
- "Apply for This Job" sticky sidebar theo scroll
- Back link: `← Back to all openings` → `/careers#openings`

## 7. Business Rules
- Tất cả 4 sections (Purpose, Responsibilities, Requirements, Offers) phải hiển thị đầy đủ
- Nút Apply phải luôn visible — cả ở sidebar (desktop) và cuối trang (mobile)
- Job không tồn tại → redirect về `/careers` hoặc hiển thị 404

## 8. Edge Cases
- `slug` không khớp với bất kỳ job nào → hiển thị: "This position is no longer available" + link về `/careers`
- Mobile (<768px): sidebar ẩn, Apply button sticky bottom của viewport
- Danh sách dài → không paginate, hiển thị toàn bộ

## 9. Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| ≥ 1024px | 2 cols: 65/35, sidebar sticky |
| 768–1023px | 1 col, sidebar content xuống dưới content |
| < 768px | 1 col, Apply button sticky bottom bar |

## 10. Acceptance Criteria

### AC-01: Hiển thị đầy đủ thông tin job
**Given** visitor truy cập `/careers/senior-frontend-engineer`
**When** trang tải
**Then** H1, breadcrumb, department, location, type, và 4 sections nội dung hiển thị đầy đủ

### AC-02: Nút Apply luôn visible
**Given** visitor đang đọc job details
**When** visitor scroll qua nội dung dài
**Then** nút "Apply for This Job" vẫn visible (sticky sidebar desktop / sticky bottom mobile)

### AC-03: Job không tồn tại → fallback
**Given** visitor truy cập slug không hợp lệ
**When** trang tải
**Then** hiển thị thông báo job không còn và link về `/careers`

### AC-04: Breadcrumb điều hướng đúng
**Given** trang job details đang hiển thị
**When** visitor click "Careers" trong breadcrumb
**Then** điều hướng về `/careers`
