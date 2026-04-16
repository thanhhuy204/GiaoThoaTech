# FEAT-048: Navigation Bar Component

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Core layout component required for all pages
**File implement:** `app/components/layout/Navbar.tsx`

---

## 1. Business Goal
Cung cấp thanh điều hướng chính cho toàn bộ website, cho phép người dùng dễ dàng truy cập các trang chính, sản phẩm, giải pháp và thông tin liên hệ. Tạo trải nghiệm điều hướng nhất quán và thân thiện trên desktop và mobile.

## 2. Actors
- **Visitor đang duyệt website** — khách hàng tiềm năng cần tìm thông tin sản phẩm, giải pháp và liên hệ
- **Người dùng đã đăng nhập** — có thể cần truy cập dashboard hoặc tài khoản (tương lai)
- **Admin/Developer** — quản lý cấu trúc menu và links

## 3. Preconditions
- Website hoạt động bình thường (HTTPS)
- Tất cả routes được định nghĩa trong Next.js (Products, Solutions, Explore pages)
- Logo image `/images/logo/Logo.png` (120×32px) tồn tại
- CSS variables được định nghĩa (var(--primary), var(--gray))

## 4. Main Flow
1. Visitor truy cập bất kỳ trang nào của website
2. Hệ thống render Navbar fixed ở top với logo, menu items và buttons
3. Visitor hover hoặc click vào menu item có dropdown (Products, Solutions, Explore)
4. Hệ thống hiển thị dropdown menu với các sub-links
5. Visitor click vào sub-link
6. Hệ thống navigate đến route tương ứng
7. Visitor click "Login" button
8. Hệ thống hiển thị dropdown với "For Business" và "For Consumer" options
9. Visitor click "Contact Us" button
10. Hệ thống navigate đến `/contact`
11. Visitor click button Language Switcher (hiển thị cờ + mã hiện tại: `🇻🇳 VN` hoặc `🇺🇸 EN`; route locale `vi`/`en` không đổi)
12. Hệ thống toggle ngay sang ngôn ngữ còn lại (không mở dropdown — chỉ có 2 ngôn ngữ; nhãn hiển thị VN/EN)
13. Hệ thống thay đổi locale URL và render lại trang với ngôn ngữ mới
14. Trên mobile, Visitor click burger menu icon
15. Hệ thống mở mobile menu overlay với tất cả nav items
16. Visitor click nav item trong mobile menu
17. Hệ thống expand/collapse sub-menu hoặc navigate trực tiếp
18. Visitor click Language Switcher (cờ + mã) ở cuối mobile menu
19. Hệ thống chuyển locale tương tự desktop (toggle vi/en; nhãn VN/EN)

## 5. UI Specification

### 5.1 Layout
- **Container:** Full width, fixed position top, height 60px
- **Desktop Layout:** Flexbox với justify-content: space-between
  - Logo bên trái (width: 120px, height: 32px, object-fit: contain)
  - Nav items ở giữa (gap: 2px)
  - Cụm bên phải (gap: 12px): Login ↓, Contact Us (primary), Language Switcher (cờ + mã **VN**/EN, toggle trực tiếp)
- **Mobile Layout:** Burger menu button bên phải, ẩn desktop nav
- **Mobile Menu:** Absolute positioned below navbar, full width, max-height calc(100vh - 60px), overflow-y: auto

### 5.2 Màu sắc (Colors)
| Yếu tố | Màu |
|---|---|
| Background | rgba(255,255,255,0.97) |
| Border bottom | #f0f0ee |
| Text normal | #374151 |
| Text hover/active | var(--primary) |
| Dropdown background | #fff |
| Dropdown border | #f0f0ee |
| Button outline border | rgba(0,0,0,0.15) |
| Button primary background | var(--primary) |

### 5.3 Typography
| Yếu tố | Style |
|---|---|
| Logo | Image 120x32px |
| Nav link | 0.9rem, 500, color #374151 |
| Dropdown link | 0.85rem, 400, color var(--gray) |
| Button text | 0.8rem, 500 |
| Mobile nav item | 0.9rem, 500, color #374151 |
| Mobile sub-link | 0.85rem, 400, color var(--gray) |

### 5.4 Component Details
**Navbar Container:**
- position: fixed, top: 0, left: 0, right: 0, z-index: 999
- backdrop-filter: blur(12px)
- border-bottom: 1px solid #f0f0ee

**Nav Link Button:**
- padding: 8px 12px
- background: none, border: none
- cursor: pointer
- transition: color 200ms ease

**Dropdown Menu Contents:**
- **Products ↓:** Deadbolt Go, Keybox 3, Padlock 2, và các sản phẩm khác
- **Solutions ↓:** Overview, Technology, Integrations, Case Studies, Contact Us  
- **Explore ↓:** Case studies, Investor relations, About us, Careers, Impact, Media, Blog
- **Login ↓:** For Business, For Consumer (hiện tại placeholder links)

**Contact Us Button:**
- background: var(--primary)
- color: white
- padding: 8px 16px
- border-radius: 4px
- href: /contact?ref=header-contact-us

**Language Switcher (desktop — phần phải, sau Contact Us):**
- **Vai trò:** một control duy nhất (button hoặc link có `role="button"`), **không** dùng dropdown/chevron vì chỉ có 2 ngôn ngữ (route `vi` / `en`).
- **Nội dung hiển thị:** cờ (emoji quốc kỳ) + khoảng trắng nhỏ + **mã quốc gia / ngôn ngữ in hoa** — `🇻🇳 VN` khi đang Tiếng Việt (locale `vi`), `🇺🇸 EN` khi English (locale `en`). **Không** dùng mã `VI` cạnh cờ (tránh nhầm với mã locale hai chữ).
- **Hành vi:** một cú **click** (hoặc Enter/Space khi focus) → chuyển ngay sang locale còn lại; cập nhật URL locale và re-render nội dung; không mở panel phụ.
- **Kiểu UI:** inline với cụm nút phải; có thể outline nhẹ hoặc ghost để phân biệt với Contact Us primary; `min-height` / vùng chạm ≥ 44px (touch).
- **Thứ tự focus (Tab):** sau Contact Us (hoặc sau Login tùy thứ tự DOM — giữ thứ tự đọc logic: … → Login → Contact Us → Language).
- **Accessibility:** `aria-label` mô tả hành động theo ngôn ngữ đích (ví dụ khi đang Tiếng Việt: "Switch to English"; khi đang English: "Chuyển sang Tiếng Việt"); không dùng chỉ "VN"/"EN" làm label duy nhất cho SR.

**Language Switcher (mobile — trong overlay menu):**
- **Vị trí:** mục **cuối** danh sách trong mobile menu (sau các nav có expand/collapse).
- **Nội dung & hành vi:** giống desktop — cờ + mã `VN` / `EN`, một lần chạm = toggle locale; đóng overlay menu sau khi đổi ngôn ngữ (khuyến nghị UX, khớp flow “navigate/đóng menu”).
- **Layout:** full-width row hoặc block tách biệt (border-top nhạt) để dễ nhận diện là điều khiển ngôn ngữ, không lẫn với sub-link thường.

**Dropdown:**
- position: absolute, top: 100%, left: 0
- background: #fff, border: 1px solid #f0f0ee
- border-radius: 4px
- box-shadow: 0 4px 12px rgba(0,0,0,0.1)
- min-width: 200px

**Mobile Burger Button:**
- width: 22px, height: 22px
- stroke: #374151, stroke-width: 2

**Mobile Menu Item Button:**
- width: 100%, padding: 12px 24px
- background: none, border: none
- border-bottom: 1px solid #f3f4f6
- text-align: left

### 5.5 Responsive Breakpoints Table
| Device | Layout | Nav Visibility | Menu Type |
|---|---|---|---|
| Desktop (≥769px) | Flex space-between | Show desktop nav | Dropdown hover/click |
| Mobile (≤768px) | Burger menu | Hide desktop nav | Overlay slide down |

## 6. Animations
| Element | Animation | Trigger | Duration | Delay |
|---|---|---|---|---|
| Dropdown | fadein + slide down | Click open | 200ms | 0ms |
| Dropdown arrow | rotate | Toggle | 200ms | 0ms |
| Mobile menu | slide down | Burger click | 200ms | 0ms |
| Mobile sub-menu | expand/collapse | Item click | 200ms | 0ms |

**Keyframe definitions:**
```css
@keyframes fadein {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}
```

## 7. Business Rules
- Logo luôn link về homepage (/)
- Dropdown chỉ mở một lúc, click lại để đóng
- Mobile menu tự động đóng khi click outside hoặc navigate
- Nav items phải match với sitemap/routes của website
- Login dropdown hiện tại link placeholder (#), sẽ update khi auth implement
- Contact Us button navigate đến /contact với ref param (?ref=header-contact-us)
- Language Switcher: chỉ 2 ngôn ngữ — hiển thị cờ + mã **VN** hoặc **EN** (không hiển thị “VI” cạnh cờ); click trực tiếp toggle `vi` ↔ `en` trên URL, không dropdown
- Login dropdown chứa links đến: iglooaccess, igloodeveloper, iglooconnect, iglooworks
- Mỗi external link trong dropdown có icon ↗ mở tab mới

## 8. Edge Cases
- **No JavaScript:** Fallback to basic links, không dropdown
- **Slow network:** Logo lazy load với priority=true
- **Keyboard navigation:** Tab order đúng, ESC để đóng dropdown
- **Touch devices:** Touch-friendly button sizes (min 44px)
- **High contrast mode:** Colors phải accessible

## 9. Security Requirements
- Không chứa sensitive data
- Links phải validate, không allow XSS qua href

## 10. Accessibility Requirements
- ARIA labels cho burger menu (aria-label)
- aria-expanded cho dropdown buttons
- Keyboard navigation: Tab, Enter, Escape
- Screen reader support cho nav structure
- Color contrast ratios ≥ 4.5:1

## 11. Acceptance Criteria
- [ ] Navbar render trên tất cả pages với layout đầy đủ
- [ ] Logo "igloo" click chuyển về homepage
- [ ] Products ↓ dropdown hiển thị danh sách sản phẩm chính
- [ ] Solutions ↓ dropdown hiển thị Overview, Technology, Integrations, Case Studies, Contact Us
- [ ] Explore ↓ dropdown hiển thị Case studies, About us, Careers, etc.
- [ ] Login ↓ dropdown hiển thị For Business và For Consumer options
- [ ] Contact Us button màu primary, navigate đến /contact với ref param
- [ ] Desktop: Language Switcher hiển thị `🇻🇳 VN` hoặc `🇺🇸 EN` theo ngôn ngữ hiện tại; một click toggle sang ngôn ngữ còn lại, không mở dropdown
- [ ] Mobile: nút chuyển ngôn ngữ (cờ + mã VN/EN) nằm cuối mobile menu; hành vi giống desktop
- [ ] Mobile hamburger menu toggle hoạt động
- [ ] Dropdown chỉ mở một lúc, đóng khi click outside
- [ ] Keyboard navigation và accessibility pass WCAG AA
- [ ] No console errors

## 12. Assets cần thiết
- Logo: `/images/logo/Logo.png` (120x32px)
- CSS variables: --primary, --gray

## 13. Implementation Notes
- Sử dụng React hooks: useState, useEffect, useRef
- Click outside detection với mousedown event
- CSS-in-JS với style prop (theo project convention)
- Mobile detection qua CSS media queries, không JS
- Locale: dùng cơ chế i18n routing của Next.js (App Router) cho segment `vi` / `en`; UI hiển thị nhãn VN / EN cạnh cờ
- Future: Integrate với auth system cho login state