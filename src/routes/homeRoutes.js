const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/pie', authMiddleware, homeController.pie);
router.post('/line', authMiddleware, homeController.line);

module.exports = router;