const express = require('express');
const router = express.Router();
const danhMucDonViController = require('../controllers/danhMucDonViController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, danhMucDonViController.getAll);

router.get('/:id', authMiddleware, danhMucDonViController.getById);

router.post('/', authMiddleware, danhMucDonViController.create);

router.put('/:id', authMiddleware, danhMucDonViController.update);

router.delete('/:id', authMiddleware, danhMucDonViController.deleteById);

router.delete('/', authMiddleware, danhMucDonViController.deleteMultiple);

module.exports = router;