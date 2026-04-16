# Feature: Khối nhỏ Quyền lợi 2 - Gặp sự cố trộm cướp báo công an (trong gói Home Care)

## 1. Business Goal (Mục tiêu nghiệp vụ)
Hiển thị quyền lợi "Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực nơi ở" dưới dạng khối nhỏ riêng biệt trong gói Home Care.  
Khi người dùng quan tâm và mở rộng, cung cấp nội dung chi tiết thuyết phục về khả năng phản ứng nhanh và bảo vệ kịp thời, giúp tăng cảm giác an toàn tuyệt đối và giá trị thực tế của gói, từ đó thúc đẩy quyết định mua hoặc kích hoạt gói.

## 2. Actors (Đối tượng sử dụng)
- Visitor
- Potential consumer

## 3. Preconditions (Điều kiện tiên quyết)
- Trang chủ đã tải thành công
- Người dùng đã mở rộng khối teaser lớn của gói Home Care ("Mua gói dịch vụ an ninh Home Care hàng năm được tặng khóa điện tử & camera")

## 4. Main Flow (Luồng chính – Happy path)
1. Trong phần quyền lợi mở rộng của gói Home Care, hệ thống hiển thị khối nhỏ Quyền lợi 2 ở trạng thái đóng:
   - Có icon hình cái khiên bên trái
   - Tiêu đề quyền lợi: "Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực nơi ở"
   - Có dấu "+" bên phải để mở rộng

2. Người dùng nhấn vào dấu "+" hoặc bất kỳ phần nào trên khối nhỏ (toàn bộ khối đều nhấn được)
3. Hệ thống mở rộng khối nhỏ:
   - Hiển thị nội dung chi tiết thuyết phục:  
     "Khi phát hiện dấu hiệu bất thường như mở cửa trái phép, nhập sai mã nhiều lần hoặc tác động lên khóa, hệ thống sẽ kích hoạt cảnh báo ngay lập tức. Bạn nhận được thông báo tức thì trên điện thoại, giúp nắm rõ tình hình dù không có ở nhà. Nhờ đó, bạn có thể chủ động kiểm tra, liên hệ người thân hoặc báo cho bảo vệ khu vực khi cần thiết, xử lý kịp thời mọi tình huống. Giảm thiểu rủi ro mất mát và bảo vệ an toàn cho gia đình bạn một cách chủ động."
   - Dấu "+" chuyển thành dấu "–" để biểu thị trạng thái mở

4. Người dùng nhấn lại dấu "–" hoặc toàn khối → hệ thống thu gọn khối nhỏ về trạng thái đóng

## 5. Alternative Flows (Luồng thay thế – nếu có)
- Không có luồng thay thế đáng kể (luồng chính là happy path duy nhất)

## 6. Business Rules (Quy tắc nghiệp vụ)
- Dấu "+" phải hiển thị rõ ràng bên phải khối nhỏ, chuyển thành "–" khi mở rộng
- Nội dung chi tiết phải mang tính thuyết phục, nhấn mạnh:
  - Lợi ích thực tế: phát hiện bất thường, thông báo tức thì, hỗ trợ xử lý kịp thời
  - Lợi ích cảm xúc: chủ động kiểm soát tình hình, giảm rủi ro mất mát, bảo vệ gia đình
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
- Người dùng xem khối Quyền lợi 2  
Then  
- Hiển thị đúng tiêu đề: "Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực nơi ở"  
- Có icon minh họa bên trái  
- Có dấu "+" bên phải  
- Nội dung hiển thị rõ ràng, không bị cắt

### AC-02: Nhấn mở rộng hiển thị nội dung chi tiết thuyết phục
Given  
- Khối Quyền lợi 2 đang ở trạng thái đóng  
When  
- Người dùng nhấn dấu "+" hoặc bất kỳ phần nào trên khối  
Then  
- Khối mở rộng xuống dưới  
- Hiển thị đầy đủ nội dung chi tiết: "Khi phát hiện dấu hiệu bất thường như mở cửa trái phép..."  
- Nội dung dễ đọc, không bị cắt  
- Dấu "+" chuyển thành "–"

### AC-03: Thu gọn lại khi nhấn lần 2
Given  
- Khối Quyền lợi 2 đang mở rộng  
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
- Mở rộng khối Quyền lợi 2  
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
- Khối Quyền lợi 2 hiển thị đầy đủ nội dung chi tiết ngay từ đầu (không thu gọn)  
- Tiêu đề và nội dung vẫn đọc được bình thường  
- Không có phần trắng hoặc lỗi hiển thị