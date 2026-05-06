const express = require('express');
const router = express.Router();
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
router.get('/pie', authMiddleware, (req, res) => {
  const { by } = req.query;
  // Mock data
  const pie = [
    { value: Math.floor(Math.random() * 90) + 10, code: "electronics" },
    { value: Math.floor(Math.random() * 90) + 10, code: "home_goods" },
    { value: Math.floor(Math.random() * 90) + 10, code: "apparel_accessories" },
    { value: Math.floor(Math.random() * 90) + 10, code: "food_beverages" },
    { value: Math.floor(Math.random() * 90) + 10, code: "beauty_skincare" },
  ];
  res.json({ code: 200, success: true, result: pie, message: 'ok' });
});

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
router.post('/line', authMiddleware, (req, res) => {
  const { range } = req.body;
  let data = [];
  if (range === 'week') {
    data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100);
  } else if (range === 'month') {
    data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 900) + 100);
  } else {
    data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 900) + 100);
  }
  res.json({ code: 200, success: true, result: data, message: 'ok' });
});

module.exports = router;