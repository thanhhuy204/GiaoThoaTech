# FEAT-013: Danh sách Key features (6 bullet)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1 — Cần có trước khi launch
**File implement:** `app/components/integrations/KeyFeatures.tsx`
**Page file:** `app/(pages)/integrations/page.tsx`

---

## 1. Business Goal

Liệt kê súc tích 6 lợi ích kỹ thuật và hỗ trợ chính của giải pháp tích hợp igloo, giúp khách hàng doanh nghiệp và kỹ sư thấy rõ lý do chọn igloo thay vì giải pháp khác (dễ dùng, không cần big team, scale nhanh, có hỗ trợ tận tâm), từ đó tăng khả năng liên hệ demo.

---

## 2. Actors

- **Visitor doanh nghiệp cần tích hợp API** — CTO, tech lead đánh giá về độ phức tạp kỹ thuật
- **Potential B2B User quan tâm lợi ích kỹ thuật** — developer, product manager cần biết support level

---

## 3. Preconditions

- Trang Integrations (`/integrations`) load thành công trên HTTPS
- Section nằm bên dưới FEAT-012 (4 khối giải pháp) trên trang Integrations

---

## 4. Main Flow

1. Người dùng cuộn xuống trang Integrations, thấy phần Key features
2. Hệ thống hiển thị tiêu đề: `"Key features"`
3. Hiển thị danh sách 6 bullet theo thứ tự cố định:
   1. Super simple documentation and easy to use API
   2. Minimal Coding Required
   3. Scale Fast
   4. Don't need full stack development team to get started
   5. Dedicated Account Manager
   6. 24/7 Customer Support
4. Mỗi bullet có icon check màu cam phía trước
5. Không có tương tác — phần trình bày tĩnh

---

## 5. UI Specification

### Layout

- **Section container:** `width: 100%`, padding `80px 40px`, background `#f9f9f9`
- **Section header:** căn trái (hoặc căn giữa — tùy layout tổng thể trang), margin-bottom `40px`
- **Danh sách bullet:**
  - `display: grid`, 2 cột desktop (≥768px), 1 cột mobile (≤767px)
  - Gap: `16px` vertical, `40px` horizontal (giữa 2 cột)
  - Mỗi item: `display: flex`, align-items `flex-start`, gap `12px`
- **Tùy chọn layout:** Section có thể chia 2 cột lớn: bên trái là heading + description ngắn, bên phải là 6 bullet — tùy context design tổng thể

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#f9f9f9` |
| Tiêu đề section H2 | `#0f0f0f` |
| Check icon | `#E8614A` |
| Check icon background (circle, tùy chọn) | `rgba(232,97,74,0.1)` |
| Text bullet | `#1a1a1a` |
| Đường viền trái section (accent line, tùy chọn) | `#E8614A` |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề section H2 | `Playfair Display`, bold, `2.2rem`, line-height 1.3 |
| Bullet text | `0.95rem`, font-weight `500`, color `#1a1a1a`, line-height 1.5 |

### Bullet Item Component

```
Item:
  display: flex
  align-items: flex-start
  gap: 12px
  padding: 4px 0

Check icon wrapper:
  width: 22px
  height: 22px
  border-radius: 50%
  background: rgba(232,97,74,0.10)
  display: flex
  align-items: center
  justify-content: center
  flex-shrink: 0
  margin-top: 1px   (vertical align với dòng text đầu)

Check icon (SVG):
  width: 12px
  height: 12px
  color: #E8614A

Text:
  flex: 1
```

### Danh sách 6 bullet (nội dung cố định)

| # | Nội dung |
|---|---|
| 1 | Super simple documentation and easy to use API |
| 2 | Minimal Coding Required |
| 3 | Scale Fast |
| 4 | Don't need full stack development team to get started |
| 5 | Dedicated Account Manager |
| 6 | 24/7 Customer Support |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Tiêu đề H2 | `fadeUp` | Scroll into view | 0.7s |
| Bullet items (stagger) | `fadeUp` | Scroll into view | 0.5s + delay 0.06s mỗi item |

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 7. Business Rules

- Danh sách đúng 6 bullet — không thêm, không bớt
- Nội dung từng bullet chính xác 100% như đã định nghĩa — không paraphrase
- Thứ tự cố định từ 1 đến 6
- Mỗi bullet bắt buộc có icon check để tạo visual cue tích cực (thay vì plain bullet point)
- Icon check dùng SVG inline — không dùng Unicode character `✓` hay emoji

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| JavaScript tắt | Danh sách hiển thị đầy đủ tĩnh, không animation — chấp nhận được |
| Font Playfair Display không load | Fallback `Georgia, serif` — heading vẫn đọc được |
| Màn hình rất hẹp (≤320px) | 1 cột, padding `48px 16px`, font giảm nhẹ |
| Text bullet quá dài wrap | Wrap tự nhiên, icon check vẫn align-top đúng |

---

## 9. Security Requirements

- Không có form, input hay dữ liệu nhạy cảm
- Không dùng `dangerouslySetInnerHTML`
- Toàn bộ content hardcode, không fetch từ API

---

## 10. Acceptance Criteria

- [ ] Section hiển thị tiêu đề `"Key features"` đúng font `Playfair Display`
- [ ] Hiển thị đúng 6 bullet theo thứ tự quy định
- [ ] Nội dung từng bullet chính xác 100%
- [ ] Mỗi bullet có icon check SVG màu cam (`#E8614A`)
- [ ] Grid 2 cột desktop, 1 cột mobile
- [ ] Animation fadeUp + stagger khi scroll vào viewport
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ Tailwind className)
- [ ] Accessibility: dùng `<ul>` + `<li>` semantic, icon check có `aria-hidden="true"`

---

## 12. Data Structure

```typescript
interface KeyFeature {
  id: string;
  text: string;
  order: number; // 1–6
}

const KEY_FEATURES: KeyFeature[] = [
  { id: "simple-docs",      text: "Super simple documentation and easy to use API",          order: 1 },
  { id: "minimal-coding",   text: "Minimal Coding Required",                                  order: 2 },
  { id: "scale-fast",       text: "Scale Fast",                                               order: 3 },
  { id: "no-fullstack",     text: "Don't need full stack development team to get started",    order: 4 },
  { id: "account-manager",  text: "Dedicated Account Manager",                                order: 5 },
  { id: "support-247",      text: "24/7 Customer Support",                                    order: 6 },
];
```

---

## 13. Implementation Notes

- Server Component — không cần `"use client"` (không có state hay event handler)
- Icon check: dùng SVG component tự viết trong `components/icons/CheckIcon.tsx` — không import từ thư viện icon ngoài
- Dùng `<ul role="list">` + `<li>` cho semantic HTML đúng chuẩn accessibility
- Icon có `aria-hidden="true"` vì text bullet đã đủ nghĩa, không cần label riêng cho icon
- Nếu cần stagger animation: tách thành `"use client"` component với Intersection Observer
- Data export từ `lib/constants/integrations.ts` cùng file với FEAT-012 data
