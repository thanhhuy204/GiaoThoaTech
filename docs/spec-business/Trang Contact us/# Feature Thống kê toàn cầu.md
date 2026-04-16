# Feature: Thống kê toàn cầu

## 1. Business Goal

Hiển thị số liệu ấn tượng về quy mô hoạt động toàn cầu của igloo để tăng uy tín và độ tin cậy, đặc biệt với khách hàng doanh nghiệp đang cân nhắc gửi form. Số liệu lớn và cụ thể tạo social proof mạnh mẽ hơn lời nói chung chung, thúc đẩy visitor hoàn tất submit.

## 2. Actors

- Prospect B2B — đang cân nhắc trước khi submit form, muốn thấy bằng chứng quy mô
- Decision maker — validate igloo là vendor đủ lớn và đáng tin cậy

## 3. Preconditions

- Section này render trên trang /contact, trước hoặc sau form
- Số liệu là static content — không lấy từ API
- `IntersectionObserver` API có trong browser

## 4. Main Flow

1. Render tiêu đề section: "Trusted by businesses worldwide"
2. Render 4 stat cards:
   - 10M+ access credentials/year
   - 30,000+ offline PINs/day
   - 100+ cities
   - 3 châu lục: Europe, North America, APAC
3. Khi user scroll section vào viewport:
   - Counter animation bắt đầu từ 0 đến giá trị đích (easeOutCubic, 1500ms)
   - "+" suffix hiện sau khi counter kết thúc
4. Section render đầy đủ ngay cả khi JS disabled (SSR render giá trị final)

## 5. Business Rules

- Số liệu cố định, không thay đổi tùy ý:
  - `10M+` access credentials/year
  - `30,000+` offline PINs/day
  - `>100` cities
  - `3` châu lục (Europe, North America, APAC)
- Counter animation chỉ chạy một lần khi section vào viewport lần đầu — không replay
- Nếu JS disabled (SSR): render giá trị final luôn — không hiện "0"
- Không dùng thư viện counter ngoài (CountUp.js, etc.) — implement bằng `requestAnimationFrame`
- Section là static content — không API call
- Layout: 4 cột desktop (>=1024px), 2 cột tablet (768–1023px), 2 cột mobile (<768px)
- Background: `#f9f9f9`; stat number màu `#E8614A`

## 6. Edge Cases

| Tình huống | Hành vi mong đợi |
| --- | --- |
| JS disabled / SSR | Render số final ngay (`10M+`, `30,000+`, etc.) không có animation |
| `IntersectionObserver` không có | Fallback: hiện số final ngay, không animate |
| `prefers-reduced-motion: reduce` | Bỏ qua counter animation, render số final ngay lập tức |
| Viewport quá hẹp (<280px) | 1 cột, text scale xuống nhỏ hơn |

## 7. Security Requirements

- Section là static content, không có input/output
- Không có API call hay user data
- Không expose business metric nhạy cảm ngoài 4 con số đã được approve

## 8. Acceptance Criteria

### AC-01: Hiển thị 4 stat cards đúng số liệu

Given

- Visitor truy cập trang "/contact"

When

- Trang được tải

Then

- Hiển thị đúng 4 stat cards: "10M+", "30,000+", ">100 cities", "3 continents"
- Stat number màu `#E8614A`, Playfair Display
- Tiêu đề section "Trusted by businesses worldwide"

### AC-02: Counter animation khi scroll vào viewport

Given

- Khối thống kê đang hiển thị

When

- Visitor scroll section vào viewport

Then

- Counter animation chạy từ 0 đến target value (1500ms, easeOutCubic)
- Animation chỉ chạy 1 lần
- Staggered fade-in animation cho cards (delay 80ms per card)

### AC-03: Accessibility và SSR

Given

- Trang đang hiển thị

When

- JS disabled hoặc `prefers-reduced-motion` bật

Then

- Số final hiển thị ngay, không có animation
- Không có lỗi accessibility
