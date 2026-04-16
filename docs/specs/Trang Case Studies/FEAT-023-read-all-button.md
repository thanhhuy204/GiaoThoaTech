# FEAT-023: Nút "Read all success stories" / Load More (Trang Case Studies)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Nên có sau launch
**File implement:** `app/components/case-studies/LoadMoreButton.tsx`
**Trang:** `/case-studies` — sub-component của CaseStudiesList (FEAT-022), nằm dưới grid

---

## 1. Business Goal

Khuyến khích visitor tiếp tục duyệt các case studies sau khi xem lượt đầu tiên (12 cards), giúp tăng thời gian ở lại trang và khả năng tìm thấy case study phù hợp với ngành của họ. Nút cũng là cầu nối đến việc xem hết toàn bộ proof-of-concept của igloo.

---

## 2. Actors

- **Visitor (khách hàng tiềm năng)** — đã xem 12 case đầu và muốn xem thêm
- **Decision maker (B2B)** — cần tìm thêm case study cùng ngành

---

## 3. Preconditions

- Người dùng đang truy cập trang `/case-studies`
- Danh sách case studies (FEAT-022) đang hiển thị
- Còn case studies chưa được render (tổng số case > số card đang hiển thị)
- Nút nằm ngay bên dưới grid case studies (FEAT-022)

---

## 4. Main Flow

1. Trang load với 12 card đầu → nút "Load more" hiển thị bên dưới grid (nếu tổng > 12)
2. Visitor scroll xuống → thấy nút "Load more" / "Read all success stories"
3. Visitor click nút → loading spinner xuất hiện trong nút
4. 12 case tiếp theo append vào grid với fade-in animation
5. Spinner biến mất, nút trở về trạng thái bình thường
6. Nếu đã load hết tất cả case → nút ẩn hoàn toàn
7. Khi filter tag thay đổi (FEAT-021): nút reset về trạng thái ban đầu với count mới

---

## 5. UI Specification

### Layout

- Căn giữa theo chiều ngang, dưới grid cases
- Margin-top: `40px`
- Margin-bottom: `80px` (desktop), `48px` (mobile)

### Nút "Load more"

**Default state:**
- Label: `"Load more"` (primary) hoặc `"Read all success stories"` (nếu đây là lần đầu load more)
- Background: `transparent`
- Border: `1px solid rgba(0,0,0,0.2)`
- Border-radius: `4px`
- Padding: `14px 48px`
- Font: system sans-serif, `15px`, `rgba(0,0,0,0.7)`, `font-weight: 500`
- Min-width: `200px`

**Hover state:**
- Border-color: `#E8614A`
- Color: `#E8614A`
- Background: `rgba(232,97,74,0.04)`
- Transition: `150ms ease`

**Loading state:**
- Label: `"Loading..."`
- Inline spinner: `16px × 16px`, màu `rgba(0,0,0,0.4)`, animation spin `0.8s linear infinite`
- Disabled: `cursor: not-allowed`, opacity `0.7`

**Hidden state (đã load hết):**
- `display: none` hoặc unmount từ DOM
- Tùy chọn: thay bằng text `"You've seen all [N] success stories"` màu `rgba(0,0,0,0.4)`, `13px`

### Counter text (tùy chọn)

- Bên trên nút: `"Showing 12 of 40 case studies"` hoặc `"12 / 40 shown"`
- Font: system sans-serif, `13px`, `rgba(0,0,0,0.5)`
- Margin-bottom: `16px`

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Background button | `transparent` |
| Border default | `rgba(0,0,0,0.2)` |
| Text default | `rgba(0,0,0,0.7)` |
| Border hover | `#E8614A` |
| Text hover | `#E8614A` |
| Background hover | `rgba(232,97,74,0.04)` |
| Spinner | `rgba(0,0,0,0.4)` |
| Counter text | `rgba(0,0,0,0.5)` |
| "All seen" text | `rgba(0,0,0,0.4)` |

### Typography

| Yếu tố | Style |
|---|---|
| Nút label | system sans-serif, `15px`, `font-weight: 500` |
| Counter text | system sans-serif, `13px`, `rgba(0,0,0,0.5)` |
| "All seen" message | system sans-serif, `13px`, `rgba(0,0,0,0.4)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Nút border + text | color transition | Hover | `150ms ease` |
| Nút | scale `0.98` | Active/press | `100ms ease` |
| Spinner | `rotate(360deg)` | Loading state | `0.8s linear infinite` |
| Cards mới | stagger fade-in + `translateY(16px)` → `0` | Load complete | `300ms ease`, delay `40ms` mỗi card |
| Nút hidden | fade-out `opacity: 1` → `0` | Tất cả case đã load | `200ms ease` |

---

## 7. Business Rules

- Nút chỉ hiển thị khi: `displayedCount < totalFilteredCount`
- Mỗi lần click: load thêm `PAGE_SIZE = 12` cases (đồng bộ với FEAT-022)
- Khi filter tag thay đổi: reset `displayedCount` về `PAGE_SIZE`, nút re-evaluate visibility
- Nút không được làm thay đổi URL (không phải pagination với URL `/page/2`)
- Không double-load: disable nút trong khi đang loading
- Label nút: dùng `"Load more"` cho lần load thứ 2 trở đi; lần đầu có thể dùng `"Read all success stories"` nếu có yêu cầu marketing

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Tổng số case ≤ 12 | Không hiển thị nút ngay từ đầu |
| Sau filter → ≤ 12 kết quả | Nút ẩn tức thì |
| Click nhanh 2 lần | Lần click thứ 2 bị block (nút disabled khi loading) |
| Load xong nhưng data lỗi | Spinner dừng, hiện error toast "Failed to load more. Please try again." và re-enable nút |
| Đã load hết | Nút ẩn, tùy chọn hiện text "You've seen all N success stories" |
| Mobile | Nút full-width hoặc min-width giữ nguyên `200px`, căn giữa |

---

## 9. Security Requirements

- Nút không submit form — không có rủi ro CSRF
- Pagination state là client-side slice — không call API, không rủi ro
- Nếu sau này chuyển sang API pagination: validate response shape với TypeScript trước khi render

---

## 10. Acceptance Criteria

- [ ] Nút chỉ hiển thị khi còn case chưa hiển thị
- [ ] Click nút → spinner xuất hiện, nút disabled
- [ ] Load xong → 12 card mới fade-in append vào grid
- [ ] Spinner biến mất, nút re-enable
- [ ] Khi hiển thị hết tất cả case → nút ẩn
- [ ] Filter thay đổi → nút re-evaluate (ẩn/hiện đúng)
- [ ] Hover: border + text chuyển màu cam `150ms ease`
- [ ] Double-click ngăn chặn (disabled khi loading)
- [ ] Mobile: nút căn giữa, dễ bấm
- [ ] TypeScript strict: không có `any`
- [ ] Không dùng inline style — thuần Tailwind

---

## 11. Assets cần thiết

Không cần asset hình ảnh — spinner là CSS animation thuần.

---

## 12. Data Structure

```typescript
interface LoadMoreButtonProps {
  displayedCount: number;
  totalCount: number;
  isLoading: boolean;
  onLoadMore: () => void;
  showCounter?: boolean; // default: true
}

// Spinner CSS animation (trong globals.css hoặc Tailwind config):
// @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
```

---

## 13. Implementation Notes

- Component cần `"use client"` vì có `onClick` handler và loading state
- State `isLoading` và `displayedCount` quản lý tại parent (`CaseStudiesPage`) và truyền xuống qua props
- Spinner: dùng SVG tròn với CSS animation `animate-spin` (Tailwind built-in), không dùng thư viện
- Nút disabled khi `isLoading`: dùng `aria-disabled="true"` và `disabled` attribute
- Khi tất cả case đã hiển thị, unmount component hoặc dùng conditional render
- Load more function trong parent: `setDisplayedCount(prev => Math.min(prev + PAGE_SIZE, filteredCases.length))`
- Stagger animation cho cards mới: áp dụng `animation-delay` qua Tailwind custom property trên từng card trong FEAT-022
