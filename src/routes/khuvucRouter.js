const express = require('express');
const router = express.Router();
const khuvucController = require('../controllers/khuvucController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, khuvucController.getAll);

router.get('/:id', authMiddleware, khuvucController.getById);

router.post('/', authMiddleware, khuvucController.create);

router.put('/:id', authMiddleware, khuvucController.update);

router.delete('/:id', authMiddleware, khuvucController.deleteById);

router.delete('/', authMiddleware, khuvucController.deleteMultiple);

module.exports = router;