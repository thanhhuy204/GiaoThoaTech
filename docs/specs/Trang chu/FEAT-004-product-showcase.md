# FEAT-004: Product Showcase

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/trangchu/Products.tsx`
**Page file:** `app/page.tsx`

---

## 1. Business Goal

Giới thiệu danh sách sản phẩm smart lock chính, nhấn mạnh giải thưởng và độ bền. Khuyến khích người dùng click vào trang chi tiết sản phẩm để tìm hiểu thêm.

---

## 2. Actors

- **Visitor đang tìm sản phẩm** — khách chưa quen với dòng sản phẩm igloo
- **Potential User** — cá nhân hoặc doanh nghiệp quan tâm smart lock
- **Admin/Product team** — quản lý danh sách sản phẩm nổi bật

---

## 3. Preconditions

- Website hoạt động bình thường (HTTPS)
- Trang chủ load thành công
- Trang chi tiết sản phẩm đã setup (route `/products/[id]`)
- Backend sẵn sàng API products (tùy chọn)

---

## 4. Main Flow

1. Người dùng kéo xuống trang chủ hoặc click nút "See Products" từ Hero
2. Hệ thống hiển thị khối Product Showcase
3. Hiển thị tiêu đề: `"Discover our award-winning smart lock lineup"`
4. Hiển thị lưới 5 sản phẩm nổi bật:
   - **Deadbolt Go** — Khóa cửa thông minh với vân tay
   - **Keybox 3** — Hộp khóa thông minh cho giao chìa
   - **Padlock 2** — Ổ khóa thông minh cấp quân sự
   - **Cellular Deadbolt** — Khóa cửa di động đầu tiên trên thế giới
   - **Padlock Lite** — Ổ khóa vân tay di động
5. Mỗi sản phẩm hiển thị trong card:
   - Hình ảnh sản phẩm
   - Tên sản phẩm
   - Mô tả ngắn (1-2 dòng)
   - Badge đạo giải (nếu có)
   - Nút "Learn More" hoặc click vào card
6. Click card → navigate tới `/products/[slug]` (trang chi tiết sản phẩm)

---

## 5. UI Specification

### Layout

- **Container:** width `100%`, padding `80px 40px`, background `#ffffff`
- **Section header:** `text-align: center`, margin-bottom `60px`
- **Grid layout:**
  - Desktop (≥1024px): 5 columns
  - Tablet (768px-1023px): 3 columns
  - Mobile (≤767px): 1 column
  - Gap: `24px`
  - Max-width per card: `220px`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền khối | `#ffffff` |
| Nền card | `#f9f9f9` |
| Card border | `rgba(0,0,0,0.05)` |
| Card hover shadow | `0 12px 28px rgba(0,0,0,0.15)` |
| Tiêu đề section | `#000000` |
| Tên sản phẩm | `#1a1a1a` |
| Mô tả text | `rgba(0,0,0,0.6)` |
| Badge gold | `#FFD700` |
| Badge text | `#000000` |
| Link "Learn More" | `var(--primary)` / `#E8614A` |
| Link hover | `#d44f39` |

### Typography

| Yếu tố | Style |
|---|---|
| Section header (H2) | `Playfair Display`, bold, `2.4rem`, line-height 1.2 |
| Product name | `1rem`, font-weight 700, letter-spacing `0.02em` |
| Product description | `0.85rem`, line-height 1.5, color mờ |
| Badge text | `0.7rem`, font-weight 600, uppercase, letter-spacing `0.08em` |
| Link text | `0.9rem`, font-weight 500, letter-spacing `0.03em` |

### Card Component

```
Card:
  padding: 20px
  border-radius: 8px
  background: #f9f9f9
  border: 1px solid rgba(0,0,0,0.05)
  cursor: pointer
  transition: all 300ms ease
  
Card:hover
  box-shadow: 0 12px 28px rgba(0,0,0,0.15)
  transform: translateY(-8px)
  
Card:active
  transform: translateY(-4px)

Image:
  width: 100%
  aspect-ratio: 4/3
  object-fit: cover
  border-radius: 4px
  margin-bottom: 16px
  background: #e9e9e9  // placeholder background

Title:
  margin-bottom: 8px
  
Description:
  margin-bottom: 12px

Badge:
  display: inline-block
  margin-bottom: 12px

Link:
  color: var(--primary)
  font-weight: 500
  transition: color 200ms
  
Link:hover
  color: #d44f39
  text-decoration: underline
```

### Product Data

```
[
  {
    id: 1,
    name: "Deadbolt Go",
    slug: "deadbolt-go",
    description: "Smart door lock with fingerprint recognition and secure access control.",
    image: "deadbolt-go.webp",
    award: "Best Innovation 2024",
    category: "Door Lock"
  },
  {
    id: 2,
    name: "Keybox 3",
    slug: "keybox-3",
    description: "Smart key storage box with 90+ keys capacity. Perfect for short-term rentals.",
    image: "keybox-3.webp",
    award: "Best Design 2024",
    category: "Key Storage"
  },
  {
    id: 3,
    name: "Padlock 2",
    slug: "padlock-2",
    description: "Military-grade smart padlock with advanced encryption and durability.",
    image: "padlock-2.webp",
    award: "Top Rated 2024",
    category: "Padlock"
  },
  {
    id: 4,
    name: "Cellular Deadbolt",
    slug: "cellular-deadbolt",
    description: "World's first mobile smart lock with built-in cellular connectivity.",
    image: "cellular-deadbolt.webp",
    award: "Innovation Award",
    category: "Door Lock"
  },
  {
    id: 5,
    name: "Padlock Lite",
    slug: "padlock-lite",
    description: "Lightweight portable smart padlock with fingerprint and PIN access.",
    image: "padlock-lite.webp",
    award: "Mobile Excellence",
    category: "Padlock"
  }
]
```

---

## 6. Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section header | `fadeup` | Mount | 0.7s |
| Product cards (stagger) | `fadeup` | Mount | 0.7s + delay-1..5 |
| Card on hover | `scale` + `lift` | Hover | 0.3s |
| Award badge | `glow` pulse (tùy chọn) | Render | 0.8s infinite |

**Keyframe definitions:**
```css
@keyframes fadeup {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes lift {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-8px);
  }
}

@keyframes glow {
  0%, 100% {
    filter: drop-shadow(0 0 0px rgba(255,215,0,0.5));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(255,215,0,0.8));
  }
}
```

---

## 7. Business Rules

- **Fixed 5 products:** Chỉ hiển thị đúng 5 sản phẩm nổi bật hiện tại
- **Product order:** Fixed từ trái sang phải như liệt kê ở section 4
- **Award badges:** Tùy chọn hiển thị, nếu có thì gold color
- **Images required:** Mỗi sản phẩm cần hình ảnh (nếu không → placeholder)
- **Description length:** Max 100 characters (tối đa 2 dòng)
- **Click behavior:** Click card / "Learn More" → navigate `/products/[slug]`
- **Performance:** Tất cả 5 hình ảnh tải nhanh (dưới 2.5 giây)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Hình sản phẩm không tải | Placeholder image (gray box) + tên vẫn rõ |
| Data product bị null/undefined | Ẩn card, hiển thị 4 card còn lại (hoặc error boundary) |
| Description quá dài | Truncate + `...` ellipsis, tooltip khi hover |
| Award badge bị null | Không hiển thị badge, card vẫn normal |
| JavaScript bị tắt | Cards tĩnh, vẫn clickable như `<a href>` |
| Mobile view (<768px) | Stack thành 1 cột, full width |
| Very slow connection | Skeleton cards + lazy-load images |

---

## 9. Security Requirements

- **HTTPS:** Tất cả product images, links dùng HTTPS
- **URL sanitization:** Links `/products/[slug]` validate trước navigate
- **Image URLs:** Validate backend trước serving
- **No sensitive data:** Không hiển thị internal IDs, pricing, hoặc inventory
- **Link injection:** Use `next/link` để prevent XSS

---

## 10. Acceptance Criteria

- [ ] Section header `"Discover our award-winning smart lock lineup"` hiển thị rõ
- [ ] 5 product cards hiển thị đúng tên, mô tả, hình ảnh
- [ ] Mỗi card có alt text đầy đủ cho hình ảnh
- [ ] Award badges hiển thị (nếu có) với màu gold
- [ ] Nút "Learn More" hoặc card clickable → navigate `/products/[slug]`
- [ ] Card hover: shadow + transform effect
- [ ] Grid responsive: 5 col desktop, 3 col tablet, 1 col mobile
- [ ] Animation: fadeup + stagger khi mount
- [ ] Images lazy-load, performance LCP < 2.5s
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ className)
- [ ] Accessibility: cards `role="article"`, links `aria-label`
- [ ] Mobile: full width, touch-friendly (min 48px tap target)

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Deadbolt Go | `public/images/Products/deadbolt-go.webp` | 240x180px | 4:3 ratio |
| Keybox 3 | `public/images/Products/keybox-3.webp` | 240x180px | 4:3 ratio |
| Padlock 2 | `public/images/Products/padlock-2.webp` | 240x180px | 4:3 ratio |
| Cellular Deadbolt | `public/images/Products/cellular-deadbolt.webp` | 240x180px | 4:3 ratio |
| Padlock Lite | `public/images/Products/padlock-lite.webp` | 240x180px | 4:3 ratio |
| Placeholder image | `public/images/placeholder.svg` | 240x180px | Fallback |

---

## 12. Data Structure

```typescript
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  award?: string;  // Optional award name
  order: number;   // 1-5 for fixed order
}
```

---

## 13. Implementation Notes

- Hardcode 5 products hoặc fetch từ API (with ISR caching)
- Use `Image` from `next/image` với `sizes` props responsive
- Link: dùng `next/link` hoặc `useRouter().push()`
- Hover state: dùng CSS class hoặc Tailwind `group-hover`
- Mobile: ensure tap target >= 48x48px
