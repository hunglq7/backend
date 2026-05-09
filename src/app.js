const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const danhMucCameraRoutes = require('./routes/danhMucCameraRoutes');
const cameraRoutes = require('./routes/cameraRoutes');
const danhMucDonViRoutes = require('./routes/danhMucDonViRoutes');
const danhMucChucVuRoutes = require('./routes/danhMucChucVuRoutes');
const viTriLapDatRoutes = require('./routes/viTriLapDatRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const modelsRoutes = require('./routes/modelsRoutes');
const areaRoutes = require('./routes/areaRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const deviceStatusRoutes = require('./routes/deviceStatusRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middleware/errorHandler');
const setupSwagger = require('./swagger');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4002,http://192.168.10.8:3333')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/danh-muc-camera', danhMucCameraRoutes);
app.use('/cameras', cameraRoutes);
app.use('/api/danh-muc-don-vi', danhMucDonViRoutes);
app.use('/api/danh-muc-chuc-vu', danhMucChucVuRoutes);
app.use('/api/vi-tri-lap-dat', viTriLapDatRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/models', modelsRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/device-status', deviceStatusRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/home', homeRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandler);

module.exports = app;
