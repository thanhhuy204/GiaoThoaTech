# Feature 1.1: Khối nhỏ Quyền lợi 1 - Quản lý lịch sử ra vào nhà 24/7 (trong gói nâng cấp)

## 1. Business Goal
- Hiển thị quyền lợi một cách ngắn gọn, tiết kiệm không gian trên giao diện.
- Khi khách hàng mở rộng, cung cấp thông tin chi tiết mang tính thuyết phục cao, nhấn mạnh lợi ích giám sát liên tục, giúp tăng sự yên tâm và thúc đẩy quyết định mua gói Home Care.

## 2. Actors
- Visitor
- Potential Customer

## 3. Preconditions
- Trang chủ đã tải và hiển thị bình thường.
- Người dùng đã nhấn mở rộng khối teaser lớn của gói Home Care để thấy các quyền lợi chi tiết.

## 4. Main Flow
1. **Trạng thái đóng (mặc định khi vừa mở khối lớn)**  
   - Khối nhỏ hiển thị gọn gàng với:  
     - Icon đồng hồ tròn màu cam bên trái.  
     - Văn bản chính: "+ quản lý lịch sử ra vào nhà 24/7".  
     - Dấu "+" rõ ràng bên phải để mời gọi mở rộng.  

2. **Mở rộng nội dung chi tiết**  
   - Người dùng nhấn vào dấu "+" hoặc bất kỳ phần nào trên khối nhỏ.  
   - Khối nhỏ mở rộng xuống dưới ngay tại chỗ, hiển thị đoạn văn thuyết phục đầy đủ:  
     "Lịch sử ra vào – Kiểm soát an ninh 24/7  

     Theo dõi toàn bộ lịch sử ra vào nhà mọi lúc, mọi nơi ngay trên điện thoại của bạn.  
     Biết chính xác ai đã vào nhà, vào lúc nào – dù bạn không có mặt.  

     Phân biệt rõ ràng người thân và người lạ, giúp bạn luôn chủ động trong mọi tình huống.  
     Không còn nỗi lo quên khóa cửa hay những nghi ngờ không đáng có.  

     Nắm quyền kiểm soát an ninh ngôi nhà của bạn – 24/7, chỉ với một chạm."  

3. **Thu gọn trở lại**  
   - Người dùng nhấn lại vào dấu "–" (hoặc toàn bộ khối nhỏ).  
   - Khối thu gọn về trạng thái ban đầu, dấu "–" chuyển lại thành "+".  

## 5. Alternative Flows
### 5.1 Nhấn nhiều lần liên tiếp
- Mỗi lần nhấn sẽ chuyển đổi trạng thái (mở ↔ đóng) mượt mà, không gây lỗi hiển thị.

### 5.2 Sử dụng trên thiết bị di động
- Khối nhỏ mở rộng chiếm toàn bộ chiều rộng màn hình.  
- Nội dung chi tiết tự động xuống dòng, dễ đọc và dễ chạm.

## 6. Business Rules
- Dấu "+" phải nằm bên phải khối nhỏ khi đóng, chuyển thành "–" khi mở rộng.  
- Toàn bộ khối nhỏ (không chỉ dấu +) phải có thể nhấn để mở rộng.  
- Nội dung chi tiết phải giữ nguyên văn bản thuyết phục, tập trung vào lợi ích cảm xúc (yên tâm, chủ động, loại bỏ lo lắng).  
- Trên mobile: vùng nhấn (đặc biệt dấu +/–) phải đủ lớn để dễ thao tác bằng ngón tay.  
- Nội dung phải hiển thị đầy đủ, không bị cắt cụt, khoảng cách giữa các dòng hợp lý.

## 7. Edge Cases
- Người dùng nhấn vào phần văn bản thay vì dấu + → vẫn mở rộng bình thường.  
- Mạng chậm → trạng thái đóng hiển thị ngay lập tức, nội dung chi tiết xuất hiện sau khi tải xong.  
- Trình duyệt tắt JavaScript → hiển thị toàn bộ nội dung chi tiết ngay từ đầu (không có cơ chế mở/thu).  
- Icon đồng hồ không tải được → vẫn hiển thị đầy đủ văn bản, không làm mất thông tin chính.

## 8. Acceptance Criteria

### AC-01: Trạng thái đóng hiển thị đúng
Given 
- Khối teaser lớn Home Care đã được mở rộng  
When 
- Người dùng nhìn vào khối nhỏ Quyền lợi 1  
Then  
- Thấy icon đồng hồ màu cam bên trái  
- Thấy dòng chữ: "+ quản lý lịch sử ra vào nhà 24/7"  
- Thấy dấu "+" rõ ràng bên phải  
- Khối chưa mở rộng nội dung chi tiết  

### AC-02: Mở rộng hiển thị nội dung thuyết phục
Given 
- Khối nhỏ đang ở trạng thái đóng  
When 
- Người dùng nhấn dấu "+" hoặc bất kỳ đâu trên khối nhỏ  
Then  
- Khối mở rộng xuống dưới tại chỗ  
- Hiển thị đúng và đầy đủ đoạn văn chi tiết đã quy định  
- Dấu "+" chuyển thành "–"  
- Nội dung dễ đọc, không bị cắt ngang  

### AC-03: Thu gọn khi nhấn lần thứ hai
Given 
- Khối nhỏ đang mở rộng nội dung chi tiết  
When 
- Người dùng nhấn dấu "–" hoặc toàn bộ khối  
Then  
- Khối thu gọn về trạng thái đóng ban đầu  
- Nội dung chi tiết ẩn hoàn toàn  
- Dấu "–" chuyển lại thành "+"  
- Không để lại phần hiển thị thừa  

### AC-04: Hiển thị và tương tác tốt trên mobile
Given 
- Người dùng truy cập bằng điện thoại  
When
- Mở rộng khối nhỏ Quyền lợi 1  
Then  
- Khối mở rộng chiếm full chiều rộng màn hình  
- Nội dung chi tiết tự động xuống dòng, dễ đọc không cần zoom  
- Vùng dấu "+" / "–" đủ lớn và dễ chạm bằng ngón tay  
- Mở rộng / thu gọn diễn ra mượt mà  