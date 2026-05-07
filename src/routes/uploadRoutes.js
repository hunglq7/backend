const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

function handleUpload(req, res) {
  if (!req.file) {
    return res.status(400).json({ code: 400, success: false, message: 'No file uploaded' });
  }

  const relativePath = `uploads/${req.file.filename}`;
  res.json({
    code: 200,
    success: true,
    message: 'Upload successful',
    result: relativePath,
    filename: relativePath,
  });
}

router.post('/', authMiddleware, upload.single('file'), handleUpload);
router.post('/avatar', authMiddleware, upload.single('file'), handleUpload);

module.exports = router;
