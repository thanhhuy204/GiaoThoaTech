# FEAT-008: Logo "As featured on"

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Cần có trước khi launch
**File implement:** `app/components/overview/MediaLogos.tsx`
**Page file:** `app/(pages)/overview/page.tsx`

---

## 1. Business Goal

Chứng minh uy tín thương hiệu igloo qua danh sách báo chí lớn đã đưa tin, nhằm tăng độ tin cậy cho khách hàng doanh nghiệp khi đang xem tổng quan giải pháp. Social proof trực quan giúp rút ngắn chu kỳ ra quyết định của B2B buyer.

---

## 2. Actors

- **Visitor quan tâm uy tín thương hiệu** — B2B buyer đang tìm hiểu igloo lần đầu
- **Potential B2B User** — đối tác muốn xác nhận tính đáng tin cậy của igloo

---

## 3. Preconditions

- Trang Overview (`/overview`) load thành công trên HTTPS
- Asset logo của các tổ chức báo chí đã được chuẩn bị (định dạng `.svg` hoặc `.webp`)

---

## 4. Main Flow

1. Người dùng cuộn đến phần media logos trên trang Overview
2. Hệ thống hiển thị tiêu đề nhỏ: `"As featured on"` (kiểu label, không phải heading lớn)
3. Hiển thị dải logo báo chí theo thứ tự cố định:
   - Digital Trends
   - TechCrunch
   - The Wall Street Journal
   - HuffPost
   - GQ
   - Forbes
   - PC Magazine (hoặc PC Mag)
4. Logo hiển thị dạng dải ngang, grayscale (mặc định), chuyển màu gốc khi hover
5. Không có link điều hướng trên logo (logo thuần hiển thị, không clickable theo mặc định)

---

## 5. UI Specification

### Layout

- **Section container:** `width: 100%`, padding `48px 40px`, background `#f9f9f9`
- **Tiêu đề "As featured on":** căn giữa, margin-bottom `32px`
- **Logo strip:** `display: flex`, `flex-wrap: wrap`, `justify-content: center`, `align-items: center`, gap `40px` desktop, `24px` mobile
- **Không có scrolling marquee** — logo hiển thị tĩnh trong một hoặc hai hàng
- Responsive:
  - Desktop (≥1024px): tất cả logo 1 hàng ngang
  - Tablet (768px–1023px): 2 hàng nếu không đủ chỗ, wrap tự nhiên
  - Mobile (≤767px): wrap tự nhiên, căn giữa

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#f9f9f9` |
| Label "As featured on" | `rgba(0,0,0,0.45)` |
| Logo (mặc định) | grayscale filter `100%`, opacity `0.55` |
| Logo (hover) | grayscale filter `0%`, opacity `1.0` |
| Đường phân cách trên/dưới section (tùy chọn) | `rgba(0,0,0,0.08)` |

### Typography

| Yếu tố | Style |
|---|---|
| Label "As featured on" | `0.7rem`, uppercase, letter-spacing `0.16em`, font-weight `600`, color `rgba(0,0,0,0.45)` |

### Logo Component

```
Logo item:
  display: inline-flex
  align-items: center
  justify-content: center
  filter: grayscale(100%)
  opacity: 0.55
  transition: all 300ms ease

Logo item:hover
  filter: grayscale(0%)
  opacity: 1.0

Logo image:
  height: 28px     (desktop)
  height: 22px     (mobile ≤767px)
  width: auto      (maintain aspect ratio)
  object-fit: contain
```

### Danh sách logo cụ thể

| # | Tên báo | File | Alt text |
|---|---|---|---|
| 1 | Digital Trends | `digital-trends.svg` | `"Featured on Digital Trends"` |
| 2 | TechCrunch | `techcrunch.svg` | `"Featured on TechCrunch"` |
| 3 | The Wall Street Journal | `wsj.svg` | `"Featured on The Wall Street Journal"` |
| 4 | HuffPost | `huffpost.svg` | `"Featured on HuffPost"` |
| 5 | GQ | `gq.svg` | `"Featured on GQ"` |
| 6 | Forbes | `forbes.svg` | `"Featured on Forbes"` |
| 7 | PC Magazine | `pc-magazine.svg` | `"Featured on PC Magazine"` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section (toàn bộ) | `fadeUp` | Scroll into view | 0.6s ease |
| Logo items (stagger) | `fadeIn` | Scroll into view | 0.4s + delay 0.05s mỗi logo |
| Logo hover | `grayscale(0%) + opacity 1.0` | Hover | 300ms ease |

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

---

## 7. Business Rules

- Logo hiển thị theo thứ tự cố định đã liệt kê — không random, không sort
- Mỗi logo phải có `alt` text theo định dạng `"Featured on [Tên báo]"`
- Logo mặc định grayscale để giữ giao diện trung tính; màu gốc chỉ xuất hiện khi hover
- Kích thước logo: chiều cao cố định `28px`, chiều rộng tự co giãn — đảm bảo đồng đều về visual weight
- Không thêm link ngoài vào logo trừ khi có yêu cầu riêng từ brand partnership
- Logo dùng định dạng `.svg` (ưu tiên) hoặc `.webp` — không dùng `.png` nặng

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Một logo không tải được | Ẩn logo đó (dùng `onError` để xóa khỏi DOM), các logo khác vẫn hiển thị bình thường |
| JavaScript bị tắt | Danh sách logo hiển thị tĩnh với grayscale mặc định, không có hover effect — chấp nhận được |
| Màn hình rất hẹp (≤360px) | Logo co nhỏ xuống `height: 18px`, gap giảm xuống `16px`, wrap tự nhiên |
| Tất cả logo fail | Section ẩn hoàn toàn (render null nếu không có logo nào valid) |

---

## 9. Security Requirements

- Hình ảnh logo serve từ HTTPS (`/images/MediaLogos/...` hoặc CDN HTTPS)
- Không sử dụng logo từ URL ngoài nếu không qua proxy/CDN kiểm soát
- Không dùng `dangerouslySetInnerHTML`

---

## 10. Acceptance Criteria

- [ ] Section hiển thị label `"As featured on"` với đúng style (nhỏ, uppercase, mờ)
- [ ] 7 logo hiển thị đúng thứ tự: Digital Trends, TechCrunch, WSJ, HuffPost, GQ, Forbes, PC Magazine
- [ ] Logo grayscale mặc định (opacity 0.55), chuyển màu khi hover
- [ ] Mỗi logo có `alt` text đúng định dạng `"Featured on [Tên]"`
- [ ] Responsive: 1 hàng desktop, wrap tự nhiên tablet/mobile
- [ ] Logo lỗi được ẩn, không hiện broken image icon
- [ ] Animation fadeIn + stagger khi scroll vào viewport
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ Tailwind className)
- [ ] Accessibility: `role="list"` cho dải logo, `role="listitem"` cho từng logo

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Digital Trends logo | `public/images/MediaLogos/digital-trends.svg` | vector | Monochrome SVG |
| TechCrunch logo | `public/images/MediaLogos/techcrunch.svg` | vector | Monochrome SVG |
| Wall Street Journal logo | `public/images/MediaLogos/wsj.svg` | vector | Monochrome SVG |
| HuffPost logo | `public/images/MediaLogos/huffpost.svg` | vector | Monochrome SVG |
| GQ logo | `public/images/MediaLogos/gq.svg` | vector | Monochrome SVG |
| Forbes logo | `public/images/MediaLogos/forbes.svg` | vector | Monochrome SVG |
| PC Magazine logo | `public/images/MediaLogos/pc-magazine.svg` | vector | Monochrome SVG |

---

## 12. Data Structure

```typescript
interface MediaLogo {
  id: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
}

const MEDIA_LOGOS: MediaLogo[] = [
  { id: "digital-trends", name: "Digital Trends", imageUrl: "/images/MediaLogos/digital-trends.svg", imageAlt: "Featured on Digital Trends", order: 1 },
  { id: "techcrunch",     name: "TechCrunch",     imageUrl: "/images/MediaLogos/techcrunch.svg",     imageAlt: "Featured on TechCrunch",     order: 2 },
  { id: "wsj",            name: "The Wall Street Journal", imageUrl: "/images/MediaLogos/wsj.svg",   imageAlt: "Featured on The Wall Street Journal", order: 3 },
  { id: "huffpost",       name: "HuffPost",        imageUrl: "/images/MediaLogos/huffpost.svg",       imageAlt: "Featured on HuffPost",        order: 4 },
  { id: "gq",             name: "GQ",              imageUrl: "/images/MediaLogos/gq.svg",             imageAlt: "Featured on GQ",              order: 5 },
  { id: "forbes",         name: "Forbes",          imageUrl: "/images/MediaLogos/forbes.svg",         imageAlt: "Featured on Forbes",          order: 6 },
  { id: "pc-magazine",    name: "PC Magazine",     imageUrl: "/images/MediaLogos/pc-magazine.svg",    imageAlt: "Featured on PC Magazine",     order: 7 },
];
```

---

## 13. Implementation Notes

- Component là Server Component (không cần `"use client"`) — data hardcode, không có state
- Dùng `next/image` với `loading="lazy"` cho logo; set `unoptimized={true}` cho SVG để tránh lỗi optimization
- Implement `onError` handler để ẩn logo fail: thêm class `hidden` qua React state nếu cần `"use client"`, hoặc dùng CSS `img:not([src]) { display: none }`
- Hover effect chỉ dùng Tailwind transition classes: `grayscale hover:grayscale-0 opacity-55 hover:opacity-100 transition-all duration-300`
- Section ẩn hoàn toàn nếu `MEDIA_LOGOS.length === 0`
- Không cần `aria-live` hoặc state phức tạp — đây là component trình bày thuần túy
