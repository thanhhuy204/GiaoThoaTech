# Feature: 4 khối giải pháp

## 1. Business Goal

Phân cấp rõ ràng 4 giải pháp tích hợp của igloo theo quy mô và nhu cầu khách hàng (từ startup đến enterprise), giúp doanh nghiệp nhanh chóng nhận ra giải pháp phù hợp và click vào xem chi tiết hoặc liên hệ demo.

## 2. Actors

- Visitor doanh nghiệp nhỏ (startup) — tìm giải pháp simple, plug-and-play
- Developer/Kỹ sư tích hợp — cần API/SDK documentation và developer tools
- Potential B2B User trung bình — muốn marketplace 40+ integrations sẵn có
- Enterprise buyer — cần giải pháp custom, dedicated support, 100+ access points

## 3. Preconditions

- Trang Integrations (/integrations) load thành công trên HTTPS
- Section nằm bên dưới hero section (FEAT-011) trên trang Integrations
- Trang chi tiết từng giải pháp đã tồn tại: /integrations/igloohome, /integrations/iglooaccess, /integrations/iglooconnect, /integrations/iglooworks

## 4. Main Flow

1. Người dùng cuộn xuống sau hero section, thấy khối 4 giải pháp
2. Hệ thống hiển thị tiêu đề section: "Integration Solutions"
3. Hiển thị 4 khối theo thứ tự cố định:
   - igloohome — Best for Starting out (dưới 30 phòng / 5–20 bất động sản), badge "Starter" (xanh lá)
   - iglooaccess — For API and SDK Integrations, badge "Developer" (xanh dương)
   - iglooconnect — All-in-one Integration Marketplace (40+ partners), badge "Integration" (tím)
   - iglooworks — For Enterprise (100+ access points, multi-user), badge "Enterprise" (cam)
4. Mỗi khối hiển thị: hình minh họa dashboard/app (16:9), tên giải pháp, badge phân loại, mô tả ngắn, nút expand (+)
5. Người dùng click nút (+) hoặc tên giải pháp → chuyển đến trang chi tiết /integrations/[id]?ref=integrations-solutions

> Lưu ý quan trọng: Khác với FEAT-003 (Trang chủ) dùng toggle expand inline, trang Integrations dùng navigate đến trang chi tiết riêng vì visitor đã ở trang chuyên sâu và sẵn sàng đi sâu hơn.

## 5. Business Rules

- 4 khối luôn hiển thị đúng thứ tự: igloohome → iglooaccess → iglooconnect → iglooworks
- Click behavior (Trang Integrations): click nút (+) hoặc tên → navigate đến /integrations/[id]?ref=integrations-solutions (khác FEAT-003 dùng toggle inline)
- Mỗi khối phải có badge phân loại màu đúng theo quy định: Starter=xanh lá (#4caf50), Developer=xanh dương (#2196f3), Integration=tím (#9c27b0), Enterprise=cam (#E8614A)
- Hình minh họa là ảnh giao diện thực tế (hoặc mockup chất lượng cao)
- CTA tracking: link navigate kèm ?ref=integrations-solutions
- Description max 150 ký tự để không vượt quá 3 dòng trong card
- Responsive grid: 4 cột desktop (≥1280px), 2 cột tablet (768px–1279px), 1 cột mobile (≤767px)

## 6. Edge Cases

- Hình minh họa không tải → placeholder (background #e9e9e9 + tên giải pháp) + nội dung text vẫn hiển thị
- JavaScript tắt → 4 khối hiển thị tĩnh như cards, link vẫn điều hướng được
- Trang /integrations/[id] chưa có → nút expand disabled hoặc hiển thị "Coming soon" badge
- Màn hình rất nhỏ (≤320px) → 1 cột, full width, padding giảm, font nhỏ hơn
- Mô tả bị truncate → dùng CSS line-clamp-3, không cắt string bằng JS

## 7. Security Requirements

- Hình ảnh serve từ HTTPS
- Không lộ API key hay credentials trong ảnh minh họa
- Link điều hướng dùng next/link — không dùng window.location
- Không dùng dangerouslySetInnerHTML

## 8. Acceptance Criteria

- Section hiển thị tiêu đề "Integration Solutions" đúng font Playfair Display
- 4 khối hiển thị đúng thứ tự: igloohome, iglooaccess, iglooconnect, iglooworks
- Mỗi khối có: ảnh minh họa, tên giải pháp, mô tả, badge phân loại, nút expand (+)
- Badge màu sắc đúng: Starter=xanh lá, Developer=xanh dương, Integration=tím, Enterprise=cam
- Click nút (+) → navigate đến /integrations/[id]?ref=integrations-solutions (không toggle inline)
- Responsive: 4 cột desktop, 2 cột tablet, 1 cột mobile
- Block hover: shadow + translateY(-4px) đúng
- Expand button hover: rotate(45deg) + background cam
- Animation fadeUp + stagger khi scroll vào viewport
- Hình lỗi → placeholder hiển thị, content vẫn hiển thị đầy đủ
- Accessibility: role="article" cho mỗi khối, button có aria-label
- Không dùng inline style (chỉ Tailwind className)
