# FEAT-012: 4 khối giải pháp tích hợp

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/integrations/SolutionBlocks.tsx`, `app/components/integrations/SolutionBlock.tsx`
**Page file:** `app/(pages)/integrations/page.tsx`

---

> **Ghi chú quan trọng — Khác biệt với FEAT-003 (Trang chủ):**
> FEAT-003 (Integrations Showcase, Trang chủ) hiển thị 4 khối giải pháp với **toggle expand inline** (click `+` để mở rộng tại chỗ, giữ user ở trang chủ). FEAT-012 (Trang Integrations) là phiên bản **chi tiết hơn**: mỗi khối dẫn đến trang riêng `/integrations/[id]` thay vì toggle inline — phù hợp hơn với context của trang chuyên sâu này. Hai feature dùng cùng data source nhưng có hành vi click và layout khác nhau.

---

## 1. Business Goal

Phân cấp rõ ràng 4 giải pháp tích hợp của igloo theo quy mô và nhu cầu khách hàng (từ startup đến enterprise), giúp doanh nghiệp nhanh chóng nhận ra giải pháp phù hợp với họ và click vào xem chi tiết hoặc liên hệ demo.

---

## 2. Actors

- **Visitor doanh nghiệp nhỏ (startup)** — tìm giải pháp simple, plug-and-play
- **Developer/Kỹ sư tích hợp** — cần API/SDK documentation và developer tools
- **Potential B2B User trung bình** — muốn marketplace 40+ integrations sẵn có
- **Enterprise buyer** — cần giải pháp custom, dedicated support, 100+ access points

---

## 3. Preconditions

- Trang Integrations (`/integrations`) load thành công trên HTTPS
- Trang chi tiết từng giải pháp đã tồn tại: `/integrations/igloohome`, `/integrations/iglooaccess`, `/integrations/iglooconnect`, `/integrations/iglooworks`
- Section nằm bên dưới FEAT-011 (hero) trên trang Integrations

---

## 4. Main Flow

1. Người dùng cuộn xuống sau hero section, thấy khối 4 giải pháp
2. Hệ thống hiển thị tiêu đề section: `"Integration Solutions"`
3. Hiển thị 4 khối theo thứ tự cố định:
   - **igloohome** — Best for Starting out (dưới 30 phòng / 5–20 bất động sản)
   - **iglooaccess** — For API and SDK Integrations
   - **iglooconnect** — All-in-one Integration Marketplace (40+ partners)
   - **iglooworks** — For Enterprise (100+ access points, multi-user)
4. Mỗi khối hiển thị: hình minh họa dashboard/app, tên giải pháp, mô tả ngắn, nút expand (`+`)
5. Người dùng click nút `+` hoặc tên giải pháp → chuyển đến trang chi tiết `/integrations/[id]`

---

## 5. UI Specification

### Layout

- **Section container:** `width: 100%`, padding `80px 40px`, background `#ffffff`
- **Section header:** căn giữa, margin-bottom `56px`
- **Grid 4 khối:** 4 cột desktop (≥1280px), 2 cột tablet (768px–1279px), 1 cột mobile (≤767px)
  - Gap: `24px` desktop, `20px` tablet, `16px` mobile
  - Mỗi khối: max-width `280px` (desktop 4 col)

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#ffffff` |
| Nền khối | `#ffffff` |
| Khối border | `rgba(0,0,0,0.08)` |
| Khối hover shadow | `0 8px 24px rgba(0,0,0,0.12)` |
| Tiêu đề section H2 | `#0f0f0f` |
| Tên giải pháp | `#1a1a1a` |
| Mô tả | `rgba(0,0,0,0.6)` |
| Badge "Starter" | background `#4caf50`, text `#ffffff` |
| Badge "Developer" | background `#2196f3`, text `#ffffff` |
| Badge "Integration" | background `#9c27b0`, text `#ffffff` |
| Badge "Enterprise" | background `#E8614A`, text `#ffffff` |
| Nút expand border | `rgba(232,97,74,1)` = `#E8614A` |
| Nút expand icon | `#E8614A` |
| Nút expand hover bg | `#E8614A` |
| Nút expand hover icon | `#ffffff` |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề section H2 | `Playfair Display`, bold, `2.2rem`, line-height 1.3 |
| Tên giải pháp | font-weight `700`, `1.05rem`, letter-spacing `0.01em`, color `#1a1a1a` |
| Mô tả | `0.875rem`, line-height 1.6, color `rgba(0,0,0,0.6)`, max 3 dòng |
| Badge | `0.65rem`, uppercase, font-weight `600`, letter-spacing `0.08em` |

### Solution Block Component

```
Block:
  padding: 24px
  border-radius: 8px
  border: 1px solid rgba(0,0,0,0.08)
  background: #ffffff
  transition: all 300ms ease
  display: flex
  flex-direction: column

Block:hover
  box-shadow: 0 8px 24px rgba(0,0,0,0.12)
  transform: translateY(-4px)

Block image:
  width: 100%
  aspect-ratio: 16 / 9
  border-radius: 4px
  object-fit: cover
  margin-bottom: 16px

Block name:
  margin-bottom: 8px

Block description:
  margin-bottom: 12px
  flex: 1

Block badge:
  display: inline-block
  padding: 3px 8px
  border-radius: 4px
  margin-bottom: 16px

Block footer:
  display: flex
  align-items: center
  justify-content: space-between

Expand button (+):
  width: 40px
  height: 40px
  border-radius: 50%
  border: 1.5px solid #E8614A
  background: transparent
  color: #E8614A
  font-size: 1.2rem
  cursor: pointer
  transition: all 200ms ease

Expand button:hover
  background: #E8614A
  color: #ffffff
```

### 4 Giải pháp cụ thể

#### Khối 1: igloohome
- **Badge:** "Starter" (background `#4caf50`)
- **Mô tả:** `"Suited for startups or individuals with under 30 rooms or 5–20 properties. Complete access control right out of the box."`
- **Target URL:** `/integrations/igloohome`
- **Image:** Screenshot giao diện igloohome

#### Khối 2: iglooaccess
- **Badge:** "Developer" (background `#2196f3`)
- **Mô tả:** `"For API & SDK integrations. Build custom solutions with our robust developer tools and comprehensive documentation."`
- **Target URL:** `/integrations/iglooaccess`
- **Image:** Screenshot API dashboard / developer console

#### Khối 3: iglooconnect
- **Badge:** "Integration" (background `#9c27b0`)
- **Mô tả:** `"All-in-one integration marketplace with 40+ pre-built partners. Sync with PMS, booking, and access control systems instantly."`
- **Target URL:** `/integrations/iglooconnect`
- **Image:** Screenshot partner logos / workflow diagram

#### Khối 4: iglooworks
- **Badge:** "Enterprise" (background `#E8614A`)
- **Mô tả:** `"For enterprises with 100+ access points. Multi-user management, dedicated account manager, and custom deployment."`
- **Target URL:** `/integrations/iglooworks`
- **Image:** Screenshot enterprise dashboard / architecture diagram

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section header | `fadeUp` | Scroll into view | 0.7s |
| Khối 1–4 (stagger) | `fadeUp` | Scroll into view | 0.7s + delay 0.1s mỗi khối |
| Block hover | `translateY(-4px)` + shadow | Hover | 300ms ease |
| Expand button hover | `rotate(45deg)` (+ → ×) | Hover | 200ms ease |

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 7. Business Rules

- 4 khối luôn hiển thị đúng thứ tự: igloohome → iglooaccess → iglooconnect → iglooworks
- **Click behavior (Trang Integrations):** Click nút `+` hoặc tên → navigate đến `/integrations/[id]` (trang chi tiết riêng)
  - Khác FEAT-003 (Trang chủ): ở trang chủ dùng toggle expand inline; ở đây dùng navigate vì visitor đã ở trang Integrations và sẵn sàng đi sâu hơn
- Mỗi khối phải có badge phân loại để visitor nhận ra ngay loại khách hàng phù hợp
- Hình minh họa cần là ảnh giao diện thực tế (hoặc mockup chất lượng cao)
- **CTA tracking:** Link navigate kèm `?ref=integrations-solutions`
- Description max 150 ký tự để không vượt quá 3 dòng trong card

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Hình minh họa không tải được | Placeholder (background `#e9e9e9` + tên giải pháp) + nội dung text vẫn hiển thị |
| JavaScript tắt | 4 khối hiển thị tĩnh như cards, link vẫn điều hướng được |
| Trang `/integrations/[id]` chưa có | Nút expand disabled hoặc hiển thị "Coming soon" badge |
| Màn hình rất nhỏ (≤320px) | 1 cột, full width, padding `12px`, font nhỏ hơn một bậc |
| Mô tả bị truncate | Dùng CSS `line-clamp-3` — không cắt string bằng JS |

---

## 9. Security Requirements

- Hình ảnh serve từ HTTPS
- Không lộ API key hay credentials trong ảnh minh họa (team review ảnh trước khi đưa lên)
- Link điều hướng dùng `next/link` — validate URL format
- Không dùng `dangerouslySetInnerHTML`

---

## 10. Acceptance Criteria

- [ ] Section hiển thị tiêu đề `"Integration Solutions"` đúng font `Playfair Display`
- [ ] 4 khối hiển thị đúng thứ tự: igloohome, iglooaccess, iglooconnect, iglooworks
- [ ] Mỗi khối có: ảnh minh họa, tên giải pháp, mô tả, badge, nút expand
- [ ] Badge màu sắc đúng theo quy định (Starter=xanh lá, Developer=xanh dương, Integration=tím, Enterprise=cam)
- [ ] Click nút `+` → navigate đến `/integrations/[id]?ref=integrations-solutions`
- [ ] Block hover: shadow + translateY(-4px) đúng
- [ ] Expand button hover: rotate(45deg) + bg cam đúng
- [ ] Responsive: 4 col desktop, 2 col tablet, 1 col mobile
- [ ] Animation fadeUp + stagger khi scroll vào viewport
- [ ] Hình lỗi → placeholder hiển thị
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ Tailwind className)
- [ ] Accessibility: `role="article"` cho mỗi khối, button có `aria-label`

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| igloohome screenshot | `public/images/Integrations/igloohome.webp` | 560×315px (16:9) | Giao diện thực tế |
| iglooaccess screenshot | `public/images/Integrations/iglooaccess.webp` | 560×315px (16:9) | API dashboard |
| iglooconnect screenshot | `public/images/Integrations/iglooconnect.webp` | 560×315px (16:9) | Partner marketplace UI |
| iglooworks screenshot | `public/images/Integrations/iglooworks.webp` | 560×315px (16:9) | Enterprise dashboard |
| Placeholder image | `public/images/placeholder-solution.svg` | 64×64px | Fallback khi ảnh lỗi |

---

## 12. Data Structure

```typescript
type SolutionBadge = "Starter" | "Developer" | "Integration" | "Enterprise";

interface IntegrationSolution {
  id: string;                   // "igloohome" | "iglooaccess" | "iglooconnect" | "iglooworks"
  name: string;
  badge: SolutionBadge;
  description: string;          // max 150 ký tự
  imageUrl: string;
  imageAlt: string;
  slug: string;                 // dùng cho URL /integrations/[slug]
  order: number;                // 1–4, thứ tự cố định
}

const INTEGRATION_SOLUTIONS: IntegrationSolution[] = [
  {
    id: "igloohome",
    name: "igloohome",
    badge: "Starter",
    description: "Suited for startups or individuals with under 30 rooms or 5–20 properties. Complete access control right out of the box.",
    imageUrl: "/images/Integrations/igloohome.webp",
    imageAlt: "igloohome dashboard — Starter integration solution",
    slug: "igloohome",
    order: 1,
  },
  // ... các giải pháp còn lại
];
```

---

## 13. Implementation Notes

- Data hardcode trong `lib/constants/integrations.ts` — không fetch API cho trang tĩnh này
- Dùng `next/link` wrapping toàn bộ card (hoặc chỉ nút `+`) — tùy UX decision của team
- Nếu wrap toàn card bằng `<Link>`: đảm bảo `aria-label` đủ thông tin (`"Xem chi tiết giải pháp igloohome"`)
- Khác biệt với FEAT-003: đây là trang chuyên sâu (Integrations) — click ra trang riêng phù hợp hơn so với toggle inline ở trang chủ nơi user chỉ muốn xem qua
- Trang chi tiết `/integrations/[id]` là scope riêng — spec riêng cần được tạo
- Dùng `next/image` với `loading="lazy"`, set `width={560} height={315}` cho đúng aspect ratio
- Intersection Observer cho stagger animation — dùng `hooks/useInView.ts`
- `"use client"` chỉ cần nếu có hover state cần React; nếu chỉ dùng CSS hover thì Server Component là đủ
