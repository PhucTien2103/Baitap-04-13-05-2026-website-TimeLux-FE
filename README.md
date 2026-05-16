# TimeLux Frontend

Frontend React cho đồ án website bán đồng hồ TimeLux.

Project này dùng lại hệ thống đăng nhập/đăng ký/OTP/profile đã có, sau đó bổ sung phần bán hàng cho thành viên `R2`.

## Công nghệ sử dụng

- React 19
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Ant Design cho một số màn hình quản trị cũ

## Chức năng chính

- Đăng nhập, đăng ký, xác thực OTP.
- Quên mật khẩu, reset mật khẩu bằng OTP.
- Phân quyền route theo role:
  - `R1`: Admin
  - `R2`: User/member
  - `R3`: Moderator
- Trang chủ bán đồng hồ cho `R2`.
- Trang chi tiết sản phẩm.
- Tìm kiếm, lọc danh mục, lọc giá, lọc khuyến mãi.
- Sắp xếp theo mới nhất, bán chạy, giá thấp đến cao, giá cao đến thấp.
- Phân trang danh sách sản phẩm.
- Profile thành viên `R2`.
- Logout.

## Luồng sản phẩm

Frontend không tự xử lý sản phẩm độc lập nữa. Trang Home và Detail gọi API từ Backend:

```txt
GET /api/products
GET /api/products/:id
```

Các API này cần `accessToken`. File `src/util/axios.customize.js` tự gắn token vào request:

```txt
Authorization: Bearer <accessToken>
```

## Ảnh sản phẩm

Ảnh sản phẩm là static asset nằm trong:

```txt
src/assets/stitch_timelux_watch_store_ui/
```

Backend chỉ lưu `imageKeys`, ví dụ:

```js
imageKeys: ['hero', 'diamond', 'chronograph']
```

Frontend map key đó thành ảnh thật trong:

```txt
src/redux/slices/productSlice.js
```

Cách này giúp bài dễ chạy, không cần upload ảnh lên MongoDB.

## Cách chạy Frontend

Mở terminal tại thư mục:

```powershell
cd C:\Users\PC\Desktop\CCNPMM\DoAnCuoiKy\website-chatting-FE
```

Cài package nếu chưa có:

```powershell
npm install
```

Chạy dev server:

```powershell
npm run dev
```

Frontend mặc định chạy tại:

```txt
http://localhost:5173
```

## Cấu hình kết nối Backend

Trong `vite.config.js`, project đã proxy request về Backend:

```txt
/api   -> http://localhost:8088
/user  -> http://localhost:8088
/admin -> http://localhost:8088
```

Vì vậy khi chạy local, cần chạy Backend ở port `8088`.

## Cách test bài

1. Chạy Backend.
2. Chạy Frontend.
3. Vào `http://localhost:5173`.
4. Đăng nhập bằng tài khoản `R2`.
5. Sau khi đăng nhập, hệ thống chuyển vào `/home`.
6. Test các chức năng:
   - Xem danh sách đồng hồ.
   - Tìm kiếm sản phẩm.
   - Lọc theo danh mục.
   - Lọc theo giá tối đa.
   - Chỉ xem sản phẩm khuyến mãi.
   - Sắp xếp sản phẩm.
   - Chuyển trang phân trang.
   - Bấm `Xem chi tiết`.
   - Đổi ảnh sản phẩm trong trang chi tiết.
   - Tăng giảm số lượng.
   - Xem tồn kho, số lượng đã bán.
   - Xem sản phẩm tương tự.
   - Vào profile.
   - Logout.

## Các file quan trọng

```txt
src/pages/HomePage.jsx
```

Trang chủ bán đồng hồ, hiển thị danh sách sản phẩm, bộ lọc, phân trang, thông tin member và logout.

```txt
src/pages/ProductDetailPage.jsx
```

Trang chi tiết sản phẩm, gallery ảnh, tồn kho, đã bán, số lượng và sản phẩm tương tự.

```txt
src/pages/UserProfilePage.jsx
```

Trang profile cho user role `R2`.

```txt
src/redux/slices/productSlice.js
```

Redux slice cho sản phẩm. Có `createAsyncThunk` để gọi API:

```js
fetchProducts
fetchProductById
```

```txt
src/redux/slices/authSlice.js
```

Redux slice cho đăng nhập, đăng ký, OTP, profile, logout, refresh token.

```txt
src/util/api.js
```

Nơi khai báo các hàm gọi API.

```txt
src/util/axios.customize.js
```

Cấu hình Axios và tự gắn `accessToken` vào request.

## Build kiểm tra trước khi nộp

```powershell
npm run build
```

Nếu build thành công là frontend không bị lỗi cú pháp.
