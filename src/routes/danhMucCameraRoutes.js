const express = require('express');
const router = express.Router();
const danhMucCameraController = require('../controllers/danhMucCameraController');
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/danh-muc-camera:
 *   get:
 *     tags: [Danh mục camera]
 *     summary: Lấy danh sách tất cả danh mục camera
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách danh mục camera
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, danhMucCameraController.getAllCategories);

/**
 * @swagger
 * /api/danh-muc-camera/{id}:
 *   get:
 *     tags: [Danh mục camera]
 *     summary: Lấy thông tin danh mục camera theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục camera
 *     responses:
 *       200:
 *         description: Thông tin danh mục camera
 *       404:
 *         description: Danh mục không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, danhMucCameraController.getCategoryById);

/**
 * @swagger
 * /api/danh-muc-camera:
 *   post:
 *     tags: [Danh mục camera]
 *     summary: Tạo danh mục camera mới
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_thiet_bi:
 *                 type: string
 *                 example: "Camera IP 1080p"
 *             required:
 *               - ten_thiet_bi
 *     responses:
 *       201:
 *         description: Danh mục camera đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, danhMucCameraController.createCategory);

/**
 * @swagger
 * /api/danh-muc-camera/{id}:
 *   put:
 *     tags: [Danh mục camera]
 *     summary: Cập nhật danh mục camera
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục camera
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_thiet_bi:
 *                 type: string
 *                 example: "Camera IP 4K"
 *             required:
 *               - ten_thiet_bi
 *     responses:
 *       200:
 *         description: Danh mục camera đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Danh mục không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, danhMucCameraController.updateCategory);

/**
 * @swagger
 * /api/danh-muc-camera/{id}:
 *   delete:
 *     tags: [Danh mục camera]
 *     summary: Xóa danh mục camera
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục camera
 *     responses:
 *       200:
 *         description: Danh mục camera đã được xóa
 *       404:
 *         description: Danh mục không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, danhMucCameraController.deleteCategory);

module.exports = router;

