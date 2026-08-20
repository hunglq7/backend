const express = require('express');
const router = express.Router();
const phieuNhapController = require('../controllers/phieuNhapController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, phieuNhapController.getAll);
router.get('/:id', authMiddleware, phieuNhapController.getById);
router.post('/', authMiddleware, phieuNhapController.create);
router.put('/:id', authMiddleware, phieuNhapController.update);
router.delete('/', authMiddleware, phieuNhapController.deleteMultiple);
router.delete('/:id', authMiddleware, phieuNhapController.deleteById);

module.exports = router;