# FEAT-006: Success Stories Teaser

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/trangchu/Testimonials.tsx`
**Page file:** `app/page.tsx`
> ⚠️ **Lưu ý:** File hiện tại (`Testimonials.tsx`) đang dùng testimonials giả (Sarah Chen, Marcus Johnson). Cần thay bằng dữ liệu thực từ khách hàng igloo (Loftaffair, Kayakomat, Hornbach...).

---

## 1. Business Goal

Chứng minh giá trị thực tế qua câu chuyện khách hàng thành công, xây dựng lòng tin bằng trích dẫn cụ thể. Khuyến khích người xem đọc thêm hoặc liên hệ.

---

## 2. Actors

- **Visitor đang cân nhắc sử dụng** — khách tìm validation/proof
- **Potential User doanh nghiệp** — nhu cầu case study, ngành khách sạn, nhà ở cho thuê
- **Sales team** — referral từ case studies
- **Admin/Content team** — quản lý danh sách case studies

---

## 3. Preconditions

- Website hoạt động bình thường (HTTPS)
- Trang chủ load thành công
- Trang Case Studies (`/case-studies`) đã setup
- Dữ liệu case studies sẵn sàng (hardcoded hoặc API)

---

## 4. Main Flow

1. Người dùng kéo xuống trang chủ
2. Hệ thống hiển thị khối Success Stories Teaser
3. Hiển thị tiêu đề: `"See how we helped customers scale their assets and real estate"`
4. Hiển thị carousel/grid với 5-6 testimonial cards:
   - Logo khách hàng
   - Tên khách hàng (e.g., "Loftaffair", "Kayakomat")
   - Trích dẫn ngắn (1-2 câu)
   - Tag ngành (e.g., "Hospitality", "Real Estate")
   - Sản phẩm sử dụng (e.g., "Keybox 3, Padlock 2E")
5. Carousel có navigation (prev/next arrows hoặc dots)
6. Nút "Read all success stories" ở cuối → navigate `/case-studies`

---

## 5. UI Specification

### Layout

- **Container:** width `100%`, padding `80px 40px`, background `#ffffff`
- **Section header:** text-align center, margin-bottom `60px`
- **Carousel/Grid:**
  - Desktop: 3 cards visible (carousel scroll)
  - Tablet: 2 cards visible
  - Mobile: 1 card visible
  - Gap: `24px`
  - Card max-width: `340px`
- **Navigation:** prev/next buttons hoặc dots indicator
- **Button section:** text-align center, margin-top `60px`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền khối | `#ffffff` |
| Nền card | `#f9f9f9` |
| Card border | `rgba(0,0,0,0.08)` |
| Card shadow hover | `0 8px 24px rgba(0,0,0,0.12)` |
| Tiêu đề section | `#000000` |
| Tên khách hàng | `#1a1a1a` |
| Trích dẫn text | `rgba(0,0,0,0.75)` |
| Tag ngành bg | `rgba(232,97,74,0.15)` |
| Tag ngành text | `var(--primary)` / `#E8614A` |
| Product tag bg | `rgba(0,0,0,0.05)` |
| Product tag text | `rgba(0,0,0,0.7)` |
| Navigation arrow | `rgba(0,0,0,0.4)` |
| Navigation arrow hover | `var(--primary)` |
| Button "Read all" | `var(--primary)` |

### Typography

| Yếu tố | Style |
|---|---|
| Section header (H2) | `Playfair Display`, bold, `2.4rem`, line-height 1.2 |
| Customer name | `1.05rem`, font-weight 700, letter-spacing `0.02em` |
| Testimonial text | `1rem`, line-height 1.8, italic, color mờ |
| Tag (industry) | `0.75rem`, uppercase, font-weight 600, letter-spacing `0.08em` |
| Tag (product) | `0.75rem`, font-weight 500, letter-spacing `0.02em` |
| Button text | `0.95rem`, font-weight 600, letter-spacing `0.05em` |

### Card Component

```
Card:
  padding: 28px
  border-radius: 8px
  background: #f9f9f9
  border: 1px solid rgba(0,0,0,0.08)
  transition: all 300ms ease
  
Card:hover
  box-shadow: 0 8px 24px rgba(0,0,0,0.12)
  transform: translateY(-4px)

LogoSection:
  height: 60px
  margin-bottom: 20px
  display: flex
  align-items: center
  
Logo:
  max-height: 60px
  object-fit: contain

Name:
  margin-bottom: 16px

Testimonial:
  margin-bottom: 20px
  font-style: italic

Tags:
  display: flex
  gap: 8px
  flex-wrap: wrap
  
Tag:
  padding: 6px 12px
  border-radius: 12px
  font-size: 0.75rem
  font-weight: 600
  letter-spacing: 0.08em
  uppercase
```

### Navigation Controls

```
Carousel Navigation:
  - Option A: Prev/Next arrow buttons
    * Position: absolute left/right, centered vertically
    * Size: 40x40px, circular
    * Icon: chevron-left / chevron-right (24px)
    * Hover: background var(--primary), color white
    
  - Option B: Dots indicator
    * Position: below carousel
    * Each dot: 12px circle, 8px gap
    * Active dot: var(--primary)
    * Inactive dot: rgba(0,0,0,0.2)
    * Clickable: navigate to slide
```

### Button "Read All Success Stories"

```
Button:
  padding: 14px 40px
  border-radius: 4px
  background: var(--primary)
  color: #ffffff
  font-weight: 600
  letter-spacing: 0.05em
  border: none
  cursor: pointer
  transition: all 200ms ease
  
:hover
  background: #d44f39
  
:active
  transform: scale(0.98)
```

---

## 6. Success Stories Data Sample

```typescript
interface SuccessStory {
  id: string;
  customerName: string;
  logo: string;
  testimonial: string;
  industry: string;  // "Hospitality", "Real Estate", etc.
  products: string[];  // ["Keybox 3", "Padlock 2E"]
  caseStudyUrl?: string;  // Link to /case-studies/[id]
  order: number;  // 1-6
}

// Example data:
[
  {
    id: "loftaffair",
    customerName: "Loftaffair",
    logo: "/images/logos/loftaffair.svg",
    testimonial: "igloo's smart locks reduced guest check-in time by 40% and eliminated lost keys. Our operations team now has complete control and audit trails.",
    industry: "Hospitality",
    products: ["Keybox 3", "Padlock 2E"],
    caseStudyUrl: "/case-studies/loftaffair",
    order: 1
  },
  {
    id: "kayakomat",
    customerName: "Kayakomat",
    logo: "/images/logos/kayakomat.svg",
    testimonial: "With igloo's Padlock 2, we scaled from 5 to 50+ bike sharing stations without any security concerns. The reliability is unmatched.",
    industry: "Mobility",
    products: ["Padlock 2", "Cellular Deadbolt"],
    caseStudyUrl: "/case-studies/kayakomat",
    order: 2
  },
  // ... more stories
]
```

---

## 7. Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section header | `fadeup` | Mount | 0.7s |
| Cards (stagger) | `fadeup` | Mount | 0.7s + delay-1..6 |
| Card on hover | `lift` | Hover | 0.3s |
| Carousel slide transition | `slideLeft/slideRight` | Navigation | 0.5s |
| Navigation buttons | `pulse` on hover | Hover | 0.3s |
| Button "Read all" | `fadeup` | Mount | 0.7s + delay-x |

**Keyframes:**
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

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes lift {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-4px);
  }
}
```

---

## 8. Business Rules

- **Testimonial authenticity:** Trích dẫn phải từ khách hàng thực, không fabricated
- **Industry & products:** Tag phải chính xác, phản ánh case study thực tế
- **Carousel:** Hiển thị 5-6 stories, tùy chọn autoplay (3-5s per slide)
- **Navigation:** Cho phép prev/next hoặc một trong hai
- **Mobile:** 1 story/slide, swipeable hoặc next/prev buttons
- **Performance:** Logo load fast (compressed SVG hoặc small PNG)
- **Relevance:** Stories nên diverse (multiple industries, multiple products)

---

## 9. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Logo không tải được | Placeholder (company name text + icon) |
| Story data bị null | Skip card (hiển thị 4-5 còn lại) hoặc fallback data |
| Testimonial quá dài | Truncate + ellipsis + tooltip khi hover |
| Carousel autoplay + user paused | Respect pause, resume khi user không interact |
| Mobile swipe + arrows | Swipe hoặc arrows beide work, không conflict |
| JavaScript bị tắt | Static view (1-3 stories), no carousel animation |
| Very fast connection | Cards hiển thị immediately |
| Very slow connection | Skeleton loading → real content |

---

## 10. Security Requirements

- **HTTPS:** Tất cả testimonials, logos, links dùng HTTPS
- **Content moderation:** Admin verify trích dẫn trước publish
- **Logo validation:** Server-side check image URLs
- **Link injection:** Case study URLs validate, sử dụng `next/link`
- **No personal data:** Không hiển thị emails, phone numbers trong testimonials
- **GDPR:** Có permission từ customers trước sử dụng branding/testimonials

---

## 11. Accessibility Requirements

- **Semantic HTML:** `<section>`, `<h2>`, `<article>`, `<p>`, `<a>`
- **Alt text:** Logo images có `alt` attribute (công ty name)
- **ARIA labels:** 
  - Navigation buttons: `aria-label="Previous story"`, `aria-label="Next story"`
  - Dots: `aria-label="Go to story 1"`, etc.
  - Carousel: `role="region"`, `aria-label="Customer success stories"`
- **Keyboard navigation:** Arrow keys (prev/next) + dot selection
- **Focus management:** Focus indicator visible `:focus-visible`
- **Color contrast:** WCAG AA (4.5:1 for text)

---

## 12. Acceptance Criteria

- [ ] Section header `"See how we helped customers scale..."` hiển thị rõ
- [ ] 5-6 success story cards hiển thị đúng (name, logo, testimonial, tags)
- [ ] Mỗi card có logo khách hàng (alt text)
- [ ] Industry tags & product tags hiển thị rõ, color khác biệt
- [ ] Carousel navigate: prev/next hoặc dots, smooth transition
- [ ] Mobile: 1 card/slide, swipeable hoặc buttons
- [ ] Card hover: shadow + transform effect
- [ ] Nút "Read all success stories" hiển thị, click → `/case-studies`
- [ ] Animation: fadeup + stagger khi mount, slide transition smooth
- [ ] Responsive: 3 col desktop, 2 col tablet, 1 col mobile
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ className)
- [ ] Keyboard navigation: arrow keys + tab focus
- [ ] ARIA labels cho navigation
- [ ] Color contrast WCAG AA
- [ ] Performance: LCP < 2.5s, images lazy-load

---

## 13. Component Props (TypeScript)

```typescript
interface StoriesCarouselProps {
  stories: SuccessStory[];
  itemsPerSlide?: number;  // Default: 3 desktop, 2 tablet, 1 mobile
  autoplay?: boolean;  // Default: true
  autoplayDelay?: number;  // Default: 5000ms
  navigationStyle?: 'arrows' | 'dots' | 'both';  // Default: 'both'
  showReadMoreButton?: boolean;  // Default: true
  readMoreText?: string;  // Default: "Read all success stories"
  readMoreUrl?: string;  // Default: "/case-studies"
}
```

---

## 14. API Integration (Optional)

### Endpoint: GET /api/case-studies?featured=true

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "loftaffair",
      "customerName": "Loftaffair",
      "logoUrl": "https://cdn.example.com/logos/loftaffair.svg",
      "testimonial": "igloo's smart locks reduced...",
      "industry": "Hospitality",
      "productsUsed": ["Keybox 3", "Padlock 2E"],
      "caseStudyUrl": "/case-studies/loftaffair",
      "order": 1
    }
    // ... more
  ]
}
```

---

## 15. Implementation Notes

- Carousel: Custom React component (useCallback, useState) — không dùng thư viện ngoài (Swiper, React Slick) theo quy định project
- Logo SVGs preferred (smaller, scalable)
- Autoplay: pause khi user berinteraksi, resume setelah 5s inactivity
- Touch events: detect swipe left/right pada mobile
- Keyboard: left/right arrow untuk prev/next navigation
- Mobile: test pada iPhone SE (375px), Android Galaxy S21 (360px)
