# FEAT-075: Admin Dashboard — Layout & Navigation

**Trạng thái:** Planned  
**Ưu tiên:** P0  
**Route:** `/[locale]/admin`  
**Business Spec:** `docs/spec-business/admin/Feature Admin Dashboard.md`

---

## 1. Page / Screen

| Screen | Route | Mục đích |
|---|---|---|
| Admin Shell | `/[locale]/admin/*` | Layout wrapper: header cố định + sidebar cho toàn bộ trang admin |
| Dashboard | `/[locale]/admin` | Tổng quan hệ thống (stat cards + recent activity) |
| Danh sách người dùng | `/[locale]/admin/users` | Quản lý người dùng |
| Chi tiết người dùng | `/[locale]/admin/users/[id]` | Xem thông tin + quản lý vai trò |
| Thẻ thành viên | `/[locale]/admin/memberships` | Quản lý gói thành viên |
| Cài đặt | `/[locale]/admin/settings` | Cấu hình hệ thống |

> **Quan trọng:** Không có route `/admin/roles` độc lập — quản lý vai trò chỉ nằm trong user detail.

---

## 2. UI Components

### Cây component

```
AdminLayout  (client component — manages sidebar open/close state)
├── AdminGuard           ← kiểm tra auth + redirect nếu không phải admin
├── AdminHeader          ← fixed top, z-index 100
│   ├── HamburgerButton  ← mobile only
│   ├── Logo             ← image + text + "Admin" badge
│   ├── NotificationBell ← icon + badge số unread
│   └── AvatarMenu       ← avatar circle + tên + chevron + dropdown
│       └── AvatarDropdown
│           ├── Link "Hồ sơ"
│           ├── Link "Cài đặt"
│           └── Button "Đăng xuất"
├── AdminSidebar         ← fixed left, dark navy
│   ├── SectionLabel     ← "QUẢN TRỊ"
│   ├── NavItem (Dashboard)      ← icon + label, active = cam
│   ├── NavItem (Người dùng)
│   ├── NavItem (Vai trò & Quyền) ← link vào users
│   ├── NavItem (Thẻ thành viên)
│   ├── NavItem (Cài đặt)
│   └── SidebarFooter    ← version string
├── SidebarOverlay       ← backdrop mobile, click để đóng
└── AdminContent         ← margin-left 240px, margin-top 64px
    └── {children}       ← nội dung từng trang
```

### Dashboard Page Components

```
DashboardPage
├── PageHeader           ← "Dashboard" + subtitle
├── StatsGrid            ← 4 stat cards responsive grid
│   ├── StatCard (Tổng người dùng)   ← icon blue
│   ├── StatCard (Đang hoạt động)    ← icon green
│   ├── StatCard (Gói thành viên)    ← icon orange
│   └── StatCard (Doanh thu tháng)   ← icon purple
└── DashboardGrid        ← 2 cột desktop, 1 cột mobile
    ├── RecentUsersCard  ← table 5 users mới nhất
    └── RecentActivityCard ← list hoạt động gần đây
```

---

## 3. Layout

### Desktop (≥ 1024px)

```
┌──────────────────────────────────────────────────────┐
│  HEADER  h=64px  fixed  z=100                        │
│  [☰] [Logo SmartLock Admin]  ──────  [🔔3] [Avatar▾] │
├────────────┬─────────────────────────────────────────┤
│  SIDEBAR   │  CONTENT AREA                           │
│  w=240px   │  padding: 28px 32px                     │
│  fixed     │  background: #F8FAFC                    │
│  top=64px  │                                         │
│  bg=#1E213 │  ┌──┬──┬──┬──┐  ← 4 StatCards         │
│            │  └──┴──┴──┴──┘                          │
│  QUẢN TRỊ  │                                         │
│  ▸ Dashboard● │  ┌────────────┬────────────┐         │
│  ▸ Người dùng │  │ Recent     │ Activity   │         │
│  ▸ Vai trò  │  │ Users      │ Feed       │         │
│  ▸ Thẻ TV  │  └────────────┴────────────┘         │
│  ▸ Cài đặt │                                         │
│            │                                         │
│  v1.0      │                                         │
└────────────┴─────────────────────────────────────────┘
```

### Mobile (< 1024px)

```
┌─────────────────────────┐
│  [☰] Logo  [🔔] [👤]   │  ← header full width
├─────────────────────────┤
│  CONTENT (full width)   │
│  padding: 16px 12px     │
│  StatCards: 1 cột       │
└─────────────────────────┘
   Sidebar: drawer từ trái, backdrop đen 45%
```

### Sizing

| Element | Value |
|---|---|
| Header height | `64px` |
| Sidebar width | `240px` |
| Content margin-left | `240px` (desktop) / `0` (mobile) |
| Content padding | `28px 32px` desktop, `20px 16px` tablet, `16px 12px` mobile |
| StatCard grid | `repeat(4,1fr)` → `repeat(2,1fr)` → `1fr` |

---

## 4. UI Behavior

### Sidebar Navigation

| Hành động | Kết quả |
|---|---|
| Click NavItem | Next.js `<Link>` navigate, sidebar đóng (mobile) |
| Active detection | So sánh `pathname` với `href`; Dashboard chỉ active khi `pathname === /[locale]/admin` |
| Hover NavItem | `background: rgba(255,255,255,0.06)`, text trắng |
| Active NavItem | `background: #E8614A`, text trắng, font-weight 600 |

### Header — AvatarMenu

| Hành động | Kết quả |
|---|---|
| Click avatar button | Toggle dropdown `aria-expanded` |
| Click ngoài dropdown | Đóng dropdown (mousedown listener) |
| Click "Đăng xuất" | `apiLogout()` → `dispatch(logout())` → `router.push(/[locale])` |
| Chevron icon | Rotate 180° khi expanded |

### Mobile Hamburger

| Hành động | Kết quả |
|---|---|
| Click `☰` | `setSidebarOpen(true)` → sidebar slide in từ trái |
| Click overlay | `setSidebarOpen(false)` → sidebar slide out |
| Click NavItem | Sidebar đóng + navigate |

### Auth Guard

| Tình huống | Kết quả |
|---|---|
| `initialized === false` | Hiển thị spinner toàn màn hình |
| User null / không phải admin | `router.replace(/[locale])` |
| User là admin | Render children bình thường |

### StatCard

- Hiển thị value, label, icon, trend (up/down arrow + text)
- Nếu API lỗi: value = `—`, không crash

### RecentUsersCard

- Table 5 rows, click "Xem tất cả" → `/admin/users`
- Hover row: `background: #FEF9F8`

---

## 5. Style

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Header background | `#FFFFFF` |
| Header border-bottom | `#E5E7EB` |
| Header box-shadow | `0 1px 4px rgba(0,0,0,0.06)` |
| Sidebar background | `#1E2130` |
| Sidebar text default | `#9CA3AF` |
| Sidebar text hover | `#FFFFFF` |
| Sidebar active bg | `#E8614A` |
| Sidebar active text | `#FFFFFF` |
| Content background | `#F8FAFC` |
| Card background | `#FFFFFF` |
| Card border | `#E5E7EB` |
| Accent | `#E8614A` |
| Text heading | `#111827` |
| Text body | `#374151` |
| Text muted | `#6B7280` |
| StatCard icon blue | bg `#EFF6FF`, color `#3B82F6` |
| StatCard icon green | bg `#F0FDF4`, color `#22C55E` |
| StatCard icon orange | bg `#FFF7ED`, color `#E8614A` |
| StatCard icon purple | bg `#FAF5FF`, color `#A855F7` |
| Trend up | `#22C55E` |
| Trend down | `#EF4444` |

### Typography

| Yếu tố | Style |
|---|---|
| Page title | `1.5rem`, weight 700, `#111827` |
| Page subtitle | `0.875rem`, `#6B7280` |
| Sidebar label section | `0.65rem`, weight 700, uppercase, `#4B5563` |
| Sidebar NavItem | `0.875rem`, weight 500 |
| Sidebar NavItem active | `0.875rem`, weight 600 |
| Header logo text | `1rem`, weight 700 |
| Header admin badge | `0.625rem`, weight 600, uppercase |
| Header avatar name | `0.875rem`, weight 600 |
| StatCard value | `2rem`, weight 700, letter-spacing `-0.03em` |
| StatCard label | `0.8125rem`, weight 500, muted |
| Table header | `0.75rem`, weight 600, uppercase, `#6B7280` |
| Table cell | `0.875rem` |

### Cảm giác thiết kế

- **Professional & Modern** — sidebar tối màu navy, nội dung sáng sạch
- Không có border thừa, shadow nhẹ
- Border-radius: `12px` card, `8px` nav item, `6px` badge
- Spacing nhất quán: gap `16-20px` giữa cards

---

## 6. Edge Cases

| Tình huống | Hành vi UI |
|---|---|
| Không có quyền admin | Guard redirect về `/` trước khi render UI |
| Auth đang load | Spinner toàn màn hình, không flash content |
| Refresh trang | Guard re-check từ cookie → sidebar giữ active item đúng route |
| API stats lỗi | `—` thay số, toast error nhẹ |
| Avatar URL lỗi | Initials fallback trên nền `#E8614A` |
| Tên admin quá dài | `max-width: 120px`, `text-overflow: ellipsis` |
| Mobile portrait | Sidebar ẩn, hamburger rõ, tap target ≥ 44px |
| Header icon chồng lấn | Gap cố định, không wrap |

---

## 7. Business Spec → UI Mapping

| Business Requirement | UI Implementation |
|---|---|
| Header cố định trên mọi trang | `position: fixed; top: 0; z-index: 100` trong `AdminHeader` |
| Header: logo + thông báo + avatar | `HeaderLogo` + `NotificationBell` (badge) + `AvatarMenu` |
| Menu trái: 5 mục chính | `AdminSidebar` với 5 `NavItem` đúng thứ tự |
| Active highlight khi ở Dashboard | `pathname === /[locale]/admin` → `admin-nav-item--active` |
| Chỉ Admin mới truy cập được | `AdminGuard` redirect về `/` nếu không đủ quyền |
| Chuyển trang qua menu trái | Mỗi NavItem là `<Link>` Next.js |
| Mobile hamburger | Button `☰` trong header, sidebar mở dạng drawer |
| Dashboard hiển thị tổng quan | 4 StatCard + RecentUsersCard + RecentActivityCard |

---

## 8. Acceptance Criteria

- [ ] AC-01: Header cố định top, logo + bell + avatar hiển thị trên mọi trang admin
- [ ] AC-02: Sidebar 5 mục nav, active highlight đúng route
- [ ] AC-03: Dashboard: ≥4 StatCard + recent users table
- [ ] AC-04: Không phải admin → redirect về trang chủ
- [ ] AC-05: Mobile: hamburger mở drawer, backdrop click để đóng
- [ ] AC-06: Header + Sidebar không reload khi navigate giữa admin pages

---

## 9. Related Features

- **FEAT-076** — User Roles & Permissions
- **FEAT-064** — Login Form (entry point)
