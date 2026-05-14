const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/home/pie:
 *   get:
 *     summary: Lấy dữ liệu biểu đồ tròn cho trang chủ
 *     tags: [Home]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: by
 *         schema:
 *           type: string
 *         description: Loại dữ liệu
 *     responses:
 *       200:
 *         description: Dữ liệu biểu đồ tròn
 */

router.get('/pie', authMiddleware, homeController.pie);
/**
 * @swagger
 * /api/home/line:
 *   post:
 *     summary: Lấy dữ liệu biểu đồ đường cho trang chủ
 *     tags: [Home]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               range:
 *                 type: string
 *                 example: week
 *     responses:
 *       200:
 *         description: Dữ liệu biểu đồ đường
 */


router.post('/line', authMiddleware, homeController.line);

module.exports = router;