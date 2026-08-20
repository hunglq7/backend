const express = require('express');
const router = express.Router();
const viTriLapDatController = require('../controllers/viTriLapDatController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, viTriLapDatController.getAll);

router.get('/:id', authMiddleware, viTriLapDatController.getById);

router.post('/', authMiddleware, viTriLapDatController.create);

router.put('/:id', authMiddleware, viTriLapDatController.update);

router.delete('/:id', authMiddleware, viTriLapDatController.deleteById);

router.delete('/', authMiddleware, viTriLapDatController.deleteMultiple);

module.exports = router;