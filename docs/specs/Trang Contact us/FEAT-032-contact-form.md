# FEAT-032: Form liên hệ/demo (Trang Contact us)

**Trạng thái:** Ready for Development
**Ưu tiên:** P0
**File implement:** `app/components/contact/ContactForm.tsx`
**Page file:** `app/(pages)/contact/page.tsx`

---

## 1. Business Goal

Thu thập thông tin chi tiết và chất lượng cao từ khách hàng tiềm năng để đội sales có đủ context liên hệ tư vấn và đặt lịch demo phù hợp. Form đóng vai trò cửa ngõ chuyển đổi visitor → qualified lead, vì vậy phải cân bằng giữa đủ thông tin (để sales qualify) và không quá dài (để không nản).

---

## 2. Actors

- **Visitor B2B** — doanh nghiệp tìm giải pháp quản lý khóa thông minh.
- **Property manager** — quản lý nhiều bất động sản, cần giải pháp access control.
- **IT/Procurement** — người điền form theo yêu cầu của decision maker.

---

## 3. Preconditions

- Trang `/contact` được load, FEAT-034 (reCAPTCHA) đã khởi tạo.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` có trong environment variables.
- API endpoint `POST /api/contact` đang hoạt động.
- (Optional) Nếu người dùng đến từ link có `?ref=product-detail&product=[slug]`, pre-fill context ẩn.

---

## 4. Main Flow

1. Render form với các trường sau:
   - `name` — Text input, required.
   - `workEmail` — Email input, required.
   - `companyName` — Text input, required.
   - `country` — Dropdown (Select), required.
   - `phoneNumber` — Tel input, optional.
   - `unitCount` — Number input, optional ("How many units/access points are you managing?").
   - `profile` — Dropdown (Select), required ("Choose the profile that best describes you").
   - `hearAboutUs` — Dropdown (Select), required ("How did you hear about us?").
   - `projectDescription` — Textarea, required ("Describe your project").
   - `privacyAgreed` — Checkbox, required.
2. Render reCAPTCHA (FEAT-034) ẩn (v3).
3. Người dùng điền các trường required → tick checkbox privacy → click Submit.
4. Frontend validate tất cả trường trước khi gọi API.
5. Nếu valid → lấy reCAPTCHA token → gọi `POST /api/contact`.
6. Thành công → hiện success notification (FEAT-037), ẩn form.
7. Thất bại → hiện error message inline hoặc global error banner.

---

## 5. UI Specification

### Layout

```
+----------------------------------------------------------+
| H1: Contact Us / Get a Demo                              |
| Sub: Our team will get back to you within 24 hours.     |
+----------------------------------------------------------+
| [Name *]                  | [Work Email *]               |
+---------------------------+------------------------------+
| [Company Name *]          | [Country * (dropdown)]       |
+---------------------------+------------------------------+
| [Phone Number]            | [Unit Count]                 |
+---------------------------+------------------------------+
| [Profile * (dropdown)]                                   |
+----------------------------------------------------------+
| [How did you hear about us * (dropdown)]                 |
+----------------------------------------------------------+
| [Describe your project * (textarea, 4 rows)]            |
+----------------------------------------------------------+
| [✓] I agree to the Privacy Policy                       |
+----------------------------------------------------------+
| [reCAPTCHA badge — bottom right]                        |
+----------------------------------------------------------+
| [        Submit        ]                                 |
+----------------------------------------------------------+
```

- Layout: 2 cột trên desktop (≥768px), 1 cột trên mobile.
- Form max-width: 720px (standalone) hoặc full-width trong layout 2 cột trang Contact.
- Input padding: `12px 16px`, `border-radius: 4px`.
- Textarea: min-height: 120px, resize: vertical.
- Gap giữa các row: `24px`.
- Gap giữa các field trong row: `24px`.

### Màu sắc

| Yếu tố | Màu |
|---|---|
| Form background | `#ffffff` |
| Input border default | `rgba(0,0,0,0.2)` |
| Input border focus | `#E8614A` |
| Input border error | `#dc2626` |
| Input background | `#ffffff` |
| Input placeholder | `rgba(0,0,0,0.4)` |
| Input text | `#0f0f0f` |
| Label | `#1a1a1a` |
| Required asterisk | `#E8614A` |
| Error message text | `#dc2626` |
| Checkbox accent | `#E8614A` |
| Checkbox border | `rgba(0,0,0,0.3)` |
| Privacy link | `#E8614A` |

### Typography

| Yếu tố | Style |
|---|---|
| Form headline | `Playfair Display`, `font-size: clamp(2rem, 4vw, 3rem)`, `font-weight: 700` |
| Form sub-text | `font-size: 16px`, `color: rgba(0,0,0,0.6)` |
| Field label | `font-size: 14px`, `font-weight: 500`, `color: #1a1a1a` |
| Input text | `font-size: 16px`, `font-family: system sans-serif` |
| Error message | `font-size: 13px`, `color: #dc2626`, `margin-top: 4px` |
| Placeholder | `font-size: 16px`, `color: rgba(0,0,0,0.4)` |
| Privacy label | `font-size: 14px`, `color: rgba(0,0,0,0.7)` |

---

## 6. Interactions & Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| Input | Border color transition (default → focus orange) | Focus | 150ms |
| Input | Border color transition (→ red) | Validation error | 150ms |
| Error message | Fade in + slide down (translateY -4px → 0) | Validation | 200ms |
| Submit button | Loading spinner replace text | Click/Submit | Instant |
| Form | Fade out | Success | 300ms |
| Success message | Fade in | After form fade out | 300ms |
| Field | Shake animation (translateX ±4px) | Submit với lỗi | 300ms, ease |

---

## 7. Business Rules

### Validation rules từng field

| Field | Rule |
|---|---|
| `name` | Bắt buộc. Min 2 ký tự. Max 100 ký tự. Trim whitespace. |
| `workEmail` | Bắt buộc. Regex email chuẩn RFC 5322 (simplified). Không chấp nhận personal email nếu domain là gmail/yahoo/hotmail (optional, nếu yêu cầu B2B only). |
| `companyName` | Bắt buộc. Min 2 ký tự. Max 150 ký tự. |
| `country` | Bắt buộc. Phải là giá trị trong danh sách country options. |
| `phoneNumber` | Tùy chọn. Nếu nhập: chỉ `+`, số, dấu cách, dấu gạch ngang. Min 7, max 20 ký tự. |
| `unitCount` | Tùy chọn. Nếu nhập: phải là số nguyên dương. |
| `profile` | Bắt buộc. Phải là giá trị trong danh sách options. |
| `hearAboutUs` | Bắt buộc. Phải là giá trị trong danh sách options. |
| `projectDescription` | Bắt buộc. Min 20 ký tự. Max 2000 ký tự. |
| `privacyAgreed` | Bắt buộc. Phải là `true`. |

- Validate onSubmit lần đầu, sau đó validate onChange cho trường đã bị touch.
- Submit không reload trang (prevent default, gọi fetch/AJAX).
- Không dùng thư viện form ngoài (React Hook Form, Formik) — custom state management.
- Không submit khi reCAPTCHA chưa sẵn sàng.

---

## 8. Edge Cases

| Tình huống | Hành vi mong đợi |
|---|---|
| Trường bắt buộc trống khi submit | Hiện error inline ngay dưới field, focus vào field đầu tiên lỗi |
| Email sai định dạng | Lỗi "Please enter a valid work email address" |
| `projectDescription` vượt 2000 ký tự | Counter hiện "X/2000", submit bị block nếu vượt |
| API trả về 422 (validation error) | Map server errors vào từng field tương ứng |
| API trả về 500 | Hiện global error banner: "Something went wrong. Please try again." |
| Network timeout | Hiện lỗi với nút "Try again" |
| reCAPTCHA score thấp | Hiện lỗi: "Verification failed. Please refresh and try again." |
| User refresh sau khi điền form | Form bị reset (không dùng localStorage để persist) |
| `?ref=product-detail&product=padlock-2` trong URL | Tự động set hidden field `referrer` và `productContext` |

---

## 9. Security Requirements

- Tất cả input sanitize trước khi gửi API (strip HTML tags, trim whitespace).
- reCAPTCHA token bắt buộc trong request body.
- Không log form data ra console trong production.
- CSRF protection: API endpoint phải validate `Origin` header.
- `workEmail` validate kỹ để tránh email injection.

---

## 10. Acceptance Criteria

- [ ] Tất cả 10 trường render đúng với label, placeholder, và required indicator.
- [ ] Submit validate tất cả required fields — lỗi inline cho từng field.
- [ ] Email sai → lỗi đúng message.
- [ ] `privacyAgreed` chưa tick → không cho submit.
- [ ] API `POST /api/contact` được gọi khi form hợp lệ.
- [ ] Thành công → form ẩn, success notification (FEAT-037) hiện.
- [ ] API lỗi → error message hiển thị, form vẫn có thể retry.
- [ ] Không reload trang khi submit.
- [ ] reCAPTCHA token có trong request body.
- [ ] `?ref` và `?product` URL params được capture và gửi kèm.
- [ ] TypeScript strict — `ContactFormData` interface đầy đủ.
- [ ] Không dùng thư viện form ngoài.
- [ ] `aria-invalid`, `aria-describedby` trên inputs có lỗi.

---

## 11. Assets cần thiết

- Country list: `lib/data/countries.ts` — danh sách tất cả quốc gia với `value` và `label`.
- Profile options: `lib/data/profileOptions.ts`.
- "How did you hear" options: `lib/data/hearAboutUsOptions.ts`.

---

## 12. Data Structure

```typescript
interface ContactFormData {
  name: string;
  workEmail: string;
  companyName: string;
  country: string;              // ISO country code, e.g. "SG"
  phoneNumber?: string;
  unitCount?: number;
  profile: string;              // e.g. "property_manager"
  hearAboutUs: string;          // e.g. "google_search"
  projectDescription: string;
  privacyAgreed: true;          // Must be true — literal type
  // Hidden fields (từ URL params):
  referrer?: string;            // "product-detail"
  productContext?: string;      // slug, e.g. "padlock-2"
  recaptchaToken: string;       // Required, từ reCAPTCHA v3
}

interface ContactFormErrors {
  name?: string;
  workEmail?: string;
  companyName?: string;
  country?: string;
  phoneNumber?: string;
  unitCount?: string;
  profile?: string;
  hearAboutUs?: string;
  projectDescription?: string;
  privacyAgreed?: string;
  global?: string;              // Global/server error
}

// API Request
interface ContactApiRequest extends Omit<ContactFormData, 'privacyAgreed'> {
  privacyAgreed: boolean;
}

// API Response
interface ContactApiResponse {
  success: boolean;
  message: string;
  leadId?: string;              // Optional, để track
}

// API Error Response
interface ContactApiError {
  message: string;
  code: string;
  fields?: Partial<Record<keyof ContactFormData, string>>;
}

// Select options
interface SelectOption {
  value: string;
  label: string;
}
```

### API Endpoint

**`POST /api/contact`**

Request headers:
```
Content-Type: application/json
```

Request body: `ContactApiRequest` (JSON)

Response 200:
```json
{
  "success": true,
  "message": "Thank you! Our team will reach out shortly.",
  "leadId": "lead_abc123"
}
```

Response 422:
```json
{
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "fields": {
    "workEmail": "Please enter a valid email address"
  }
}
```

Response 500:
```json
{
  "message": "Internal server error",
  "code": "SERVER_ERROR"
}
```

---

## 13. Implementation Notes

- Component **bắt buộc** `"use client"` vì có state và event handlers.
- State management: `useState<ContactFormData>` cho form values, `useState<ContactFormErrors>` cho errors, `useState<'idle' | 'loading' | 'success' | 'error'>` cho submission state.
- Không dùng `useReducer` cho form đơn giản này — `useState` là đủ.
- Validate function: tách ra `lib/validators/contactForm.ts` — pure functions, testable.
- Dropdown (Select): implement custom `SelectField` component trong `components/ui/SelectField.tsx` — không dùng thư viện ngoài. Dùng native `<select>` styled với Tailwind.
- Checkbox: `<input type="checkbox">` với `accent-[#E8614A]` Tailwind.
- Character counter cho textarea: hiện từ 1500 ký tự trở đi.
- URL params: dùng `useSearchParams()` từ `next/navigation` trong `"use client"` component.
- Fetch API: gọi qua `lib/api.ts` wrapper.
