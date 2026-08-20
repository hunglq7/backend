const express = require('express');
const router = express.Router();
const chiTietPhieuNhapController = require('../controllers/chiTietPhieuNhapController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, chiTietPhieuNhapController.getAll);
router.get('/:id', authMiddleware, chiTietPhieuNhapController.getById);
router.post('/', authMiddleware, chiTietPhieuNhapController.create);
router.put('/:id', authMiddleware, chiTietPhieuNhapController.update);
router.delete('/', authMiddleware, chiTietPhieuNhapController.deleteMultiple);
router.delete('/:id', authMiddleware, chiTietPhieuNhapController.deleteById);

module.exports = router;