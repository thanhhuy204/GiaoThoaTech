# FEAT-021: Bộ lọc tag ngành (Trang Case Studies)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Cần có khi launch
**File implement:** `app/components/case-studies/IndustryTagFilter.tsx`
**Trang:** `/case-studies` — bộ lọc nằm trên CaseStudiesList (FEAT-022)

---

## 1. Business Goal

Cho phép visitor lọc case studies theo ngành nghề liên quan đến họ (Hospitality, Single Family Rental, Sharing Economy, v.v.), giúp họ tìm ngay ví dụ phù hợp với nhu cầu kinh doanh. Giảm cognitive load khi có 40+ case studies — visitor không cần đọc toàn bộ, chỉ xem những case đúng ngành.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — muốn xem case studies trong ngành của mình
- **Decision maker (B2B)** — cần tìm nhanh case study để thuyết phục nội bộ

---

## 3. Preconditions

- Người dùng đang truy cập trang `/case-studies`
- Filter nằm ngay dưới Hero section (FEAT-020), trên danh sách case (FEAT-022)
- Danh sách case studies (FEAT-022) đã được render và lắng nghe state của filter này

---

## 4. Main Flow

1. Trang load → hiển thị tag "All" đang active + các tag ngành
2. Mặc định tag "All" active → toàn bộ case studies hiển thị
3. Visitor click tag ngành (ví dụ "Hospitality") → tag đó active, "All" deactivate
4. Danh sách case studies cập nhật realtime — chỉ hiển thị case có tag match
5. Visitor click tag khác → filter thay đổi, danh sách cập nhật lại
6. Visitor click "All" → reset filter, hiển thị toàn bộ case
7. Visitor click tag đang active → deactivate (về "All")

---

## 5. UI Specification

### Layout

- Section full-width, background `#ffffff`
- Padding: `32px 24px` (desktop và mobile)
- Container max-width: `1200px`, căn giữa
- Các tag sắp xếp theo hàng ngang, flex-wrap khi overflow
- Gap giữa các tag: `8px`
- Sticky positioning tùy chọn: `position: sticky; top: 64px` (dưới navbar) khi scroll qua

### Tag chip

**Default state:**
- Background: `#f9f9f9`
- Border: `1px solid rgba(0,0,0,0.12)`
- Border-radius: `4px`
- Padding: `8px 16px`
- Font: system sans-serif, `13px`, `rgba(0,0,0,0.7)`, `font-weight: 500`
- Cursor: `pointer`

**Active state:**
- Background: `#E8614A`
- Border: `1px solid #E8614A`
- Color: `#ffffff`
- Font-weight: `600`

**Hover state (non-active):**
- Background: `rgba(232,97,74,0.08)`
- Border-color: `rgba(232,97,74,0.3)`
- Color: `#E8614A`

**Disabled/no-match state:**
- Opacity: `0.4`
- Cursor: `not-allowed`
- Tooltip: `"No case studies in this category"`

### Tag danh sách

Thứ tự hiển thị:
1. All
2. Hospitality
3. Single Family Rental
4. Sharing Economy
5. Multi-Family Residential
6. Short-Term Rental
7. Commercial Real Estate

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background section | `#ffffff` |
| Tag default background | `#f9f9f9` |
| Tag default border | `rgba(0,0,0,0.12)` |
| Tag default text | `rgba(0,0,0,0.7)` |
| Tag active background | `#E8614A` |
| Tag active border | `#E8614A` |
| Tag active text | `#ffffff` |
| Tag hover background | `rgba(232,97,74,0.08)` |
| Tag hover border | `rgba(232,97,74,0.3)` |
| Tag hover text | `#E8614A` |
| Tag disabled opacity | `0.4` |

### Typography

| Yếu tố | Style |
|---|---|
| Tag label | system sans-serif, `13px`, `font-weight: 500` (default) / `600` (active) |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Tag active state | background + border + color transition | Click | `150ms ease` |
| Tag hover | background + border + color transition | Hover | `150ms ease` |
| Tag click | scale `0.96` → `1` | Click | `100ms ease` |
| Filter change → case list | fade `opacity: 0.6` → `1` | Filter thay đổi | `200ms ease` |

---

## 7. Business Rules

- Tag "All" luôn là tag đầu tiên, không thể xóa hoặc ẩn
- Chỉ có thể active 1 tag tại một thời điểm (single-select)
- Click tag đang active → trở về "All" (toggle off)
- Lọc realtime — không reload trang, không gọi API mới
- Nếu không có case match tag: hiển thị empty state trong list (FEAT-022 xử lý), tag vẫn có thể click nhưng ở disabled visual sau khi đã click
- URL có thể cập nhật query param `?industry=hospitality` để shareable filter state (tùy chọn — nếu implement thì dùng Next.js `useRouter` và `useSearchParams`)
- JavaScript tắt → toàn bộ case hiển thị (không filter), tags vẫn render nhưng không có chức năng

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Không có case match tag | Tag vẫn clickable, list chuyển sang empty state (FEAT-022 render "No cases found") |
| JavaScript tắt | Hiển thị toàn bộ case studies, tags render nhưng không có click handler |
| Nhiều tag không vừa 1 dòng (mobile) | Flex-wrap tự động xuống dòng |
| URL có `?industry=hospitality` khi load | Pre-select tag "Hospitality", list filter ngay lập tức |
| Tag label quá dài | Không wrap text — ký tự bị cắt với `...` nếu cần (thực tế tên tag ngắn) |
| Người dùng resize cửa sổ | Layout re-flow tự động, không cần JS |

---

## 9. Security Requirements

- Tag values là hardcoded enum — không từ user input, không rủi ro injection
- Nếu filter state đồng bộ qua URL param: validate param value trước khi dùng (chỉ accept giá trị trong whitelist `INDUSTRY_TAGS`)
- Không có form submit — rủi ro CSRF không áp dụng

---

## 10. Acceptance Criteria

- [ ] Hiển thị tag "All" + đủ 6 tag ngành theo đúng thứ tự
- [ ] Tag "All" active mặc định khi trang load
- [ ] Click tag ngành → tag đó active, "All" deactivate, list filter đúng
- [ ] Click tag đang active → trở về "All", list hiển thị toàn bộ
- [ ] Click "All" → reset filter, toàn bộ case hiển thị
- [ ] Transition active state: `150ms ease`
- [ ] Hover tag non-active: màu cam nhạt
- [ ] Không có case match: tag clickable, list hiển thị empty state
- [ ] JavaScript tắt: tất cả case vẫn hiển thị
- [ ] Mobile: tags flex-wrap xuống dòng tự nhiên
- [ ] URL update `?industry=` khi filter (nếu implement shareable state)
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

Không cần asset hình ảnh — component thuần UI.

---

## 12. Data Structure

```typescript
type IndustryTag =
  | 'all'
  | 'hospitality'
  | 'single-family-rental'
  | 'sharing-economy'
  | 'multi-family-residential'
  | 'short-term-rental'
  | 'commercial-real-estate';

interface TagConfig {
  id: IndustryTag;
  label: string;
}

const INDUSTRY_TAGS: TagConfig[] = [
  { id: 'all', label: 'All' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'single-family-rental', label: 'Single Family Rental' },
  { id: 'sharing-economy', label: 'Sharing Economy' },
  { id: 'multi-family-residential', label: 'Multi-Family Residential' },
  { id: 'short-term-rental', label: 'Short-Term Rental' },
  { id: 'commercial-real-estate', label: 'Commercial Real Estate' },
];

interface IndustryTagFilterProps {
  activeTag: IndustryTag;
  onTagChange: (tag: IndustryTag) => void;
  caseCounts?: Partial<Record<IndustryTag, number>>; // optional: hiển thị số lượng
}
```

---

## 13. Implementation Notes

- Component cần `"use client"` vì có state + event handler
- State `activeTag` nên được lift lên parent `CaseStudiesPage` để cả filter và list cùng truy cập
- Nếu implement URL sync: dùng `useRouter().push` và `useSearchParams()` trong Next.js App Router
- Lọc logic đặt trong parent hoặc custom hook `useIndustryFilter(cases, activeTag)` trong `hooks/useIndustryFilter.ts`
- Không dùng `<select>` dropdown — luôn dùng tag chip layout
- Keyboard: mỗi tag là `<button>` → tự động accessible với keyboard navigation
- `aria-pressed={isActive}` trên mỗi tag button để screen reader biết state
- Tag "All" có `aria-label="Show all case studies"`
