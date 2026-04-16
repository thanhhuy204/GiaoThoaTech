# FEAT-058: Access Control — Security Essentials Section

**Trạng thái:** Planned
**Ưu tiên:** P0
**File implement:** `app/components/solutions/access-control/AccessControlPage.tsx`

---

## 1. Business Goal

Trình bày 3 tính năng cốt lõi của giải pháp Access Control theo dạng 3 cột ngang bằng nhau, dễ scan nhanh. Giúp khách hàng hiểu ngay lợi ích chính.

---

## 2. UI Specification

### Layout
- Nền: `#ffffff` hoặc `#f9f8f5` (xám rất nhạt)
- Padding: `80px 0`
- Label nhỏ màu đỏ căn giữa phía trên
- Headline căn giữa, chữ đậm
- 3 cột bằng nhau: `grid-template-columns: repeat(3, 1fr)`, `gap: 40px`

### Nội dung

#### Cột 1 — Automate Access
- **Icon:** `public/images/Solutions/access-contro/icon/icon-1.svg`
- **Title:** `"Automate Access to Your Property"`
- **Desc:** `"Connect seamlessly with leading PMS platforms to automate check-in and check-out. No manual key handovers, no front desk bottlenecks."`
- **Partner logos:** logo đối tác PMS nhỏ bên dưới

#### Cột 2 — Access Control
- **Icon:** `public/images/Solutions/access-contro/icon/icon-2.svg`
- **Title:** `"Access Control for Every Entry Point"`
- **Desc:** `"Manage doors, gates, elevators, and amenity areas from one unified dashboard. Set permissions by role, time, and location with ease."`

#### Cột 3 — Real-time Alerts
- **Icon:** `public/images/Solutions/access-contro/icon/icon-3.svg`
- **Title:** `"Get Real-Time Alerts and Audit Logs"`
- **Desc:** `"Receive instant notifications for every access event. Maintain a full audit trail for compliance, security reviews, and incident investigation."`

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Label | `#E8614A` |
| Headline | `#1a1a1a` |
| Icon wrap bg | `rgba(232,97,74,0.08)` |
| Col title | `#1a1a1a`, font-weight 600 |
| Col desc | `#555` |

### Typography
| Yếu tố | Style |
|---|---|
| Label | `0.72rem`, uppercase, letter-spacing 0.12em |
| Headline | `clamp(1.8rem, 3.5vw, 2.6rem)`, font-weight 700 |
| Col title | `1.05rem`, font-weight 600 |
| Col desc | `0.93rem`, line-height 1.7 |

---

## 3. Business Rules

- Responsive: 3 cột → 1 cột trên mobile `<768px`
- Icon SVG hiển thị với `width: 48px; height: 48px`
- Partner logos chỉ hiện ở cột 1, `opacity: 0.7`, `height: 24px`

---

## 4. Assets

| Asset | Đường dẫn |
|---|---|
| Icon 1 | `public/images/Solutions/access-contro/icon/icon-1.svg` |
| Icon 2 | `public/images/Solutions/access-contro/icon/icon-2.svg` |
| Icon 3 | `public/images/Solutions/access-contro/icon/icon-3.svg` |

---

## 5. Acceptance Criteria

- [ ] 3 cột hiển thị bằng nhau trên desktop
- [ ] Icon hiển thị đúng từ file SVG
- [ ] Responsive 1 cột trên mobile
- [ ] Không dùng inline style
