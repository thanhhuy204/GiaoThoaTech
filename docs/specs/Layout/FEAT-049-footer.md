# FEAT-049: Footer Component

**Trạng thái:** Implemented
**Ưu tiên:** P0 — Core layout component required for all pages
**File implement:** `app/components/layout/Footer.tsx`

---

## 1. Business Goal
Cung cấp footer thông tin đầy đủ với liên kết quan trọng, form đăng ký newsletter và thông tin pháp lý. Tạo điểm kết thúc nhất quán cho website, khuyến khích người dùng subscribe và truy cập thông tin bổ sung.

## 2. Actors
- **Visitor muốn subscribe** — nhận updates về sản phẩm và deals
- **Visitor tìm thông tin** — cần liên hệ, chính sách, hoặc trang khác
- **Visitor khám phá sản phẩm** — xem danh sách sản phẩm và giải pháp
- **Legal/Compliance team** — đảm bảo thông tin pháp lý chính xác

## 3. Preconditions
- Website hoạt động bình thường (HTTPS)
- Logo image `/images/logo/Logo-footer.png` tồn tại
- Email subscription backend API sẵn sàng (tương lai)
- Tất cả routes/links được định nghĩa

## 4. Main Flow
1. Visitor scroll xuống cuối trang
2. Hệ thống hiển thị Footer với logo, subscribe form và link columns
3. Visitor nhập email vào subscribe input
4. Visitor click "Subscribe" button
5. Hệ thống validate email format
6. Nếu valid, gửi request đến backend API (tương lai)
7. Hệ thống hiển thị success notification
8. Nếu invalid, hiển thị error message
9. Visitor click vào link trong các cột (Products, Discover, Solutions, Support)
10. Hệ thống navigate đến route tương ứng
11. Visitor click vào policy links (Privacy Policy, Terms of Service, Cookie Policy)
12. Hệ thống navigate đến trang tương ứng hoặc open modal

## 5. UI Specification

### 5.1 Layout
- **Container:** Full width, background #111, color #fff
- **Main Grid:** 6 columns trên desktop (260px logo + 5 columns links), gap 32px
- **Subscribe Section:** Bên trong logo column, margin-bottom 24px
- **Link Columns:** 5 columns với headings và ul lists
- **Bottom Bar:** Flex space-between, padding-top 24px, border-top rgba(255,255,255,0.08)
- **Responsive:** Mobile 2 columns (grid-template-columns: 1fr 1fr)

### 5.2 Màu sắc (Colors)
| Yếu tố | Màu |
|---|---|
| Background | #111 |
| Text primary | #fff |
| Text secondary | #6b7280 |
| Text tertiary | #4b5563 |
| Input background | rgba(255,255,255,0.07) |
| Input border | rgba(255,255,255,0.12) |
| Input border focus | rgba(255,255,255,0.2) |
| Button primary | var(--primary) |
| Link hover | #9ca3af |
| Border top | rgba(255,255,255,0.08) |

### 5.3 Typography
| Yếu tố | Style |
|---|---|
| Logo | Image `Logo-footer.png`, height 48px, object-fit contain |
| Description | 0.78rem, 400, color #6b7280, line-height 1.7 |
| Subscribe label | 0.8rem, 600, color #d1d5db |
| Subscribe description | 0.72rem, color #6b7280 |
| Column heading | 0.62rem, 700, uppercase, letter-spacing 0.14em, color #d1d5db |
| Link | 0.78rem, color #fff, hover #9ca3af |
| Bottom text | 0.72rem, color #4b5563 |
| Policy link | 0.72rem, color #4b5563, hover #9ca3af |

### 5.4 Component Details
**Footer Container:**
- background: #111, color: #fff
- padding-top: 72px, padding-bottom: 32px

**Logo Section:**
- width: 260px, margin-bottom: 56px

**Subscribe Input:**
- background: rgba(255,255,255,0.07)
- border: 1px solid rgba(255,255,255,0.12)
- border-radius: 100px
- padding: 9px 16px
- font-size: 0.78rem
- color: #fff
- outline: none
- width: 100%

**Subscribe Button:**
- width: 100%, padding: 9px 0
- font-size: 0.78rem
- justify-content: center

**Link Columns:**
- margin-bottom: 4px per link
- list-style: none

**Bottom Bar:**
- border-top: 1px solid rgba(255,255,255,0.08)
- padding-top: 24px
- display: flex, align-items: center, justify-content: space-between
- flex-wrap: wrap, gap: 16px

### 5.5 Responsive Breakpoints Table
| Device | Grid Columns | Logo Width | Spacing |
|---|---|---|---|
| Desktop (≥901px) | 6 columns (260px + 5x1fr) | 260px | 32px gap |
| Tablet/Mobile (≤900px) | 2 columns (1fr 1fr) | Auto | 24px gap |

## 6. Animations
| Element | Animation | Trigger | Duration | Delay |
|---|---|---|---|---|
| Footer | fadein | Scroll into view | 0.6s | 0ms |
| Subscribe form | slideup | Mount | 0.5s | 200ms |
| Link hover | color transition | Hover | 0.15s | 0ms |

**Keyframe definitions:**
```css
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideup {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

## 7. Business Rules
- Email phải validate format trước submit
- Subscribe form hiện tại không gửi data (placeholder), sẽ integrate API sau
- Links trong cột phải match với website structure
- Copyright: `© 2026 giaothoatech. All rights reserved.`
- Policy links có thể dẫn đến external pages hoặc modals

## 8. Edge Cases
- **Invalid email:** Hiển thị error message, không submit
- **Network error:** Graceful fallback, không break UI
- **No JavaScript:** Form fallback to basic HTML submit
- **Long content:** Footer không overlap với content trên
- **Dark mode:** Đã là dark theme, không cần toggle

## 9. Security Requirements
- Email input sanitize, prevent XSS
- Form không chứa sensitive data
- Links validate, không allow malicious href

## 10. Accessibility Requirements
- Form có proper labels (aria-label nếu cần)
- Color contrast: White text on dark bg ≥ 4.5:1
- Keyboard navigation: Tab through links và form
- Screen reader: Semantic HTML structure
- Focus indicators visible

## 11. Acceptance Criteria
- [ ] Footer render ở cuối tất cả pages
- [ ] Subscribe form UI hoạt động
- [ ] All links clickable và navigate đúng
- [ ] Responsive layout hoạt động
- [ ] Email validation basic (format check)
- [ ] Accessibility pass basic checks
- [ ] No console errors

## 12. Assets cần thiết
- Logo: `/images/logo/Logo-footer.png` (height 48px)
- CSS variables: --primary

## 13. API Specification
**POST /api/subscribe** (tương lai)
```json
{
  "email": "string (required, email format)",
  "source": "footer" // optional
}
```
Response:
```json
{
  "success": true,
  "message": "Subscribed successfully"
}
```

## 14. Implementation Notes
- Không dùng inline styles — dùng CSS class (theo project convention)
- Media query định nghĩa trong file CSS riêng
- Form validation basic (HTML5 + JS)
- Future: Integrate với email service (Mailchimp, etc.)
- Links hiện tại href="#", sẽ update khi routes implement</content>
<parameter name="filePath">d:\React\smartlock-frontend\docs\specs\Layout\FEAT-049-footer.md