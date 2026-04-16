# FEAT-031: Nút "Download Data Sheet" (Trang Chi tiết sản phẩm)

**Trạng thái:** Ready for Development
**Ưu tiên:** P1
**File implement:** `app/components/products/DatasheetButton.tsx`
**Page file:** `app/(pages)/products/[slug]/page.tsx`

---

## 1. Business Goal

Cho phép khách hàng tiềm năng — đặc biệt là kỹ sư, procurement officer, và decision maker kỹ thuật — tải tài liệu kỹ thuật chi tiết (datasheet) để tự nghiên cứu thông số sản phẩm offline. Đây là tài liệu hỗ trợ quyết định mua quan trọng trong quy trình B2B.

---

## 2. Actors

- **Technical evaluator** — kỹ sư hoặc IT người cần thông số kỹ thuật đầy đủ.
- **Procurement officer** — người so sánh spec để ra quyết định mua.
- **Decision maker** — muốn lưu tài liệu để chia sẻ nội bộ.

---

## 3. Preconditions

- `ProductDetail.datasheetUrl` không phải `null` và là URL hợp lệ (internal path hoặc CDN URL).
- File PDF tồn tại tại URL đã cấu hình.
- Nút chỉ hiển thị khi `datasheetUrl !== null`.

---

## 4. Main Flow

1. Kiểm tra `datasheetUrl !== null` — nếu null, không render nút.
2. Render nút **"Download Data Sheet"** với icon download.
3. Người dùng click nút:
   a. Nếu PDF là internal path → trigger download trực tiếp (attribute `download`).
   b. Nếu PDF là external URL → mở tab mới `target="_blank" rel="noopener noreferrer"`.
4. Trình duyệt xử lý download hoặc mở file trong tab mới.

---

## 5. UI Specification

### Layout

- Nút render **trong button group** của `ProductCTASection` (FEAT-030) — là secondary action.
- Cũng có thể render độc lập trong `ProductHero` (FEAT-025) nếu hero layout có không gian.
- Kích thước: `padding: 12px 24px`, khớp với primary button height.
- Icon: download arrow SVG, size 16×16px, margin-right: 8px.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Button background (default) | `transparent` |
| Button border | `1px solid #E8614A` |
| Button text | `#E8614A` |
| Button icon | `#E8614A` |
| Button hover background | `rgba(232,97,74,0.06)` |
| Button hover border | `#E8614A` |
| Button active/press | `rgba(232,97,74,0.12)` |
| Disabled background | `transparent` |
| Disabled border | `rgba(0,0,0,0.2)` |
| Disabled text | `rgba(0,0,0,0.35)` |

### Typography

| Yếu tố | Style |
|---|---|
| Button label | `font-size: 15px`, `font-weight: 500`, `font-family: system sans-serif`, `letter-spacing: 0.01em` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Button | Border + text color opacity animate | Hover | 150ms |
| Button | Background fill | Hover | 150ms |
| Button | Scale press (1 → 0.98) | Active/click | 100ms |
| Download icon | TranslateY (0 → 3px → 0) bounce | Click | 400ms |
| Button | Opacity 0.5 + pointer-events none | Loading state (rare) | — |

---

## 7. Business Rules

- Nút **ẩn hoàn toàn** khi `datasheetUrl === null` — không render disabled state.
- PDF internal path (`/pdfs/[product]-datasheet.pdf`): dùng `<a href download>`.
- PDF external URL (CDN): dùng `<a href target="_blank" rel="noopener noreferrer">`, không dùng `download` attribute.
- Tên file download (nếu internal): `[product-slug]-datasheet.pdf` — lowercase, hyphen.
- Nút luôn là secondary style — không bao giờ dùng primary cam filled cho action này.
- Click event không gọi API — download xử lý bởi browser natively.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| `datasheetUrl === null` | Ẩn nút hoàn toàn, không render gì |
| PDF URL không tồn tại (404) | Browser hiện lỗi tự nhiên (không custom handle) |
| PDF URL trả về không phải PDF | Browser xử lý theo MIME type — không can thiệp |
| Người dùng click nhiều lần nhanh | Mỗi click mở 1 download/tab — chấp nhận được, không throttle |
| File PDF quá lớn (>50MB) | Vẫn trigger download — không có size limit ở frontend |
| Browser chặn popup | Nếu external URL, browser có thể chặn tab mới — không xử lý thêm |

---

## 9. Security Requirements

- `datasheetUrl` validate là URL hợp lệ trước khi render trong `href`.
- External URL: chỉ cho phép allowlist domain (ví dụ: CDN domain của igloo, `*.igloocompany.com`).
- Không redirect qua unknown domains.
- `rel="noopener noreferrer"` bắt buộc với `target="_blank"`.
- Không log hay track URL datasheet ở client-side trừ khi có analytics event riêng.

---

## 10. Acceptance Criteria

- [ ] `datasheetUrl === null` → nút không render.
- [ ] `datasheetUrl` hợp lệ → nút "Download Data Sheet" hiển thị.
- [ ] Nút style: transparent background, cam border, cam text.
- [ ] Icon download hiển thị bên trái label.
- [ ] Internal URL → click trigger browser download.
- [ ] External URL → mở tab mới với `rel="noopener noreferrer"`.
- [ ] Hover effect: background fill nhẹ.
- [ ] Click animation: icon bounce + button press.
- [ ] TypeScript strict — không có `any`.
- [ ] `aria-label` đầy đủ: "Download [Product Name] Data Sheet".

---

## 11. Assets cần thiết

- Download icon SVG: `components/ui/icons/DownloadIcon.tsx` — nếu chưa có, tạo mới.
- PDF files: `public/pdfs/[slug]-datasheet.pdf` — cung cấp bởi team nội dung/marketing.

---

## 12. Data Structure

```typescript
interface DatasheetButtonProps {
  datasheetUrl: string | null;    // null → không render
  productName: string;            // Dùng trong aria-label
  productSlug: string;            // Dùng làm download filename
}

// Helper để xác định internal vs external:
function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

// Trong ProductDetail (FEAT-025):
interface ProductDetail {
  // ...
  datasheetUrl: string | null;
}
```

---

## 13. Implementation Notes

- Component này là pure presentational — render `<a>` tag với đúng attributes.
- Không cần `"use client"` — là Server Component.
- Nếu internal: `<a href={datasheetUrl} download={`${productSlug}-datasheet.pdf`}>`.
- Nếu external: `<a href={datasheetUrl} target="_blank" rel="noopener noreferrer">`.
- `aria-label`: `Download ${productName} Data Sheet` — quan trọng cho screen reader.
- Icon: `<DownloadIcon aria-hidden="true" className="w-4 h-4" />`.
- Tailwind classes: `inline-flex items-center gap-2 border border-[#E8614A] text-[#E8614A] hover:bg-[#E8614A]/[0.06] active:bg-[#E8614A]/[0.12] px-6 py-3 rounded transition-colors duration-150`.
- Component được import và dùng bởi `ProductCTASection` (FEAT-030) và `ProductHero` (FEAT-025).
