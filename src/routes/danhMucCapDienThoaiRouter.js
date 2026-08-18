const express = require('express');
const router = express.Router();
const danhMucCapDienThoaiController= require('../controllers/danhMucCapDienThoaiController');
const authenticate = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/danhMucCapDienThoai:
 *   get:
 *     tags: [Danh mục Cáp điện thoại]
 *     summary: Lấy danh sách tất cả danh mục cáp điện thoại
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách Cáp điện thoại
 *       401:
 *         description: Lấy dữ liệu thất bại
 */
router.get('/', authenticate, danhMucCapDienThoaiController.getAll);
/**
 * @swagger
 * /api/danhMucCapDienThoai:
 *   post:
 *     tags: [Thêm Cáp điện thoại]
 *     summary: Thêm bản ghi mới
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenCap:
 *                 type: string
 *                 example: "Cáp điện thoại phòng nổ 50 đôi"
 *             required:
 *               - tenCap
 *     responses:
 *       200:
 *         description: Thêm bản ghi thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, danhMucCapDienThoaiController.add);

/**
 * @swagger
 * /api/danhMucCapDienThoai:
 *   post:
 *     summary: Update danh mục mới
 *     tags: [danhMucCapDienThoai]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tenCap
 *             properties:
 *               tenCap:
 *                 type: string
 *                 description: Tên thiết bị
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả thiết bị
 *     responses:
 *       201:
 *         description: thiết bị đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/', authenticate, danhMucCapDienThoaiController.update);
module.exports = router;