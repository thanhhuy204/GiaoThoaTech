# Feature: Khối nhỏ Quyền lợi 3 - Gặp sự cố cháy nổ báo tự động (trong gói Home Care)

## 1. Business Goal (Mục tiêu nghiệp vụ)
Hiển thị quyền lợi "Gặp sự cố cháy nổ nhà tự động báo cho chủ nhà & cảnh sát phòng cháy chữa cháy" dưới dạng khối nhỏ riêng biệt trong gói Home Care.  
Khi người dùng quan tâm và mở rộng, cung cấp thông tin chi tiết thuyết phục về khả năng phát hiện và xử lý cháy nổ nhanh chóng, giúp tăng cảm giác an toàn và giá trị thực tế của gói, từ đó thúc đẩy quyết định mua hoặc kích hoạt gói.

## 2. Actors (Đối tượng sử dụng)
- Visitor
- Potential consumer

## 3. Preconditions (Điều kiện tiên quyết)
- Trang chủ đã tải thành công
- Người dùng đã mở rộng khối teaser lớn của gói Home Care ("Mua gói dịch vụ an ninh Home Care hàng năm được tặng khóa điện tử & camera")

## 4. Main Flow (Luồng chính – Happy path)
1. Trong phần quyền lợi mở rộng của gói Home Care, hệ thống hiển thị khối nhỏ Quyền lợi 3 ở trạng thái đóng:
   - Có icon ngọn lửa bên trái
   - Tiêu đề quyền lợi: "Gặp sự cố cháy nổ nhà tự động báo cho chủ nhà & cảnh sát phòng cháy chữa cháy"
   - Có dấu "+" bên phải để mở rộng

2. Người dùng nhấn vào dấu "+" hoặc bất kỳ phần nào trên khối nhỏ (toàn bộ khối đều nhấn được)
3. Hệ thống mở rộng khối nhỏ:
   - Hiển thị nội dung chi tiết thuyết phục:  
     "Cảm biến nhiệt độ và khói thông minh phát hiện bất thường chỉ trong 3 giây. Bạn nhận thông báo khẩn cấp ngay trên điện thoại. Đồng thời hệ thống tự động báo cho đội phòng cháy chữa cháy gần nhất với đầy đủ thông tin vị trí. Giúp bạn và gia đình có thời gian thoát hiểm an toàn, giảm thiểu tối đa thiệt hại tài sản và rủi ro tính mạng. An tâm hơn bao giờ hết khi có hệ thống bảo vệ chủ động 24/7!"
   - Dấu "+" chuyển thành dấu "–" để biểu thị trạng thái mở

4. Người dùng nhấn lại dấu "–" hoặc toàn khối → hệ thống thu gọn khối nhỏ về trạng thái đóng

## 5. Alternative Flows (Luồng thay thế – nếu có)
- Không có luồng thay thế 

## 6. Business Rules (Quy tắc nghiệp vụ)
- Dấu "+" phải hiển thị rõ ràng bên phải khối nhỏ, chuyển thành "–" khi mở rộng
- Nội dung chi tiết phải mang tính thuyết phục, nhấn mạnh:
  - Lợi ích thực tế: phát hiện nhanh, thông báo realtime, hỗ trợ phòng cháy chữa cháy
  - Lợi ích cảm xúc: an tâm, giảm rủi ro tính mạng, bảo vệ gia đình
- Toàn bộ khối nhỏ phải nhấn được (không chỉ dấu +)
- Khối nhỏ phải hiển thị nhất quán với các khối quyền lợi khác (định dạng card nhỏ)

## 7. Edge Cases (Các tình huống biên phổ biến từ góc nhìn người dùng)
- Người dùng nhấn ngoài vùng dấu "+" nhưng vẫn trong khối → khối vẫn mở rộng bình thường
- Người dùng không nhìn thấy icon → nội dung chữ vẫn đầy đủ, dễ đọc
- Người dùng mở rộng nhiều khối cùng lúc → chỉ khối được nhấn mới mở rộng (các khối khác giữ nguyên trạng thái)

## 8. Acceptance Criteria (Given – When – Then)

### AC-01: Trạng thái đóng hiển thị đúng
Given  
- Khối teaser lớn của gói Home Care đã được mở rộng  
When  
- Người dùng xem khối Quyền lợi 3  
Then  
- Hiển thị đúng tiêu đề: "Gặp sự cố cháy nổ nhà tự động báo cho chủ nhà & cảnh sát phòng cháy chữa cháy"  
- Có icon minh họa bên trái  
- Có dấu "+" bên phải  
- Nội dung hiển thị rõ ràng, không bị cắt

### AC-02: Nhấn mở rộng hiển thị nội dung chi tiết thuyết phục
Given  
- Khối Quyền lợi 3 đang ở trạng thái đóng  
When  
- Người dùng nhấn dấu "+" hoặc bất kỳ phần nào trên khối  
Then  
- Khối mở rộng xuống dưới  
- Hiển thị đầy đủ nội dung chi tiết: "Cảm biến nhiệt độ và khói thông minh phát hiện bất thường chỉ trong 3 giây..."  
- Nội dung dễ đọc, không bị cắt  
- Dấu "+" chuyển thành "–"

### AC-03: Thu gọn lại khi nhấn lần 2
Given  
- Khối Quyền lợi 3 đang mở rộng  
When  
- Người dùng nhấn lại dấu "–" hoặc toàn khối  
Then  
- Khối thu gọn về trạng thái đóng  
- Nội dung chi tiết ẩn đi  
- Dấu "–" chuyển lại thành "+"
- Không có lỗi hiển thị

### AC-04: Hiển thị tốt trên mobile
Given  
- Người dùng mở trang trên thiết bị di động  
When  
- Mở rộng khối Quyền lợi 3  
Then  
- Khối chiếm toàn bộ chiều rộng màn hình  
- Nội dung chi tiết hiển thị rõ ràng, chữ wrap tự nhiên  
- Dấu "+" và toàn khối dễ chạm

### AC-05: Trang vẫn dùng được khi không có JavaScript
Given  
- Người dùng tắt JavaScript trong trình duyệt  
When  
- Trang chủ load thành công  
Then  
- Khối Quyền lợi 3 hiển thị đầy đủ nội dung chi tiết ngay từ đầu (không thu gọn)  
- Tiêu đề và nội dung vẫn đọc được bình thường  
- Không có phần trắng hoặc lỗi hiển thị