# FEAT-065: Trang Chính sách Bảo mật

**Route:** `/[locale]/privacy-policy`
**File implement:** `app/[locale]/privacy-policy/page.tsx` + `privacy-policy-content.tsx` + `privacy-policy.css`
**Business Spec:** `docs/spec-business/Trang Privacy Policy/# Feature Trang Chính sách bảo mật.md`

---

## 1. Mục đích màn hình

Hiển thị toàn bộ nội dung Chính sách Bảo mật của Giaothoatech theo cấu trúc accordion, giúp người dùng dễ điều hướng, xây dựng lòng tin và đáp ứng yêu cầu pháp lý PDPA/GDPR.

---

## 2. Cấu trúc Component

```
PrivacyPolicyContent ('use client')
├── Navbar                        ← dùng chung
├── <main>
│   ├── HeroHeader                ← tiêu đề + ngày hiệu lực
│   ├── AccordionList             ← danh sách 10 phần
│   │   └── AccordionItem × 10   ← mỗi phần có title + body
│   └── ContactBanner             ← email liên hệ DPO
└── Footer                        ← dùng chung
```

---

## 3. Layout

```
┌──────────────────────────────────────────┐
│ Navbar                                   │
├──────────────────────────────────────────┤
│  [Hero Header]                           │
│  Chính sách Bảo mật  — 22/03/2025        │
├──────────────────────────────────────────┤
│         AccordionList (max-width 800px)  │
│  ┌──────────────────────────────────┐    │
│  │ 01  GIỚI THIỆU              [▼]  │    │
│  ├──────────────────────────────────┤    │
│  │ 02  CÂU HỎI...              [▼]  │    │
│  ├──────────────────────────────────┤    │
│  │ ...                              │    │
│  └──────────────────────────────────┘    │
├──────────────────────────────────────────┤
│  ContactBanner: contact@giaothoatech.cloud│
├──────────────────────────────────────────┤
│ Footer                                   │
└──────────────────────────────────────────┘
```

- Layout đơn cột, `max-width: 800px`, căn giữa
- Mobile: padding thu hẹp, font ≥16px, tap target ≥44px

---

## 4. Components Chi tiết

### 4.1 HeroHeader
```
[Label nhỏ màu đỏ]  "Pháp lý"
[H1]                "Chính sách Bảo mật"
[Subtitle]          "Có hiệu lực từ ngày 22 tháng 3 năm 2025"
```
- Nền: xám rất nhạt `#f8f8f6`
- Căn trái, padding-top: 80px (bù navbar)

### 4.2 AccordionItem
```
┌──────────────────────────────────────────────────┐
│ [Số thứ tự]  [Tiêu đề in hoa]          [▼ / ▲]  │
├──────────────────────────────────────────────────┤
│ [Nội dung — chỉ hiển thị khi mở]                │
│  paragraph / danh sách / bảng                    │
└──────────────────────────────────────────────────┘
```
- **Mặc định: tất cả đóng** — chỉ hiển thị số thứ tự + tiêu đề
- Click tiêu đề → mở/đóng nội dung chi tiết
- Animation: `grid-template-rows: 0fr → 1fr` (CSS transition 0.3s)
- **Nhiều accordion có thể mở cùng lúc** (không exclusive)
- Border-bottom giữa các item
- Tiêu đề: font-weight 600, uppercase, letter-spacing 0.5px
- Arrow: rotate 180° khi mở, màu đỏ `#E8614A`

### 4.3 ContactBanner
```
┌─────────────────────────────────────────────────┐
│ Bạn có câu hỏi về quyền riêng tư?               │
│ Liên hệ Cán bộ Bảo vệ Dữ liệu:                 │
│ 📧 contact@giaothoatech.cloud  [Gửi email →]    │
└─────────────────────────────────────────────────┘
```
- Nền: `#1a1a1a` (tối)
- Text: trắng
- Nút: màu đỏ `#E8614A`
- Email: `<a href="mailto:contact@giaothoatech.cloud">`

---

## 5. Nội dung 10 Accordion Sections

| # | Key | Tiêu đề |
|---|-----|---------|
| 1 | `intro` | GIỚI THIỆU |
| 2 | `questions` | CÂU HỎI VỀ CHÍNH SÁCH BẢO MẬT NÀY |
| 3 | `dataCollected` | GIAOTHOATECH THU THẬP NHỮNG DỮ LIỆU CÁ NHÂN NÀO VỀ BẠN? |
| 4 | `howCollected` | GIAOTHOATECH THU THẬP DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ THẾ NÀO? |
| 5 | `purpose` | GIAOTHOATECH SỬ DỤNG DỮ LIỆU CÁ NHÂN CỦA BẠN VÀO MỤC ĐÍCH GÌ? |
| 6 | `sharing` | GIAOTHOATECH CHIA SẺ DỮ LIỆU CÁ NHÂN CỦA BẠN VỚI AI? |
| 7 | `access` | YÊU CẦU TRUY CẬP, CHỈNH SỬA VÀ/HOẶC CHUYỂN DỮ LIỆU CÁ NHÂN |
| 8 | `protection` | GIAOTHOATECH BẢO VỆ DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ THẾ NÀO? |
| 9 | `eea` | CÁ NHÂN CƯ TRÚ TẠI KHU VỰC KINH TẾ CHÂU ÂU ("EEA") VÀ VƯƠNG QUỐC ANH |
| 10 | `updates` | CẬP NHẬT CHÍNH SÁCH BẢO MẬT NÀY |

---

## 6. UI Behavior

| Hành động | Kết quả |
|-----------|---------|
| Trang load | Tất cả accordion đóng, chỉ hiện số thứ tự + tiêu đề |
| Click tiêu đề accordion | Mở rộng / thu gọn nội dung (toggle) |
| Click lại tiêu đề đang mở | Thu gọn |
| Click email ContactBanner | Mở `mailto:contact@giaothoatech.cloud` |

---

## 7. Style

| Token | Giá trị |
|-------|---------|
| Màu accent | `#E8614A` (đỏ cam) |
| Màu text chính | `#1a1a1a` |
| Màu text phụ | `#555` |
| Nền trang | `#ffffff` |
| Nền header | `#f8f8f6` |
| Nền ContactBanner | `#1a1a1a` |
| Font tiêu đề | `clamp(2rem, 4vw, 3rem)`, weight 700 |
| Font accordion title | `0.85rem`, uppercase, weight 600, letter-spacing 0.5px |
| Font body | `1rem`, line-height 1.75 |
| Border accordion | `1px solid #e5e5e3` |
| Radius card | `12px` |
| Transition accordion | `grid-template-rows 0.3s ease` |

---

## 8. Responsive Breakpoints

| Breakpoint | Thay đổi |
|------------|---------|
| ≥1024px | Sidebar TOC sticky trái, content chiếm 75% |
| 768–1023px | Sidebar ẩn, TOC dạng row đầu trang |
| <768px | TOC scroll ngang, accordion full width, font ≥16px, nút min-height 44px |

---

## 9. Edge Cases → UI Handling

| Edge Case | UI xử lý |
|-----------|----------|
| Trang dài, nhiều nội dung | TOC sticky giúp điều hướng nhanh |
| Mobile — tap accordion | Min tap target 44×44px, padding đủ |
| Nhiều accordion mở cùng lúc | CSS grid-rows, không JS height calc → không lag |
| Kết nối chậm | Trang là static content, load nhanh |
| Muốn quay lại | Nút "← Quay về trang chủ" cố định ở header |
| Thay đổi chính sách | Banner thông báo nổi bật màu vàng/đỏ ở đầu trang |

---

## 10. Assets

| Thành phần | Giá trị |
|------------|---------|
| Logo Navbar | `/images/logo/logo1.jpg` |
| Logo Footer | `/images/logo/Logo-footer.png` |
| Email DPO | `contact@giaothoatech.cloud` |

---

## 11. Mapping Business Spec → UI

| Business Rule | UI Implementation |
|---------------|-------------------|
| Tiêu đề + ngày hiệu lực | `HeroHeader` — H1 + subtitle ngày |
| Accordion cho tất cả phần | `AccordionList` + `AccordionItem` × 10 |
| Ngôn ngữ đơn giản | Body text font 1rem, line-height 1.75 |
| Email DPO hiển thị rõ | `ContactBanner` + `mailto:` link |
| Responsive mobile | Breakpoints 768/1024px, TOC adaptive |
| Thông báo khi có thay đổi | Banner cảnh báo (tùy chọn, điều kiện từ props) |
| Quay lại trang trước | Nút "← Quay về trang chủ" trong HeroHeader |
| TOC điều hướng nhanh | Sidebar sticky desktop / scroll ngang mobile |

---

## 12. Acceptance Criteria Checklist

- [ ] AC-01: Link footer → trang load đúng, tiêu đề + ngày hiệu lực hiển thị
- [ ] AC-02: Click accordion title → mở/đóng, các phần khác độc lập
- [ ] AC-03: Đủ 10 phần theo thứ tự đúng
- [ ] AC-05: Email `contact@giaothoatech.cloud` click được, mở mailto
- [ ] AC-06: Mobile — accordion mượt, font ≥16px, tap target ≥44px
- [ ] AC-07: TOC cho phép nhảy nhanh đến từng phần
