# Feature: User Roles & Permissions

## 1. Business Goal
Cho phép Super Admin gán nhiều vai trò (Role) cho một người dùng để kiểm soát linh hoạt quyền hạn truy cập.  
Mục tiêu là hỗ trợ mô hình phân quyền phức tạp, đảm bảo người dùng chỉ được truy cập đúng những chức năng phù hợp với trách nhiệm của họ, tăng tính bảo mật và dễ dàng quản lý quyền trong tổ chức.

## 2. Actors 
- Super Admin

## 3. Preconditions 
- Super Admin đã đăng nhập với quyền Super Admin.
- Đang ở Trang Quản trị và đã vào mục **“Người dùng”** trên menu bên trái.

## 4. Main Flow
1. Super Admin nhấn vào mục **“Người dùng”** trong Menu bên trái của Trang Quản trị.
2. Hệ thống hiển thị danh sách người dùng.
3. Super Admin tìm kiếm hoặc lọc, sau đó nhấn vào một người dùng để xem chi tiết.
4. Super Admin nhấn vào tab **“Vai trò & Quyền”**.
5. Hệ thống hiển thị danh sách tất cả Role hiện có dưới dạng checkbox đa chọn.
6. Super Admin tick chọn một hoặc nhiều Role cho người dùng đó.
7. Super Admin nhấn nút **“Lưu thay đổi”**.
8. Hệ thống cập nhật danh sách Role và hiển thị thông báo thành công: “Vai trò & Quyền đã được cập nhật”.
9. Quyền hạn mới của người dùng được áp dụng ngay (có thể cần refresh hoặc đăng nhập lại để thấy thay đổi đầy đủ).

## 5. Alternative Flows 
- Super Admin gỡ Role: bỏ tick một hoặc nhiều Role rồi lưu.
- Super Admin xem danh sách Role hiện tại của người dùng trước khi chỉnh sửa.
- Super Admin quay lại danh sách người dùng mà không lưu thay đổi.

## 6. Business Rules 
- Một người dùng **có thể có nhiều Role** cùng lúc
- Mối quan hệ giữa User và Role là **nhiều-nhiều (N:N)** qua bảng trung gian `user_roles`
- Role là thực thể riêng, lưu trong bảng `roles` (mã, tên, mô tả, quyền chi tiết)
- Quyền hạn thực tế của người dùng là **tập hợp quyền** từ tất cả Role được gán 
- Không cho phép gán trùng lặp Role cho cùng một người dùng
- Quản lý vai trò chỉ thực hiện được từ trang chi tiết của từng người dùng (không có mục Quản lý vai trò riêng biệt trong Menu)
- Mọi thay đổi Quản lý vai trò phải có log audit (ai thay đổi, thay đổi gì, thời gian)
- Super Admin có quyền gán/bỏ Role cho mọi người dùng
- Một số Role quan trọng có thể có quy tắc bảo vệ đặc biệt (không tự gỡ quyền của chính mình)

## 7. Edge Cases
- Super Admin cố gắng gỡ Role `super_admin_role` khỏi chính mình hoặc người dùng khác → hệ thống chặn và hiển thị thông báo lỗi.
- Người dùng đang đăng nhập mà Role bị thay đổi (đặc biệt là mất `super_admin_role`) → buộc đăng xuất và yêu cầu đăng nhập lại.
- Người dùng có nhiều Role gây chồng chéo quyền hạn (ví dụ: vừa có `user_role` vừa có Role khác có quyền cao hơn).
- Super Admin chỉnh sửa Vai trò & Quyền cho một tài khoản Super Admin khác.
- Tạo người dùng mới mà không gán Role → hệ thống tự động gán `user_role`.

## 8. Acceptance Criteria 

### AC-01: Truy cập phần Vai trò & Quyền
Given 
- Super Admin đang xem danh sách người dùng  
When 
- Nhấn vào một người dùng để xem chi tiết  
Then 
- Có tab “Vai trò & Quyền” và có thể vào phần quản lý Role của user đó.

### AC-02: Gán nhiều Role cho một người dùng
Given 
- Super Admin đang ở tab Vai trò & Quyền  
When 
- Chọn nhiều Role (bao gồm super_admin_role hoặc user_role) và nhấn “Lưu thay đổi”  
Then 
- Người dùng được gán đồng thời nhiều Role + hiển thị thông báo thành công.

### AC-03: Gỡ Role thành công (trừ Role đặc biệt)
Given 
- Người dùng đang có nhiều Role  
When 
- Super Admin bỏ tick một Role thông thường và lưu thay đổi  
Then 
- Role đó bị gỡ khỏi người dùng và quyền hạn được cập nhật.

### AC-04: Bảo vệ Role super_admin_role
Given 
- Super Admin đang quản lý một user có Role super_admin_role  
When 
- Cố gắng bỏ tick Role super_admin_role  
Then 
- Hệ thống không cho phép bỏ tick hoặc hiển thị thông báo “Không được gỡ Role Super Admin”.

### AC-05: Hiển thị Role hiện tại
Given 
- Super Admin mở tab Vai trò & Quyền  
When 
- Trang load  
Then 
- Hiển thị tất cả Role dưới dạng checkbox đa chọn.
- Các Role hiện tại của user được tick sẵn (bao gồm super_admin_role và user_role nếu có).

### AC-06: Vai trò & Quyền nằm trong Trang chi tiết Người dùng
Given 
- Super Admin đang quản lý người dùng  
When 
- Thực hiện quản lý Vai trò & Quyền  
Then 
- Không có mục “Vai trò & Quyền” riêng biệt trong Menu bên trái. Chỉ thực hiện được từ trang chi tiết người dùng.

### AC-06: Mối quan hệ Role N:N và backend model
Given
- Hệ thống dùng Sequelize/PostgreSQL
When
- Tạo hoặc cập nhật quyền user
Then
- User and Role có quan hệ N:N thông qua bảng `user_roles`
- Role list load và hiển thị đúng trong front-end
- Khi cập nhật vai trò, backend lưu `user_roles` và logs audit đầy đủ