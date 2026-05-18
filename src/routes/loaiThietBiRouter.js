const express = require('express');
const router = express.Router();
const loaiThietBiController = require('../controllers/loaiThietBiController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/loai_thiet-bi:
 *   get:
 *     tags: [Loại Thiết bị]
 *     summary: Lấy danh sách tất cả Loại thiết bị
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách loại thiết bị
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, loaiThietBiController.getAll);
/**
 * @swagger
 * /api/loai_thiet_bi/{id}:
 *   get:
 *     tags: [Loại Thiết bị]
 *     summary: Lấy thông tin loại thiết bị theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của loại thiết bị
 *     responses:
 *       200:
 *         description: Thông tin loại thiết bị
 *       404:
 *         description: Loại Thiết bị không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, loaiThietBiController.getById);
/**
 * @swagger
 * /api/loai_thiet_bi:
 *   post:
 *     tags: [Loại Thiết bị]
 *     summary: Tạo Loại thiết bị mới
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_loai:
 *                 type: string
 *                 example: "Camera"
 *             required:
 *               - ten_loai
 *     responses:
 *       201:
 *         description: Loại Thiết bị đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, loaiThietBiController.create);
/**
 * @swagger
 * /api/loại_thiet_bi/{id}:
 *   put:
 *     tags: [Loại Thiết bị]
 *     summary: Cập nhật loại thiết bị
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của Loại thiết bị
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_thiet_bi:
 *                 type: string
 *                 example: "Camera"
 *             required:
 *               - ten_loai
 *     responses:
 *       200:
 *         description: Loại Thiết bị đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Thiết bị không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, loaiThietBiController.update);
/**
 * @swagger
 * /api/loai_thiet_bi:
 *   delete:
 *     tags: [Loại Thiết bị]
 *     summary: Xóa nhiều loại thiết bị
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description:  danh mục loại thiết bị
 *     responses:
 *       200:
 *         description: Danh mục loại thiết bị đã được xóa
 *       404:
 *         description: Danh mục không tồn tại
 *       401:
 *         description: Unauthorized
 */

router.delete('/', authMiddleware, loaiThietBiController.deleteMultiple);
/**
 * @swagger
 * /api/loai_thiet_bi/{id}:
 *   delete:
 *     tags: [Loại Thiết bị]
 *     summary: Xóa loại thiết bị theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của loại thiết bị
 *     responses:
 *       200:
 *         description: Loại Thiết bị đã được xóa
 *       404:
 *         description: Loại Thiết bị không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, loaiThietBiController.deleteById);

module.exports = router;