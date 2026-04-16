# Feature: Khối nhỏ 5 - Giá gói dịch vụ Home Care (trong gói cao cấp)

## 1. Business Goal 
- Hiển thị giá gói dịch vụ an ninh Home Care nổi bật ở vị trí giữa danh sách quyền lợi, giúp khách hàng nhanh chóng nắm được chi phí.
- Tạo cảm giác "rẻ mà đáng tiền" bằng cách so sánh giá trị nhận được (toàn bộ quyền lợi cao cấp + quà tặng) với chi phí thực tế.
- Thúc đẩy quyết định mua ngay thông qua nút CTA rõ ràng, tăng tỷ lệ chuyển đổi từ xem chi tiết sang chọn gói thanh toán.

## 2. Actors 
- Visitor 
- Potential Customer

## 3. Preconditions 
- Trang chủ load thành công và hiển thị bình thường.
- Người dùng đã mở rộng khối teaser lớn "Mua gói dịch vụ an ninh Home Care hàng năm được tặng khóa điện tử & camera".
- Khối nhỏ Giá (khối 5) đang hiển thị ở vị trí nổi bật (giữa danh sách 4 quyền lợi).

## 4. Main Flow 
1. Trạng thái đóng (mặc định):
   - Icon: biểu tượng tiền tệ nhỏ (nổi bật)
   - Text chính: "Giá gói dịch vụ an ninh Home Care 1,9 triệu đồng/năm hoặc 200.000 đ/tháng"
   - Định dạng: card riêng biệt (nổi bật hơn các khối quyền lợi)
   - Alt text icon: "Giá gói Home Care"
   - Dấu "+" bên phải (clickable)
   - Toàn bộ card có cursor pointer và hiệu ứng hover nhẹ

2. Người dùng nhấn **dấu "+"** hoặc bất kỳ vị trí nào trên toàn bộ khối nhỏ.
3. Khối nhỏ **mở rộng xuống dưới** (animation mượt mà), hiển thị nội dung chi tiết thuyết phục:
   - "Chỉ với 200.000đ mỗi tháng, bạn đã sở hữu toàn bộ 4 quyền lợi cố định của gói Home Care:
     + Quản lý lịch sử ra vào nhà 24h/7
     + Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực nơi ở
     + Gặp sự cố cháy nổ nhà tự động báo cho chủ nhà & cảnh sát phòng cháy chữa cháy
     + Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở
   - Gói năm có thêm quyền lợi bổ sung (tặng khoá điện tử + camera hiện đại) kèm theo gói, giúp tăng giá trị sử dụng.
   - Đây là mức giá cực kỳ cạnh tranh so với lắp đặt riêng lẻ (có thể tốn gấp 2-3 lần).
   - Tiết kiệm chi phí nhưng vẫn được bảo vệ toàn diện – lựa chọn thông minh nhất hiện nay!"

## 5. Alternative Flows 
### 5.1 Nhấn liên tục / nhanh
- Mỗi lần nhấn toggle trạng thái (mở, đóng) mượt mà, không gây lỗi hiển thị.

### 5.2 Truy cập trên thiết bị di động
- Khối nhỏ chiếm full width trong bố cục dọc.
- Dấu "+" / "–" dễ chạm.
- Popup/chuyển trang chọn gói hiển thị tốt, dễ thao tác bằng ngón tay.

## 6. Business Rules 
- Toàn bộ khối nhỏ (icon, text, khoảng trống) phải clickable để mở rộng/thu gọn.
- Dấu "+" hiển thị rõ ràng bên phải khi đóng; chuyển thành "–" khi mở rộng.
- Khối giá phải nổi bật hơn các khối quyền lợi (background khác biệt, border nổi bật, font lớn hơn, vị trí giữa danh sách).
- Nội dung văn bản phải chính xác 100% (giá, đơn vị tiền tệ, từ ngữ, dấu câu).
- Responsive: mobile chiếm full width, stack dọc; popup/chuyển trang chọn gói dễ đọc và thao tác.
- Quyền lợi gói dịch vụ phải chia rõ 2 nhóm:
  + Quyền lợi cố định (áp dụng cho cả gói tháng và gói năm)
  + Quyền lợi bổ sung (chỉ áp dụng cho gói năm)

## 6.1 Admin page: Chỉnh sửa quyền lợi thành viên
- Module: "Quản trị gói dịch vụ Home Care" phải có khung cấu hình quyền lợi.
- Danh sách quyền lợi hiện có:
  + 4 quyền lợi cố định mặc định (luôn áp dụng cho cả tháng & năm)
    * Quản lý lịch sử ra vào nhà 24/7
    * Khi có trộm cướp vào nhà báo chủ nhà + công an khu vực
    * Khi có cháy nổ báo chủ nhà + cảnh sát PCCC
    * Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở
  + 2 quyền lợi bổ sung gói năm (tặng khóa điện tử & camera hiện đại)
- Chức năng admin:
  + Thêm mới quyền lợi bất kỳ 
  + Sửa quyền lợi hiện có 
  + Xóa quyền lợi 
  + Bật/tắt hiển thị quyền lợi qua toggle (trên UI chính), có lưu audit logs.

## 7. Edge Cases
- Nhấn ngoài vùng text/icon (khoảng trống card) → vẫn mở rộng bình thường.
- JavaScript bị tắt → khối nhỏ hiển thị **toàn bộ nội dung chi tiết ngay từ đầu** (không có trạng thái đóng, không dấu +/–).
- Mạng chậm → trạng thái đóng (icon + text giá + dấu +) hiển thị trước; nội dung chi tiết xuất hiện sau.
- Người dùng quay lại từ trang thanh toán → khối giá vẫn ở trạng thái đóng dù trước đó đã mở.

## 8. Acceptance Criteria 
### AC-01: Trạng thái đóng hiển thị đúng và nổi bật
Given 
- Khối lớn Home Care đã mở rộng  
When 
- Người dùng xem khối nhỏ Giá  
Then  
- Hiển thị icon tiền tệ nhỏ  
- Text chính xác: "Giá gói dịch vụ an ninh Home Care 1,9 triệu đồng/năm hoặc 200.000 đ/tháng"  
- Dấu "+" bên phải rõ ràng  
- Khối nổi bật hơn các khối quyền lợi (background khác, border nổi bật, font lớn hơn)  
- Nội dung không bị cắt cụt hoặc sai từ ngữ

### AC-02: Mở rộng khối hiển thị nội dung chi tiết
Given 
- Khối nhỏ đang ở trạng thái đóng  
When 
- Nhấn vào dấu "+" hoặc bất kỳ vị trí nào trên khối nhỏ  
Then  
- Khối mở rộng mượt mà  
- Hiển thị đúng đoạn văn thuyết phục: "Chỉ với 200.000đ mỗi tháng, bạn đã sở hữu toàn bộ 4 quyền lợi cố định:
  + Quản lý lịch sử ra vào nhà 24h/7
  + Khi có trộm cướp vào nhà báo chủ nhà + công an khu vực
  + Khi có cháy nổ báo chủ nhà + cảnh sát PCCC 
  + Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở
  Gói năm thêm quyền lợi tặng khóa điện tử và camera hiện đại.
  Đây là mức giá cực kỳ cạnh tranh so với lắp đặt riêng lẻ (có thể tốn gấp 2-3 lần). Tiết kiệm chi phí nhưng được bảo vệ toàn diện – lựa chọn thông minh nhất hiện nay!"  
- Dấu "+" chuyển thành "–"  
- Nội dung wrap tốt, dễ đọc, không chồng lấn

### AC-03: 4 quyền lợi gốc & 2 bổ sung riêng gói năm
Given
- Khối nhỏ mở rộng và hiển thị chi tiết gói
When
- Người dùng đọc phần lợi ích
Then
- Hiển thị đúng 4 quyền lợi gốc cho cả gói tháng và gói năm
- Hiển thị rõ phần quyền lợi bổ sung “Khóa điện tử + Camera” chỉ kèm gói năm
- Giao diện không bị lẫn thông tin 2 loại gói khi người dùng chuyển chế độ tháng/năm

### AC-07: Admin chỉnh sửa quyền lợi cố định/bổ sung
Given
- Admin đã đăng nhập vào trang quản trị gói dịch vụ
When
- Chỉnh sửa danh sách quyền lợi "cố định" và "bổ sung" cho từng gói
Then
- Thay đổi được lưu thành công và phản ánh lên UI Home Care
- Quyền lợi cố định được áp dụng cho gói tháng và gói năm
- Quyền lợi bổ sung chỉ hiển thị khi chọn gói năm

### AC-04: Thu gọn khối khi nhấn lần thứ hai
Given 
- Khối nhỏ đang mở rộng  
When 
- Khấn lại dấu "–" hoặc toàn bộ khối nhỏ  
Then  
- Khối thu gọn về trạng thái đóng mượt mà  
- Nội dung chi tiết và nút CTA ẩn hoàn toàn  
- Dấu "–" chuyển lại thành "+"  
- Không còn lỗi hiển thị thừa hoặc layout vỡ

### AC-05: Responsive & trải nghiệm trên mobile
Given - Truy cập trang chủ bằng thiết bị di động  
When - Mở rộng khối nhỏ  
Then  - Khối nhỏ chiếm full width  
 - Dấu "+" / "–" dễ chạm  
 - Popup/chuyển trang chọn 2 gói hiển thị tốt, dễ thao tác bằng ngón tay  
- Nội dung chi tiết wrap tự nhiên, dễ đọc, không bị cắt cụt

### AC-06: Hiển thị khi JS bị tắt
Given 
- Người dùng tắt JavaScript trong trình duyệt  
When 
- Trang chủ load thành công và khối lớn đã mở rộng  
Then  - Khối nhỏ hiển thị **toàn bộ nội dung chi tiết ngay từ đầu** (không trạng thái đóng, không dấu +/–)  
- Nội dung ngắn gọn + thuyết phục đều hiển thị đầy đủ  
- Không có khoảng trắng thừa hoặc lỗi giao diện