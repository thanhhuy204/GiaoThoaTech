# Feature: Chỉnh sửa thông tin cá nhân (Edit Personal Information)

## 1. Business Goal 
Cho phép người dùng đã đăng nhập cập nhật thông tin cá nhân cơ bản một cách dễ dàng và an toàn, giúp dữ liệu tài khoản luôn chính xác và phù hợp với thông tin hiện tại của người dùng.

## 2. Actors 
- Logged-in User

## 3. Preconditions
- Người dùng đã đăng nhập thành công
- Người dùng đang xem trang thông tin cá nhân (User Profile)
- Nút “Chỉnh sửa thông tin cá nhân” hiển thị rõ ràng

## 4. Main Flow 
1. Người dùng đang ở trang thông tin cá nhân.
2. Người dùng nhấn vào nút **“Chỉnh sửa thông tin cá nhân”**.
3. Hệ thống chuyển đến trang Chỉnh sửa thông tin cá nhân.
4. Trang hiển thị các trường có thể chỉnh sửa:
   - **Tên đăng nhập** – có thể thay đổi
   - **Số điện thoại** – có thể thay đổi
   - Email được hiển thị ở chế độ chỉ xem (không cho chỉnh sửa)
5. Người dùng chỉnh sửa Tên và/hoặc Số điện thoại.
6. Người dùng nhấn nút **“Lưu thay đổi”**.
7. Hệ thống kiểm tra và lưu thông tin mới.
8. Hệ thống hiển thị thông báo thành công: “Thông tin cá nhân đã được cập nhật”.
9. Người dùng được chuyển về trang thông tin cá nhân với dữ liệu đã cập nhật.

## 5. Alternative Flows 
- Người dùng nhấn “Hủy” → quay về trang thông tin cá nhân mà không lưu thay đổi
- Người dùng không thay đổi gì mà vẫn nhấn “Lưu thay đổi” → hệ thống thông báo “Thông tin cá nhân đã được cập nhật”

## 6. Business Rules
- Chỉ cho phép chỉnh sửa **Tên đăng nhập** và **Số điện thoại**
- Email **không cho phép chỉnh sửa** trên trang này (chỉ hiển thị)
- Tên đăng nhập không được để trống
- Số điện thoại phải là định dạng hợp lệ 
- Sau khi lưu thành công, thông tin phải được cập nhật ngay lập tức trên trang User Profile
- Người dùng có thể hủy bỏ việc chỉnh sửa bất kỳ lúc nào

## 7. Edge Cases 
- Người dùng cố gắng lưu khi không thay đổi gì
- Người dùng nhập số điện thoại không hợp lệ
- Người dùng thay đổi số điện thoại 
- Người dùng chỉnh sửa trên thiết bị di động → giao diện phải dễ thao tác

## 8. Acceptance Criteria

### AC-01: Truy cập trang Chỉnh sửa thông tin cá nhân
Given  
- Người dùng đang xem trang thông tin cá nhân  
When  
- Nhấn nút “Chỉnh sửa thông tin cá nhân”  
Then  
- Chuyển đến trang chỉnh sửa  
- Hiển thị các trường: Tên đăng nhập (có thể sửa), Số điện thoại (có thể sửa), Email (chỉ xem)

### AC-02: Chỉnh sửa Tên và Số điện thoại thành công
Given  
- Người dùng đã thay đổi Tên hoặc Số điện thoại  
When  
- Nhấn nút “Lưu thay đổi”  
Then  
- Thông tin được cập nhật thành công  
- Hiển thị thông báo: “Thông tin cá nhân đã được cập nhật”  
- Quay về trang thông tin cá nhân với dữ liệu mới

### AC-03: Email không thể chỉnh sửa
Given  
- Người dùng đang ở trang chỉnh sửa thông tin cá nhân  
When  
- Xem trường Email  
Then  
- Email được hiển thị ở chế độ chỉ xem (không cho nhập hoặc chỉnh sửa)

### AC-04: Hủy chỉnh sửa
Given  
- Người dùng đã thay đổi một số thông tin  
When  
- Nhấn nút “Hủy”
Then  
- Thay đổi bị hủy  
- Quay về trang thông tin cá nhân với dữ liệu cũ

### AC-05: Giao diện thân thiện trên mobile
Given  
- Người dùng chỉnh sửa trên điện thoại  
When  
- Xem trang Chỉnh sửa thông tin cá nhân  
Then  
- Các ô nhập Tên và Số điện thoại dễ chạm và dễ nhập  
- Nút “Lưu thay đổi” và “Hủy” dễ sử dụng
