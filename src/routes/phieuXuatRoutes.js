const express = require('express');
const router = express.Router();
const phieuXuatController = require('../controllers/phieuXuatController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, phieuXuatController.getAll);
router.get('/:id', authMiddleware, phieuXuatController.getById);
router.post('/', authMiddleware, phieuXuatController.create);
router.put('/:id', authMiddleware, phieuXuatController.update);
router.delete('/', authMiddleware, phieuXuatController.deleteMultiple);
router.delete('/:id', authMiddleware, phieuXuatController.deleteById);

module.exports = router;