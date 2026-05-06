const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const danhMucCameraRoutes = require('./routes/danhMucCameraRoutes');
const cameraRoutes = require('./routes/cameraRoutes');
const danhMucDonViRoutes = require('./routes/danhMucDonViRoutes');
const viTriLapDatRoutes = require('./routes/viTriLapDatRoutes');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middleware/errorHandler');
const setupSwagger = require('./swagger');

const app = express();

app.use(cors({
  origin: true,
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
app.use('/api/vi-tri-lap-dat', viTriLapDatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/home', homeRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandler);

module.exports = app;
