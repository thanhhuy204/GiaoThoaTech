# FEAT-009: How it works + Diagram Flowchart

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Cần có trước khi launch
**File implement:** `app/components/technology/HowItWorks.tsx`, `app/components/technology/FlowDiagram.tsx`
**Page file:** `app/(pages)/technology/page.tsx`

---

## 1. Business Goal

Minh họa trực quan luồng hoạt động công nghệ truy cập offline của igloo, giúp khách hàng doanh nghiệp và kỹ sư tích hợp hiểu rõ cách hệ thống hoạt động mà không cần kết nối internet. Mục tiêu là xây dựng sự tin tưởng vào tính đáng tin cậy của công nghệ, từ đó thúc đẩy quyết định hợp tác.

---

## 2. Actors

- **Visitor muốn hiểu cách hoạt động** — khách hàng doanh nghiệp, quản lý tòa nhà
- **Kỹ sư tích hợp** — developer đánh giá giải pháp API/SDK

---

## 3. Preconditions

- Trang Technology (`/technology`) load thành công trên HTTPS
- Section có `id="how-it-works"` để hỗ trợ anchor scroll từ nút CTA (FEAT-010)

---

## 4. Main Flow

1. Người dùng cuộn đến hoặc được scroll đến section `#how-it-works` trên trang Technology
2. Hệ thống hiển thị tiêu đề: `"How it works"`
3. Hiển thị mô tả tổng quan ngắn bên dưới tiêu đề (1–2 câu về công nghệ offline)
4. Hiển thị diagram flowchart với 2 luồng chính:

   **Luồng 1 — Initial Pairing (thiết lập ban đầu):**
   - Bước 1: Người dùng thiết lập thiết bị lần đầu qua app
   - Bước 2: App kết nối Cloud để sync credentials
   - Bước 3: Credentials được lưu xuống thiết bị khóa (local storage)

   **Luồng 2 — Generation Process (sử dụng hàng ngày):**
   - Bước 1: App tạo mã truy cập theo thuật toán offline
   - Bước 2: Thiết bị khóa validate mã offline (không cần internet)
   - Bước 3: Cửa mở / từ chối

5. Hiển thị mô tả chi tiết phía dưới diagram giải thích từng luồng

---

## 5. UI Specification

### Layout

- **Section container:** `width: 100%`, padding `80px 40px`, background `#ffffff`, `id="how-it-works"`
- **Section header:** căn giữa, margin-bottom `16px`
- **Section subtitle:** căn giữa, max-width `640px`, margin `0 auto 56px`
- **Diagram wrapper:** max-width `900px`, margin `0 auto`, padding `40px`, background `#f9f9f9`, border-radius `8px`, border `1px solid rgba(0,0,0,0.08)`
- **2 luồng:** hiển thị dạng 2 cột cạnh nhau (desktop), stack dọc (mobile ≤767px); đường phân cách dọc giữa 2 luồng trên desktop
- **Mô tả chi tiết:** max-width `760px`, margin `40px auto 0`, dạng 2 cột hoặc list

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#ffffff` |
| Nền diagram wrapper | `#f9f9f9` |
| Diagram border | `rgba(0,0,0,0.08)` |
| Tiêu đề section H2 | `#0f0f0f` |
| Subtitle text | `rgba(0,0,0,0.6)` |
| Step node background | `#ffffff` |
| Step node border | `rgba(0,0,0,0.12)` |
| Step node shadow | `0 2px 8px rgba(0,0,0,0.08)` |
| Step number badge | background `#E8614A`, color `#ffffff` |
| Arrow / connector | `rgba(0,0,0,0.25)` |
| Cloud icon | `#E8614A` |
| Device icon | `#1a1a1a` |
| Luồng label header | `#E8614A`, font-weight `700`, uppercase |
| Divider giữa 2 luồng | `rgba(0,0,0,0.1)` |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề section H2 | `Playfair Display`, bold, `2.2rem`, line-height 1.3 |
| Subtitle | `1rem`, line-height 1.7, color `rgba(0,0,0,0.6)` |
| Luồng label | `0.65rem`, uppercase, letter-spacing `0.14em`, font-weight `700`, color `#E8614A` |
| Step node text | `0.85rem`, font-weight `600`, color `#1a1a1a` |
| Step sub-text | `0.78rem`, color `rgba(0,0,0,0.55)`, line-height 1.4 |
| Mô tả chi tiết | `0.9rem`, line-height 1.7, color `rgba(0,0,0,0.7)` |

### Diagram Step Node Component

```
Step Node:
  padding: 12px 16px
  border-radius: 8px
  border: 1px solid rgba(0,0,0,0.12)
  background: #ffffff
  box-shadow: 0 2px 8px rgba(0,0,0,0.08)
  display: flex
  align-items: flex-start
  gap: 12px
  min-width: 200px

Step number badge:
  width: 24px
  height: 24px
  border-radius: 50%
  background: #E8614A
  color: #ffffff
  font-size: 0.7rem
  font-weight: 700
  flex-shrink: 0
  display: flex
  align-items: center
  justify-content: center

Arrow connector:
  height: 24px
  width: 2px
  background: rgba(0,0,0,0.25)
  margin: 4px auto
  position: relative
  (arrow head: CSS border trick, pointing down)
```

### Nội dung Diagram

**Luồng 1 — Initial Pairing**

| Bước | Node text | Sub-text |
|---|---|---|
| 1 | Setup device | Open igloo app, scan device QR |
| 2 | Sync with Cloud | App connects to igloo Cloud |
| 3 | Store credentials | Keys saved to device memory |

**Luồng 2 — Generation Process**

| Bước | Node text | Sub-text |
|---|---|---|
| 1 | Generate PIN/code | App creates time-based access code |
| 2 | Validate offline | Device checks code locally |
| 3 | Grant / Deny access | Door unlocks or stays locked |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Tiêu đề H2 | `fadeUp` | Scroll into view | 0.7s |
| Diagram wrapper | `fadeUp` | Scroll into view | 0.7s, delay 0.1s |
| Step nodes (stagger) | `fadeUp` | Scroll into view | 0.5s + delay 0.08s mỗi node |
| Arrow connectors | `drawDown` (scaleY 0→1) | Scroll into view | 0.4s, delay sau node |
| Mô tả chi tiết | `fadeUp` | Scroll into view | 0.6s, delay 0.3s |

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes drawDown {
  from { transform: scaleY(0); transform-origin: top; }
  to   { transform: scaleY(1); transform-origin: top; }
}
```

---

## 7. Business Rules

- Diagram được xây dựng thuần HTML/CSS — không dùng thư viện chart (D3, Recharts, Mermaid render-time...)
- Nội dung diagram: 2 luồng với đúng thứ tự và nội dung đã định nghĩa — không thay đổi
- Icon cloud và icon thiết bị dùng SVG inline hoặc từ `public/icons/`
- Section phải có `id="how-it-works"` để anchor link từ FEAT-010 hoạt động
- Mô tả chi tiết phải khớp với nội dung diagram (không mâu thuẫn)
- Toàn bộ text dùng tiếng Anh (theo ngôn ngữ trang Technology)

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Diagram quá rộng trên mobile | Diagram scroll ngang trong wrapper (overflow-x: auto) hoặc stack dọc |
| JavaScript bị tắt | Diagram và mô tả hiển thị tĩnh đầy đủ, không animation — chấp nhận được |
| Font Playfair Display không load | Fallback sang `Georgia, serif` |
| Màn hình rất hẹp (≤360px) | Step nodes full width, font nhỏ hơn một bậc |

---

## 9. Security Requirements

- Không có dữ liệu nhạy cảm trong diagram
- Hình ảnh/icons dùng HTTPS
- Không dùng `dangerouslySetInnerHTML`

---

## 10. Acceptance Criteria

- [ ] Section có `id="how-it-works"` (bắt buộc cho FEAT-010 anchor scroll)
- [ ] Tiêu đề `"How it works"` hiển thị đúng font `Playfair Display`
- [ ] Diagram hiển thị 2 luồng: Initial Pairing và Generation Process
- [ ] Luồng 1 có đúng 3 bước theo thứ tự quy định
- [ ] Luồng 2 có đúng 3 bước theo thứ tự quy định
- [ ] Mỗi bước có step number badge màu cam (#E8614A)
- [ ] Có arrow connectors giữa các bước
- [ ] Mô tả chi tiết hiển thị bên dưới diagram và khớp nội dung
- [ ] Diagram responsive: 2 cột desktop, stack dọc mobile
- [ ] Animation fadeUp + stagger khi scroll vào viewport
- [ ] Diagram xây dựng thuần HTML/CSS (không dùng chart library)
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ Tailwind className)

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Cloud icon | `public/icons/cloud.svg` | 24×24px | Outline style, color inherit |
| Device/phone icon | `public/icons/device.svg` | 24×24px | Outline style, color inherit |
| Lock/key icon | `public/icons/lock.svg` | 24×24px | Outline style, color inherit |
| Check icon | `public/icons/check.svg` | 16×16px | Dùng trong step access granted |

---

## 12. Data Structure

```typescript
interface DiagramStep {
  stepNumber: number;
  title: string;
  subText: string;
  iconName?: string; // key tương ứng icon SVG
}

interface DiagramFlow {
  id: string;
  label: string; // "Initial Pairing" | "Generation Process"
  steps: DiagramStep[];
}

const HOW_IT_WORKS_FLOWS: DiagramFlow[] = [
  {
    id: "initial-pairing",
    label: "Initial Pairing",
    steps: [
      { stepNumber: 1, title: "Setup device",        subText: "Open igloo app, scan device QR",      iconName: "device" },
      { stepNumber: 2, title: "Sync with Cloud",     subText: "App connects to igloo Cloud",          iconName: "cloud"  },
      { stepNumber: 3, title: "Store credentials",   subText: "Keys saved to device memory",          iconName: "lock"   },
    ],
  },
  {
    id: "generation-process",
    label: "Generation Process",
    steps: [
      { stepNumber: 1, title: "Generate PIN/code",   subText: "App creates time-based access code",  iconName: "device" },
      { stepNumber: 2, title: "Validate offline",    subText: "Device checks code locally",           iconName: "lock"   },
      { stepNumber: 3, title: "Grant / Deny access", subText: "Door unlocks or stays locked",         iconName: "check"  },
    ],
  },
];
```

---

## 13. Implementation Notes

- Sử dụng Server Component — không cần `"use client"` trừ khi cần Intersection Observer cho animation
- Nếu cần animation trigger: tách phần animated ra `FlowDiagramClient.tsx` với `"use client"`, phần còn lại vẫn là Server Component
- Arrow connectors: dùng CSS `border` trick hoặc SVG `<line>` inline đơn giản để vẽ mũi tên — không dùng thư viện
- Diagram layout: dùng Tailwind `grid grid-cols-2` (desktop) và `grid-cols-1` (mobile) với `divide-x` làm đường phân cách
- Section `id` là bắt buộc: `<section id="how-it-works" ...>` — đây là anchor target cho FEAT-010
- Tất cả icon dùng `<Image>` từ `next/image` hoặc SVG inline component trong `components/icons/`
