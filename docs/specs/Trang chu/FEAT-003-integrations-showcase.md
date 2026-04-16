# FEAT-003: Integrations Showcase

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/trangchu/Solutions.tsx`
**Page file:** `app/page.tsx`
> ⚠️ **Lưu ý:** File hiện tại (`Solutions.tsx`) đang hiển thị property types (Short Term Rental, Multi-Family...). Cần refactor nội dung để hiển thị đúng 4 giải pháp igloohome / iglooaccess / iglooconnect / iglooworks theo spec.

---

## 1. Business Goal

Giới thiệu bộ giải pháp phần mềm dễ tích hợp với phần cứng igloo, phân cấp theo quy mô khách hàng. Khuyến khích doanh nghiệp liên hệ để được demo và tư vấn chi tiết.

---

## 2. Actors

- **Visitor doanh nghiệp** — chủ bất động sản, tích hợp hệ thống, công ty lớn
- **Potential B2B User** — khách muốn biết giải pháp phù hợp quy mô
- **Admin/Sales** — quản lý và promotion các solution

---

## 3. Preconditions

- Website hoạt động bình thường (HTTPS)
- Trang chủ load thành công
- Backend sẵn sàng để fetch integration data (tùy chọn)

---

## 4. Main Flow

1. Người dùng kéo xuống, thấy khối Integrations Showcase
2. Hệ thống hiển thị dòng giới thiệu: `"Software solutions built to integrate seamlessly with igloo hardware"`
3. Hiển thị 4 integration cards theo thứ tự cố định (left to right):
   - **igloohome** — Starter solution
   - **iglooaccess** — API & SDK integration
   - **iglooconnect** — Enterprise partners
   - **iglooworks** — Enterprise large scale
4. Mỗi card hiển thị:
   - Hình minh họa (screenshot hoặc mockup giao diện)
   - Tên solution
   - Mô tả ngắn (1-2 dòng)
   - Badge/tag (tùy chọn: "Starter", "Developer", "Enterprise")
   - Nút expand (+) hoặc "Learn More"
5. Khi click card / nút expand:
   - Hiển thị thêm chi tiết giải pháp
   - Hoặc chuyển đến trang chi tiết `/integrations/[id]`

---

## 5. UI Specification

### Layout

- **Container:** width `100%`, padding `80px 40px`, background gradient hoặc solid `#f9f9f9`
- **Section header:** `text-align: center`, margin-bottom `60px`
- **Grid cards:** 4 columns desktop, 2 columns tablet, 1 column mobile
  - Gap: `24px`
  - Max-width per card: `280px`
- **Responsive spacing:**
  - Desktop (≥1024px): 4 col
  - Tablet (768px-1023px): 2 col
  - Mobile (≤767px): 1 col

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền khối | `#f9f9f9` hoặc gradient `#0f0f0f → #1a1a1a` |
| Nền card | `#ffffff` |
| Card border | `rgba(0,0,0,0.08)` |
| Card hover shadow | `0 8px 24px rgba(0,0,0,0.12)` |
| Tiêu đề section | `#000000` |
| Tên solution | `#1a1a1a` |
| Mô tả text | `rgba(0,0,0,0.6)` |
| Badge background | `var(--primary)` / `#E8614A` |
| Badge text | `#ffffff` |
| Expand button | `var(--primary)` |
| Expand button hover | `#d44f39` |

### Typography

| Yếu tố | Style |
|---|---|
| Section header | `Playfair Display`, bold, `2.2rem`, line-height 1.3 |
| Solution name | `1.1rem`, font-weight 700, letter-spacing `0.02em` |
| Card description | `0.9rem`, line-height 1.6, color mờ |
| Badge text | `0.7rem`, uppercase, font-weight 600, letter-spacing `0.08em` |
| Section intro | `1rem`, line-height 1.6, color mờ (dòng giới thiệu trên) |

### Card Component

```
Card:
  padding: 24px
  border-radius: 8px
  border: 1px solid rgba(0,0,0,0.08)
  background: #ffffff
  transition: all 300ms ease
  
Card:hover
  box-shadow: 0 8px 24px rgba(0,0,0,0.12)
  transform: translateY(-4px)

Card content:
  image: aspect-ratio 16/9, border-radius 4px, margin-bottom 16px
  name: margin-bottom 8px
  description: margin-bottom 12px
  badge: display inline-block, margin-bottom 16px
  button-expand: float right or full-width
```

### Expand Button

```
Button:
  width: 40px height: 40px
  border-radius: 50%
  border: 1px solid var(--primary)
  background: transparent
  color: var(--primary)
  font-size: 1.2rem
  cursor: pointer
  transition: all 200ms ease
  
Button:hover
  background: var(--primary)
  color: #ffffff
```

### Integration Card Solutions

#### Card 1: igloohome
- **Badge:** "Starter"
- **Description:** "Suited for startups or individuals with under 30 rooms or 5-20 properties. Complete access control right out of the box."
- **Image:** Screenshot giao diện igloohome (clean, minimal)

#### Card 2: iglooaccess
- **Badge:** "Developer"
- **Description:** "For API & SDK integrations. Build custom integrations with our robust developer tools and documentation."
- **Image:** Screenshot API dashboard hoặc code editor

#### Card 3: iglooconnect
- **Badge:** "Integration"
- **Description:** "Ecosystem of 40+ pre-built integrations. Sync with property management, booking, and access control systems."
- **Image:** Screenshot partner logos hoặc workflow diagram

#### Card 4: iglooworks
- **Badge:** "Enterprise"
- **Description:** "For enterprises with 100+ access points. Dedicated support, custom solutions, and managed deployment."
- **Image:** Screenshot enterprise dashboard hoặc architecture

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section intro | `fadeup` | Mount | 0.7s |
| Cards (stagger) | `fadeup` | Mount | 0.7s + delay-1..4 |
| Card expand button | `spin` | Hover | 0.3s |
| Card badge | `pulse` | Hover (tùy chọn) | 0.6s infinite |
| Expand/collapse content | `slidedown/slideup` | Click | 0.4s |

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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes slidedown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 400px;
  }
}
```

---

## 7. Business Rules

- **Card order:** Luôn fixed từ trái sang phải: igloohome, iglooaccess, iglooconnect, iglooworks
- **Badge required:** Mỗi card phải có badge/label để phân loại
- **Image required:** Mỗi card cần hình minh họa (nếu không có → placeholder)
- **Description length:** Max 150 characters để không wrap quá 3 dòng
- **Click behavior:** **Option A — Toggle expand content inline** (đã chốt)
  - Click nút `+` trên card → hiển thị expanded content ngay bên dưới card (slidedown animation)
  - Click lại → collapse (slideup animation)
  - Không navigate ra trang khác — giữ user ở trang chủ
- **Performance:** Cards load nhanh (dưới 2 giây cho tất cả images)
- **Mobile first:** Ensure responsive từ 320px trở lên

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Hình card không tải được | Hiển thị placeholder (solid color + icon) + tên vẫn visible |
| Một card data bị null | Ẩn card hoặc hiển thị default data |
| Expand content quá dài | Scroll trong card modal hoặc limit height + scroll |
| JavaScript bị tắt | Cards hiển thị tĩnh (không expand/collapse), vẫn clickable như link |
| Mobile view (<768px) | Stack thành 1 cột, full width + padding |
| Màn hình rất nhỏ (<400px) | Font smaller, padding tighter |

---

## 9. Security Requirements

- **HTTPS:** Tất cả image URLs và link dùng HTTPS
- **Image validation:** Backend validate image URLs trước serve
- **No sensitive data:** Không hiển thị API key, secret keys, hoặc thông tin nội bộ
- **Link sanitization:** Click links dùng `next/link` hoặc validate URLs
- **No XSS:** Description text sanitized, không dùng `dangerouslySetInnerHTML`

---

## 10. Acceptance Criteria

- [ ] Section hiển thị tiêu đề `"Software solutions built to integrate seamlessly with igloo hardware"`
- [ ] 4 card hiển thị đúng tên: igloohome, iglooaccess, iglooconnect, iglooworks
- [ ] Mỗi card có hình minh họa, mô tả, badge (Starter/Developer/Integration/Enterprise)
- [ ] Mỗi card có nút expand (+) hoặc đó là link
- [ ] Card hover: transform + shadow effect
- [ ] Expand button rotate khi hover
- [ ] Click card / button → expand content hoặc navigate (tuỳ implementation)
- [ ] Cards responsive: 4 col desktop, 2 col tablet, 1 col mobile
- [ ] Animation: fadeup + stagger khi mount
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ className)
- [ ] Accessibility: cards có `role="article"`, descriptions trong `<p>`, buttons `aria-label`
- [ ] Images có `alt` text đầy đủ
- [ ] Performance: LCP < 2.5s, images lazy-load

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| igloohome screenshot | `public/images/Integrations/igloohome.webp` | 280x157px | 16:9 aspect ratio |
| iglooaccess screenshot | `public/images/Integrations/iglooaccess.webp` | 280x157px | 16:9 aspect ratio |
| iglooconnect screenshot | `public/images/Integrations/iglooconnect.webp` | 280x157px | 16:9 aspect ratio |
| iglooworks screenshot | `public/images/Integrations/iglooworks.webp` | 280x157px | 16:9 aspect ratio |
| Placeholder icon | `public/images/placeholder.svg` | 64x64px | Fallback image |

---

## 12. Data Structure

```typescript
interface Integration {
  id: string;
  name: string;
  badge: "Starter" | "Developer" | "Integration" | "Enterprise";
  description: string;
  imageUrl: string;
  linkUrl?: string;  // Navigate to /integrations/[id] or external
  expandContent?: string;  // Optional detailed content
  order: number;  // 1-4 for fixed ordering
}
```

---

## 13. Implementation Notes

- Option A: Cards dùng server-side rendering với hardcoded data
- Option B: Cards fetch từ API → cached (ISR)
- Use `Image` component từ `next/image` cho lazy-load
- Alt text: sử dụng `name + badge` làm alt (e.g., "igloohome Starter solution")
- Loading state: skeleton cards khi fetching (jika pakai API)
- Error handling: show placeholder + error boundary
