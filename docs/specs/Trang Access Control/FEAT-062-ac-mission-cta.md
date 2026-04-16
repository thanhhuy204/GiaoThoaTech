# FEAT-062: Access Control — igloo's Mission

**Trạng thái:** Planned
**Ưu tiên:** P1
**File implement:** `app/components/solutions/access-control/AccessControlPage.tsx`

---

## 1. Business Goal

Kết thúc trang bằng một tuyên bố sứ mệnh thương hiệu mạnh mẽ. Tạo ấn tượng cuối cùng với khách hàng trước khi họ rời trang hoặc chuyển đến footer.

---

## 2. UI Specification

### Layout
- Nền: `#0f0f0f` (đen)
- Padding: `80px 0`
- Nội dung căn giữa, `max-width: 760px`

### Nội dung
- **Logo igloohome** — icon + wordmark màu trắng
- **missionStatement:** `"igloohome revolutionizes the way property owners secure and manage access for their homes, buildings and shared assets, that works every time and anywhere in the world."`
- **missionLink:** `"Complete freedom about constraints."` — màu đỏ `#E8614A`, có arrow →, navigate `/about`

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Section bg | `#0f0f0f` |
| Logo | `#ffffff` |
| Mission text | `rgba(255,255,255,0.75)` |
| Link text | `#E8614A` |
| Link hover | `#ff7a5c` |
| Divider | `rgba(255,255,255,0.1)` |

### Typography
| Yếu tố | Style |
|---|---|
| Mission text | `1.15rem`, line-height 1.8, font-weight 400 |
| Link | `0.95rem`, font-weight 600 |

---

## 3. Business Rules

- Divider line phía trên section để tách với integrations
- Link có `aria-label` mô tả rõ
- Logo igloohome: dùng SVG hoặc `<span>` text styling

---

## 4. Acceptance Criteria

- [ ] Mission statement hiển thị đúng
- [ ] Link màu đỏ, navigate đúng `/about`
- [ ] Nền đen hiển thị đúng
- [ ] Responsive căn giữa trên mobile
