# Feature: Trang Account

## 1. Business Goal
Cung cấp một trang Account tập trung, giúp người dùng dễ dàng xem và quản lý thông tin cá nhân sau khi đăng nhập.  
Trang cho phép xem trạng thái gói dịch vụ, kích hoạt/nâng cấp gói, chỉnh sửa thông tin cơ bản và truy cập nhanh các chức năng cá nhân qua menu dropdown ở Header, tạo trải nghiệm người dùng thân thiện.

## 2. Actors 
- User 

## 3. Preconditions 
- Người dùng đã đăng nhập thành công vào tài khoản.

## 4. Main Flow 
1. Người dùng truy cập trang Account.
2. Trang hiển thị các thành phần chính:
   - **Header/Profile section**:
     - Avatar của người dùng (nhấn vào để mở Menu Dropdown)
     - Tên hiển thị 
     - Email (ở dưới tên) được hiển thị rõ ràng
   - **Thẻ thành viên** (badge hoặc card nhỏ nằm góc phải cạnh tên):
     - Hiển thị trạng thái hiện tại: "Chưa kích hoạt" / "Gói Cơ Bản" / "Gói Cao Cấp – Còn X ngày"
     - Toàn bộ thẻ thành viên nhấn được để mở danh sách gói dịch vụ
3. Người dùng nhấn vào **avatar** ở Header:
   - Menu Dropdown hiện ra với nội dung:
     - Phần trên: Avatar + tên người dùng + Email + chấm xanh trạng thái online
     - **Hồ sơ cá nhân**
     - **Đổi mật khẩu**
     - Phần **Cài đặt**:
       - Thông báo
       - Ngôn ngữ
       - Tùy chọn
     - **Đăng xuất** (màu đỏ nổi bật)
4. Người dùng nhấn vào **thẻ thành viên**:
   - Hiển thị danh sách 2 gói dịch vụ (Gói Cơ Bản và Gói Cao Cấp).
5. Tương tác với gói:
   - Nhấn **Gói Cơ Bản** → mở popup “Đăng ký Gói Cơ Bản – Miễn phí” với nút “Đăng ký miễn phí”
   - Nhấn **Gói Cao Cấp** → mở popup chi tiết gói, cho phép chọn gói tháng (200.000đ) hoặc năm (1.900.000đ), nút “Đăng ký ngay”
6. Phần dưới trang:
   - Nút **“Chỉnh sửa thông tin cá nhân”** → chuyển đến form chỉnh sửa tên và số điện thoại
   - Nút **“Đăng xuất”** → xác nhận logout (cũng có thể thực hiện từ menu dropdown)

## 5. Alternative Flows 
### 5.1 Người dùng chưa kích hoạt gói nào
- Thẻ thành viên hiển thị “Chưa kích hoạt”
- Nhấn thẻ → ưu tiên mở popup kích hoạt Gói Cơ Bản miễn phí

### 5.2 Người dùng đã kích hoạt Gói Cơ Bản
- Thẻ thành viên hiển thị “Gói Cơ Bản”
- Có nút “Nâng cấp lên Cao Cấp” trong popup

### 5.3 Người dùng đã kích hoạt Gói Cao Cấp
- Thẻ thành viên hiển thị “Gói Cao Cấp – Còn XX ngày”
- Có nút “Gia hạn” hoặc “Quản lý gói”

### 5.4 Sử dụng Menu Dropdown từ avatar
- Nhấn avatar → mở menu → chọn “Hồ sơ cá nhân” → quay lại hoặc chuyển đến trang Account
- Chọn “Đăng xuất” từ menu → xác nhận và logout

## 6. Business Rules 
- Trang Account chỉ hiển thị sau khi đăng nhập thành công.
- Avatar trong Header phải nhấn được để mở Menu Dropdown với đầy đủ các mục như trong thiết kế.
- Thẻ thành viên phải phản ánh **trạng thái chính xác** của gói dịch vụ.
- Menu Dropdown phải hiển thị thông tin tài khoản (tên người dùng, email, trạng thái online) ở đầu menu.
- Chỉ cho phép chỉnh sửa **Tên** và **Số điện thoại** (Email không cho chỉnh sửa trên trang này).
- Mục “Đăng xuất” phải nổi bật (màu đỏ) trong cả nút dưới trang và trong menu dropdown.
- Responsive: trên mobile, menu dropdown và popup chiếm gần full màn hình, dễ chạm.

## 7. Edge Cases 
- Người dùng chưa có avatar → hiển thị placeholder.
- Menu Dropdown mở nhưng người dùng click ra ngoài → menu tự động đóng.
- Popup bị đóng đột ngột (click ngoài hoặc “Hủy”) → quay lại trang Account, trạng thái không thay đổi.
- Người dùng refresh trang sau khi kích hoạt gói → trạng thái thẻ thành viên và menu cập nhật chính xác.

## 8. Acceptance Criteria

### AC-01: Trang Account hiển thị đúng thông tin cá nhân
Given  
- Người dùng đã đăng nhập và truy cập trang Account  
When  
- Trang load thành công  
Then  
- Hiển thị avatar (nhấn được để mở menu dropdown), tên/email
- Thẻ thành viên nằm góc phải cạnh tên, hiển thị đúng trạng thái gói hiện tại  
- Có nút "Chỉnh sửa thông tin cá nhân" và "Đăng xuất"

### AC-02: Mở Menu Dropdown từ avatar
Given  
- Người dùng đang xem trang Account  
When  
- Nhấn vào avatar ở Header  
Then  
- Menu dropdown hiện ra với:
  - Thông tin tài khoản (số điện thoại, email, chấm xanh online)
  - Hồ sơ cá nhân, Đổi mật khẩu
  - Cài đặt (Thông báo, Ngôn ngữ, Tùy chọn)
  - Đăng xuất (màu đỏ nổi bật)

### AC-03: Nhấn thẻ thành viên hiển thị đúng 2 gói
Given  
- Người dùng đang xem trang Account  
When  
- Nhấn vào thẻ thành viên  
Then  
- Hiển thị danh sách 2 gói: Gói Cơ Bản và Gói Cao Cấp  
- Cả hai gói đều nhấn được, dễ nhận biết

### AC-04: Hoàn tất đăng ký Gói Cơ Bản miễn phí
Given  
- Popup Gói Cơ Bản đang mở  
When  
- Nhấn “Đăng ký miễn phí” và hoàn tất  
Then  
- Popup đóng  
- Thẻ thành viên cập nhật thành “Gói Cơ Bản – Đã kích hoạt”  
- Hiển thị thông báo thành công

### AC-05: Trang responsive trên mobile
Given  
- Truy cập trang Account trên điện thoại  
When  
- Nhấn avatar hoặc thẻ thành viên  
Then  
- Menu dropdown và popup hiển thị rõ ràng, dễ chạm  
- Chữ wrap tự nhiên, không bị cắt

### AC-06: Đăng xuất hoạt động đúng
Given  
- Người dùng đang xem trang Account  
When  
- Nhấn “Đăng xuất” từ menu dropdown hoặc nút dưới trang  
Then  
- Kết thúc phiên đăng nhập  
- Chuyển về trang chủ hoặc trang đăng nhập