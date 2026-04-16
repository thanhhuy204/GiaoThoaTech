# Hooks — Tự động hóa kiểm tra chất lượng

Hooks là các script chạy tự động trước/sau khi Claude trả lời.
Cấu hình trong `.claude/settings.json`.

## Hooks hiện tại

### pre-response: lint-check
Nhắc Claude kiểm tra trước khi đưa ra code:
- Không dùng `any` trong TypeScript
- Không có `console.log` trong code production
- Mọi component phải có type cho props

### post-response: naming-check
Sau khi Claude sinh code, kiểm tra:
- Component tên `PascalCase`
- Hook tên bắt đầu bằng `use`
- Không có magic numbers

## Cách sử dụng thủ công
Copy nội dung hook vào đầu prompt khi cần kiểm tra nghiêm ngặt:

```
[Áp dụng pre-response hook]
Trước khi trả lời, kiểm tra:
1. Không có `any` type
2. Không có `console.log`
3. Props phải có interface đầy đủ

Sau đó mới viết code theo yêu cầu: ...
```
