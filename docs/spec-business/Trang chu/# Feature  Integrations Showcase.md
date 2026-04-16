# Feature : Integrations Showcase( Giới thiệu giải pháp phần mềm)

## 1. Business Goal
Giới thiệu bộ giải pháp phần mềm dễ tích hợp với phần cứng igloo, phân cấp theo quy mô khách hàng, nhằm khuyến khích doanh nghiệp liên hệ để được demo và tư vấn chi tiết.

## 2. Actors
- Visitor doanh nghiệp (chủ bất động sản, tích hợp hệ thống, công ty lớn)
- Potential B2B User

## 3. Preconditions
- Trang chủ load thành công
- Phần này hiển thị sau khối Lockbox Coming Soon

## 4. Main Flow
1. Hiển thị dòng giới thiệu: "Bộ giải pháp phần mềm dễ tích hợp để đi kèm phần cứng igloo"
2. Hiển thị 4 khối (cards):
   - igloohome (Phù hợp khởi đầu – dưới 30 phòng/5-20 bất động sản)
   - iglooaccess (Dành cho API và SDK tích hợp)
   - iglooconnect (Tích hợp toàn diện – hơn 40 đối tác)
   - iglooworks (Dành cho doanh nghiệp lớn – trên 100 điểm truy cập)
3. Mỗi khối có hình minh họa giao diện phần mềm, mô tả ngắn, nút mở rộng (+)

## 5. Business Rules
- 4 khối hiển thị theo thứ tự cố định từ trái sang phải 
- Hình minh họa là ảnh chụp màn hình giao diện thực tế của từng giải pháp

## 6. Edge Cases
- Một khối không có hình minh họa → hiển thị chữ thay thế hoặc hình mặc định
- JavaScript bị tắt → các khối hiển thị tĩnh (không mở rộng khi click)

## 7. Security Requirements
- Hình ảnh và liên kết dùng HTTPS
- Không hiển thị thông tin nội bộ hoặc dữ liệu nhạy cảm trong mô tả

## 8. Acceptance Criteria

### AC-01: Hiển thị tiêu đề giới thiệu giải pháp

Given
- Visitor truy cập trang chủ

When
- Trang được tải và cuộn đến phần Integrations Showcase

Then
- Hệ thống hiển thị dòng giới thiệu "Bộ giải pháp phần mềm dễ tích hợp để đi kèm phần cứng igloo"

### AC-02: Hiển thị các khối giải pháp

Given
- Phần Integrations Showcase đang hiển thị

When
- Visitor xem các giải pháp

Then
- Hệ thống hiển thị 4 khối:
- igloohome
- iglooaccess
- iglooconnect
- iglooworks

### AC-03: Hiển thị nội dung của mỗi khối

Given
- Các khối giải pháp đang hiển thị

When
- Visitor xem một khối bất kỳ

Then
- Hệ thống hiển thị tên giải pháp
- Hệ thống hiển thị mô tả ngắn
- Hệ thống hiển thị hình minh họa giao diện
- Hệ thống hiển thị biểu tượng mở rộng (+)

### AC-04: Xử lý khi không có hình minh họa

Given
- Một khối giải pháp không có hình minh họa

When
- Trang được tải

Then
- Hệ thống hiển thị hình mặc định hoặc chữ thay thế