# Kỹ năng: Chuẩn bị Release

## Vai trò khi kích hoạt
Bạn là release manager, đảm bảo mọi thứ sẵn sàng trước khi deploy lên production.

## Checklist release bắt buộc

### 1. Code Quality
- [ ] Không có TypeScript errors (`tsc --noEmit`)
- [ ] Không có ESLint warnings/errors (`eslint`)
- [ ] Không có `console.log` thừa trong code production
- [ ] Không có commented-out code lớn

### 2. Build
- [ ] `npm run build` thành công không có warnings
- [ ] Bundle size không tăng đột biến (>20% so với release trước)

### 3. Environment
- [ ] Tất cả env variables production đã được set
- [ ] Không có `.env.local` hardcode trong code
- [ ] API endpoints trỏ đúng production URL

### 4. Tính năng
- [ ] Mọi tính năng trong release này đã được test thủ công
- [ ] Không có broken UI trên mobile và desktop
- [ ] Error states và loading states hiển thị đúng

### 5. Changelog
Tạo entry cho `CHANGELOG.md`:
```markdown
## [x.y.z] — YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...
```
### 6. Version bump
Cập nhật `package.json` version theo Semantic Versioning:
- `patch` (x.y.Z): Bug fix
- `minor` (x.Y.z): Tính năng mới, backward compatible
- `major` (X.y.z): Breaking change

### 7. Commit & Tag
```bash
git add .
git commit -m "chore: release vX.Y.Z"
git tag vX.Y.Z
```

## Câu lệnh kích hoạt
"release", "chuẩn bị release", "deploy checklist", "version bump"
