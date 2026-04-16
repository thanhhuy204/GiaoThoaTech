# FEAT-061: Access Control — Third-Party Integrations

**Trạng thái:** Planned
**Ưu tiên:** P1
**File implement:** `app/components/solutions/access-control/AccessControlPage.tsx`

---

## 1. Business Goal

Thể hiện hệ sinh thái đối tác rộng lớn của igloohome trong lĩnh vực Access Control. Tăng độ tin cậy với khách hàng doanh nghiệp thông qua các thương hiệu đối tác nổi tiếng.

---

## 2. UI Specification

### Layout
- Nền: `#ffffff`
- Padding: `80px 0`
- Label đỏ nhỏ căn giữa phía trên
- Headline căn giữa, chữ đậm
- Grid logo: `repeat(auto-fit, minmax(140px, 1fr))`, tối đa 4 cột

### Nội dung
- **integrationsLabel:** `"Integrations"`
- **integrationsTitle:** `"Connect with Ready-Made Third-Party MFR Integrations"`
- **integrationsSubtitle:** `"Works out-of-the-box with the platforms your team already uses."`

### Logo grid (theo thứ tự)
| File | Tên hiển thị |
|---|---|
| `logo/apthub-logo.png` | AptHub |
| `logo/behome247-logo-1.png` | BeHome247 |
| `logo/geokey-logo.webp` | GeoKey |
| `logo/logo-1.png` | Partner Logo |
| `logo/logo-peek-1.png` | Peek |
| `logo/logo-white-1.webp` | Partner Logo |
| `logo/smartrent_logo_color-1.webp` | SmartRent |
| `logo/swiftlane-logo-1.webp` | Swiftlane |

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Section bg | `#ffffff` |
| Label | `#E8614A` |
| Headline | `#1a1a1a` |
| Logo wrapper bg | `#f9f9f9` |
| Logo wrapper border | `#e5e7eb` |

### Typography
| Yếu tố | Style |
|---|---|
| Headline | `clamp(1.6rem, 3vw, 2.2rem)`, font-weight 700 |
| Subtext | `1rem`, color `#6b7280` |

---

## 3. Business Rules

- Logo hiển thị `object-fit: contain`, `max-height: 40px`
- Logo wrapper: padding `20px 32px`, `border-radius: 12px`
- Hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.08)`
- Responsive: tự động xuống hàng khi không đủ rộng

---

## 4. Assets

| Asset | Đường dẫn |
|---|---|
| Logos | `public/images/Solutions/access-contro/logo/*.png|webp` |

---

## 5. Acceptance Criteria

- [ ] Tất cả logo hiển thị đúng
- [ ] Grid responsive tự wrap
- [ ] Hover effect hoạt động
- [ ] Không dùng inline style
