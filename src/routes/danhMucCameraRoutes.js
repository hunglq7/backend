const express = require('express');
const router = express.Router();
const danhMucCameraController = require('../controllers/danhMucCameraController');
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, danhMucCameraController.getAllCategories);

router.get('/:id', authenticate, danhMucCameraController.getCategoryById);

router.post('/', authenticate, danhMucCameraController.createCategory);

router.put('/:id', authenticate, danhMucCameraController.updateCategory);

router.delete('/:id', authenticate, danhMucCameraController.deleteCategory);
router.delete('/', authenticate, danhMucCameraController.deleteMultiple);

module.exports = router;

