# Feature: Thanh điều hướng (Global Header / Navigation Bar)

## 1. Business Goal
Cung cấp điều hướng nhanh, nhất quán cho người dùng trên toàn bộ website, giúp visitor dễ dàng truy cập sản phẩm, giải pháp, thông tin công ty, tài khoản cá nhân và liên hệ, tăng trải nghiệm người dùng và chuyển đổi lead.

## 2. Actors
- Visitor 
- Potential
- Consumer
- User

## 3. Preconditions
- Trang web bất kỳ load thành công (HTTPS)
- Thanh điều hướng (header) hiển thị ở đầu trang

## 4. Main Flow
1. Hệ thống render Navbar fixed ở top với nền trắng (rgba(255,255,255,0.97)), border-bottom nhạt, backdrop-filter blur
2. Phần trái:
   - Logo "igloo" (`/images/logo/logo1.jpg`, 120×32px) — click → chuyển về trang chủ /
3. Phần giữa (menu dropdown, hover/click mở):
   - Products ↓ → dropdown liệt kê sản phẩm chính (Deadbolt Go, Keybox 3, Padlock 2...)
   - Solutions ↓ → dropdown liệt kê Overview, Technology, Integrations, Case Studies, Contact Us
   - Explore ↓ → dropdown liệt kê Case studies, Investor relations, About us, Careers, Impact, Media, Blog
4. Phần phải:
   - Login ↓ → dropdown với "For Business" và "For Consumer" options
   - Contact Us → nút primary nổi bật (var(--primary)) → chuyển đến trang /contact kèm ref param
   - Language Switcher → hiển thị cờ quốc gia + mã hiển thị ngôn ngữ hiện tại (`🇻🇳 VN` hoặc `🇺🇸 EN`; URL locale vẫn là `vi`/`en`), click trực tiếp chuyển sang ngôn ngữ còn lại (không dropdown vì chỉ có 2 ngôn ngữ)
5. Trên mobile (≤768px): menu chuyển thành hamburger icon (22×22px), click mở mobile menu overlay slide down
6. Mobile menu: các nav item có expand/collapse sub-menu khi click; tự động đóng khi click outside hoặc navigate
7. Mobile menu có nút chuyển ngôn ngữ ở cuối danh sách — hiển thị cờ + mã (VN / EN), click toggle giữa hai ngôn ngữ

## 5. Business Rules
- Thanh điều hướng cố định (sticky/fixed) khi scroll — z-index: 999
- Dropdown chỉ mở một lúc; click lại để đóng
- Mobile menu tự động đóng khi click outside hoặc navigate
- Mỗi link trong dropdown có icon ↗ nếu mở tab mới
- Nút Contact Us luôn màu primary nổi bật (var(--primary)), chữ trắng
- Chuyển trang kèm ref param để theo dõi nguồn (ví dụ ?ref=header-contact-us)
- Logo có alt text "igloo"
- Nav items phải match với sitemap/routes của website
- Login dropdown: link placeholder (#) — sẽ update khi auth implement

## 6. Edge Cases
- Trang chủ đang mở → click logo không reload (hoặc reload nhẹ)
- JavaScript tắt → menu fallback thành link tĩnh (không dropdown)
- Mạng chậm → thanh vẫn hiển thị (nếu dữ liệu đã load)
- Mobile → hamburger icon mở menu dọc, không lỗi layout
- Keyboard navigation: Tab order đúng, ESC để đóng dropdown
- Touch devices: Touch-friendly button sizes (min 44px)
- High contrast mode: Colors phải accessible

## 7. Security Requirements
- Toàn bộ liên kết trong thanh dùng HTTPS
- Không chứa script độc hại trong dropdown
- Links phải validate, không allow XSS qua href

## 7a. Accessibility Requirements
- ARIA labels cho burger menu (aria-label)
- aria-expanded cho dropdown buttons
- Keyboard navigation: Tab, Enter, Escape
- Screen reader support cho nav structure
- Color contrast ratios ≥ 4.5:1

## 8. Acceptance Criteria

### AC-01: Hiển thị thanh điều hướng đầy đủ
Given
- Trang web bất kỳ load thành công
When
- Người dùng xem đầu trang
Then
- Thanh điều hướng hiển thị cố định (fixed top)
- Logo "igloo" bên trái
- Menu Products ↓, Solutions ↓, Explore ↓ ở giữa
- Login ↓, Contact Us ở phải
- Nút Contact Us màu primary (var(--primary)) nổi bật

### AC-02: Logo click chuyển về trang chủ
Given
- Thanh điều hướng đang hiển thị
When
- Người dùng click logo "igloo"
Then
- Chuyển hướng đến trang chủ[](https://www.igloohome.co/)
- Trang chủ load thành công

### AC-03: Dropdown mở và click link đúng
Given
- Thanh điều hướng đang hiển thị
When
- Người dùng hover/click "Products ↓" (hoặc Solutions, Explore)
Then
- Dropdown mở ra liệt kê đúng item
- Click item → chuyển đến trang tương ứng (ví dụ /products/deadbolt-go)
- Trang đích load thành công

### AC-04: Dropdown For consumer mở tab mới
Given
- Thanh điều hướng đang hiển thị
When
- Người dùng click "For consumer ↓" → click một store (ví dụ US store)
Then
- Mở tab mới đến cửa hàng khu vực tương ứng
- Tab hiện tại không thay đổi

### AC-05: Login dropdown hiển thị dịch vụ
Given
- Thanh điều hướng đang hiển thị
When
- Người dùng click "Login ↓"
Then
- Dropdown mở với tiêu đề "LOGIN TO SERVICES"
- Hiển thị đúng 4 link: iglooaccess, igloodeveloper, iglooconnect, iglooworks
- Mỗi link có icon ↗ mở tab mới

### AC-06: Nút Contact Us chuyển trang liên hệ
Given
- Thanh điều hướng đang hiển thị
When
- Người dùng click nút "Contact Us"
Then
- Chuyển hướng đến trang /contact
- URL có thể kèm ref param (ví dụ ?ref=header-contact-us)
- Trang liên hệ load thành công

### AC-07: Thanh điều hướng responsive trên mobile
Given
- Trang đang hiển thị trên thiết bị mobile
When
- Người dùng mở trang
Then
- Menu chuyển thành hamburger icon ≡
- Click icon → mở menu dọc đầy đủ item
- Không lỗi layout, nút Contact Us vẫn dễ click