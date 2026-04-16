# FEAT-007: Durability Tabs — Video Showcase

**Trạng thái:** Implemented
**Ưu tiên:** P1 — Nên có
**File implement:** `app/components/trangchu/DurabilityTabs.tsx`
**Page file:** `app/page.tsx`

---

## 1. Business Goal

Thể hiện độ bền vượt trội của sản phẩm igloo thông qua video thực tế. Tăng niềm tin cho người dùng bằng cách trực quan hóa các thử nghiệm khắc nghiệt mà khóa đã vượt qua.

---

## 2. Actors

- **Visitor** — khách truy cập đang đánh giá chất lượng sản phẩm
- **Potential Buyer** — người cân nhắc mua hàng, muốn chứng minh độ bền

---

## 3. Preconditions

- Trang chủ load thành công
- Các file video có sẵn tại `public/video/`
- Trình duyệt hỗ trợ `<video>` HTML5

---

## 4. Main Flow

1. Người dùng kéo xuống phần "Built to Last" trên trang chủ
2. Hệ thống hiển thị section với heading và 3 tab
3. Tab đầu tiên (`Large Shock and Impact`) được chọn mặc định, video tự động phát
4. Người dùng click tab khác
5. Video chuyển sang clip tương ứng với tab, load lại và phát từ đầu
6. Description cập nhật theo tab đang active

---

## 5. UI Specification

### Layout

- **Section:** `background: #0f0f0f` (tối), padding dọc `80px 0`
- **Container:** căn giữa, `max-width: 1200px`
- **Heading block:** căn giữa, `marginBottom: 40px`
- **Video frame:** width `100%`, `max-width: 900px`, `margin: 0 auto`, `border-radius: 12px`, `overflow: hidden`
- **Tab bar:** flex row, căn giữa, `gap: 0`, `marginTop: 32px`
- **Description:** căn giữa, `max-width: 640px`, `margin: 20px auto 0`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#0f0f0f` |
| Label tag | `rgba(232,97,74,0.9)` |
| Tiêu đề | `#ffffff` |
| Gradient text | `var(--primary)` → gradient |
| Tab text (inactive) | `rgba(255,255,255,0.45)` |
| Tab text (active) | `#ffffff` |
| Tab underline (active) | `var(--primary)` / `#E8614A` |
| Description | `rgba(255,255,255,0.65)` |
| Vignette overlay | `linear-gradient(to top, #0f0f0f 0%, transparent 30%)` |

### Typography

| Yếu tố | Style |
|---|---|
| Label tag | `0.72rem`, uppercase, letter-spacing `0.12em` |
| Tiêu đề H2 | `heading-lg`, Cormorant Garamond, bold |
| Tab label | `0.85rem`, font-weight 500 |
| Description | `0.95rem`, line-height 1.7 |

### Tab Component

```
Tab bar: display flex, border-bottom 1px solid rgba(255,255,255,0.1)
Tab button:
  - Padding: 12px 24px
  - Border: none, background: transparent
  - Color: rgba(255,255,255,0.45) → #fff khi active
  - Transition: color 200ms ease
  - Underline: pseudo-element height 2px, background var(--primary), scale X 0→1 khi active
```

### Video Component

```
<video autoPlay muted loop playsInline>
  width: 100%
  display: block
  aspect-ratio: 16/9
  object-fit: cover
  border-radius: 12px
```

Khi đổi tab: gọi `videoRef.current.load()` rồi `.play()` để phát từ đầu.

### Vignette Overlay

- `position: absolute`, `bottom: 0`, `left/right: 0`
- `height: 35%`
- `background: linear-gradient(to top, #0f0f0f, transparent)`
- `pointer-events: none`

### Responsive Breakpoints

| Device | Video width | Tab wrap | Font scaling |
|---|---|---|---|
| Desktop (≥1024px) | max-width 900px | row, no wrap | 100% |
| Tablet (768px–1023px) | 100% | row, 2 wrap | 95% |
| Mobile (≤767px) | 100% | column, stack | 90% |

---

## 6. Dữ liệu Tabs

| ID | Label | Video | Description |
|---|---|---|---|
| `shock` | Large Shock and Impact | `/video/2-2-padlock.mp4` | Protect your vehicles and other valuables with confidence. Tough and reliable security without holding you back. |
| `subzero` | Sub zero temperatures | `/video/2-1-padlock.mp4` | Great for securing assets in the nordics and cities in colder regions. Our smart locks will still work. |
| `weather` | Harsh Weather | `/video/2-3-padlock.mp4` | From the icy cold to extreme heat, our locks remain steadfast. Tested against swift temperature changes — plunging to -20°C and soaring to 50°C in moments. Dependable security without compromise. |

---

## 7. Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Heading | `anim-fadeup` | Mount | 0.7s |
| Video frame | `anim-fadeup delay-1` | Mount | 0.7s + 0.1s |
| Tab bar | `anim-fadeup delay-2` | Mount | 0.7s + 0.2s |
| Description | fade + key change | Tab click | 300ms |
| Tab underline | scale X 0→1 | Tab active | 200ms ease |

---

## 8. Business Rules

- Tab đầu tiên luôn active khi mount
- Mỗi lần đổi tab: video dừng, load source mới, phát tự động từ giây 0
- Video: `autoPlay`, `muted`, `loop`, `playsInline` (để chạy trên iOS)
- Không có âm thanh (muted) — video dùng làm visual showcase
- Nếu video không load: vùng video hiển thị placeholder màu tối

---

## 9. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Video không load được | Hiển thị placeholder tối, tabs vẫn hoạt động |
| Autoplay bị trình duyệt chặn | Hiển thị play button, user click để phát |
| Kết nối chậm | Video buffer, hiển thị spinner loading |
| Tab click liên tục nhanh | Chỉ load video của tab cuối cùng được click |

---

## 10. Acceptance Criteria

- [ ] Section hiển thị trên trang chủ sau phần ComingSoon
- [ ] 3 tabs render đúng nhãn
- [ ] Tab đầu tiên active mặc định, video phát tự động
- [ ] Click tab → video đổi đúng source, phát từ đầu
- [ ] Description cập nhật theo tab active
- [ ] Vignette overlay hiển thị đúng
- [ ] Video `muted`, `loop`, `playsInline`
- [ ] Responsive đúng trên mobile/tablet/desktop
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Accessibility: button có `aria-label` hoặc text rõ ràng

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Video shock | `public/video/2-2-padlock.mp4` | Padlock chịu va đập |
| Video subzero | `public/video/2-1-padlock.mp4` | Padlock trong nhiệt độ lạnh |
| Video weather | `public/video/2-3-padlock.mp4` | Padlock trong thời tiết khắc nghiệt |
