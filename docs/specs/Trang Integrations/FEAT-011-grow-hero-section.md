# FEAT-011: Grow from 1 to 10,000 properties — Hero Section

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/integrations/IntegrationsHero.tsx`
**Page file:** `app/(pages)/integrations/page.tsx`

---

## 1. Business Goal

Nhấn mạnh khả năng mở rộng nhanh chóng và linh hoạt của giải pháp igloo — từ 1 đến 10,000 bất động sản mà không cần đội ngũ phát triển full stack — nhằm thu hút doanh nghiệp đang ở giai đoạn tăng trưởng và tìm kiếm giải pháp scale hiệu quả.

---

## 2. Actors

- **Visitor doanh nghiệp đang mở rộng quy mô** — startup, SME bất động sản muốn scale nhanh
- **Potential B2B User cần giải pháp tích hợp nhanh** — CTO, product manager tìm kiếm nền tảng phần mềm

---

## 3. Preconditions

- Trang Integrations (`/integrations`) load thành công trên HTTPS
- Section là phần đầu tiên (hero) của trang Integrations — hiển thị above the fold

---

## 4. Main Flow

1. Người dùng truy cập trang Integrations (`/integrations`)
2. Hệ thống hiển thị hero section với:
   - Tiêu đề lớn: `"GROW FROM 1 to 10,000 properties in no time"`
   - Mô tả ngắn: giải thích giá trị cốt lõi về khả năng scale
3. Phần này đứng yên tĩnh — không có animation phức tạp, không fetch data
4. Người dùng đọc và cuộn xuống xem các phần tiếp theo (FEAT-012, FEAT-013, FEAT-014)

---

## 5. UI Specification

### Layout

- **Section container:** `width: 100%`, padding `96px 40px 80px`, background gradient hoặc tối
- **Nội dung:** căn giữa, max-width `760px`, margin `0 auto`
- **Tiêu đề + mô tả:** stack dọc, căn giữa (text-align center)
- Không có ảnh nền nặng — dùng CSS gradient/color để đảm bảo LCP nhanh

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền section | `#0f0f0f` (tối, tương tự Hero Banner) |
| Tiêu đề | `#ffffff` |
| Từ `"10,000"` hoặc accent | `#E8614A` (primary) |
| Mô tả | `rgba(255,255,255,0.65)` |
| Subtle glow phía sau tiêu đề (tùy chọn) | `radial-gradient(ellipse 600px 200px at 50% 50%, rgba(232,97,74,0.10), transparent)` |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề H1 | `Playfair Display`, bold, `3rem` desktop / `2rem` tablet / `1.6rem` mobile, line-height 1.15, uppercase |
| Từ `"10,000"` | color `#E8614A`, có thể dùng italic serif để nổi bật |
| Mô tả (body) | `1.05rem`, line-height 1.75, color `rgba(255,255,255,0.65)`, max-width `600px` |

### Nội dung text cố định

**Tiêu đề:**
```
GROW FROM 1 to 10,000 properties in no time
```

**Mô tả:**
```
Need a smart lock ecosystem that scales with you? With igloo's friendly,
easy-to-use software, no full stack development team needed — grow from
1 to 100,000 properties fast.
```

> Lưu ý: Mô tả dùng con số `100,000` (không phải `10,000`) theo đúng raw spec nguồn.

### Responsive

| Breakpoint | Tiêu đề size | Padding |
|---|---|---|
| Desktop (≥1024px) | `3rem` | `96px 40px 80px` |
| Tablet (768px–1023px) | `2.2rem` | `72px 32px 64px` |
| Mobile (≤767px) | `1.75rem` | `64px 24px 48px` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Tiêu đề H1 | `fadeUp` | Component mount | 0.7s |
| Mô tả | `fadeUp` | Component mount | 0.7s, delay 0.15s |

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 7. Business Rules

- Tiêu đề và mô tả phải chính xác như đã định nghĩa — không được tự ý thay đổi nội dung
- Section nằm đầu trang Integrations — đây là điểm tiếp xúc đầu tiên với visitor
- Nền tối (dark) để phân biệt rõ với các section bên dưới (thường có nền sáng)
- Không có CTA button trong section này (CTA riêng ở FEAT-014)
- Không có dữ liệu động — toàn bộ hardcode

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Font Playfair Display không load | Fallback sang `Georgia, serif` — tiêu đề vẫn đọc được |
| JavaScript tắt | Section hiển thị đầy đủ tĩnh — không animation nhưng nội dung đủ |
| Màn hình rất hẹp (≤320px) | Font scale nhỏ nhất `1.4rem`, padding `48px 16px` |
| Text quá dài trên mobile | Tự xuống dòng, không overflow |

---

## 9. Security Requirements

- Không có dữ liệu nhạy cảm
- Không có form hay input trong section này
- Không dùng `dangerouslySetInnerHTML`

---

## 10. Acceptance Criteria

- [ ] Section hiển thị đúng nội dung tiêu đề: `"GROW FROM 1 to 10,000 properties in no time"`
- [ ] Tiêu đề dùng font `Playfair Display`, bold, uppercase
- [ ] Mô tả hiển thị đúng nội dung đã quy định
- [ ] Nền tối (`#0f0f0f`), chữ trắng và cam theo đúng design system
- [ ] Section là phần đầu tiên (top) của trang Integrations
- [ ] Responsive: font scale đúng theo breakpoint
- [ ] Animation fadeUp khi mount
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ Tailwind className)
- [ ] Nội dung không bị cắt hoặc overflow trên bất kỳ viewport nào

---

## 13. Implementation Notes

- Server Component — không cần `"use client"` (không có state hoặc event handler)
- Nếu cần animation fadeUp: dùng CSS animation với class được áp ngay (không cần JS trigger) hoặc tách thành `"use client"` component nhỏ
- Chữ `"10,000"` có thể wrap trong `<span>` với Tailwind class `text-[#E8614A]` để tô màu mà không phá vỡ semantic của heading
- Tiêu đề dùng `<h1>` vì đây là hero của trang — đảm bảo SEO heading hierarchy đúng
- Không cần `aria-label` thêm vì text đã đủ rõ ràng
