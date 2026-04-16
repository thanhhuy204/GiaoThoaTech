# Feature: Khối nhỏ Quyền lợi 4 - Bảo hiểm rủi ro trộm cướp & cháy nổ (trong gói Home Care)

## 1. Business Goal (Mục tiêu nghiệp vụ)
Hiển thị quyền lợi "Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở" dưới dạng khối nhỏ riêng biệt trong gói Home Care.  
Khi người dùng quan tâm và mở rộng, cung cấp nội dung chi tiết thuyết phục về giá trị bảo vệ tài chính toàn diện, giúp giảm lo lắng và tăng sự yên tâm tuyệt đối cho chủ nhà, từ đó thúc đẩy quyết định mua hoặc kích hoạt gói.

## 2. Actors (Đối tượng sử dụng)
- Visitor
- Potential consumer

## 3. Preconditions (Điều kiện tiên quyết)
- Trang chủ đã tải thành công
- Người dùng đã mở rộng khối teaser lớn của gói Home Care ("Mua gói dịch vụ an ninh Home Care hàng năm được tặng khóa điện tử & camera")

## 4. Main Flow (Luồng chính – Happy path)
1. Trong phần quyền lợi mở rộng của gói Home Care, hệ thống hiển thị khối nhỏ Quyền lợi 4 ở trạng thái đóng:
   - Có icon minh họa bên trái
   - Tiêu đề quyền lợi: "Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở"
   - Có dấu "+" bên phải để mở rộng

2. Người dùng nhấn vào dấu "+" hoặc bất kỳ phần nào trên khối nhỏ (toàn bộ khối đều nhấn được)
3. Hệ thống mở rộng khối nhỏ:
   - Hiển thị nội dung chi tiết thuyết phục:  
     "Gói Home Care đã bao gồm bảo hiểm toàn diện cho mọi rủi ro trộm cướp và cháy nổ, với mức bồi thường lên đến hàng trăm triệu đồng. Bạn không phải lo lắng về chi phí sửa chữa, thay thế tài sản hay mất mát lớn. Đây là sự bảo vệ tài chính thực sự, giúp bạn yên tâm tận hưởng cuộc sống mà không sợ hãi những rủi ro bất ngờ. Chỉ với mức phí hợp lý, bạn đã có lớp bảo vệ kép: công nghệ + bảo hiểm!"
   - Dấu "+" chuyển thành dấu "–" để biểu thị trạng thái mở

4. Người dùng nhấn lại dấu "–" hoặc toàn khối → hệ thống thu gọn khối nhỏ về trạng thái đóng

## 5. Alternative Flows (Luồng thay thế – nếu có)
- Không có luồng thay thế 

## 6. Business Rules (Quy tắc nghiệp vụ)
- Dấu "+" phải hiển thị rõ ràng bên phải khối nhỏ, chuyển thành "–" khi mở rộng
- Nội dung chi tiết phải mang tính thuyết phục, nhấn mạnh:
  - Lợi ích thực tế: bảo hiểm toàn diện, bồi thường cao, giảm chi phí sửa chữa/mất mát
  - Lợi ích cảm xúc: yên tâm, không lo lắng, bảo vệ tài chính, tận hưởng cuộc sống
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
- Người dùng xem khối Quyền lợi 4  
Then  
- Hiển thị đúng tiêu đề: "Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở"  
- Có icon minh họa bên trái  
- Có dấu "+" bên phải  
- Nội dung hiển thị rõ ràng, không bị cắt

### AC-02: Nhấn mở rộng hiển thị nội dung chi tiết thuyết phục
Given  
- Khối Quyền lợi 4 đang ở trạng thái đóng  
When  
- Người dùng nhấn dấu "+" hoặc bất kỳ phần nào trên khối  
Then  
- Khối mở rộng xuống dưới  
- Hiển thị đầy đủ nội dung chi tiết: "Gói Home Care đã bao gồm bảo hiểm toàn diện cho mọi rủi ro trộm cướp và cháy nổ..."  
- Nội dung dễ đọc, không bị cắt  
- Dấu "+" chuyển thành "–"

### AC-03: Thu gọn lại khi nhấn lần 2
Given  
- Khối Quyền lợi 4 đang mở rộng  
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
- Mở rộng khối Quyền lợi 4  
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
- Khối Quyền lợi 4 hiển thị đầy đủ nội dung chi tiết ngay từ đầu (không thu gọn)  
- Tiêu đề và nội dung vẫn đọc được bình thường  
- Không có phần trắng hoặc lỗi hiển thị