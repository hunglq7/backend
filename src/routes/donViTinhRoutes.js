const express = require('express');
const router = express.Router();
const donViTinhController = require('../controllers/donViTinhController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, donViTinhController.getAll);
router.get('/:id', authMiddleware, donViTinhController.getById);
router.post('/', authMiddleware, donViTinhController.create);
router.put('/:id', authMiddleware, donViTinhController.update);
router.delete('/', authMiddleware, donViTinhController.deleteMultiple);
router.delete('/:id', authMiddleware, donViTinhController.deleteById);

module.exports = router;