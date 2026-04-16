# Feature: Quản lý Vai trò - CRUD

## 1. Business Goal
Cho phép **Super Admin** thực hiện đầy đủ các thao tác Thêm mới, Sửa và Xóa vai trò (Role) trong hệ thống.  
Tính năng này giúp Super Admin linh hoạt xây dựng, chỉnh sửa và quản lý các vai trò để kiểm soát quyền hạn truy cập, đảm bảo tính bảo mật và phù hợp với cấu trúc tổ chức.

## 2. Actors 
- Super Admin

## 3. Preconditions 
- Super Admin đã đăng nhập vào hệ thống với quyền Super Admin.
- Đang ở Trang Quản trị và đã vào mục **“Vai trò & Quyền”** trên menu bên trái.

## 4. Main Flow

### 4.1. Xem danh sách Vai trò
1. Super Admin nhấn vào mục **“Vai trò & Quyền”** trong Menu bên trái của Trang Quản trị.
2. Hệ thống hiển thị danh sách tất cả Role hiện có.
3. Super Admin có thể tìm kiếm, lọc hoặc sắp xếp danh sách theo Tên Role, Mã Role hoặc Số người dùng.

### 4.2. Thêm mới Vai trò (Create)
1. Super Admin nhấn nút **“Thêm vai trò mới”**.
2. Hệ thống mở form tạo Role mới.
3. Super Admin nhập các thông tin:
   - Tên vai trò (Role Name)
   - Mã vai trò (Role Code)
   - Mô tả (Description)
4. Super Admin chọn các quyền cần gán cho Role này.
5. Nhấn nút **“Lưu”**.
6. Hệ thống tạo Role mới và hiển thị thông báo thành công: “Vai trò đã được tạo thành công”.

### 4.3. Sửa Vai trò (Edit)
1. Trong danh sách Vai trò, Super Admin nhấn nút **“Sửa”** tương ứng với Role cần chỉnh sửa.
2. Hệ thống mở form chỉnh sửa với thông tin hiện tại đã được điền sẵn.
3. Super Admin chỉnh sửa Tên vai trò, Mã vai trò, Mô tả và/hoặc danh sách quyền.
4. Nhấn nút **“Lưu thay đổi”**.
5. Hệ thống cập nhật thông tin Role và hiển thị thông báo thành công: “Vai trò đã được cập nhật thành công”.

### 4.4. Xóa Vai trò (Delete)
1. Trong danh sách Vai trò, Super Admin nhấn nút **“Xóa”** của Role cần xóa.
2. Hệ thống hiển thị popup xác nhận với nội dung:  
   “Bạn có chắc chắn muốn xóa vai trò này không?  
   Tất cả người dùng đang được gán vai trò này sẽ bị ảnh hưởng quyền hạn.”
3. Super Admin nhấn **“Xác nhận xóa”**.
4. Hệ thống xóa Role và hiển thị thông báo thành công: “Vai trò đã được xóa thành công”.

## 5. Alternative Flows 
- Super Admin hủy thao tác tạo/sửa/xóa và quay lại danh sách Vai trò.
- Super Admin tìm kiếm Role trước khi thực hiện sửa hoặc xóa.
- Khi xóa Role đang được sử dụng, hệ thống hiển thị danh sách người dùng bị ảnh hưởng.

## 6. Business Rules 
- Chỉ **Super Admin** mới có quyền Thêm, Sửa, Xóa Role.
- Tên Role và Mã Role phải **không được trùng** với các Role hiện có trong hệ thống.
- Mỗi Role phải có ít nhất **một quyền** khi tạo hoặc sửa.
- Không được xóa các Role hệ thống quan trọng (ví dụ: Super Admin Role).
- Không được xóa Role đang được gán cho người dùng trừ khi có xác nhận rõ ràng từ Super Admin.
- Mọi hành động Thêm - Sửa - Xóa Role đều phải ghi **log audit** (ai thực hiện, hành động gì, thời gian, chi tiết thay đổi).
- Sau khi xóa Role, tất cả bản ghi trong bảng trung gian `user_roles` liên quan đến Role đó sẽ tự động bị xóa.
- Quyền hạn của người dùng sẽ được cập nhật ngay sau khi Role bị xóa (có thể yêu cầu đăng nhập lại).

## 7. Edge Cases
- Super Admin cố gắng tạo Role với Tên hoặc Mã Role đã tồn tại.
- Super Admin cố gắng xóa Role đang được nhiều người dùng sử dụng.
- Super Admin cố gắng sửa hoặc xóa Role hệ thống quan trọng.
- Xóa Role dẫn đến nhiều người dùng mất quyền truy cập vào hệ thống.
- Super Admin xóa Role rồi tạo lại Role có cùng mã.
- Form tạo/sửa Role có quá nhiều quyền (cần hỗ trợ tìm kiếm quyền).

## 8. Acceptance Criteria 

### AC-01: Truy cập và xem danh sách Vai trò
Given 
- Super Admin đang ở Trang Quản trị  
When 
- Nhấn vào mục “Vai trò & Quyền” trên menu bên trái  
Then 
- Hiển thị danh sách tất cả Role với các cột: Tên Role, Mã Role, Mô tả, Số người dùng đang sử dụng và nút hành động (Sửa, Xóa).

### AC-02: Thêm mới Vai trò thành công
Given 
- Super Admin đang ở trang Quản lý Vai trò  
When 
- Nhấn “Thêm vai trò mới”, nhập đầy đủ thông tin hợp lệ và lưu  
Then 
- Role mới được tạo thành công, xuất hiện trong danh sách và hiển thị thông báo thành công.

### AC-03: Sửa Vai trò thành công
Given 
- Super Admin chọn sửa một Role  
When 
- Chỉnh sửa thông tin và nhấn “Lưu thay đổi”  
Then 
- Thông tin Role được cập nhật đúng và hiển thị thông báo thành công.

### AC-04: Xóa Vai trò thành công
Given 
- Super Admin nhấn nút Xóa của một Role  
When 
- Xác nhận xóa trong popup  
Then 
- Role bị xóa khỏi hệ thống, không còn xuất hiện trong danh sách và hiển thị thông báo thành công.

### AC-05: Cảnh báo khi xóa Role đang được sử dụng
Given 
- Role đang được gán cho ít nhất một người dùng  
When 
- Super Admin nhấn nút Xóa  
Then 
- Hệ thống hiển thị popup cảnh báo rõ số lượng người dùng bị ảnh hưởng và yêu cầu xác nhận mạnh.

### AC-06: Không cho phép xóa Role hệ thống quan trọng
Given 
- Role là Role hệ thống quan trọng (ví dụ: Super Admin Role)  
When 
- Super Admin cố gắng xóa  
Then 
- Nút Xóa bị vô hiệu hóa hoặc hiển thị thông báo “Không được phép xóa Role này”.

### AC-07: Log Audit cho mọi thay đổi
Given 
- Super Admin thực hiện thêm, sửa hoặc xóa Role  
When 
- Thao tác hoàn tất  
Then 
- Hệ thống ghi đầy đủ log audit với thông tin người thực hiện và chi tiết thay đổi.

### AC-08: Cập nhật quyền người dùng sau khi xóa Role
Given 
- Role đã bị xóa  
When 
- Người dùng đang sử dụng Role đó đăng nhập lại  
Then 
- Quyền hạn của người dùng được cập nhật đúng (không còn quyền từ Role đã xóa).
