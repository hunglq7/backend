# Node.js Camera Backend

Backend API với MySQL và JWT authentication.

## Cấu trúc thư mục

- `src/`
  - `controllers/` - logic xử lý request
  - `middleware/` - xác thực, lỗi, CORS
  - `models/` - truy vấn DB
  - `routes/` - định nghĩa API endpoint
  - `utils/` - tạo token và mã hóa
  - `index.js` - entrypoint

## Cài đặt

1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```
2. Cài dependencies:
   ```bash
   npm install
   ```
3. Tạo database MySQL và bảng `users`.
4. Tạo file `.env` từ `.env.example`.

## MySQL schema mẫu

```sql
CREATE DATABASE IF NOT EXISTS camera_app;
USE camera_app;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  refresh_token TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Chạy

```bash
npm run dev
```

## Migration

1. Chạy migration một lần bằng lệnh:
   ```bash
   npm run migrate
   ```
2. Hoặc server sẽ tự động chạy migration khi khởi động bằng `npm run dev` hoặc `npm start`.

## API chính

### Authentication

- `POST /api/auth/register` — đăng ký tài khoản
- `POST /api/auth/login` — đăng nhập
- `POST /api/auth/refresh` — làm mới access token
- `POST /api/auth/logout` — đăng xuất
- `GET /api/profile` — truy cập route bảo vệ

### Danh mục camera (yêu cầu JWT token)

- `GET /api/danh-muc-camera` — lấy danh sách tất cả danh mục
- `GET /api/danh-muc-camera/:id` — lấy danh mục theo ID
- `POST /api/danh-muc-camera` — tạo danh mục mới
- `PUT /api/danh-muc-camera/:id` — cập nhật danh mục
- `DELETE /api/danh-muc-camera/:id` — xóa danh mục

### Swagger Documentation

- `GET /api-docs` — giao diện Swagger UI để test API
