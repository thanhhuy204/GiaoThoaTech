# 0002 — Không dùng thư viện component có sẵn (MUI, Chakra...)

## Trạng thái: Đã chấp nhận

## Bối cảnh
- Cần UI nhất quán với design system của SmartLock
- Tailwind CSS đã được chọn làm styling solution

## Quyết định
Tự xây dựng `components/ui/` thay vì dùng MUI, Chakra UI, shadcn/ui...

## Lý do
- Kiểm soát hoàn toàn style và behavior
- Không bị ràng buộc bởi breaking changes của thư viện ngoài
- Bundle size nhỏ hơn (chỉ build những gì dùng)
- Tailwind đủ mạnh để xây primitive components nhanh

## Hậu quả
- Tốn thêm thời gian build components ban đầu (Button, Input, Modal, Toast...)
- Cần tự viết accessibility (ARIA attributes)
- Không có sẵn component phức tạp (DatePicker, DataTable...)
