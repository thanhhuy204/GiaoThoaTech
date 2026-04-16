# FEAT-038 — Careers Hero

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | High |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#careers-hero`) |

---

## 1. Business Goal
Tạo ấn tượng đầu tiên mạnh mẽ, định vị igloohome là nơi làm việc hấp dẫn và thúc đẩy visitor khám phá cơ hội nghề nghiệp.

## 2. Actors
- Visitor (job seeker, fresh graduate, experienced professional)

## 3. Preconditions
- Trang `/careers` tải thành công
- Font Cormorant Garamond & DM Sans đã load

## 4. Main Flow
1. Visitor truy cập `/careers`
2. Hero section hiển thị full-width với background tối (`#0f0f0f`)
3. Hiển thị label tag "Join Our Team"
4. Hiển thị H1: **"Build the keyless future with us"**
5. Hiển thị subtitle mô tả văn hóa công ty (1–2 câu)
6. Hiển thị 2 nút CTA:
   - **"Explore careers"** (primary, orange) → smooth scroll đến `#openings`
   - **"Learn about us"** (ghost) → `/about`

## 5. UI Specification

### Layout
```
[ Navbar ]
─────────────────────────────────────────
  [label-tag] Join Our Team
  [H1] Build the keyless future
       with us
  [subtitle] We're a team of builders...
  [ Explore careers ] [ Learn about us ]
─────────────────────────────────────────
padding-top: 160px | padding-bottom: 120px
```

### Màu sắc
| Element | Value |
|---|---|
| Background | `#0f0f0f` |
| H1 | `#fff` |
| H1 span gradient | `var(--primary)` → `#c94030` |
| Subtitle | `rgba(255,255,255,0.6)` |
| Label tag | class `label-tag` |

### Typography
| Element | Font | Size | Weight |
|---|---|---|---|
| H1 | Cormorant Garamond | `clamp(2.8rem, 5vw, 4.5rem)` | 700 |
| Subtitle | DM Sans | `1.1rem` | 400 |

### Nút CTA
- **"Explore careers"**: class `btn-primary`, `onClick` → smooth scroll `#openings`
- **"Learn about us"**: class `btn-ghost-dark`, `href="/about"`

## 6. Interactions & Animations
- Fade-up animation: label → H1 → subtitle → buttons (stagger `delay-1..4`)
- "Explore careers" scroll: `document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })`

## 7. Business Rules
- H1 bắt buộc hiển thị, không được truncate
- Nút "Explore careers" luôn visible ngay khi trang load
- Background không dùng ảnh nền, giữ clean

## 8. Edge Cases
- Font chưa load → fallback serif / sans-serif
- Section `#openings` không tồn tại → scroll xuống cuối trang

## 9. Acceptance Criteria

### AC-01: Hiển thị Hero
**Given** visitor truy cập `/careers`
**When** trang load
**Then** H1 "Build the keyless future with us" hiển thị nổi bật trên nền tối

### AC-02: Nút Explore careers hoạt động
**Given** hero đang hiển thị
**When** visitor click "Explore careers"
**Then** trang smooth scroll đến section `#openings`

### AC-03: Nút Learn about us điều hướng đúng
**Given** hero đang hiển thị
**When** visitor click "Learn about us"
**Then** điều hướng đến `/about`
