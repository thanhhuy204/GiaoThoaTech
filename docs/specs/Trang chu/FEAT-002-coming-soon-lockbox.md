# FEAT-002: Coming Soon Lockbox Teaser + Signup Form

**Trạng thái:** Ready for Development
**Ưu tiên:** P0 — Phải có trước khi launch
**File implement:** `app/components/trangchu/Comingsoon.tsx`
**Page file:** `app/page.tsx`

---

## 1. Business Goal

Giới thiệu sản phẩm Lockbox sắp ra mắt, tạo sự chú ý và thu thập email lead chất lượng để xây dựng danh sách chờ (waitlist). Cung cấp ưu tiên đặt hàng khi pre-order mở.

---

## 2. Actors

- **Visitor** — khách truy cập website quan tâm sản phẩm mới
- **Potential User** — chủ nhà cho thuê, quản lý bất động sản, doanh nghiệp cần hộp khóa thông minh
- **Admin** — người quản lý danh sách waitlist

---

## 3. Preconditions

- Website hoạt động bình thường (HTTPS)
- Trang chủ load thành công
- Backend API sẵn sàng để nhận registration (`POST /api/waitlist`)

---

## 4. Main Flow

1. Người dùng kéo xuống từ Hero Banner, thấy khối Lockbox Teaser
2. Hệ thống hiển thị khối split-layout:
   - **Bên trái:** Hình ảnh Lockbox (sản phẩm thực tế, tay cầm, nền đỏ cam do gradient)
   - **Bên phải:** Content block với tiêu đề, dòng phụ, mô tả và form
3. Hiển thị tiêu đề: `"Tough Protection. Trusted Access"`
4. Hiển thị dòng phụ: `"The igloo Lockbox. Coming Soon."`
5. Hiển thị mô tả dài: `"Be the first to experience it. Sign up for exclusive launch updates — and get priority access to reserve your unit when pre-orders open."`
6. Hiển thị form:
   - Field `Name` (tùy chọn, `type="text"`)
   - Field `Email` (bắt buộc, `type="email"`)
   - Field `Region` (bắt buộc, `type="select"`)
     - Options: `"North America"`, `"EU"`, `"UK"`, `"APAC"`
   - Nút `"Reserve your spot"` (màu cam, primary)
7. Người dùng điền form → nhấn nút
8. Client validate email hợp lệ, region được chọn
9. Submit AJAX → Backend `/api/waitlist` (POST)
10. Success: hiển thị thông báo `"Thank you for subscribing! We'll only contact you with updates about the igloo Lockbox launch."`
11. Error: hiển thị thông báo lỗi inline

---

## 5. UI Specification

### Layout

- **Container:** width `100%`, padding `60px 40px`, background `#ffffff`
- **Inner grid:** 2 columns (image + content)
  - Desktop: `1fr 1fr` (50/50)
  - Tablet: `1fr 1fr` (50/50)
  - Mobile: stack dọc (ảnh trên, content dưới)
- **Image box:** `max-height: 400px`, `object-fit: cover`
- **Content box:** `max-width: 480px`, padding `40px` (left/right), flex column

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Nền khối | `#ffffff` |
| Tiêu đề | `#000000` |
| Dòng phụ | `var(--primary)` / `#E8614A` |
| Mô tả text | `rgba(0,0,0,0.7)` |
| Label form | `rgba(0,0,0,0.65)` |
| Input border | `rgba(0,0,0,0.15)` |
| Input border (focus) | `var(--primary)` / `#E8614A` |
| Input background | `#f8f8f8` |
| Button background | `var(--primary)` |
| Button hover | `#d44f39` (darken) |
| Success message bg | `rgba(76,196,43,0.1)` |
| Success message text | `#4CC42B` |
| Error message bg | `rgba(255,71,87,0.1)` |
| Error message text | `#FF4757` |

### Typography

| Yếu tố | Style |
|---|---|
| Tiêu đề (H2) | `Playfair Display`, bold, `2.5rem`, line-height 1.2 |
| Dòng phụ | `1rem`, bold, letter-spacing `0.05em`, color primary |
| Mô tả | `0.95rem`, line-height 1.6, color mờ |
| Label form | `0.75rem`, uppercase, letter-spacing `0.1em`, font-weight 600 |
| Input text | `0.95rem`, line-height 1.5 |
| Button text | `0.95rem`, font-weight 600, letter-spacing `0.05em` |
| Success/Error message | `0.85rem`, font-weight 500 |

### Form Components

#### Input Base
```
Padding: 12px 16px
Border radius: 4px
Border: 1px solid rgba(0,0,0,0.15)
Font: 0.95rem
Transition: border-color 200ms ease
Focus: border-color var(--primary)
```

#### Select Dropdown
- Styling như input base
- Options font size: `0.95rem`
- Placeholder text: `"Select region..."`

#### Button Submit
```
Padding: 12px 32px
Border radius: 4px
Background: var(--primary)
Color: #ffffff
Font: 0.95rem, 600, letter-spacing 0.05em
Cursor: pointer
Transition: background 200ms ease
Hover: background #d44f39
Disabled: opacity 0.6, cursor not-allowed
```

#### Validation Messages
- `aria-live="polite"`
- Display inline dưới input khi error
- Color: `#FF4757`
- Font size: `0.75rem`

### Responsive Breakpoints

| Device | Layout | Image size | Font scaling |
|---|---|---|---|
| Desktop (≥1024px) | 2 col, side-by-side | 400px height | 100% |
| Tablet (768px-1023px) | 2 col, side-by-side | 350px height | 95% |
| Mobile (≤767px) | 1 col, stack | full width | 90% |

---

## 6. Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Khối teaser | `fadeup` | Mount | 0.7s |
| Form fields | `fadeup` với stagger | Mount | 0.7s + delay-1..3 |
| Success message | `slideup` + `fadeup` | Submit success | 0.5s |
| Error message | `shake` | Validation fail | 0.4s |
| Button loading | Pulse (spinner hoặc text loading) | Submit in-progress | infinite 1s |

**Animation CSS:**
```css
@keyframes fadeup {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

---

## 7. Business Rules

- **Email validation:** RFC 5322 compliant, check format client + server
- **Region required:** Không thể submit nếu không chọn region
- **Name optional:** Người dùng có thể bỏ trống, nhưng nên khuyến khích
- **Throttling:** Giới hạn submit form từ cùng IP/email: max 3 lần/10 phút
- **Confirmation:** Chỉ hiển thị thông báo thành công khi backend trả 200-201
- **Re-submit:** Sau khi success, form reset hoặc disable trong 5 giây
- **Performance:** Form validation + submit <= 50ms latency perceived

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Hình Lockbox không tải | Vùng hình trống nhưng content vẫn hiện (backup: solid color or placeholder) |
| Email đã subscribe (duplicate) | Backend trả `409 Conflict` → hiển thị: `"This email is already on the waitlist. Check your inbox for updates."` |
| Network timeout | Hiển thị lỗi: `"Connection failed. Please try again later."` Nút vẫn clickable |
| Form submit khi offline | Nút disable, hiển thị: `"Please check your connection."` |
| JavaScript tắt | Form vẫn submit (form standard), nhưng không có validation client + spinner loading |
| Region dropdown không open | Fallback: native select HTML5 |
| Very slow connection | Placeholder + skeleton loading cho form |

---

## 9. Security Requirements

- **HTTPS:** Tất cả form submit dùng HTTPS, không HTTP
- **CSRF Protection:** Sử dụng CSRF token (SameSite cookie + token payload)
- **Input Sanitization:** Backend sanitize email, name, region trước lưu
- **Rate Limiting:** Max 3 requests/IP/10 mins
- **Email Verification:** Tùy chọn gửi confirmation link tới email sau waitlist signup
- **No Plaintext Logs:** Không log email hoặc password vào console
- **Data Privacy:** Tuân thủ GDPR — chỉ lưu email + region, xóa sau 12 tháng (nếu chính sách)

---

## 10. Acceptance Criteria

- [ ] Khối split-layout hiển thị đúng (image trái, content phải)
- [ ] Hình Lockbox tải được, responsive trên mobile
- [ ] Tiêu đề `"Tough Protection. Trusted Access"` hiển thị chính xác
- [ ] Dòng phụ `"The igloo Lockbox. Coming Soon."` xuất hiện đúng vị trí
- [ ] Mô tả tường tận, dòng chữ hợp lý
- [ ] Form có 3 fields: Name (optional), Email (required), Region (required)
- [ ] Validate email client-side: format hợp lệ, feedback ngay
- [ ] Validate region required: chọn option trước khi submit
- [ ] Submit form → POST `/api/waitlist` với `{ name?, email, region }`
- [ ] Success: hiển thị thông báo xanh + form reset/disable
- [ ] Error: hiển thị thông báo đỏ, user có thể retry
- [ ] Button loading state: disable + spinner/text "Reserving..." khi submit
- [ ] Responsive: stack dọc trên mobile, form full width
- [ ] Animation: fadeup khi mount, stagger cho fields
- [ ] Không có lỗi TypeScript (`tsc --noEmit`)
- [ ] Không dùng inline style (chỉ className)
- [ ] Accessibility: form labels `<label>`, inputs `aria-label/aria-describedby`, error messages `aria-live`
- [ ] HTTPS enforced, CSRF token included
- [ ] Rate limit backend: max 3/IP/10 mins

---

## 11. Assets cần thiết

| Asset | Đường dẫn | Kích thước | Ghi chú |
|---|---|---|---|
| Lockbox image | `public/images/Products/lockbox.webp` | ~600x400px | Tay cầm, nền cam |
| Fallback image | `public/images/Products/lockbox-fallback.png` | 600x400px | Backup nếu .webp lỗi |

---

## 12. API Specification

### Endpoint: POST /api/waitlist

**Request:**
```json
{
  "name": "John Doe",  // optional
  "email": "john@example.com",  // required
  "region": "North America"  // required
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you for subscribing!",
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "region": "North America",
    "subscribedAt": "2026-03-09T10:30:00Z"
  }
}
```

**Response (409 Conflict - Email exists):**
```json
{
  "success": false,
  "message": "This email is already on the waitlist. Check your inbox for updates.",
  "code": "EMAIL_EXISTS"
}
```

**Response (400 Bad Request - Validation):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "region": "Region is required"
  }
}
```

**Response (429 Too Many Requests - Rate limit):**
```json
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "code": "RATE_LIMITED"
}
```

---

## 13. Implementation Notes

- Use React `useState` for form state (name, email, region, loading, success, error)
- Use `useEffect` để cleanup form state khi component unmount
- Email validation: use regex + HTML5 `type="email"` validation
- Region options hardcoded hoặc từ config constant
- CSRF token: lấy từ cookie tên `csrf-token` hoặc header `X-CSRF-Token`
- Loading state: disable button + show spinner
- Success: reset form after 3s hoặc user ấn lại
- Error retry: user có thể edit + submit lại ngay
