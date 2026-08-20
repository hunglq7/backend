const express = require('express');
const router = express.Router();
const danhMucChucVuController = require('../controllers/danhMucChucVuController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, danhMucChucVuController.getAll);
router.get('/:id', authMiddleware, danhMucChucVuController.getById);
router.post('/', authMiddleware, danhMucChucVuController.create);
router.put('/:id', authMiddleware, danhMucChucVuController.update);
router.delete('/', authMiddleware, danhMucChucVuController.deleteMultiple);
router.delete('/:id', authMiddleware, danhMucChucVuController.deleteById);

module.exports = router;