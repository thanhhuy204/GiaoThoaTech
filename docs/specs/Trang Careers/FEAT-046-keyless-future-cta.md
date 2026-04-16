# FEAT-046 — Keyless Future CTA

| Field | Value |
|---|---|
| **Status** | Draft |
| **Priority** | High |
| **Page file** | `app/(pages)/careers/page.tsx` |
| **Component** | `app/components/careers/CareersPage.tsx` (section: `#careers-cta`) |

---

## 1. Business Goal
Thúc đẩy visitor hành động lần cuối trước khi rời trang — khuyến khích scroll lên xem job listings hoặc liên hệ trực tiếp.

## 2. Actors
- Visitor đã đọc qua toàn bộ trang Careers

## 3. Preconditions
- Trang `/careers` tải thành công
- Section là section cuối trước Footer

## 4. Main Flow
1. Visitor cuộn đến cuối trang
2. Hiển thị section CTA với background gradient tối
3. Hiển thị label tag "Join Us"
4. Hiển thị H2: **"Help us build the keyless future"**
5. Hiển thị subtitle 1 câu
6. Hiển thị 2 nút:
   - **"Explore Opportunities"** (primary) → smooth scroll đến `#openings`
   - **"Contact our team"** (ghost dark) → `mailto:careers@igloohome.co`

## 5. UI Specification

### Layout
```
background: linear-gradient(135deg, #0f3460 0%, #0f0f0f 100%)
padding: 120px 0
text-align: center
─────────────────────────────────────
  [label] Join Us
  [H2] Help us build the keyless future
  [subtitle] We're looking for passionate people...
  [ Explore Opportunities ] [ Contact our team ]
─────────────────────────────────────
```

### Màu sắc
| Element | Value |
|---|---|
| Background | `linear-gradient(135deg, #0f3460 0%, #0f0f0f 100%)` |
| H2 | `#fff` |
| Subtitle | `rgba(255,255,255,0.6)` |
| Label tag | class `label-tag` (white variant) |

### Typography
| Element | Font | Size | Weight |
|---|---|---|---|
| H2 | Cormorant Garamond | `clamp(2.5rem, 4vw, 3.5rem)` | 700 |
| Subtitle | DM Sans | `1.05rem` | 400 |

### Nút CTA
- **"Explore Opportunities"**: class `btn-primary`, `onClick` → smooth scroll `#openings`
- **"Contact our team"**: class `btn-ghost-dark`, `href="mailto:careers@igloohome.co"`

### Trust signals (optional row dưới buttons)
```
✓ Open to remote    ✓ Visa sponsorship available    ✓ Inclusive workplace
```
Style: `rgba(255,255,255,0.45)`, font-size `0.8rem`, gap `24px`

## 6. Interactions & Animations
- Fade-up animation: label → H2 → subtitle → buttons (stagger `delay-1..4`)
- Trust signals fade in sau buttons (`delay-5`)

## 7. Business Rules
- Section này LUÔN là section cuối trước Footer
- Gradient background phải khớp với PrivacyCommitmentBlock ở trang chủ để thể hiện design system nhất quán
- "Explore Opportunities" scroll → `#openings`, không phải link `/careers#openings` (để không reload trang)

## 8. Edge Cases
- Nếu `#openings` không tìm được → fallback `window.scrollTo({ top: 0, behavior: 'smooth' })`

## 9. Acceptance Criteria

### AC-01: Hiển thị CTA section
**Given** visitor cuộn đến cuối trang Careers
**When** section hiển thị
**Then** H2 "Help us build the keyless future" hiển thị trên gradient tối

### AC-02: Nút Explore Opportunities scroll lên openings
**Given** CTA section đang hiển thị
**When** visitor click "Explore Opportunities"
**Then** trang smooth scroll lên section `#openings`

### AC-03: Nút Contact mở mail client
**Given** CTA section đang hiển thị
**When** visitor click "Contact our team"
**Then** mail client mở với `to: careers@igloohome.co`
