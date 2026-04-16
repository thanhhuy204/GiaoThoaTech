# Feature: Trang Chính sách bảo mật

## 1. Business Goal
Cung cấp một trang Chính sách Bảo mật chuyên nghiệp, minh bạch và dễ đọc, giúp người dùng hiểu rõ cách Trang web thu thập, sử dụng, chia sẻ và bảo vệ dữ liệu cá nhân của họ.  
Trang góp phần xây dựng lòng tin, đáp ứng yêu cầu pháp lý (PDPA, GDPR) và mang lại trải nghiệm người dùng tốt.

## 2. Actors
- Visitor
- Potential Customer 
- User 

## 3. Preconditions
- Người dùng đã truy cập bất kỳ trang nào trên website 
- Người dùng nhấn vào liên kết **“Chính sách bảo mật”** nằm ở footer, góc bên phải dưới cùng của trang.

## 4. Main Flow
1. Người dùng click vào liên kết **“Chính sách bảo mật”** ở footer (góc phải dưới).
2. Hệ thống chuyển hướng đến trang **Chính sách bảo mật**.
3. Trang mở với bố cục sạch sẽ, sử dụng cơ chế **accordion (thu gọn/mở rộng)** cho từng phần chính.
4. Người dùng có thể click vào tiêu đề từng phần để mở rộng và đọc nội dung.
5. Toàn bộ trang hỗ trợ responsive tốt trên cả desktop và mobile.

## 5. Alternative Flows
- Không có

## 6. Business Rules
- Trang phải có tiêu đề chính: **“Chính sách Bảo mật”** kèm ngày hiệu lực (22 tháng 3 năm 2025 hoặc phiên bản mới nhất ngay dưới tiêu đề).
- Sử dụng cơ chế **accordion** cho tất cả các phần chính để trang gọn và dễ điều hướng.
- Ngôn ngữ đơn giản, dễ hiểu, tránh thuật ngữ pháp lý phức tạp.
- Phải hiển thị rõ thông tin liên hệ Cán bộ Bảo vệ Dữ liệu (email: contact@giaothoatech.cloud).
- Trang phải responsive hoàn toàn trên mobile và desktop.
- Khi có thay đổi quan trọng, phải có thông báo nổi bật trên trang.

## 7. Edge Cases
- Người dùng cuộn trang dài → Trang vẫn dễ theo dõi nhờ accordion và bảng mục lục (Table of Contents).
- Người dùng truy cập từ thiết bị di động → Font chữ, khoảng cách dòng và nút bấm phải dễ chạm.
- Người dùng mở accordion nhiều phần cùng lúc → Trang vẫn mượt mà, không lag.
- Người dùng muốn quay lại trang trước → Có nút “Back” hoặc “Quay về trang chủ” dễ thấy.
- Kết nối chậm → Nút tải file vẫn hiển thị rõ ràng và có thông báo tiến độ nếu cần.

## 8. Acceptance Criteria

### AC-01: Truy cập trang Chính sách bảo mật từ Footer
Given
- Người dùng đang xem bất kỳ trang nào trên website  
When 
- Nhấn vào liên kết “Chính sách bảo mật” ở góc phải footer  
Then
- Hệ thống chuyển đến trang Chính sách bảo mật với tiêu đề “Chính sách Bảo mật” và ngày hiệu lực hiển thị rõ ràng.

### AC-02: Bố cục Accordion (Thu gọn / Mở rộng)
Given 
- Người dùng đang ở trang Chính sách bảo mật  
When 
- Click vào tiêu đề bất kỳ phần nào  
Then 
- Phần đó mở rộng hiển thị nội dung đầy đủ, click lại để thu gọn. Các phần khác vẫn giữ nguyên trạng thái.

### AC-03: Cấu trúc các phần chính
Given 
- Người dùng đang xem trang Chính sách bảo mật  
When 
- Cuộn hoặc click accordion  
Then 
- Trang phải hiển thị đầy đủ các phần sau theo thứ tự:
    - GIỚI THIỆU
    - CÂU HỎI VỀ CHÍNH SÁCH BẢO MẬT NÀY
    - GIAOTHOATECH THU THẬP NHỮNG DỮ LIỆU CÁ NHÂN NÀO VỀ BẠN?
    - GIAOTHOATECH THU THẬP DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ THẾ NÀO?
    - GIAOTHOATECH SỬ DỤNG DỮ LIỆU CÁ NHÂN CỦA BẠN VÀO MỤC ĐÍCH GÌ?
    - GIAOTHOATECH CHIA SẼ DỮ LIỆU CÁ NHÂN CỦA BẠN VỚI AI?
    - YÊU CẦU TRUY CẬP, CHỈNH SỬA VÀ/HOẶC CHUYỂN DỮ LIỆU CÁ NHÂN
    - GIAOTHOATECH BẢO VỆ DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ THẾ NÀO?
    - CÁ NHÂN CƯ TRÚ TẠI KHU VỰC KINH TẾ CHÂU ÂU (“EEA”) VÀ VƯƠNG QUỐC ANH
    - CẬP NHẬT CHÍNH SÁCH BẢO MẬT NÀY

### AC-05: Liên hệ Cán bộ Bảo vệ Dữ liệu
Given 
- Người dùng đang xem trang Chính sách bảo mật  
When 
- Xem phần Câu hỏi hoặc footer trang  
Then 
- Hiển thị email **contact@giaothoatech.cloud** và có thể click để mở ứng dụng email.

### AC-06: Responsive trên Mobile
Given 
- Người dùng mở trang trên điện thoại  
When 
- Xem trang Chính sách bảo mật  
Then 
- Accordion hoạt động mượt mà
- Font chữ và khoảng cách dòng dễ đọc
- Nút tải và nút liên hệ dễ chạm bằng ngón tay

### AC-07: Table of Contents (Tùy chọn nhưng khuyến khích)
Given 
- Người dùng đang xem trang Chính sách bảo mật  
When 
- Trang được tải  
Then 
- Có bảng mục lục cố định hoặc ở đầu trang cho phép nhảy nhanh đến từng phần.

