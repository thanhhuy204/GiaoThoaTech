# FEAT-059: Access Control — Meet Our Products Section

**Trạng thái:** Planned
**Ưu tiên:** P0
**File implement:** `app/components/solutions/access-control/AccessControlPage.tsx`

---

## 1. Business Goal

Giới thiệu các sản phẩm phần cứng và phần mềm trong hệ sinh thái Access Control của igloohome. Khuyến khích khách hàng tìm hiểu sâu từng sản phẩm.

---

## 2. UI Specification

### Layout
- Nền: gradient tối — `linear-gradient(135deg, #0f0f0f 0%, #2a1510 40%, #1a0c08 60%, #0f0f0f 100%)`
- Padding: `80px 0`
- Label + Headline + Subtext căn giữa phía trên
- Grid sản phẩm: `2 cột × 1 hàng` (hoặc 1 cột trên mobile)

### Nội dung header
- **sectionLabel:** `"Our Products"`
- **productsTitle:** `"Meet our Access Control Products"`
- **productsSubtitle:** `"Hardware and software built to work together, seamlessly."`

### Card 1 — Switch Door Controller
- **Hình ảnh:** `public/images/Solutions/access-contro/product/switch.webp`
- **productName:** `"Switch Door Controller"`
- **productTag:** `"Super Compact and Adaptable"`
- **productDesc:** `"The Switch is a compact and adaptable door controller that brings 9–24V electric locks and access devices into the igloo ecosystem."`
- **productCta:** `"Learn More"`
- **href:** `/products/switch`

### Card 2 — iglooworks Software
- **Hình ảnh:** `public/images/Solutions/access-contro/product/iglooworks-keypad-2.webp`
- **product2Name:** `"iglooworks"`
- **product2Tag:** `"igloo's Software"`
- **product2Desc:** `"Streamline operations using a unified web platform that offers seamless access control and security management. Integrate security with advanced data insights and expanded capabilities."`
- **product2Cta:** `"Explore iglooworks"`
- **href:** `/products/iglooworks`

### Màu sắc
| Yếu tố | Màu |
|---|---|
| Section bg | gradient đen → đỏ/cam ở giữa → đen |
| Label | `#E8614A` |
| Headline | `#ffffff` |
| Subtext | `rgba(255,255,255,0.6)` |
| Card bg | `rgba(255,255,255,0.05)` + `border: 1px solid rgba(255,255,255,0.1)` |
| Card title | `#ffffff` |
| Card tag | `#E8614A` |
| Card desc | `rgba(255,255,255,0.7)` |
| CTA button | `#E8614A` nền đặc |

### Typography
| Yếu tố | Style |
|---|---|
| Headline | `clamp(1.8rem, 3.5vw, 2.6rem)`, font-weight 700 |
| Card title | `1.3rem`, font-weight 700 |
| Card tag | `0.78rem`, font-weight 600, uppercase |
| Card desc | `0.93rem`, line-height 1.7 |

---

## 3. Business Rules

- Card có `border-radius: 16px`, `overflow: hidden`
- Hover card: subtle glow `box-shadow: 0 0 32px rgba(232,97,74,0.15)`
- Responsive: 2 cột → 1 cột trên mobile `<768px`

---

## 4. Assets

| Asset | Đường dẫn |
|---|---|
| Switch product | `public/images/Solutions/access-contro/product/switch.webp` |
| iglooworks keypad | `public/images/Solutions/access-contro/product/iglooworks-keypad-2.webp` |

---

## 5. Acceptance Criteria

- [ ] 2 card hiển thị cạnh nhau trên desktop
- [ ] Gradient nền hiển thị đúng
- [ ] Hover effect hoạt động
- [ ] CTA navigate đúng URL
- [ ] Responsive 1 cột trên mobile
