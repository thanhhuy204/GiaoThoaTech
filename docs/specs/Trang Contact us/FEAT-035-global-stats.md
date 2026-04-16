# FEAT-035: Thống kê toàn cầu (Trang Contact us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1
**File implement:** `app/components/contact/GlobalStats.tsx`
**Page file:** `app/(pages)/contact/page.tsx`

---

## 1. Business Goal

Hiển thị số liệu ấn tượng về quy mô hoạt động toàn cầu của igloo để tăng uy tín và độ tin cậy, đặc biệt với khách hàng doanh nghiệp đang cân nhắc gửi form. Số liệu lớn và cụ thể tạo social proof mạnh mẽ hơn lời nói chung chung, thúc đẩy visitor hoàn tất submit.

---

## 2. Actors

- **Prospect B2B** — đang cân nhắc trước khi submit form, muốn thấy bằng chứng quy mô.
- **Decision maker** — validate igloo là vendor đủ lớn và đáng tin cậy.

---

## 3. Preconditions

- Section này render trên trang `/contact`, trước hoặc sau form (thiết kế trang quyết định vị trí).
- Số liệu là static content — không lấy từ API.
- `IntersectionObserver` API có trong browser (hỗ trợ bởi mọi modern browser).

---

## 4. Main Flow

1. Render 4 stat cards:
   - **10M+** access credentials/year
   - **30,000+** offline PINs/day
   - **100+** cities
   - **3** châu lục: Europe, North America, APAC
2. Khi user scroll section vào viewport:
   a. Counter animation bắt đầu từ 0 đến giá trị đích.
   b. "+" suffix hiện sau khi counter kết thúc (hoặc animate cùng).
3. Section render đầy đủ ngay cả khi JS disabled (SSR render giá trị final).

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
|  "Trusted by businesses worldwide"                       |
|                                                          |
|  +----------+  +----------+  +----------+  +----------+ |
|  | 10M+     |  | 30,000+  |  | >100     |  | 3        | |
|  | access   |  | offline  |  | cities   |  | continents|
|  | creds/yr |  | PINs/day |  |          |  |          | |
|  +----------+  +----------+  +----------+  +----------+ |
+----------------------------------------------------------+
```

- Desktop (≥1024px): 4 cột equal width, `gap: 24px`.
- Tablet (768px–1023px): 2 cột × 2 hàng, `gap: 20px`.
- Mobile (<768px): 2 cột × 2 hàng, `gap: 16px`.
- Section padding: `80px 0` (desktop), `56px 24px` (mobile).
- Background: `#f9f9f9`.
- Stat card: không có border, không có shadow — clean number display.
- Stat card: `text-align: center`, `padding: 32px 16px`.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Section background | `#f9f9f9` |
| Section title | `#0f0f0f` |
| Stat number | `#E8614A` |
| Stat suffix (+, >) | `#E8614A` |
| Stat label | `rgba(0,0,0,0.6)` |
| Stat sublabel | `rgba(0,0,0,0.45)` |
| Divider between cards | `rgba(0,0,0,0.08)` (optional, border-right trên desktop) |

### Typography

| Yếu tố | Style |
|---|---|
| Section title | `Playfair Display`, `font-size: clamp(1.5rem, 2.5vw, 2rem)`, `font-weight: 700`, `text-align: center` |
| Stat number | `Playfair Display`, `font-size: clamp(2.5rem, 5vw, 4rem)`, `font-weight: 700`, `color: #E8614A` |
| Stat suffix | `font-size: 0.7em` (relative to stat number), `font-weight: 600` |
| Stat label | `font-size: 15px`, `font-weight: 500`, `color: rgba(0,0,0,0.75)` |
| Stat sublabel | `font-size: 13px`, `color: rgba(0,0,0,0.45)` |
| Continent tags | `font-size: 12px`, `font-weight: 500`, `background: rgba(0,0,0,0.06)`, `border-radius: 4px`, `padding: 2px 8px` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section title | Fade in từ bottom | IntersectionObserver (threshold 0.2) | 400ms, ease-out |
| Stat cards | Staggered fade in từ bottom | IntersectionObserver | 300ms each, delay 80ms per card |
| Counter number | Count từ 0 → target value | IntersectionObserver (đồng thời với card fade) | 1500ms, easeOutCubic |
| Suffix (+) | Fade in | Counter hoàn thành | 200ms |
| Card | Subtle scale (1 → 1.02) | Hover | 200ms |

**Counter animation algorithm:**
```
easeOutCubic: t => 1 - Math.pow(1 - t, 3)
frame: requestAnimationFrame
duration: 1500ms
start: 0
end: target (số nguyên)
```

- Stat "3 châu lục": Không animate counter (số quá nhỏ). Chỉ fade in.
- Stat "10M": animate từ 0 đến 10 với suffix "M+".
- Stat "30,000": animate từ 0 đến 30,000 với suffix "+".
- Stat ">100": animate từ 0 đến 100, prefix ">".

---

## 7. Business Rules

- Số liệu **cố định**, không thay đổi tùy ý:
  - `10M+` access credentials/year
  - `30,000+` offline PINs/day
  - `>100` cities
  - `3` châu lục (Europe, North America, APAC)
- Counter animation chỉ chạy **một lần** khi section vào viewport lần đầu — không replay khi scroll lại.
- Nếu JS disabled (SSR): render giá trị final luôn — không hiện "0".
- Không dùng thư viện counter ngoài (CountUp.js, etc.) — implement bằng `requestAnimationFrame`.
- Section là static content — không API call.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| JS disabled / SSR | Render số final ngay (`10M+`, `30,000+`, etc.) không có animation |
| `IntersectionObserver` không có | Fallback: hiện số final ngay, không animate |
| `prefers-reduced-motion: reduce` (OS setting) | Bỏ qua counter animation, render số final ngay lập tức |
| Viewport quá hẹp (<280px) | 1 cột, text scale xuống nhỏ hơn |
| Section scroll nhanh qua viewport | Animation vẫn trigger — không skip |

---

## 9. Security Requirements

- Section là static content, không có input/output.
- Không có API call hay user data.
- Không expose business metric nhạy cảm ngoài 4 con số đã được approve.

---

## 10. Acceptance Criteria

- [ ] 4 stat cards render đúng với số liệu chính xác.
- [ ] Counter animation chạy từ 0 → target khi scroll vào viewport.
- [ ] Animation chỉ chạy 1 lần.
- [ ] SSR/JS disabled → số final hiển thị ngay.
- [ ] `prefers-reduced-motion` → không animate.
- [ ] Layout 4 cột desktop, 2×2 tablet/mobile.
- [ ] Stat number màu `#E8614A`, Playfair Display.
- [ ] Hover effect nhẹ trên card.
- [ ] Staggered fade-in animation cho cards.
- [ ] TypeScript strict — không có `any`.
- [ ] Không dùng thư viện counter ngoài.
- [ ] Không có lỗi accessibility.

---

## 11. Assets cần thiết

- Không cần ảnh hay icon đặc biệt.
- Font Playfair Display đã load qua `next/font`.

---

## 12. Data Structure

```typescript
interface Stat {
  id: string;
  value: number;          // Số để animate, e.g. 10
  unit?: string;          // "M" cho 10M, undefined cho 30000
  suffix?: string;        // "+" — hiển thị sau number+unit
  prefix?: string;        // ">" cho >100
  label: string;          // "access credentials/year"
  sublabel?: string;      // Optional thêm context
  tags?: string[];        // ["Europe", "North America", "APAC"] cho châu lục
  animateCounter: boolean; // false cho stat số nhỏ như "3"
}

// Static data:
const GLOBAL_STATS: Stat[] = [
  {
    id: "credentials",
    value: 10,
    unit: "M",
    suffix: "+",
    label: "access credentials/year",
    animateCounter: true,
  },
  {
    id: "pins",
    value: 30000,
    suffix: "+",
    label: "offline PINs/day",
    animateCounter: true,
  },
  {
    id: "cities",
    value: 100,
    prefix: ">",
    label: "cities",
    animateCounter: true,
  },
  {
    id: "continents",
    value: 3,
    label: "continents",
    tags: ["Europe", "North America", "APAC"],
    animateCounter: false,
  },
];

interface GlobalStatsProps {
  title?: string;   // Default: "Trusted by businesses worldwide"
  stats?: Stat[];   // Default: GLOBAL_STATS constant
}
```

---

## 13. Implementation Notes

- Component cần `"use client"` vì dùng `IntersectionObserver` và `requestAnimationFrame`.
- Tách logic: `GlobalStats.tsx` (Server, layout) → `StatCounter.tsx` (Client, animation).
- `StatCounter.tsx` nhận `value`, `duration`, `prefix`, `suffix`, `unit`, `animateCounter` props.
- Counter hook: tạo `hooks/useCounterAnimation.ts`:
  ```typescript
  export function useCounterAnimation(
    target: number,
    duration: number,
    enabled: boolean
  ): number
  ```
- `useCounterAnimation` sử dụng `useRef` cho RAF id và `useState` cho current value.
- `IntersectionObserver` trong `StatCounter` với `threshold: 0.2`, `triggerOnce: true`.
- `prefers-reduced-motion`: check với `window.matchMedia('(prefers-reduced-motion: reduce)')` và skip animation.
- Format number: `30000` → "30,000" dùng `Intl.NumberFormat` với `locale: 'en-US'`.
- Grid Tailwind: `grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6`.
