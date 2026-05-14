const express = require('express');
const router = express.Router();
const thietBiController = require('../controllers/thietBiController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/thiet-bi:
 *   get:
 *     tags: [Thiết bị]
 *     summary: Lấy danh sách tất cả thiết bị
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách thiết bị
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, thietBiController.getAll);
/**
 * @swagger
 * /api/thiet-bi/{id}:
 *   get:
 *     tags: [Thiết bị]
 *     summary: Lấy thông tin thiết bị theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thiết bị
 *     responses:
 *       200:
 *         description: Thông tin thiết bị
 *       404:
 *         description: Thiết bị không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, thietBiController.getById);
/**
 * @swagger
 * /api/thiet-bi:
 *   post:
 *     tags: [Thiết bị]
 *     summary: Tạo thiết bị mới
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
 *                 example: "Camera IP 4K"
 *             required:
 *               - ten_thiet_bi
 *     responses:
 *       201:
 *         description: Thiết bị đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, thietBiController.create);
/**
 * @swagger
 * /api/thiet-bi/{id}:
 *   put:
 *     tags: [Thiết bị]
 *     summary: Cập nhật thiết bị
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thiết bị
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
 *         description: Thiết bị đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Thiết bị không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, thietBiController.update);
/**
 * @swagger
 * /api/thiet-bi:
 *   delete:
 *     tags: [Thiết bị]
 *     summary: Xóa nhiều thiết bị
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description:  danh mục chức vụ
 *     responses:
 *       200:
 *         description: Danh mục chức vụ đã được xóa
 *       404:
 *         description: Danh mục không tồn tại
 *       401:
 *         description: Unauthorized
 */

router.delete('/', authMiddleware, thietBiController.deleteMultiple);
/**
 * @swagger
 * /api/thiet-bi/{id}:
 *   delete:
 *     tags: [Thiết bị]
 *     summary: Xóa thiết bị theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thiết bị
 *     responses:
 *       200:
 *         description: Thiết bị đã được xóa
 *       404:
 *         description: Thiết bị không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, thietBiController.deleteById);

module.exports = router;