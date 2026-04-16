# FEAT-001: Hero Banner

**Trạng thái:** Implemented
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/trangchu/Hero.tsx`
**Page file:** `app/page.tsx`

---

## 1. Business Goal

Tạo ấn tượng đầu tiên mạnh mẽ về thương hiệu, nhấn mạnh công nghệ truy cập thông minh hoạt động đáng tin cậy mọi lúc mọi nơi, nhằm thu hút người xem và khuyến khích bấm nút liên hệ hoặc xem sản phẩm.

---

## 2. Actors

- **Visitor** — khách truy cập website, chưa đăng nhập
- **Potential User** — chủ nhà cho thuê, quản lý bất động sản, doanh nghiệp

---

## 3. Preconditions

- Website hoạt động bình thường (HTTPS)
- Trang chủ load thành công trên trình duyệt web

---

## 4. Main Flow

1. Người dùng truy cập trang chủ (`/`)
2. Hệ thống hiển thị Hero Banner chiếm toàn màn hình (100vh)
3. Hiển thị hình nền tối kiểu vũ trụ (nền đen với các ngôi sao và hiệu ứng ánh sáng)
4. Hiển thị ổ khóa thông minh lơ lửng (floating) ở hai bên nội dung
5. Hiển thị badge nhỏ phía trên: `"Smart Access Technology"`
6. Hiển thị tiêu đề chính: `"Smart Access That Works Every Time."`
7. Hiển thị dòng phụ ngay dưới: `"Even in space."`
8. Hiển thị 2 nút CTA bên dưới:
   - Nút 1: **"Get a Demo"** — màu cam (primary)
   - Nút 2: **"See Products"** — màu trắng / outline
9. Hiển thị thanh thống kê phía dưới cùng của banner:
   - `100K+` Testing Cycles
   - `50+` Toàn quốc (VI) / Countries (EN)
   - `8+` Awards Won

---

## 5. UI Specification

### Layout
- Chiều cao: `100vh` (toàn màn hình)
- Nội dung căn giữa theo chiều dọc và ngang
- `max-width: 860px` cho khối text

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Nền | `#0f0f0f` (đen gần như tuyệt đối) |
| Tiêu đề | `#ffffff` |
| Gradient text "That Works" | `var(--primary)` → cam đỏ `#E8614A` |
| Dòng phụ | `rgba(255,255,255,0.5)` |
| Chữ "space." | `var(--primary)`, font italic serif |
| Badge text | `var(--primary)` |
| Badge background | `rgba(232,97,74,0.15)` + border `rgba(232,97,74,0.30)` |

### Typography
| Yếu tố | Style |
|---|---|
| Badge | `0.65rem`, uppercase, letter-spacing `0.14em`, font-weight 600, có `.hero-badge-dot` nhấp nháy (`badgePulse` 2.2s) |
| Tiêu đề H1 | Class `.heading-xl` (đã định nghĩa trong globals.css) |
| Dòng phụ | `1.05rem`, color mờ |
| Chữ "space." | Font `Playfair Display` italic |
| Stat value | `Playfair Display`, bold, `2.2rem` |
| Stat label | `0.7rem`, uppercase, letter-spacing `0.1em`, mờ |

### Nền vũ trụ
- Màu nền: `#0f0f0f`
- Hiệu ứng 1: **Star rain** — 3 layer ngôi sao độc lập (`.hero-stars-a/b/c`), mỗi layer dùng `background-image: radial-gradient` + animate `background-position` từ `Y=0` → `Y=tile-size` tạo hiệu ứng mưa sao rơi liên tục (seamless loop)
- Hiệu ứng 2: Glow cam ở phía trên giữa — `rgba(232,97,74,0.14)` (via `.hero-bg::before`)
- Hiệu ứng 3: Grid mờ toàn màn hình — opacity `0.04` (via `.hero-bg::after`)
- Hiệu ứng 4: Vignette — `.hero-vignette` làm tối viền 4 góc tạo chiều sâu
- **Không dùng ảnh thật** — thuần CSS để đảm bảo tốc độ tải

#### Chi tiết 3 star layers (parallax depth)
| Layer | Class | Tile size | Tốc độ | Vai trò |
|---|---|---|---|---|
| A | `.hero-stars-a` | 360px | 18s linear | Sao sáng — xa |
| B | `.hero-stars-b` | 280px | 11s linear | Sao vừa — giữa |
| C | `.hero-stars-c` | 200px | 6s linear | Sao mờ — gần |

### Floating Locks
- Lock phải: ảnh `padlock-2.webp`, size `150×250px`, animation `floatA` (5s)
- Lock trái: ảnh `ChatGPT.png` *(placeholder tạm thời — sẽ thay bằng ảnh sản phẩm)*, size `150×250px`, animation `floatB` (6s)
- Vị trí: CSS class `.hero-lock-right` / `.hero-lock-left` (định nghĩa trong `globals.css`)
- Ẩn trên mobile (`≤768px`)

### Nút CTA
| Nút | Element | Class | aria-label | Navigate |
|---|---|---|---|---|
| Get a Demo | `<Link>` | `.btn-primary` | `"Đặt lịch demo SmartLock"` | `/contact?ref=hero-banner` |
| See Products | `<Link>` | `.btn-ghost-white` | `"Xem sản phẩm SmartLock"` | `/products?ref=hero-banner` |

- Dùng `<Link>` (Next.js) thay vì `<button>` để có đúng semantics điều hướng
- Nút "Get a Demo" có icon mũi tên SVG bên phải (`→`)
- Cả 2 nút có `text-decoration: none` trong CSS để tránh gạch chân mặc định của `<a>`

### Scroll Indicator
- Vị trí: bottom center, absolute
- Chữ `"SCROLL"` nhỏ + đường kẻ dọc mờ fade-out xuống dưới

---

## 6. Animations

| Class / Keyframe | Duration | Mô tả |
|---|---|---|
| `.anim-fadeup` / `fadeUp` | 0.7s | Fade + slide up khi mount |
| `.anim-float-a` / `floatA` | 5s infinite | Lock lớn lơ lửng lên xuống |
| `.anim-float-b` / `floatB` | 6s infinite | Lock nhỏ lơ lửng lệch pha |
| `.delay-1` → `.delay-5` | — | Stagger 0.08s/step cho từng phần tử |
| `starRainA` | 18s linear infinite | Layer sao xa rơi chậm |
| `starRainB` | 11s linear infinite | Layer sao giữa rơi vừa |
| `starRainC` | 6s linear infinite | Layer sao gần rơi nhanh |
| `badgePulse` | 2.2s ease-in-out infinite | Dot nhỏ trong badge nhấp nháy |

**Cơ chế star rain:** animate `background-position` từ `Y=0` → `Y=tile-size` với `linear infinite` → seamless loop vì background tự repeat. Ba layer tốc độ khác nhau tạo hiệu ứng parallax chiều sâu.

Animation fadeup kích hoạt sau 80ms (via `setTimeout` + React state `mounted`) để tránh flash khi hydrate.

---

## 7. Business Rules

- Hình nền phải tải nhanh (dưới 3 giây) — dùng CSS thuần, không ảnh nền nặng
- Chữ màu trắng/cam, nổi bật trên nền tối, tỉ lệ tương phản đạt WCAG AA
- Không dùng hiệu ứng phức tạp làm chậm trang (không dùng WebGL, canvas...)
- **CTA tracking:** Nút "Get a Demo" navigate `/contact?ref=hero-banner`, nút "See Products" navigate `/products?ref=hero-banner` để theo dõi nguồn lead

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Ảnh `padlock-2.webp` không tải được | Khu vực lock trống, nội dung text và CTA vẫn hiện đầy đủ |
| JavaScript bị tắt | Banner hiển thị đầy đủ (text, CTA), không có animation — chấp nhận được |
| Màn hình rất nhỏ (`<400px`) | Floating locks ẩn, text scale nhỏ hơn, CTA xếp dọc |
| Kết nối chậm | CSS load trước → nền tối hiện ngay, ảnh lock lazy-load sau |

---

## 9. Security Requirements

- Toàn bộ nội dung và ảnh dùng HTTPS
- Không chứa mã hoặc dữ liệu nhạy cảm trong banner
- Không dùng `dangerouslySetInnerHTML`

---

## 10. Acceptance Criteria

- [ ] Banner chiếm đúng 100vh khi load trang
- [ ] Hiển thị đúng badge `"Smart Access Technology"`
- [ ] Tiêu đề H1 hiển thị đúng: `"Smart Access / That Works / Every Time."`
- [ ] Dòng phụ hiển thị: `"Even in space."` — chữ "space." màu cam, italic
- [ ] 2 nút CTA hiển thị rõ ràng, đúng màu sắc
- [ ] Floating lock hiển thị 2 bên, có animation lơ lửng
- [ ] Thanh thống kê 3 items hiển thị ở cuối banner
- [ ] Scroll indicator hiển thị dưới cùng
- [ ] Responsive: floating locks ẩn trên mobile
- [ ] Animation fadeup chạy khi trang load (80ms delay)
- [ ] 3 layer sao chuyển động mưa rơi với tốc độ parallax khác nhau
- [ ] Badge dot nhấp nháy liên tục
- [ ] Nút CTA không có gạch chân (`text-decoration: none`)
- [ ] Nút "Get a Demo" có icon mũi tên SVG
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Dùng className, không dùng inline style
- [ ] Các nút có `aria-label`
- [ ] Dùng `<Link>` thay `<button>` cho CTA điều hướng

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Ghi chú |
|---|---|---|
| Padlock phải | `public/images/Products/padlock-2.webp` | Đã có |
| Padlock trái | `public/images/Products/ChatGPT.png` | Placeholder tạm — cần thay bằng ảnh sản phẩm |
| Font Playfair Display | Google Fonts | Load qua CSS |
