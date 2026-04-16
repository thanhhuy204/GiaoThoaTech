# Feature: Keyless Future CTA

## 1. Business Goal

Thúc đẩy visitor hành động lần cuối trước khi rời trang — khuyến khích scroll lên xem job listings hoặc liên hệ trực tiếp qua email.

## 2. Actors

- Visitor đã đọc qua toàn bộ trang Careers

## 3. Preconditions

- Trang /careers tải thành công
- Section là section cuối trước Footer

## 4. Main Flow

1. Visitor cuộn đến cuối trang
2. Hiển thị section CTA với background gradient tối (`linear-gradient(135deg, #0f3460 0%, #0f0f0f 100%)`)
3. Hiển thị label tag "Join Us"
4. Hiển thị H2: "Help us build the keyless future"
5. Hiển thị subtitle 1 câu
6. Hiển thị 2 nút:
   - "Explore Opportunities" (primary) → smooth scroll đến `#openings`
   - "Contact our team" (ghost dark) → `mailto:careers@igloohome.co`

## 5. Business Rules

- Section này LUÔN là section cuối trước Footer
- H2 text cố định: "Help us build the keyless future"
- "Explore Opportunities" scroll → `#openings`, không phải link `/careers#openings` (để không reload trang)
- "Contact our team" mở mail client với `to: careers@igloohome.co`
- Fade-up animation: label → H2 → subtitle → buttons (stagger)
- Trust signals (optional row dưới buttons): "Open to remote", "Visa sponsorship available", "Inclusive workplace"
- Nếu `#openings` không tìm được → fallback `window.scrollTo({ top: 0, behavior: 'smooth' })`

## 6. Edge Cases

- `#openings` không tìm được → fallback scroll về đầu trang

## 7. Security Requirements

- Liên kết HTTPS

## 8. Acceptance Criteria

### AC-01: Hiển thị CTA section

Given

- Visitor cuộn đến cuối trang Careers

When

- Section hiển thị

Then

- H2 "Help us build the keyless future" hiển thị trên gradient tối

### AC-02: Nút Explore Opportunities scroll lên openings

Given

- CTA section đang hiển thị

When

- Visitor click "Explore Opportunities"

Then

- Trang smooth scroll lên section `#openings`
- Không reload trang

### AC-03: Nút Contact mở mail client

Given

- CTA section đang hiển thị

When

- Visitor click "Contact our team"

Then

- Mail client mở với to: careers@igloohome.co
