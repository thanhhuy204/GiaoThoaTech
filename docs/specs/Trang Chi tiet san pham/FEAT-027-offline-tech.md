# FEAT-027: Giải thích công nghệ offline (Trang Chi tiết sản phẩm)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0
**File implement:** `app/components/products/OfflineTechSection.tsx`
**Page file:** `app/(pages)/products/[slug]/page.tsx`

---

## 1. Business Goal

Giải thích rõ ràng cách sản phẩm hoạt động offline thông qua công nghệ AccessAnywhere và algoPIN™, giúp khách hàng hiểu được giá trị độc đáo mà không cần kết nối Internet liên tục. Đây là điểm khác biệt cạnh tranh quan trọng nhất của sản phẩm — phần này phải truyền đạt được sự tin tưởng vào tính bền vững và tiện lợi.

---

## 2. Actors

- **Prospect kỹ thuật** — người đánh giá tính khả thi triển khai, cần hiểu cơ chế offline.
- **Decision maker** — quan tâm đến rủi ro downtime khi mất mạng.
- **End user** — người dùng cuối muốn biết cách dùng PIN khi không có điện thoại.

---

## 3. Preconditions

- `ProductDetail.offlineTech` được populate từ API với dữ liệu đầy đủ.
- Section này render sau `ProductBenefits` (FEAT-026) trên trang.
- Tính năng offline chỉ hiển thị nếu sản phẩm hỗ trợ (`supportsOffline: true`).

---

## 4. Main Flow

1. Render tiêu đề section: "Offline Access Technology".
2. Render sub-headline: "AccessAnywhere™ — hoạt động không cần Wi-Fi".
3. Render mô tả: "Không cần Wi-Fi hay kết nối mạng, algoPIN™ tạo mã truy cập ngay trên thiết bị của bạn."
4. Render 4 loại PIN dưới dạng card grid (2×2):
   - **One-time PIN** — Dùng một lần, tự hủy sau khi mở khóa.
   - **Duration PIN** — Hợp lệ trong khoảng thời gian xác định (ví dụ: 2 giờ, 1 ngày).
   - **Recurring PIN** — Lặp lại theo lịch định kỳ (ví dụ: mỗi thứ Hai 9:00–17:00).
   - **Permanent PIN** — Không giới hạn thời gian, thu hồi thủ công.
5. Render disclaimer nhỏ: "algoPIN™ không tiết lộ chi tiết thuật toán mã hóa."

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
| [Label: AccessAnywhere™]                                 |
|                                                          |
| H2: Offline Access Technology                            |
| Sub: Hoạt động không cần Wi-Fi hay kết nối mạng.        |
| Desc: algoPIN™ tạo mã ngay trên thiết bị...             |
|                                                          |
|  +------------------+  +------------------+             |
|  | [Icon] One-time  |  | [Icon] Duration  |             |
|  | PIN              |  | PIN              |             |
|  | Dùng một lần...  |  | Khoảng thời gian |             |
|  +------------------+  +------------------+             |
|  +------------------+  +------------------+             |
|  | [Icon] Recurring |  | [Icon] Permanent |             |
|  | PIN              |  | PIN              |             |
|  | Lặp lại theo     |  | Không giới hạn   |             |
|  | lịch             |  | thời gian        |             |
|  +------------------+  +------------------+             |
|                                                          |
| * algoPIN™ không tiết lộ chi tiết thuật toán            |
+----------------------------------------------------------+
```

- Desktop (≥1024px): 2 cột PIN card, `gap: 24px`.
- Tablet (768px–1023px): 2 cột PIN card, `gap: 16px`.
- Mobile (<768px): 1 cột PIN card.
- Section padding: `80px 0` (desktop), `48px 0` (mobile).
- Section background: xen kẽ — nếu section trước là trắng, dùng `#f9f9f9`.
- PIN card: `border-radius: 8px`, `padding: 24px`, `border: 1px solid rgba(0,0,0,0.08)`.
- PIN card hover: `box-shadow: 0 8px 24px rgba(0,0,0,0.12)`.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Section background | `#f9f9f9` |
| Label badge background | `rgba(232,97,74,0.1)` |
| Label badge text | `#E8614A` |
| H2 | `#0f0f0f` |
| Sub-headline | `#1a1a1a` |
| Description | `rgba(0,0,0,0.6)` |
| PIN card background | `#ffffff` |
| PIN card border | `rgba(0,0,0,0.08)` |
| PIN card icon | `#E8614A` |
| PIN card title | `#1a1a1a` |
| PIN card description | `rgba(0,0,0,0.6)` |
| Disclaimer text | `rgba(0,0,0,0.4)` |
| Disclaimer border-left | `rgba(232,97,74,0.4)` |

### Typography

| Yếu tố | Style |
|---|---|
| Label | `font-size: 12px`, `font-weight: 600`, `letter-spacing: 0.1em`, `text-transform: uppercase` |
| H2 | `Playfair Display`, `font-size: clamp(1.75rem, 3vw, 2.5rem)`, `font-weight: 700` |
| Sub-headline | `font-size: 18px`, `font-weight: 600`, `font-family: system sans-serif` |
| Description | `font-size: 16px`, `line-height: 1.65`, `color: rgba(0,0,0,0.6)` |
| PIN card title | `font-size: 16px`, `font-weight: 700`, `color: #1a1a1a` |
| PIN card description | `font-size: 14px`, `line-height: 1.5`, `color: rgba(0,0,0,0.6)` |
| Disclaimer | `font-size: 12px`, `font-style: italic`, `color: rgba(0,0,0,0.4)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Section label + H2 | Fade in từ bottom (translateY 16px → 0) | IntersectionObserver | 400ms, ease-out |
| Description text | Fade in | IntersectionObserver, delay 100ms | 400ms |
| PIN cards | Staggered fade in + scale (0.95 → 1) | IntersectionObserver | 300ms each, delay 80ms per card |
| PIN card | Border color change (`rgba(232,97,74,0.3)`) | Hover | 200ms |
| PIN card | Lift up (translateY -4px) + shadow | Hover | 200ms, ease |
| PIN card icon | Color pulse | Hover | 300ms |

---

## 7. Business Rules

- **Phải** hiển thị đúng 4 loại PIN: One-time, Duration, Recurring, Permanent — theo thứ tự này.
- Mô tả công nghệ **không** tiết lộ chi tiết thuật toán algoPIN™ (chỉ mô tả hành vi người dùng).
- Section chỉ render khi `ProductDetail.offlineTech.supportsOffline === true`.
- Thứ tự 4 PIN card cố định, không thay đổi theo CMS.
- Label "algoPIN™" và "AccessAnywhere™" luôn có ký hiệu ™, không rút gọn.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Sản phẩm không hỗ trợ offline | Ẩn toàn bộ section, không render |
| `offlineTech.description` trống | Dùng fallback copy default |
| Màn hình rất nhỏ (<360px) | 1 cột, card padding giảm xuống 16px |
| Thiếu icon cho PIN type | Fallback icon chung (key/lock SVG) |

---

## 9. Security Requirements

- Không mô tả chi tiết thuật toán tạo PIN để tránh rủi ro bảo mật.
- Content từ CMS không render qua `dangerouslySetInnerHTML`.
- Không hiển thị sample PIN thực tế.

---

## 10. Acceptance Criteria

- [ ] Section hiển thị tiêu đề "Offline Access Technology".
- [ ] Đúng 4 loại PIN được render theo thứ tự: One-time, Duration, Recurring, Permanent.
- [ ] Mỗi PIN card có icon, title, và description.
- [ ] PIN card layout 2×2 trên desktop, 1 cột trên mobile.
- [ ] Card hover: lift effect + shadow + border highlight.
- [ ] Staggered animation khi scroll vào viewport.
- [ ] `supportsOffline === false` → section ẩn hoàn toàn.
- [ ] Disclaimer "algoPIN™ không tiết lộ thuật toán" hiển thị dưới grid.
- [ ] TypeScript strict — interface `OfflineTechSection` đầy đủ.
- [ ] Không có lỗi accessibility — card icons có `aria-hidden="true"`.

---

## 11. Assets cần thiết

- Icon cho từng PIN type (SVG inline hoặc component):
  - One-time: icon bolt/lightning.
  - Duration: icon clock.
  - Recurring: icon repeat/refresh.
  - Permanent: icon shield/lock.
- Tạo trong `components/ui/icons/` nếu chưa có.

---

## 12. Data Structure

```typescript
interface PinType {
  id: 'one-time' | 'duration' | 'recurring' | 'permanent';
  title: string;        // "One-time PIN"
  description: string;  // "Dùng một lần, tự hủy sau khi mở khóa"
  icon: string;         // icon key: "bolt" | "clock" | "repeat" | "shield"
}

interface OfflineTechSection {
  supportsOffline: boolean;
  label?: string;                // "AccessAnywhere™"
  headline: string;              // "Offline Access Technology"
  subHeadline?: string;
  description: string;
  pinTypes: PinType[];           // Luôn đúng 4 item theo thứ tự cố định
}

interface OfflineTechSectionProps {
  offlineTech: OfflineTechSection;
}
```

---

## 13. Implementation Notes

- Server Component thuần — fetch xong truyền props.
- PIN cards: dùng Tailwind `grid grid-cols-1 md:grid-cols-2 gap-6`.
- Icon mapping: tạo object `PIN_ICON_MAP: Record<PinType['id'], React.ComponentType>` trong cùng file hoặc `lib/pinIcons.ts`.
- Animation: Tách `OfflineTechClient.tsx` với `"use client"` nếu cần `IntersectionObserver`.
- Disclaimer: render như `<p role="note">` với `border-l-2` Tailwind.
- Validate `pinTypes.length === 4` trong development với `console.warn` nếu không đúng.
