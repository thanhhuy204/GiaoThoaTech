# Feature 1: Khối gói dịch vụ an ninh Home Care

## 1. Business Goal
- Tăng độ nhận diện cho gói dịch vụ an ninh Home Care ngay trên trang chủ.
- Thu hút sự chú ý của khách hàng thông qua quà tặng hấp dẫn và thông tin trực quan.
- Khuyến khích khách hàng tương tác (nhấn xem chi tiết) để hiểu rõ 4 quyền lợi cốt lõi và mức giá, từ đó thúc đẩy quyết định mua hàng.

## 2. Actors
- Visitor
- Potential Customer

## 3. Preconditions
- Trang chủ đã tải xong và hiển thị bình thường.
- Khối Home Care được bật hiển thị và nằm ngay dưới hero banner.

## 4. Main Flow
1. **Vị trí và hiển thị khối teaser lớn**  
   - Đặt ngay dưới hero banner (phần giữa trên trang) để dễ thấy ngay.  
   - Nội dung teaser gồm:  
     - Hình ảnh minh họa (khóa điện tử + camera + ngôi nhà an toàn).  
     - Tiêu đề chính: "Mua gói dịch vụ an ninh Home Care hàng năm được tặng khóa điện tử & camera".  
     - Dòng phụ: "Quyền lợi dịch vụ an ninh Home Care gồm:".  
     - Dấu hiệu mở rộng (mũi tên xuống hoặc dấu +).  
     - (Tùy chọn) nút nhỏ "Xem chi tiết".  

2. **Tương tác mở rộng khối**  
   - Toàn bộ vùng teaser lớn đều có thể nhấn được (tiêu đề, ảnh, dòng phụ, icon mở rộng, nút xem chi tiết).  
   - Khi nhấn bất kỳ đâu → khối mở rộng tại chỗ và hiển thị 5 phần chi tiết theo thứ tự:  
     - Khối nhỏ quyền lợi 1: Quản lý lịch sử ra vào nhà 24/7  
     - Khối nhỏ quyền lợi 2: Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực  
     - Khối nhỏ quyền lợi 3: Gặp sự cố cháy nổ tự động báo cho chủ nhà & công an khu vực  
     - Khối nhỏ quyền lợi 4: Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở  
     - Giá gói dịch vụ (nổi bật): 1,9 triệu đồng/năm hoặc 200.000 đ/tháng  

3. Dưới toàn bộ nội dung chi tiết của khối mở rộng, xuất hiện nút CTA **"Đăng ký ngay"** (nổi bật, dễ nhận biết).

4. Người dùng nhấn nút **"Đăng ký ngay"**:
   - Hệ thống hiển thị popup hoặc chuyển hướng đến trang chọn gói thanh toán với **2 lựa chọn riêng biệt**:
     - Gói năm: 1.900.000 VNĐ/năm (highlight ưu đãi: "Tiết kiệm nhất – Tặng khóa điện tử & camera")
     - Gói tháng: 200.000 VNĐ/tháng (linh hoạt, không cam kết dài hạn)
   - Mỗi gói hiển thị dưới dạng card riêng: giá rõ ràng, mô tả ưu đãi ngắn, nút "Chọn gói này"
   - Sau khi nhấn nút "Chọn gói này" sẽ chuyển đến trang thanh toán.
   - Có nút "Quay lại" để đóng popup/chuyển hướng mà không mất trạng thái khối mở rộng.

5. **Thu gọn khối**  
   - Nhấn lại vùng tiêu đề hoặc icon mũi tên lên → khối thu gọn về trạng thái teaser ban đầu.

## 5. Alternative Flows
### 5.1 Nhấn liên tục nhanh
- Mỗi lần nhấn toggle trạng thái mở/đóng mượt mà, không gây lỗi.

### 5.2 Truy cập trên thiết bị di động
- Khối mở rộng full width, các phần chi tiết xếp dọc từ trên xuống dưới, dễ chạm và đọc.

### 5.3 Mạng chậm hoặc tải chậm
- Teaser hiển thị trước để giữ sự chú ý, nội dung chi tiết xuất hiện sau.

## 6. Business Rules
- Toàn bộ khối teaser phải nhấn được để mở rộng.  
- Khi mở rộng phải hiển thị đúng thứ tự: quyền lợi 1 & 2 (trên), quyền lợi 3 & 4 (dưới), giá nằm giữa và nổi bật nhất.  
- Nội dung văn bản phải chính xác 100%, không sai từ ngữ hay dấu câu.  
- Dưới toàn bộ nội dung chi tiết của khối mở rộng, nút "Đăng ký ngay" phải hiển thị nổi bật (màu sắc tương phản, bo góc, kích thước dễ nhấn).
- Khi nhấn nút "Đăng ký ngay", hệ thống phải luôn hiển thị **2 gói riêng biệt** (năm và tháng), không mặc định chọn gói nào.
- Gói năm phải được highlight ưu đãi rõ ràng.
- Popup chọn gói phải có nút đóng rõ ràng.
- Phần giá phải nổi bật rõ ràng (chữ lớn hơn, màu sắc nổi trội, vị trí trung tâm).  
- Trên desktop ưu tiên bố cục 2 cột cho các quyền lợi; trên mobile xếp dọc 1 cột.  
- Nội dung phải dễ đọc, không bị cắt cụt, khoảng cách giữa các phần hợp lý.

## 7. Edge Cases
- Mạng chậm → teaser hiển thị trước, chi tiết load sau.  
- JS bị tắt → hiển thị toàn bộ nội dung chi tiết ngay từ đầu (không cần mở rộng).  
- Mạng chậm → teaser hiển thị trước, chi tiết và nút CTA load sau.
- Icon không tải → vẫn hiển thị đầy đủ văn bản, không ảnh hưởng nội dung chính.  
- Nội dung dài hơn dự kiến → khối mở rộng hỗ trợ cuộn nếu cần, không làm vỡ giao diện.
- Popup chọn gói bị đóng đột ngột (nhấn ngoài hoặc Esc) → quay lại khối Home Care đã mở rộng, không mất trạng thái.
- Người dùng quay lại từ trang thanh toán → khối Home Care vẫn ở trạng thái đóng dù trước đó đã mở.

## 8. Acceptance Criteria

### AC-01: Khối teaser lớn hiển thị đúng và clickable toàn bộ
Given 
- Trang chủ load thành công  
When
- Người dùng xem khối Home Care  
Then  
- Hiển thị tiêu đề: "Mua gói dịch vụ an ninh Home Care hàng năm được tặng khóa điện tử & camera"  
- Hiển thị dòng phụ: "Quyền lợi dịch vụ an ninh Home Care gồm:"  
- Có hình ảnh minh họa và dấu hiệu mở rộng  
- Toàn bộ vùng teaser có thể nhấn, khối chưa mở rộng  

### AC-02: Nhấn bất kỳ phần nào của khối lớn đều mở rộng chi tiết
Given
- Khối teaser đang hiển thị
When
- Người dùng nhấn vào tiêu đề / ảnh / dòng phụ / icon mở rộng
Then
- Khối mở rộng tại chỗ
- Hiển thị đúng 5 phần theo thứ tự, mỗi phần có icon minh họa phù hợp và văn bản đúng 100%:
  - "Quản lý lịch sử ra vào nhà 24/7" (icon đồng hồ)
  - "Gặp sự cố trộm cướp vào nhà báo cho chủ nhà & công an khu vực nơi ở" (icon còi báo động)
  - "Gặp sự cố cháy nổ nhà tự động báo cho chủ nhà & cảnh sát phòng cháy chữa cháy" (icon lửa/chuông)
  - "Bảo hiểm mọi rủi ro trộm cướp & cháy nổ nhà ở" (icon khiên)
  - "Giá gói dịch vụ an ninh Home Care 1,9 triệu đồng/năm hoặc 200.000 đ/tháng" (nổi bật rõ ràng, chữ lớn, màu nổi, vị trí trung tâm)
- Các phần có khoảng cách hợp lý, không chồng lấn, dễ đọc.
- Dưới toàn bộ nội dung chi tiết, nút "Đăng ký ngay" hiển thị nổi bật, dễ nhận biết.
- Nội dung chính xác từ ngữ và dấu câu.

### AC-03: Nhấn "Đăng ký ngay" hiển thị 2 gói riêng biệt
Given 
- Khối teaser đang hiển thị  
When
Khối Home Care đã mở rộng và nút "Đăng ký ngay" hiển thị
When
- Người dùng nhấn nút "Đăng ký ngay"
Then
- Hiển thị popup hoặc chuyển trang với **2 card gói riêng biệt**:
  - Gói năm: 1.900.000 VNĐ/năm (highlight ưu đãi tặng khóa & camera)
  - Gói tháng: 200.000 VNĐ/tháng (linh hoạt)
- Mỗi card có giá rõ ràng, mô tả ưu đãi ngắn, nút "Chọn gói này"
- Có nút "Quay lại" để đóng mà không mất trạng thái khối mở rộng
- Không lỗi hiển thị hoặc chuyển hướng sai

### AC-04: Thu gọn lại khi nhấn lần thứ hai
Given
- Khối đang mở rộng chi tiết  
When
- Người dùng nhấn lại vùng tiêu đề hoặc icon mũi tên lên  
Then  
- Khối thu gọn về trạng thái teaser ban đầu  
- Nội dung chi tiết và nút CTA ẩn đi hoàn toàn
- Không còn lỗi hiển thị thừa  

### AC-05: Responsive trên mobile
Given 
- Truy cập trang chủ trên thiết bị di động  
When
- Người dùng mở rộng khối Home Care  
Then  
- Khối mở rộng full chiều rộng màn hình  
- 5 phần xếp dọc từ trên xuống dưới  
- Chữ wrap tự nhiên, icon và text không bị cắt  
- Dễ chạm để mở/thu gọn  
- Nút "Đăng ký ngay" dễ chạm
- Popup/chuyển trang chọn 2 gói hiển thị tốt, dễ thao tác bằng ngón tay

### AC-06: Hiển thị khi JS bị tắt
Given
- Người dùng tắt JavaScript trong trình duyệt
When
- Trang chủ load thành công
Then
- Khối Home Care hiển thị **toàn bộ nội dung chi tiết + nút CTA ngay từ đầu** (không trạng thái đóng, không dấu +/–)
- Nội dung và nút "Đăng ký ngay" đều hiển thị đầy đủ
- Không có khoảng trắng thừa hoặc lỗi giao diện