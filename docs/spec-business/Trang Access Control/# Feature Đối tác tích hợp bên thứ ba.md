# Feature: Đối tác tích hợp bên thứ ba

## 1. Business Goal
Thể hiện hệ sinh thái đối tác rộng lớn của igloohome trong lĩnh vực Access Control. Tăng độ tin cậy với khách hàng doanh nghiệp bằng cách chứng minh hệ thống hoạt động tốt với các nền tảng họ đã quen dùng — giảm lo ngại về sự gắn kết với nhà cung cấp (vendor lock-in) và rào cản tích hợp.

## 2. Actors
- **IT Manager / Operations Team** — cần kiểm tra tính tương thích với hệ thống hiện có
- **Building Manager** — muốn đảm bảo không phải thay đổi toàn bộ quy trình khi triển khai
- **Visitor** — đang đánh giá hệ sinh thái đối tác trước khi ra quyết định

## 3. Preconditions
- Visitor đã xem sản phẩm và đang cân nhắc tính tích hợp
- Trang Access Control tải thành công

## 4. Main Flow
1. Visitor cuộn đến section Integrations
2. Hệ thống hiển thị label "Integrations" và headline nhấn mạnh hệ sinh thái đối tác
3. Hệ thống hiển thị grid logo các đối tác MFR (Multi-Family Residential) đã tích hợp
4. Visitor nhận ra một số thương hiệu quen thuộc và tăng niềm tin vào hệ sinh thái

## 5. Business Rules
- Chỉ hiển thị logo của các đối tác có tích hợp chính thức, đã được kiểm chứng
- Danh sách đối tác hiện tại bao gồm: AptHub, BeHome247, GeoKey, Peek, SmartRent, Swiftlane và các đối tác khác
- Logo phải được hiển thị theo đúng brand guidelines của từng đối tác (tỷ lệ, màu sắc)
- Headline phải đề cập rõ tính "ready-made" (tích hợp có sẵn): "Connect with Ready-Made Third-Party MFR Integrations"
- Subtext nhấn mạnh không cần cấu hình phức tạp: "Works out-of-the-box with the platforms your team already uses"
- Khi thêm/bớt đối tác, cần cập nhật cả spec này và danh sách hiển thị trên trang

## 6. Edge Cases
- Logo một đối tác không tải → hiển thị tên đối tác dưới dạng text fallback trong ô tương ứng
- Khi đối tác chấm dứt partnership → logo phải được gỡ khỏi trang ngay, không để hiển thị sai thông tin
- Trên mobile, grid logo tự xuống hàng để đảm bảo logo không bị thu nhỏ quá mức khó nhận diện

## 7. Security Requirements
- Logo đối tác phải được sử dụng có sự cho phép (trademark licensing)
- Không dẫn link trực tiếp đến trang đối tác mà không có kiểm soát (rel="noopener noreferrer" nếu mở tab mới)

## 8. Acceptance Criteria

### AC-01: Hiển thị grid logo đối tác

Given
- Visitor cuộn đến section Integrations

When
- Section hiển thị trong viewport

Then
- Label "Integrations" và headline "Connect with Ready-Made Third-Party MFR Integrations" hiển thị
- Grid logo đối tác hiển thị đầy đủ
- Tất cả logo hiện tại (AptHub, BeHome247, GeoKey, Peek, SmartRent, Swiftlane...) hiển thị rõ ràng

### AC-02: Chỉ hiển thị đối tác chính thức

Given
- Danh sách đối tác được cập nhật

When
- Một đối tác kết thúc partnership

Then
- Logo của đối tác đó không còn xuất hiện trên trang sau khi cập nhật

### AC-03: Responsive grid logo

Given
- Visitor truy cập từ mobile hoặc tablet

When
- Section hiển thị

Then
- Logo grid tự xuống hàng, mỗi logo vẫn đủ lớn để nhận diện
- Không có logo nào bị cắt hoặc quá nhỏ
