# Feature: Gói Cơ Bản Home Care (Free)

## 1. Business Goal 
- Hiển thị rõ ràng Gói Cơ Bản miễn phí trong phần "Thẻ thành viên" sau khi đăng nhập, giúp người dùng nhận biết ngay có 2 lựa chọn: miễn phí (Cơ Bản) và có phí (Cao Cấp).
- Giảm rào cản tham gia bằng cách cho phép kích hoạt Gói Cơ Bản miễn phí chỉ với vài cú click, khuyến khích người dùng bắt đầu sử dụng dịch vụ ngay mà không lo chi phí.
- Tăng tỷ lệ kích hoạt tài khoản mới và giữ chân người dùng ban đầu bằng trải nghiệm đơn giản, nhanh chóng.

## 2. Actors
- User

## 3. Preconditions
- Người dùng đã đăng nhập thành công vào hệ thống.
- Trang Account đã load xong và hiển thị bình thường.
- Phần "Thẻ thành viên" được hiển thị (trong sidebar trái).

## 4. Main Flow
1. Người dùng vào trang /Account.
2. Người dùng nhìn thấy hoặc nhấn vào mục **"Thẻ thành viên"** (sidebar trái hoặc tab).
3. Hệ thống hiển thị danh sách 2 gói dịch vụ xếp dọc:
   - Gói Cơ Bản (Free) – hiển thị đầu tiên
   - Gói Cao Cấp (có phí) – hiển thị bên dưới
4. Người dùng nhấn vào Gói Cơ Bản.
5. Hệ thống hiển thị **popup đăng ký/kích hoạt miễn phí** với nội dung:
   - Tiêu đề: **"Đăng ký Gói Cơ Bản – Miễn phí"**
   - Mô tả: **"Bạn sẽ có tài khoản để sử dụng dịch vụ cơ bản mà không mất phí. Chỉ cần vài bước là xong!"**
   - Nút chính: **"Đăng ký miễn phí"** (nổi bật, màu xanh dương)
   - Nút phụ: **"Hủy"** hoặc **"Đóng"** (màu xám)
6. Người dùng nhấn **"Đăng ký miễn phí"**.
7. Hệ thống xử lý kích hoạt miễn phí:
   - Popup đóng tự động
   - Hiển thị thông báo thành công: **"Đã kích hoạt Gói Cơ Bản miễn phí!"**
   - Trạng thái Gói Cơ Bản cập nhật thành **"Đã kích hoạt"** 
   - Người dùng có thể sử dụng ngay các tính năng cơ bản của Gói Cơ Bản.

## 5. Alternative Flows
### 5.1 Người dùng đã kích hoạt Gói Cơ Bản trước đó
- Gói Cơ Bản hiển thị trạng thái **"Đã kích hoạt"** (badge xanh hoặc text "Active").

### 5.2 Truy cập trên thiết bị di động
- Danh sách 2 gói xếp dọc full width.
- Popup đăng ký chiếm gần full màn hình, nút dễ chạm bằng ngón tay.

### 5.3 Đóng popup mà không đăng ký
- Người dùng nhấn "Hủy" hoặc "Đóng" (hoặc click ngoài popup) → popup đóng, quay lại danh sách gói mà không thay đổi trạng thái.

## 6. Business Rules 
- Gói Cơ Bản hoàn toàn **miễn phí**, không thu bất kỳ khoản phí nào khi kích hoạt.
- Chỉ hiển thị **2 gói duy nhất** (Cơ Bản Free và Cao Cấp có phí) trong phần "Thẻ thành viên".
- Toàn bộ card/dòng Gói Cơ Bản phải **nhấn được** để mở popup đăng ký (kể cả khoảng trống).
- Khi người dùng chưa kích hoạt: hiển thị nút đăng ký trong popup; sau khi kích hoạt: hiển thị trạng thái "Đã kích hoạt" và không cho mở popup đăng ký lại.
- Popup phải có nút đóng rõ ràng để tránh người dùng bị kẹt.
- Responsive: trên mobile, danh sách gói và popup phải dễ đọc, dễ chạm, không bị cắt chữ.
- Không cho phép kích hoạt lại Gói Cơ Bản nếu đã kích hoạt (tránh lặp request).

## 7. Edge Cases
- Người dùng đã kích hoạt Gói Cơ Bản → hiển thị trạng thái "Đã kích hoạt", nhấn vào không mở popup.
- Popup bị đóng đột ngột (click ngoài hoặc Esc) → quay lại danh sách gói, trạng thái không thay đổi.
- Mạng chậm → phần "Thẻ thành viên" hiển thị trước (danh sách 2 gói), popup và xử lý đăng ký load sau.
- Người dùng refresh trang sau khi kích hoạt → trạng thái Gói Cơ Bản vẫn là "Đã kích hoạt".
- Trình duyệt tắt JavaScript → hiển thị danh sách gói cơ bản, nhưng không mở popup (hoặc hiển thị thông báo fallback nếu cần).

## 8. Acceptance Criteria 

### AC-01: Phần "Thẻ thành viên" hiển thị đúng
Given 
- Người dùng đã đăng nhập và trang Dashboard load thành công  
When
- Xem phần "Thẻ thành viên"  
Then  
- Thấy mục "Thẻ thành viên"  
- Nhấn vào mục → hiển thị danh sách 2 gói: Gói Cơ Bản (Free) đầu tiên, Gói Cao Cấp bên dưới  
- Không hiển thị gói nào khác

### AC-02: Gói Cơ Bản hiển thị đúng trong danh sách
Given 
- Phần "Thẻ thành viên" đã mở  
When
- Xem Gói Cơ Bản  
Then  
- Tiêu đề chính xác: "Gói Cơ Bản"  
- Mô tả chính xác: "Tài khoản miễn phí để sử dụng dịch vụ cơ bản"  
- Dòng giá chính xác: "Free" (nổi bật)  
- Toàn bộ card/dòng có thể nhấn (cursor pointer, hiệu ứng hover)

### AC-03: Nhấn Gói Cơ Bản mở popup đăng ký miễn phí
Given 
- Gói Cơ Bản đang hiển thị trạng thái chưa kích hoạt  
When
- Nhấn vào Gói Cơ Bản  
Then  
- Hiện popup với tiêu đề: "Đăng ký Gói Cơ Bản – Miễn phí"  
- Mô tả chính xác: "Bạn sẽ có tài khoản để sử dụng dịch vụ cơ bản mà không mất phí. Chỉ cần vài bước là xong!"  
- Có nút "Đăng ký miễn phí" nổi bật (màu xanh dương) và nút "Hủy"/"Đóng"  
- Popup dễ đọc, không lỗi hiển thị

### AC-04: Kích hoạt Gói Cơ Bản thành công qua nút popup
Given 
- Popup đăng ký Gói Cơ Bản đang mở  
When 
- Nhấn nút "Đăng ký miễn phí"  
Then  
- Popup đóng tự động  
- Hiển thị thông báo thành công: "Đã kích hoạt Gói Cơ Bản miễn phí!"  
- Trạng thái Gói Cơ Bản cập nhật thành "Đã kích hoạt"  
- Người dùng có thể sử dụng ngay dịch vụ cơ bản  
- Không có lỗi xử lý hoặc chuyển hướng sai

### AC-05: Trải nghiệm responsive trên mobile
Given 
- Truy cập Dashboard bằng thiết bị di động  
When
- Mở "Thẻ thành viên" và nhấn Gói Cơ Bản  
Then  
- Danh sách 2 gói xếp dọc, full width, dễ đọc  
- Popup đăng ký chiếm gần full màn hình, nút "Đăng ký miễn phí" và "Hủy" dễ chạm bằng ngón tay  
- Chữ wrap tự nhiên, không bị cắt cụt

### AC-06: Người dùng đã kích hoạt Gói Cơ Bản
Given 
- Người dùng đã kích hoạt Gói Cơ Bản trước đó  
When
- Xem phần "Thẻ thành viên"  
Then  
- Gói Cơ Bản hiển thị trạng thái "Đã kích hoạt" 
- Nhấn vào không mở popup đăng ký  
