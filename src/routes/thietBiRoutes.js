const express = require('express');
const router = express.Router();
const thietBiController = require('../controllers/thietBiController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, thietBiController.getAll);
router.get('/:id', authMiddleware, thietBiController.getById);
router.post('/', authMiddleware, thietBiController.create);
router.put('/:id', authMiddleware, thietBiController.update);
router.delete('/', authMiddleware, thietBiController.deleteMultiple);
router.delete('/:id', authMiddleware, thietBiController.deleteById);

module.exports = router;