# FEAT-076: Quản lý Vai trò & Quyền (User Roles & Permissions)

**Trạng thái:** Planned  
**Ưu tiên:** P1  
**Route:** `/[locale]/admin/users/[id]` (tab "Quản lý vai trò")  
**Business Spec:** `docs/spec-business/admin/Feature User Roles & Permissions.md`

---

## 0. Main Flow (từ Business Spec)

1. Admin nhấn **"Người dùng"** trong Menu bên trái
2. Hệ thống hiển thị **danh sách người dùng**
3. Admin tìm kiếm / lọc → nhấn vào một user để xem chi tiết
4. Trong trang chi tiết, Admin nhấn tab **"Quản lý vai trò"**
5. Hệ thống hiển thị **tất cả Role dưới dạng checkbox** — role hiện tại được tick sẵn
6. Admin **tick / bỏ tick** một hoặc nhiều Role
7. Admin nhấn **"Lưu thay đổi"**
8. Hệ thống cập nhật Role → toast: **"Quản lý vai trò đã được cập nhật"**
9. Quyền hạn mới được áp dụng (có thể cần đăng nhập lại)

---

## 1. Page / Screen

| Screen | Route | Mục đích |
|---|---|---|
| Danh sách người dùng | `/[locale]/admin/users` | Tìm kiếm + chọn user để vào detail |
| Chi tiết người dùng — Tab Thông tin | `/[locale]/admin/users/[id]` | Xem thông tin cơ bản (read-only) |
| Chi tiết người dùng — Tab Vai trò | `/[locale]/admin/users/[id]?tab=roles` | Gán / gỡ Role cho user |

> **Không có** route `/admin/roles` độc lập — AC-05 business spec.

---

## 2. UI Components

### Trang Danh sách người dùng

```
UsersListPage
├── PageHeader           ← "Người dùng" + đếm số lượng + Button "Thêm người dùng"
├── UserToolbar
│   ├── SearchInput      ← debounce 300ms, placeholder "Tìm theo tên, email..."
│   └── StatusFilterBtns ← [Tất cả] [Hoạt động] [Tạm dừng]
└── UserCard (admin-card)
    ├── UsersTable
    │   ├── TableHeader  ← Người dùng / Tên đăng nhập / Vai trò / Gói / Trạng thái / Ngày / Thao tác
    │   ├── UserRow[]    ← avatar initials + tên + email, badges, link "Chi tiết →"
    │   └── EmptyState   ← khi không tìm thấy
    └── Pagination       ← info + page buttons
```

### Trang Chi tiết người dùng

```
UserDetailPage
├── BackLink             ← "← Quay lại danh sách"
├── UserHeader           ← avatar 64px + tên + email + badges + action buttons
├── TabBar
│   ├── Tab "Thông tin"        ← default active
│   └── Tab "Quản lý vai trò" ← dot indicator nếu có unsaved
└── TabContent
    ├── InfoTab          ← grid 2 cột, read-only fields
    └── RolesTab         ← (xem chi tiết bên dưới)
```

### RolesTab — Component chính

```
RolesTab
├── RolesCard (admin-card)
│   ├── CardHeader       ← "Vai trò của [tên]" + mô tả hướng dẫn
│   ├── RoleList
│   │   └── RoleItem[]   ← mỗi role một hàng
│   │       ├── RoleCheckbox    ← custom checkbox 18×18px
│   │       ├── RoleInfo
│   │       │   ├── RoleName    ← bold
│   │       │   └── RoleDesc    ← muted, nhỏ hơn
│   │       └── ProtectedBadge  ← "🔒 Được bảo vệ" (nếu protected)
│   └── UnsavedChangesBar ← sticky bottom, chỉ hiện khi có thay đổi
│       ├── ChangeCount  ← "Có X thay đổi chưa được lưu"
│       └── ActionBtns
│           ├── Button "Huỷ"
│           └── Button "Lưu thay đổi" (primary + loading spinner)
└── ConfirmModal         ← modal xác nhận khi gỡ critical role
    ├── Title
    ├── Description
    └── Buttons [Huỷ | Xác nhận gỡ (đỏ)]
```

---

## 3. Layout

### Danh sách người dùng

```
┌──────────────────────────────────────────────────┐
│  Người dùng (150)             [+ Thêm người dùng]│
├──────────────────────────────────────────────────┤
│  [🔍 Tìm theo tên, email...]  [Tất cả][Hoạt động]│
├──────────────────────────────────────────────────┤
│  NGƯỜI DÙNG  | TÊN ĐN | VAI TRÒ | GÓI | STATUS  │
│  ──────────────────────────────────────────────  │
│  [Av] Tên A   @user_a  [User]   [Pre] ● Hoạt    │  [Chi tiết →]
│  [Av] Tên B   @user_b  [User]   [Bas] ● Hoạt    │  [Chi tiết →]
│  ...                                             │
├──────────────────────────────────────────────────┤
│  1–6 / 8 người dùng              [‹] [1] [2] [›]│
└──────────────────────────────────────────────────┘
```

### Chi tiết người dùng — Tab Vai trò

```
┌──────────────────────────────────────────────────┐
│  ← Quay lại danh sách                            │
├──────────────────────────────────────────────────┤
│  [Av]  Nguyễn Văn A                              │
│        a@example.com                             │
│        [● Hoạt động] [Premium] [User] [Admin]   │
│                           [Tạm dừng tài khoản]   │
├──────────────────────────────────────────────────┤
│  [Thông tin]  [Quản lý vai trò ●]                │ ← tab bar
├──────────────────────────────────────────────────┤
│  Vai trò của Nguyễn Văn A                        │
│  Chọn một hoặc nhiều vai trò...                  │
│  ┌────────────────────────────────────────────┐  │
│  │ ☑  User         Người dùng thông thường    │  │
│  │ ☑  Admin        Quản trị viên              │  │
│  │ ☐  Super Admin  Toàn quyền  [🔒 Bảo vệ]  │  │
│  │ ☐  Basic Member Gói Basic                  │  │
│  │ ☑  Premium Memb Gói Premium                │  │
│  └────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────┐  │
│  │ ⚠ Có 2 thay đổi chưa được lưu  [Huỷ][Lưu]│  │ ← sticky
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### RoleItem sizing

- Height: `56px`
- Layout: `flex`, gap `14px`
- Checkbox: `18×18px`, border-radius `4px`
- Border-bottom: `1px solid #F3F4F6` (trừ item cuối)

---

## 4. UI Behavior

### Tìm kiếm người dùng

| Hành động | Kết quả |
|---|---|
| Gõ vào SearchInput | Debounce 300ms → filter in-place (client-side với mock data, API khi có backend) |
| Xoá text | Hiện lại toàn bộ danh sách |
| Không có kết quả | EmptyState: icon + "Không tìm thấy người dùng" |

### Status Filter

| Click | Kết quả |
|---|---|
| "Tất cả" | Không filter, button active (cam) |
| "Hoạt động" | Chỉ hiện `status === 'active'` |
| "Tạm dừng" | Chỉ hiện `status === 'inactive'` |

### Click UserRow "Chi tiết →"

- Navigate `<Link>` → `/admin/users/[id]`
- Default tab: "Thông tin"

### Tab switching

| Tình huống | Hành vi |
|---|---|
| Click tab khác khi không có unsaved | Navigate bình thường |
| Click tab khác khi có unsaved changes | `confirm()` cảnh báo → nếu OK: reset state + switch tab |

### RoleItem — tick/untick

| Hành động | Kết quả |
|---|---|
| Click role không protected | Toggle `selectedRoles` (Set) |
| Click protected role | Không làm gì (cursor: not-allowed, opacity 0.6) |
| Click role critical đang có (đã saved) | Hiện `ConfirmModal` trước khi thực sự bỏ tick |
| Bất kỳ thay đổi nào | `UnsavedChangesBar` xuất hiện ngay, đếm số thay đổi |

### Nút "Lưu thay đổi"

| Trạng thái | Hành vi |
|---|---|
| Click | Loading spinner + button disabled |
| API thành công | Toast success "Quản lý vai trò đã được cập nhật", `savedRoles` sync, bar ẩn |
| API lỗi | Toast error "Có lỗi xảy ra, vui lòng thử lại", button re-enabled, state giữ nguyên |

### Nút "Huỷ"

- Reset `selectedRoles` về `savedRoles` (state trước khi chỉnh)
- `UnsavedChangesBar` ẩn

### ConfirmModal — gỡ critical role

| Hành động | Kết quả |
|---|---|
| Click backdrop / "Huỷ" | Đóng modal, role vẫn checked |
| Click "Xác nhận gỡ" | Bỏ tick role, đóng modal |

---

## 5. Style

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Checkbox checked border + bg | `#E8614A` |
| Checkbox check icon | `#FFFFFF` |
| Checkbox unchecked border | `#D1D5DB` |
| RoleName | `#111827`, weight 600 |
| RoleDesc | `#6B7280`, `0.8125rem` |
| RoleItem hover | background `#FEF9F8` |
| Protected badge | bg `#F3F4F6`, text `#6B7280` |
| UnsavedBar background | `#FFF7ED` |
| UnsavedBar border-top | `#FED7AA` |
| UnsavedBar text | `#92400E` |
| Button "Lưu" | bg `#E8614A`, text white |
| Button "Huỷ" | border `#E5E7EB`, text `#374151` |
| Modal confirm btn "Gỡ" | bg `#DC2626` |
| Tab active underline | `#E8614A`, 2px |
| Tab active text | `#E8614A`, weight 600 |
| Badge roles | gray `#F3F4F6` / orange `#FFF7ED` |

### Typography

| Yếu tố | Style |
|---|---|
| Page title | `1.5rem`, weight 700 |
| Tab label | `0.875rem`, weight 500 |
| Tab label active | `0.875rem`, weight 600, `#E8614A` |
| User name (detail) | `1.25rem`, weight 700 |
| User email | `0.875rem`, `#6B7280` |
| Role name | `0.9375rem`, weight 600 |
| Role description | `0.8125rem`, weight 400, `#6B7280` |
| UnsavedBar text | `0.875rem`, weight 500 |
| Table header | `0.75rem`, weight 600, uppercase, letter-spacing 0.05em |

### Cảm giác thiết kế

- **Trustworthy & Functional** — giao diện admin gọn, rõ ràng
- Feedback ngay lập tức: `UnsavedChangesBar` xuất hiện khi có thay đổi đầu tiên
- Màu cam `#E8614A` nhất quán cho tất cả interactive elements
- Modal confirm màu đỏ để nhấn mạnh hành động nguy hiểm

---

## 6. Edge Cases

| Tình huống | Hành vi UI |
|---|---|
| Danh sách roles rỗng | Empty state trong RoleList: "Chưa có vai trò nào" |
| API fetch roles lỗi | Toast error + nút "Thử lại" trong tab |
| API lưu lỗi | Toast error, state rollback, button re-enabled |
| User đang login bị đổi role | Backend trả 401 → FE redirect login |
| Admin tự gỡ role của mình (protected) | Checkbox disabled + tooltip "Không thể gỡ vai trò này" |
| Gỡ critical role của người khác | Modal confirm bắt buộc |
| Switch tab khi có unsaved | `confirm()` cảnh báo trước khi discard |
| User không có role nào | Note: "Người dùng này chưa có vai trò nào" trong header badges |
| Nhiều role gây conflict | FE chỉ hiển thị, backend xử lý merge quyền |

---

## 7. Business Spec → UI Mapping

| Business Rule | UI Implementation |
|---|---|
| Một user **có thể có nhiều Role** cùng lúc | Checkbox multi-select trong `RolesTab` |
| Quan hệ **N:N** qua bảng `user_roles` | API gửi `roleIds[]`, backend diff + update `user_roles` |
| **Không trùng lặp** Role cho cùng một user | Checkbox state đảm bảo không thể check role đã checked |
| Quản lý Role **chỉ trong user detail**, không menu riêng | Tab trong `UserDetailPage` — AC-05 |
| Mọi thay đổi phải có **audit log** | Backend ghi log khi FE gọi save API |
| Role **bảo vệ đặc biệt** (không tự gỡ quyền mình) | `protected: true` → checkbox disabled + badge `🔒` + tooltip |
| **Super Admin** có toàn quyền | FE không giới hạn actor này |
| Toast: **"Quản lý vai trò đã được cập nhật"** | Hiển thị sau khi API lưu thành công |
| Quyền = **tập hợp từ tất cả Role** | FE không tính toán, backend xử lý merge quyền |
| Gỡ **Role quan trọng** → cần xác nhận | `ConfirmModal` khi untick role critical |

---

## 8. Acceptance Criteria

> Mapping 1-1 với Business Spec AC-01 → AC-06

- [ ] **AC-01:** Tab "Quản lý vai trò" có trong UserDetailPage, click vào user từ danh sách → vào được tab này
- [ ] **AC-02:** Chọn nhiều Role + "Lưu thay đổi" → user được gán đồng thời nhiều Role + toast **"Quản lý vai trò đã được cập nhật"** + data cập nhật đúng
- [ ] **AC-03:** Bỏ tick một Role + lưu → Role bị gỡ khỏi user + quyền hạn được cập nhật
- [ ] **AC-04:** Mở tab → hiển thị tất cả Role dạng checkbox đa chọn + Role hiện tại của user được tick sẵn
- [ ] **AC-05:** Không có mục "Quản lý vai trò" riêng trong Menu bên trái — chỉ truy cập được từ trang chi tiết user
- [ ] **AC-06:** Quan hệ N:N qua bảng `user_roles` — API nhận `roleIds[]`, backend diff + update + audit log

### Acceptance Criteria bổ sung (UI)

- [ ] UnsavedChangesBar hiện ngay khi có thay đổi đầu tiên
- [ ] "Huỷ" → reset về state gốc
- [ ] Protected role → checkbox disabled + badge `🔒 Được bảo vệ` + tooltip
- [ ] Gỡ critical role → modal confirm bắt buộc
- [ ] Switch tab khi có unsaved → cảnh báo trước khi discard

---

## 9. Related Features

- **FEAT-075** — Admin Dashboard Layout
- **FEAT-064** — Login Form
