const express = require('express');
const router = express.Router();
const danhMucCapDienThoaiController= require('../controllers/danhMucCapDienThoaiController');
const authenticate = require('../middleware/authMiddleware');
router.get('/', authenticate, danhMucCapDienThoaiController.getAll);
router.post('/', authenticate, danhMucCapDienThoaiController.add);

router.put('/:id', authenticate, danhMucCapDienThoaiController.update);
router.delete('/:id', authenticate, danhMucCapDienThoaiController.deleteById);
router.delete('/', authenticate, danhMucCapDienThoaiController.deleteMultiple);
module.exports = router;