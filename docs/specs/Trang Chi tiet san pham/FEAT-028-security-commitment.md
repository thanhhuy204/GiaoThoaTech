# FEAT-028: Khối cam kết bảo mật (Trang Chi tiết sản phẩm)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1
**File implement:** `app/components/products/SecurityCommitment.tsx`
**Page file:** `app/(pages)/products/[slug]/page.tsx`

---

## 1. Business Goal

Nhấn mạnh cam kết bảo vệ dữ liệu người dùng (GDPR, không bán dữ liệu, lưu trữ an toàn), xây dựng lòng tin đặc biệt cho khách hàng doanh nghiệp và tổ chức lớn vốn rất nhạy cảm với vấn đề dữ liệu. Khối này cần truyền tải thông điệp dứt khoát, không thỏa hiệp.

---

## 2. Actors

- **Enterprise decision maker** — người ra quyết định mua tại doanh nghiệp, cần đảm bảo tuân thủ compliance.
- **IT/Security officer** — người đánh giá rủi ro bảo mật của giải pháp.
- **Visitor thông thường** — được reassure về quyền riêng tư cá nhân.

---

## 3. Preconditions

- Section này render sau `OfflineTechSection` (FEAT-027) trên trang.
- Nội dung section là **cố định** (static content) — không lấy từ API, không thay đổi theo sản phẩm.
- Hiển thị trên tất cả trang chi tiết sản phẩm bất kể slug.

---

## 4. Main Flow

1. Render khối với headline nổi bật: **"Data privacy. Nothing else matters."**
2. Render 3 điểm cam kết chính (dạng badge hoặc inline list):
   - Tuân thủ GDPR đầy đủ
   - Dữ liệu lưu trữ trên AWS Singapore
   - Không bán dữ liệu người dùng cho bên thứ ba
3. Render mô tả ngắn: "Chúng tôi cam kết bảo vệ dữ liệu của bạn theo tiêu chuẩn cao nhất. Mọi thông tin đều được mã hóa và lưu trữ an toàn."
4. (Optional) Render link "Read our Privacy Policy →" dẫn đến `/privacy`.

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
|                                                          |
|  [Shield icon large]                                     |
|                                                          |
|  "Data privacy. Nothing else matters."                   |
|                                                          |
|  "Chúng tôi cam kết bảo vệ dữ liệu của bạn..."         |
|                                                          |
|  [✓ GDPR Compliant]  [✓ AWS Singapore]  [✓ No data sale]|
|                                                          |
|  Read our Privacy Policy →                               |
|                                                          |
+----------------------------------------------------------+
```

- Layout: centered, single column, max-width: 720px, margin auto.
- Section padding: `80px 0` (desktop), `56px 24px` (mobile).
- Background: dark — `#0f0f0f` hoặc deep navy để tạo contrast mạnh.
- Badge list: `display: flex`, `flex-wrap: wrap`, `justify-content: center`, `gap: 16px`.
- Badge: `border-radius: 100px` (pill), `padding: 8px 20px`.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Section background | `#0f0f0f` |
| Shield icon | `#E8614A` |
| Headline | `#ffffff` |
| Description | `rgba(255,255,255,0.65)` |
| Badge background | `rgba(255,255,255,0.08)` |
| Badge border | `rgba(255,255,255,0.15)` |
| Badge text | `rgba(255,255,255,0.9)` |
| Badge check icon | `#E8614A` |
| Privacy policy link | `#E8614A` |
| Privacy policy link hover | `rgba(232,97,74,0.8)` |

### Typography

| Yếu tố | Style |
|---|---|
| Headline | `Playfair Display`, `font-size: clamp(2rem, 4vw, 3rem)`, `font-weight: 700`, `color: #ffffff`, `text-align: center` |
| Description | `font-size: 17px`, `line-height: 1.7`, `text-align: center`, `color: rgba(255,255,255,0.65)` |
| Badge text | `font-size: 14px`, `font-weight: 500`, `color: rgba(255,255,255,0.9)` |
| Privacy policy link | `font-size: 15px`, `font-weight: 500`, `text-decoration: underline` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Shield icon | Fade in + scale (0.8 → 1) | IntersectionObserver | 500ms, ease-out |
| Headline | Fade in từ bottom | IntersectionObserver, delay 100ms | 400ms |
| Description | Fade in | IntersectionObserver, delay 200ms | 400ms |
| Badges | Staggered fade in | IntersectionObserver, delay 80ms each | 300ms |
| Privacy link | Underline animate (left → right) | Hover | 200ms |

---

## 7. Business Rules

- **Nội dung headline cố định:** "Data privacy. Nothing else matters." — không thay đổi, không lấy từ CMS.
- **3 điểm cam kết cố định** và phải hiển thị đúng, đầy đủ:
  1. Tuân thủ GDPR
  2. Lưu trữ AWS Singapore
  3. Không bán dữ liệu
- Section hiển thị trên **mọi** trang chi tiết sản phẩm (không phụ thuộc slug hay config sản phẩm).
- Link "Privacy Policy" là internal link — `/privacy` — không mở tab mới.
- Không bỏ qua hoặc thay thế bất kỳ điểm nào trong 3 cam kết.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Không có link `/privacy` | Ẩn link, giữ nguyên 3 badges và nội dung |
| Màn hình nhỏ (<360px) | Badges stack thành 1 cột, text-align center |
| High contrast mode (OS) | Đảm bảo tỉ lệ tương phản đạt WCAG AA (≥4.5:1) trên nền tối |

---

## 9. Security Requirements

- Nội dung section là static — không có input, không có API call.
- Link Privacy Policy validate đúng internal route, không redirect external.
- Không có form hay user input trong section này.

---

## 10. Acceptance Criteria

- [ ] Headline "Data privacy. Nothing else matters." hiển thị chính xác.
- [ ] 3 badges cam kết đủ: GDPR, AWS Singapore, No data sale.
- [ ] Section background là màu tối `#0f0f0f`.
- [ ] Headline dùng Playfair Display, màu trắng.
- [ ] Shield icon màu `#E8614A`, kích thước lớn (48–64px).
- [ ] Section xuất hiện trên tất cả `/products/[slug]`.
- [ ] Privacy Policy link dẫn đúng `/privacy`.
- [ ] Animations chạy khi scroll vào viewport.
- [ ] WCAG AA contrast ratio đạt trên nền tối.
- [ ] TypeScript strict — không có `any`.

---

## 11. Assets cần thiết

- Shield icon SVG: `components/ui/icons/ShieldIcon.tsx` — nếu chưa có, tạo mới.
- Check icon SVG cho badge: dùng lại `CheckIcon` từ FEAT-026.

---

## 12. Data Structure

```typescript
// Section này là static content, không cần interface từ API.
// Nếu cần i18n hoặc CMS trong tương lai, dùng structure sau:

interface SecurityCommitmentContent {
  headline: string;        // "Data privacy. Nothing else matters."
  description: string;
  badges: SecurityBadge[];
  privacyPolicyHref?: string; // "/privacy" — optional
}

interface SecurityBadge {
  id: string;
  label: string;           // "GDPR Compliant"
  icon?: string;           // "check" — default
}

// Constant trong component:
const SECURITY_CONTENT: SecurityCommitmentContent = {
  headline: "Data privacy. Nothing else matters.",
  description: "Chúng tôi cam kết bảo vệ dữ liệu của bạn theo tiêu chuẩn cao nhất...",
  badges: [
    { id: "gdpr", label: "GDPR Compliant" },
    { id: "aws", label: "AWS Singapore" },
    { id: "no-sale", label: "No Data Sale" },
  ],
  privacyPolicyHref: "/privacy",
};
```

---

## 13. Implementation Notes

- Server Component thuần — content static, không cần `"use client"`.
- Tách `SecurityCommitmentClient.tsx` chỉ nếu cần animation với `IntersectionObserver`.
- Background dark: dùng Tailwind `bg-[#0f0f0f]` với `text-white`.
- Badges: Tailwind `inline-flex items-center gap-2 rounded-full px-5 py-2 border border-white/15 bg-white/[0.08]`.
- Shield icon: render với `width="56" height="56"`, Tailwind `text-[#E8614A]` nếu dùng `currentColor`.
- Section này là pure presentational — không có state, không có effect.
