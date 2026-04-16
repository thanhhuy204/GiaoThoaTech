# FEAT-022: Danh sách Case Studies (Trang Case Studies)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Cần có khi launch
**File implement:** `app/components/case-studies/CaseStudiesList.tsx`
**Trang:** `/case-studies` — bao gồm IndustryTagFilter (FEAT-021), CaseStudyCard, và nút Load More (FEAT-023)

---

## 1. Business Goal

Hiển thị toàn bộ câu chuyện thành công của khách hàng igloo dưới dạng lưới có thể duyệt và lọc. Mỗi case study là bằng chứng thực tế về giá trị sản phẩm — giúp xây dựng lòng tin, trả lời nghi ngờ của khách hàng tiềm năng, và thúc đẩy họ liên hệ demo.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — tìm kiếm case study ngành của mình để tham khảo
- **Decision maker (B2B)** — cần proof-of-concept từ công ty cùng ngành

---

## 3. Preconditions

- Người dùng đang truy cập trang `/case-studies`
- Filter tag (FEAT-021) đã được render phía trên
- State `activeTag` từ FEAT-021 được truyền xuống hoặc shared qua parent component
- Dữ liệu case studies đã sẵn sàng (static data hoặc API)

---

## 4. Main Flow

1. Trang load → hiển thị skeleton loading cards (3×3 grid)
2. Data load xong → skeleton replace bằng case study cards thực
3. Mặc định hiển thị 12 card đầu tiên (pagination hoặc load more)
4. Mỗi card hiển thị: logo khách hàng, quote ngắn, tag ngành, sản phẩm liên quan, nút "Made possible with"
5. Filter tag active (từ FEAT-021) → list re-render chỉ hiển thị case match tag, pagination reset về trang 1
6. Scroll xuống / click "Load more" → hiển thị thêm 12 case tiếp theo
7. Không có case match tag → hiển thị empty state

---

## 5. UI Specification

### Layout

- Section full-width, background `#f9f9f9`
- Padding: `48px 24px` (desktop), `32px 16px` (mobile)
- Container max-width: `1200px`, căn giữa
- Grid: `3 cột` (desktop ≥ 1024px), `2 cột` (tablet 640–1023px), `1 cột` (mobile < 640px)
- Gap: `24px`

### Case Study Card

- Background: `#ffffff`
- Border: `1px solid rgba(0,0,0,0.08)`
- Border-radius: `8px`
- Padding: `24px`
- Display: flex, flex-direction column, gap `16px`
- Hover: `transform: translateY(-4px)`, shadow `0 8px 24px rgba(0,0,0,0.12)`, transition `200ms ease`
- Min-height: `280px`

**Logo khách hàng:**
- Max-width: `120px`, max-height: `40px`
- `object-fit: contain`, `object-position: left`
- Alt text: `"[Tên công ty] logo"`

**Quote ngắn:**
- Font: Playfair Display, `italic`, `16px` (desktop) / `14px` (mobile)
- Color: `#1a1a1a`
- Line-height: `1.5`
- Trước quote: dấu `"` màu `#E8614A`, `font-size: 24px`
- Tối đa 2 dòng với `line-clamp-2`

**Tag ngành:**
- Style nhất quán với filter tags (FEAT-021) nhưng non-interactive
- Background: `rgba(232,97,74,0.1)`
- Color: `#E8614A`
- Border: `1px solid rgba(232,97,74,0.2)`
- Border-radius: `4px`
- Padding: `4px 10px`
- Font: system sans-serif, `11px`, `font-weight: 600`, uppercase

**"Made possible with" section:**
- Margin-top: `auto` (push xuống bottom của card)
- Label text: `"Made possible with"`, system sans-serif, `11px`, `rgba(0,0,0,0.5)`, uppercase, letter-spacing `0.05em`
- Logo sản phẩm: `24px × 24px`, inline với tên sản phẩm
- Tên sản phẩm: system sans-serif, `13px`, `#0f0f0f`, `font-weight: 500`

### Skeleton Loading Card

- Cùng kích thước và layout với card thực
- Background elements: `rgba(0,0,0,0.06)`, shimmer animation
- Logo placeholder: `120×32px` rounded
- Quote placeholder: 3 dòng text, chiều rộng lần lượt 100%, 90%, 60%
- Tag placeholder: `60×20px`
- Product placeholder: `80×16px`

### Empty State

- Hiển thị khi không có case match filter
- Icon: SVG magnifying glass hoặc folder, `64px`, màu `rgba(0,0,0,0.2)`
- Heading: `"No case studies found"`, Playfair Display, `20px`, `#1a1a1a`
- Subtext: `"Try selecting a different industry or view all case studies."`, system sans-serif, `14px`, `rgba(0,0,0,0.6)`
- Nút: `"View all"` → reset filter về "All"

### Load More / Pagination

- Nút "Load more" căn giữa, bên dưới grid
- Style: outlined, border `1px solid rgba(0,0,0,0.2)`, background `transparent`
- Padding: `12px 40px`, border-radius `4px`
- Font: `14px`, `font-weight: 500`, `rgba(0,0,0,0.7)`
- Hover: border `#E8614A`, color `#E8614A`
- Loading state: spinner inline, text "Loading..."
- Ẩn khi đã hiển thị tất cả case

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background section | `#f9f9f9` |
| Card background | `#ffffff` |
| Card border | `rgba(0,0,0,0.08)` |
| Card hover shadow | `0 8px 24px rgba(0,0,0,0.12)` |
| Quote text | `#1a1a1a` |
| Quote mark | `#E8614A` |
| Tag background | `rgba(232,97,74,0.1)` |
| Tag text | `#E8614A` |
| Tag border | `rgba(232,97,74,0.2)` |
| Product name | `#0f0f0f` |
| "Made possible with" label | `rgba(0,0,0,0.5)` |
| Skeleton shimmer | `rgba(0,0,0,0.06)` |

### Typography

| Yếu tố | Style |
|---|---|
| Quote | Playfair Display, `italic`, `16px`, `#1a1a1a`, line-height `1.5` |
| Tag label | system sans-serif, `11px`, `#E8614A`, `font-weight: 600`, uppercase |
| Product name | system sans-serif, `13px`, `#0f0f0f`, `font-weight: 500` |
| "Made possible with" | system sans-serif, `11px`, `rgba(0,0,0,0.5)`, uppercase |
| Empty state heading | Playfair Display, `20px`, `#1a1a1a` |
| Empty state subtext | system sans-serif, `14px`, `rgba(0,0,0,0.6)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Card | `translateY(-4px)` + shadow | Hover | `200ms ease` |
| Skeleton → card | fade-in `opacity: 0` → `1` | Data loaded | `300ms ease`, stagger `40ms` |
| Filter change | cards fade `opacity: 0.5` → `1` | Filter active tag đổi | `200ms ease` |
| Load more | cards mới fade-in + `translateY(16px)` → `0` | Load more click | `300ms ease`, stagger `40ms` |
| Shimmer skeleton | background-position `-200%` → `200%` | Loop | `1.5s linear infinite` |

---

## 7. Business Rules

- Mặc định hiển thị 12 card mỗi lần load (configurable constant `PAGE_SIZE = 12`)
- Load more thêm `PAGE_SIZE` cards mỗi lần
- Khi filter thay đổi: reset về trang 1 (hiển thị lại từ đầu filtered list)
- Mỗi card phải có đủ: logo khách hàng, quote, tag ngành, tên sản phẩm
- Tag ngành trên card phải khớp với tag trong filter (FEAT-021) để lọc đúng
- Logo khách hàng phải có alt text
- Không có link chi tiết case study trong MVP (trang detail chưa có)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Logo khách hàng không load | Hiển thị tên công ty dạng text thay thế |
| Quote quá dài | `line-clamp-2`, tooltip hoặc expand không cần thiết trong MVP |
| Filter → 0 kết quả | Hiển thị empty state với nút "View all" |
| Filter → < 12 kết quả | Hiển thị đủ số card, ẩn nút "Load more" |
| Tổng số case < 12 | Không hiển thị nút "Load more" ngay từ đầu |
| Data fetch lỗi | Hiển thị error state: "Unable to load case studies. Please try again." |
| Mobile (< 640px) | Grid 1 cột, card full-width |

---

## 9. Security Requirements

- Logo URL từ `/public` hoặc whitelist CDN domain trong `next.config.ts`
- Nếu data từ API: sanitize quote text trước khi render (escape HTML)
- Không render raw HTML từ API response

---

## 10. Acceptance Criteria

- [ ] Grid hiển thị 12 card mặc định khi trang load
- [ ] Skeleton loading hiển thị trong khi data chưa sẵn sàng
- [ ] Mỗi card có đủ: logo, quote (line-clamp-2), tag ngành, "Made possible with" + sản phẩm
- [ ] Logo không load: fallback tên công ty dạng text
- [ ] Filter tag thay đổi (từ FEAT-021) → list update đúng realtime
- [ ] Filter → 0 kết quả → empty state hiển thị với nút "View all"
- [ ] Nút "Load more" hiển thị khi còn case chưa hiển thị
- [ ] Click "Load more" → thêm 12 card mới fade-in
- [ ] "Load more" ẩn khi đã hiển thị hết
- [ ] Hover card: `translateY(-4px)` + shadow `200ms ease`
- [ ] Grid responsive: 3→2→1 cột
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Logo từng khách hàng | `public/images/case-studies/logos/[company-slug].png` | max 240×80px | PNG với nền trong suốt |
| Logo sản phẩm igloo | `public/images/products/[product-slug].png` | 48×48px | Keybox 3, Padlock 2E, v.v. |
| Empty state icon | `public/icons/empty-cases.svg` | 64×64px | SVG đơn giản |

---

## 12. Data Structure

```typescript
type IndustryTag =
  | 'hospitality'
  | 'single-family-rental'
  | 'sharing-economy'
  | 'multi-family-residential'
  | 'short-term-rental'
  | 'commercial-real-estate';

interface RelatedProduct {
  id: string;
  name: string; // 'Keybox 3', 'Padlock 2E', ...
  logoPath: string;
}

interface CaseStudy {
  id: string;
  companyName: string;
  companyLogoPath: string;
  quote: string;           // tối đa 100 ký tự để đảm bảo line-clamp-2 hiệu quả
  industryTag: IndustryTag;
  relatedProducts: RelatedProduct[]; // thường 1–2 sản phẩm
}

interface CaseStudiesListProps {
  cases: CaseStudy[];
  activeTag: IndustryTag | 'all';
}

// Pagination state (internal):
interface PaginationState {
  page: number;
  pageSize: number; // default: 12
  hasMore: boolean;
}
```

---

## 13. Implementation Notes

- Component cần `"use client"` vì có state (pagination, filter, loading)
- Filter logic: `const filtered = activeTag === 'all' ? cases : cases.filter(c => c.industryTag === activeTag)`
- Pagination: dùng slice trên filtered array — không cần API call mới vì data static
- Shimmer animation: dùng CSS `@keyframes` với `background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)` và `background-size: 200%`
- `useEffect` reset `displayCount` về `PAGE_SIZE` khi `activeTag` thay đổi
- Logo sản phẩm dùng `next/image` với `width={24} height={24}`
- Logo khách hàng dùng `next/image` với `width={120} height={40}`, `object-fit="contain"`, `onError` callback để fallback về text
- Tách `CaseStudyCard` thành component riêng `app/components/case-studies/CaseStudyCard.tsx`
- Dữ liệu mock đặt tại `lib/data/case-studies.ts`; cấu trúc sẵn để thay bằng API call sau
