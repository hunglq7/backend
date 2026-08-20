const express = require('express');
const router = express.Router();
const tongHopHeThongThongTinController = require('../controllers/tongHopHeThongThongTinController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, tongHopHeThongThongTinController.getAll);
router.get('/:id', authMiddleware, tongHopHeThongThongTinController.getById);
router.post('/', authMiddleware, tongHopHeThongThongTinController.create);
router.put('/:id', authMiddleware, tongHopHeThongThongTinController.update);
router.delete('/', authMiddleware, tongHopHeThongThongTinController.deleteMultiple);
router.delete('/:id', authMiddleware, tongHopHeThongThongTinController.deleteById);

module.exports = router;