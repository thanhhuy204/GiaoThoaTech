# Feature: Trang Admin (Admin Dashboard)

## 1. Business Goal 
Cung cấp một trang quản trị trung tâm với giao diện rõ ràng, giúp Admin dễ dàng theo dõi tổng quan hệ thống, quản lý người dùng, phân quyền và thực hiện các thao tác quản trị.  

## 2. Actors 
- Super Admin
- Admin

## 3. Preconditions 
- Người quản trị đã đăng nhập với quyền Admin hoặc Super Admin
- Hệ thống nhận diện quyền và hiển thị đầy đủ Header + Menu Admin

## 4. Main Flow
1. Người quản trị đăng nhập vào hệ thống.
2. **Header** (phần trên cùng) hiển thị: logo hệ thống, icon thông báo,và thông tin Admin (avatar + tên).
3. **Menu navigation** bên trái hiển thị các mục quản trị chính, bao gồm:
   - Dashboard
   - Người dùng
   - Vai trò & Quyền
   - Thẻ thành viên
   <!-- - Nhật ký hoạt động -->
   - Cài đặt
4. Admin nhấn vào mục **Dashboard** trong Menu bên trái.
5. Hệ thống chuyển đến Trang Admin với nội dung chính:
   - Dashboard tổng quan 
6. Admin có thể chuyển sang các chức năng khác bằng cách nhấn vào các mục trong Menu bên trái.

## 5. Alternative Flows 
- Admin nhấn vào mục **"Người dùng"** trong Menu → chuyển đến danh sách người dùng
- Từ danh sách người dùng, Admin chọn một user → vào trang chi tiết user (tại đây có thể quản lý phân quyền của user đó)

## 6. Business Rules 
- Header phải cố định ở trên cùng và hiển thị trên mọi trang quản trị
- Menu navigation phải nằm bên trái và chỉ hiển thị khi người dùng có quyền Admin hoặc Super Admin
- Khi đang ở Trang Admin, mục “Dashboard” trong Menu phải được highlight 
- Trang Admin chỉ cho phép người có quyền Admin truy cập
- Phân quyền người dùng được thực hiện bên trong trang chi tiết của từng người dùng 

## 7. Edge Cases 
- Người không có quyền Admin cố gắng truy cập Trang Admin → hệ thống từ chối và chuyển về trang chủ
- Menu bên trái bị thu gọn trên thiết bị di động → có nút hamburger để mở menu
- Header có quá nhiều icon → phải hiển thị rõ ràng, không bị chồng lấn
- Admin refresh trang → Header và Menu vẫn giữ nguyên trạng thái active

## 8. Acceptance Criteria

### AC-01: Header và Menu hiển thị đúng
Given  
- Người có quyền Admin đã đăng nhập  
When  
- Truy cập bất kỳ trang quản trị nào  
Then  
- Header hiển thị ở trên cùng với logo, tìm kiếm, thông báo và avatar  
- Menu navigation hiển thị bên trái

### AC-02: Truy cập Trang Admin từ Menu
Given  
- Người dùng đang xem bất kỳ trang nào  
When  
- Nhấn mục “Dashboard” hoặc “Admin” trong Menu bên trái  
Then  
- Chuyển đến Trang Admin  
- Mục “Dashboard” trong Menu được highlight

### AC-03: Trang Admin hiển thị nội dung chính
Given  
- Admin đang ở Trang Admin  
When  
- Trang load thành công  
Then  
- Hiển thị dashboard tổng quan

### AC-04: Phân quyền nằm trong chi tiết người dùng
Given  
- Admin đang xem danh sách người dùng  
When  
- Nhấn vào một người dùng để xem chi tiết  
Then  
- Có phần hoặc tab “Phân quyền” bên trong trang chi tiết người dùng  
- Có thể gán nhiều Role cho người dùng đó

### AC-05: Responsive trên mobile
Given  
- Truy cập Trang Admin trên điện thoại  
When  
- Xem trang  
Then  
- Header thu gọn 
- Menu có thể mở dạng sidebar  
- Nội dung dashboard vẫn dễ đọc và cuộn được