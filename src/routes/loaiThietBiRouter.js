const express = require('express');
const router = express.Router();
const loaiThietBiController = require('../controllers/loaiThietBiController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, loaiThietBiController.getAll);
router.get('/:id', authMiddleware, loaiThietBiController.getById);
router.post('/', authMiddleware, loaiThietBiController.create);
router.put('/:id', authMiddleware, loaiThietBiController.update);
router.delete('/', authMiddleware, loaiThietBiController.deleteMultiple);
router.delete('/:id', authMiddleware, loaiThietBiController.deleteById);

module.exports = router;