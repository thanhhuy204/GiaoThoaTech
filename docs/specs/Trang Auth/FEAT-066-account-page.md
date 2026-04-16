# FEAT-066: Trang Account (Thông tin tài khoản cá nhân)

**Route:** `/[locale]/account`
**File implement:** `app/[locale]/account/page.tsx` + `account-content.tsx` + `account.css`
**Business Spec:** `docs/spec-business/Trang Auth/# Feature Trang Account.md`
---

## 1. Mục đích màn hình
Trang trung tâm cá nhân — cho phép người dùng đã đăng nhập xem thông tin tài khoản, quản lý gói dịch vụ (Cơ Bản / Cao Cấp) và thực hiện các hành động: chỉnh sửa thông tin, đăng xuất.

---

## 2. Cấu trúc Component
```
AccountContent ('use client')
├── Navbar
│   └── AvatarButton (Header)       ← nhấn mở HeaderAvatarDropdown
│       └── HeaderAvatarDropdown
│           ├── DropdownUserInfo    ← avatar + tên + email + chấm xanh online
│           ├── Link "Hồ sơ cá nhân"
│           ├── Link "Đổi mật khẩu"
│           ├── DropdownDivider
│           ├── DropdownSection "Cài đặt"
│           │   ├── Item "Thông báo"
│           │   ├── Item "Ngôn ngữ"
│           │   └── Item "Tùy chọn"
│           ├── DropdownDivider
│           └── Button "Đăng xuất"  ← màu đỏ nổi bật
├── <main class="account-page">
│   ├── ProfileHeader               ← avatar + tên + email + thẻ thành viên
│   │   ├── AvatarImage             ← ảnh đại diện (fallback placeholder, nhấn mở dropdown)
│   │   ├── DisplayName             ← tên / "Khách hàng"
│   │   ├── DisplayEmail            ← email hiển thị rõ dưới tên
│   │   └── MembershipBadge         ← badge nhấn được, mở PlanList
│   ├── PlanList (dropdown/panel)   ← hiển thị khi nhấn MembershipBadge
│   │   ├── PlanCard — Cơ Bản       ← Free, nhấn mở FreePlanModal
│   │   └── PlanCard — Cao Cấp      ← Có phí, nhấn mở PremiumPlanModal
│   ├── FreePlanModal               ← popup đăng ký Gói Cơ Bản
│   ├── PremiumPlanModal            ← popup đăng ký Gói Cao Cấp (chọn tháng/năm)
│   └── AccountActions              ← nút Chỉnh sửa + Đăng xuất
└── Footer                          ← dùng chung
```
---

## 3. Layout

### Desktop (≥768px)
```
┌─────────────────────────────────────────┐
│ Navbar                                  │
├─────────────────────────────────────────┤
│         [ProfileHeader]                 │
│  ┌──────────────────────────────────┐   │
│  │  [Avatar 96px]  Nguyễn Văn A     │   │
│  │                 [Badge: Gói CB]  │   │
│  └──────────────────────────────────┘   │
│                                         │
│  [PlanList — hiện khi click badge]      │
│  ┌────────────────┐ ┌────────────────┐  │
│  │  Gói Cơ Bản   │ │  Gói Cao Cấp  │  │
│  │  Free  [→]    │ │  200k/th [→]  │  │
│  └────────────────┘ └────────────────┘  │
│                                         │
│  [AccountActions]                       │
│  [✏ Chỉnh sửa thông tin]               │
│  [⏻ Đăng xuất]                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Mobile (<768px)
- Layout dọc, full width
- PlanList xếp dọc
- Popup chiếm gần full màn hình (bottom sheet hoặc center modal)
- Nút tối thiểu height 48px

---

## 4. Components Chi tiết

### 4.0 HeaderAvatarDropdown

Dropdown mở khi nhấn `AvatarButton` trong Navbar.

```
┌─────────────────────────────────┐
│  [Avatar 40px]  Nguyễn Văn A   │  ← DropdownUserInfo
│                 user@email.com  │
│                 ● Online        │  ← chấm xanh trạng thái
├─────────────────────────────────┤
│  👤 Hồ sơ cá nhân              │  ← Link → /account
│  🔑 Đổi mật khẩu               │  ← Link → /account/change-password
├─────────────────────────────────┤
│  ⚙ Cài đặt                     │  ← DropdownSection header
│     🔔 Thông báo                │
│     🌐 Ngôn ngữ                 │
│     ⚙ Tùy chọn                  │
├─────────────────────────────────┤
│  ⏻  Đăng xuất                   │  ← màu đỏ #E8614A, nổi bật
└─────────────────────────────────┘
```

**Hành vi:**
- Click ngoài dropdown → đóng
- "Đăng xuất" gọi logout action → redirect `/[locale]`
- Chấm xanh online: `background: #22c55e`, kích thước 8px, hiển thị cạnh tên

**DropdownUserInfo:**
| Field | Nguồn dữ liệu |
|---|---|
| Avatar | `user.avatarUrl` → fallback SVG placeholder |
| Tên | `user.displayName` → fallback `user.email` → fallback `"Khách hàng"` |
| Email | `user.email` |
| Online dot | Luôn hiển thị khi dropdown mở (user đang active) |

---

### 4.1 ProfileHeader
```
[Avatar 96px tròn]
[Tên hiển thị — font-size 1.4rem, weight 700]
[Email — font-size 0.9rem, màu #666]
[Badge thành viên — nhấn được]
```
- Avatar: `<img>` với fallback SVG placeholder nếu không có ảnh — nhấn mở dropdown
- Tên: lấy từ `user.displayName` → fallback `user.email` → fallback `"Khách hàng"`
- Email: hiển thị rõ ràng bên dưới tên, màu text phụ `#666`, không thể chỉnh sửa trực tiếp
- Nền: gradient nhẹ hoặc xám `#f8f8f6`

### 4.2 MembershipBadge
| Trạng thái | Label | Màu |
|---|---|---|
| Chưa kích hoạt | `Chưa kích hoạt` | Xám `#999` |
| Gói Cơ Bản | `Gói Cơ Bản` | Xanh lá `#22c55e` |
| Gói Cao Cấp | `Gói Cao Cấp — Còn XX ngày` | Đỏ cam `#E8614A` |

- Dạng pill, border-radius 999px, padding 4px 12px
- Icon nhỏ bên trái (shield / star)
- Click → toggle PlanList

### 4.3 PlanList
```
┌─────────────────────────────────────────┐
│  Gói Cơ Bản                  Free  [→] │
│  Tài khoản miễn phí dịch vụ cơ bản     │
├─────────────────────────────────────────┤
│  Gói Cao Cấp           200k/tháng  [→] │
│  Đầy đủ quyền lợi nâng cao             │
└─────────────────────────────────────────┘
```
- Hiển thị dưới ProfileHeader khi MembershipBadge được click
- Click ngoài → đóng
- Desktop: 2 card ngang; Mobile: 2 card dọc

### 4.4 FreePlanModal
```
┌──────────────────────────────────────────┐
│  Gói Cơ Bản — Miễn phí               [×]│
├──────────────────────────────────────────┤
│  Bạn sẽ có tài khoản để sử dụng dịch    │
│  vụ cơ bản mà không mất phí.            │
│                                          │
│  ✓ Truy cập dịch vụ cơ bản              │
│  ✓ Không tốn phí                         │
│  ✓ Có thể nâng cấp bất kỳ lúc nào       │
│                                          │
│  [Đăng ký miễn phí]     [Hủy]           │
└──────────────────────────────────────────┘
```
- Nền overlay tối 40%
- Modal tối đa 480px, border-radius 16px
- Nút "Đăng ký miễn phí": nền đỏ cam `#E8614A`
- Nút "Hủy": outline

### 4.5 PremiumPlanModal
```
┌──────────────────────────────────────────┐
│  Gói Cao Cấp                          [×]│
├──────────────────────────────────────────┤
│  Chọn hình thức thanh toán:              │
│                                          │
│  ○ Gói tháng   200.000 VNĐ/tháng        │
│    Linh hoạt, huỷ bất kỳ lúc nào        │
│                                          │
│  ○ Gói năm   1.900.000 VNĐ/năm          │
│    Tiết kiệm + Tặng quà ưu đãi           │
│                                          │
│  [Đăng ký ngay]          [Hủy]          │
└──────────────────────────────────────────┘
```
- Radio button chọn tháng/năm
- Nút "Đăng ký ngay" chỉ active khi đã chọn 1 option
- Mặc định: không option nào được chọn

### 4.6 AccountActions
```
[✏]  Chỉnh sửa thông tin cá nhân  [→]
[⏻]  Đăng xuất
```
- Link "Chỉnh sửa thông tin cá nhân" → `/[locale]/account/edit`
- Nút "Đăng xuất" → gọi logout action → redirect `/[locale]`
- Đăng xuất không cần confirm dialog

---

## 5. UI Behavior

| Hành động | Kết quả |
|---|---|
| Trang load | Hiển thị avatar + tên + email + badge trạng thái hiện tại |
| Click AvatarButton (Header) | Toggle mở/đóng HeaderAvatarDropdown |
| Click ngoài HeaderAvatarDropdown | Đóng dropdown |
| Click "Hồ sơ cá nhân" (dropdown) | Navigate `/[locale]/account` |
| Click "Đổi mật khẩu" (dropdown) | Navigate `/[locale]/account/change-password` |
| Click "Đăng xuất" (dropdown) | Clear session → redirect `/[locale]` |
| Click MembershipBadge | Toggle mở/đóng PlanList |
| Click ngoài PlanList | Đóng PlanList |
| Click PlanCard Cơ Bản | Đóng PlanList, mở FreePlanModal |
| Click PlanCard Cao Cấp | Đóng PlanList, mở PremiumPlanModal |
| Click "Đăng ký miễn phí" | Loading → success toast "Đã kích hoạt Gói Cơ Bản!" → badge cập nhật |
| Click "Đăng ký ngay" (Cao Cấp) | Loading → redirect thanh toán / success |
| Click "Hủy" / overlay / [×] | Đóng modal, trở về trang Account |
| Click "Chỉnh sửa thông tin" | Navigate `/[locale]/account/edit` |
| Click "Đăng xuất" (AccountActions) | Clear session → redirect `/[locale]` |

---

## 6. Style

| Token | Giá trị |
|---|---|
| Màu accent | `#E8614A` (đỏ cam) |
| Màu success | `#22c55e` (xanh lá) |
| Màu text chính | `#1a1a1a` |
| Màu text phụ | `#666` |
| Nền trang | `#ffffff` |
| Nền ProfileHeader | `#f8f8f6` |
| Nền overlay modal | `rgba(0,0,0,0.4)` |
| Border radius modal | `16px` |
| Border radius badge | `999px` |
| Font tên | `1.4rem`, weight 700 |
| Font badge | `0.8rem`, weight 600 |
| Avatar size | `96px` desktop / `72px` mobile |
| Nút chính | Nền `#E8614A`, text trắng, height 48px |
| Nút phụ | Outline `#1a1a1a`, height 48px |

---

## 7. Edge Cases

| Tình huống | Xử lý UI |
|---|---|
| Không có avatar | SVG placeholder hình người, nền xám nhạt |
| Không có tên hiển thị | Hiển thị email; nếu không có → "Khách hàng" |
| Trang load chậm | Skeleton loader cho avatar + tên + badge |
| Gói Cao Cấp sắp hết hạn (≤7 ngày) | Badge đổi màu cam cảnh báo + tooltip "Gia hạn ngay" |
| Click "Đăng ký ngay" khi chưa chọn gói tháng/năm | Nút disabled, shake animation nhắc chọn |
| Đăng ký thất bại | Toast lỗi đỏ "Không thể kích hoạt. Vui lòng thử lại." |
| JS tắt | Hiển thị avatar + tên tĩnh, ẩn badge và popup |

---

## 8. Mapping Business Spec → UI

| Business Spec | Thể hiện UI |
|---|---|
| Hình đại diện + tên | `ProfileHeader` với `AvatarImage` + `DisplayName` |
| Email hiển thị rõ dưới tên | `DisplayEmail` trong `ProfileHeader`, màu `#666` |
| Avatar nhấn mở menu dropdown | `AvatarButton` → toggle `HeaderAvatarDropdown` |
| Avatar + tên + email + chấm xanh (dropdown) | `DropdownUserInfo` trong `HeaderAvatarDropdown` |
| "Hồ sơ cá nhân" trong dropdown | Link → `/[locale]/account` |
| "Đổi mật khẩu" trong dropdown | Link → `/[locale]/account/change-password` |
| Cài đặt (Thông báo / Ngôn ngữ / Tùy chọn) | `DropdownSection "Cài đặt"` với 3 items |
| "Đăng xuất" màu đỏ trong dropdown | Button màu `#E8614A` trong `HeaderAvatarDropdown` |
| Thẻ thành viên góc phải | `MembershipBadge` inline với tên, nhấn được |
| Danh sách 2 gói | `PlanList` — 2 `PlanCard` |
| Popup Gói Cơ Bản | `FreePlanModal` + nút "Đăng ký miễn phí" |
| Popup Gói Cao Cấp + chọn tháng/năm | `PremiumPlanModal` + radio + nút "Đăng ký ngay" |
| Nút Chỉnh sửa thông tin | Link trong `AccountActions` → `/account/edit` |
| Nút Đăng xuất | Button trong `AccountActions` → logout + redirect |
| Responsive mobile | Full-width layout, popup bottom-sheet, nút 48px |
| Trạng thái "Chưa kích hoạt" | Badge xám, PlanList ưu tiên hiển thị Cơ Bản trước |
| "Gói Cao Cấp – Còn XX ngày" | Badge đỏ cam + đếm ngày từ `subscription.expiresAt` |

---

## 10. Acceptance Criteria

### AC-01: Trang Account hiển thị đúng thông tin cá nhân
Given người dùng đã đăng nhập và truy cập trang Account  
When trang load thành công  
Then:
- Hiển thị avatar (có fallback placeholder nếu không có ảnh)
- Hiển thị tên bên dưới avatar (fallback: email → "Khách hàng")
- Hiển thị email rõ ràng bên dưới tên, màu `#666`
- Thẻ thành viên hiển thị đúng trạng thái gói hiện tại
- Có nút "Chỉnh sửa thông tin cá nhân" và "Đăng xuất"

### AC-02: Mở HeaderAvatarDropdown từ avatar
Given người dùng đang xem trang Account  
When nhấn vào AvatarButton ở Header  
Then dropdown hiện ra với:
- `DropdownUserInfo`: avatar + tên + email + chấm xanh online (`#22c55e`, 8px)
- Link "Hồ sơ cá nhân" → `/[locale]/account`
- Link "Đổi mật khẩu" → `/[locale]/account/change-password`
- Divider
- Section "Cài đặt" gồm: Thông báo, Ngôn ngữ, Tùy chọn
- Divider
- Nút "Đăng xuất" màu `#E8614A` nổi bật  
And click ngoài dropdown → dropdown đóng

### AC-03: Nhấn thẻ thành viên hiển thị đúng 2 gói
Given người dùng đang xem trang Account  
When nhấn vào thẻ thành viên  
Then hiển thị danh sách 2 gói: Gói Cơ Bản và Gói Cao Cấp — cả hai nhấn được

### AC-04: Hoàn tất đăng ký Gói Cơ Bản miễn phí
Given popup Gói Cơ Bản đang mở  
When nhấn "Đăng ký miễn phí" và hoàn tất  
Then popup đóng, thẻ thành viên cập nhật thành "Gói Cơ Bản", toast success hiển thị

### AC-05: Trang responsive trên mobile
Given truy cập trang Account trên điện thoại  
When nhấn avatar hoặc thẻ thành viên  
Then menu dropdown và popup hiển thị rõ ràng, dễ chạm (nút ≥48px), chữ wrap tự nhiên

### AC-06: Đăng xuất hoạt động đúng
Given người dùng đang xem trang Account  
When nhấn "Đăng xuất" từ menu dropdown hoặc nút AccountActions  
Then kết thúc phiên đăng nhập, redirect về `/[locale]`

---

## 9. Assets

| Asset | Đường dẫn |
|---|---|
| Avatar placeholder | SVG inline hoặc `/images/avatar-placeholder.svg` |
| Logo badge shield | SVG inline |
