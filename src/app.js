const express = require("express");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const danhMucCameraRoutes = require("./routes/danhMucCameraRoutes");
const cameraRoutes = require("./routes/cameraRoutes");
const danhMucDonViRoutes = require("./routes/danhMucDonViRoutes");
const danhMucChucVuRoutes = require("./routes/danhMucChucVuRoutes");
const viTriLapDatRoutes = require("./routes/viTriLapDatRoutes");
const thietBiRoutes = require("./routes/thietBiRoutes");
const khuVucRoutes = require("./routes/khuvucRouter");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");
const setupSwagger = require("./swagger");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  "http://localhost:4002,http://192.168.0.112:3333,http://localhost:3334,http://192.168.0.112:3334,http://localhost:3335,http://192.168.0.112:3335,http://localhost:3336,http://192.168.0.112:3336,http://localhost:3337,http://192.168.0.112:3337"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS origin not allowed: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/danh-muc-camera", danhMucCameraRoutes);
app.use("/cameras", cameraRoutes);
app.use("/api/danh-muc-don-vi", danhMucDonViRoutes);
app.use("/api/danh-muc-chuc-vu", danhMucChucVuRoutes);
app.use("/api/vi-tri-lap-dat", viTriLapDatRoutes);
app.use("/api/thiet-bi", thietBiRoutes);
app.use("/api/khu-vuc", khuVucRoutes);
app.use("/api/users", userRoutes);
app.use("/api/home", homeRoutes);
app.use("/upload", uploadRoutes);

app.use(errorHandler);

module.exports = app;
