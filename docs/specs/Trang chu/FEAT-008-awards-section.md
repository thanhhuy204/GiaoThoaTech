# FEAT-008: Awards Section — Recognition Ticker

**Trạng thái:** Implemented
**Ưu tiên:** P1 — Nên có
**File implement:** `app/components/trangchu/Awards.tsx`
**Page file:** `app/page.tsx`

---

## 1. Business Goal

Xây dựng uy tín thương hiệu bằng cách trưng bày các giải thưởng thiết kế và đổi mới quốc tế mà igloo đã đạt được. Tăng trust signal cho khách hàng tiềm năng ngay trên trang chủ.

---

## 2. Actors

- **Visitor** — khách truy cập đang đánh giá độ tin cậy của thương hiệu
- **Potential Buyer** — người cần bằng chứng chứng nhận chất lượng bên thứ ba

---

## 3. Preconditions

- Trang chủ load thành công
- Hình ảnh giải thưởng có sẵn tại `public/images/Awards/`
- Trình duyệt hỗ trợ `IntersectionObserver`

---

## 4. Main Flow

1. Người dùng kéo xuống phần "Recognition" trên trang chủ
2. Khi section vào viewport (threshold 30%), heading animation kích hoạt
3. Các từ tiêu đề xuất hiện lần lượt với stagger delay
4. Subtitle fade in
5. Ticker chạy liên tục — hiển thị các logo giải thưởng trượt từ phải sang trái
6. Fade overlay trái/phải tạo hiệu ứng mờ dần ở hai cạnh

---

## 5. UI Specification

### Layout

- **Section:** `background: #fff`, padding `80px 0`
- **Container:** căn giữa, `max-width: 1200px`
- **Header block:** căn giữa, `marginBottom: 48px`
- **Ticker wrapper:** `overflow: hidden`, `position: relative`, width `100%`
- **Ticker track:** flex row, `gap: 32px`, animation scroll vô hạn

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#ffffff` |
| Label tag | `var(--primary)` |
| Tiêu đề word 1 | `var(--dark)` |
| Tiêu đề word 2 | gradient (gradient-text class) |
| Subtitle | `rgba(0,0,0,0.65)` |
| Highlight text | `var(--primary)` |
| Fade overlay | `linear-gradient(to right, #fff 0%, transparent 20%)` (trái) |
|  | `linear-gradient(to left, #fff 0%, transparent 20%)` (phải) |
| Award card bg | `#f5f4f1` |

### Typography

| Yếu tố | Style |
|---|---|
| Label tag | `0.72rem`, uppercase, letter-spacing `0.12em` |
| Tiêu đề H2 | `heading-lg`, Cormorant Garamond, bold, `3rem` |
| Subtitle | `1rem`, line-height 1.65, color mờ |
| Highlight word | `var(--primary)`, font-weight 700 |

### Heading Animation (Stagger per word)

```
Word 1 "Award":    opacity 0→1, translateY 20px→0, transitionDelay 0ms
Word 2 "Winning.": opacity 0→1, translateY 20px→0, transitionDelay 320ms
Subtitle:          opacity 0→1, translateY 10px→0, transitionDelay 600ms

Trigger: IntersectionObserver threshold 0.3
Duration: 600ms cubic-bezier(0.22, 1, 0.36, 1)
```

### Award Card

```
Width: 108px
Height: 108px
Background: #f5f4f1 hoặc transparent
Border-radius: 8px
Padding: 12px
Image: objectFit contain, fill
```

### Ticker Track

```
Display: flex
Gap: 32px
Animation: scroll-x infinite linear
Duration: 30s
Content: awards array duplicated ([...awards, ...awards]) để loop mượt
```

```css
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

### Fade Overlay

- `position: absolute`, `top/bottom: 0`, `width: 120px`
- Trái: `left: 0`, gradient phải → trong suốt
- Phải: `right: 0`, gradient trái → trong suốt
- `pointer-events: none`, `z-index: 1`

### Responsive Breakpoints

| Device | Card size | Gap | Font |
|---|---|---|---|
| Desktop (≥1024px) | 108px | 32px | 100% |
| Tablet (768px–1023px) | 88px | 24px | 95% |
| Mobile (≤767px) | 72px | 16px | 90% |

---

## 6. Dữ liệu Awards

| File ảnh | Tên giải thưởng |
|---|---|
| `ces2022innovationawardhonoree.webp` | CES 2022 Innovation Award Honoree |
| `european-product-design-award.webp` | European Product Design Award |
| `if-design-award-2023.webp` | iF Design Award 2023 |
| `picks.webp` | Editor's Choice / Picks Award |
| `reddot-award-2021.webp` | Red Dot Award 2021 |
| `dfaa.webp` | Design For Asia Award |

Đường dẫn: `public/images/Awards/*.webp`

---

## 7. Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Word "Award" | fadeup | IntersectionObserver (0.3) | 600ms, delay 0ms |
| Word "Winning." | fadeup | IntersectionObserver (0.3) | 600ms, delay 320ms |
| Subtitle | fadeup | IntersectionObserver (0.3) | 600ms, delay 600ms |
| Ticker track | `anim-ticker` (translateX) | auto, infinite | 30s linear |

---

## 8. Business Rules

- Ticker chạy tự động, không dừng khi hover
- Mảng awards được nhân đôi `[...awards, ...awards]` để animation loop liền mạch
- `IntersectionObserver` disconnect sau khi đã trigger (fire once)
- Hình ảnh award dùng `next/image` với `fill` + `sizes="108px"`

---

## 9. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Hình award không load | Vùng card trống, ticker vẫn chạy |
| IntersectionObserver không hỗ trợ | Animation kích hoạt ngay khi mount |
| Màn hình cực nhỏ (< 320px) | Cards thu nhỏ, ticker vẫn scroll |
| Reduced motion preference | Animation dừng hoặc giảm tốc độ |

---

## 10. Acceptance Criteria

- [ ] Section hiển thị trên trang chủ sau phần Hero/ComingSoon
- [ ] Label "Recognition" hiển thị đúng
- [ ] Tiêu đề "Award Winning." với stagger animation khi scroll vào view
- [ ] Subtitle hiển thị đúng text
- [ ] 6 logo giải thưởng hiển thị đúng
- [ ] Ticker cuộn liên tục, loop mượt không giật
- [ ] Fade overlay trái/phải hiển thị
- [ ] Responsive đúng trên mobile/tablet/desktop
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] `next/image` đúng `alt` text cho accessibility

---

## 11. Assets cần thiết

| Asset | Đường dẫn |
|---|---|
| Logo đối tác 1 | `public/images/logo-doitac/anh1.jpg` |
| Logo đối tác 2 | `public/images/logo-doitac/anh2.png` |
| Logo đối tác 3 | `public/images/logo-doitac/anh3.png` |
| Logo đối tác 4 | `public/images/logo-doitac/anh4.png` |
