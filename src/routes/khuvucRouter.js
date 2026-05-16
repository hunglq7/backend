const express = require('express');
const router = express.Router();
const khuvucController = require('../controllers/khuvucController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/khu-vuc:
 *   get:
 *     summary: Lấy danh sách tất cả khu vực
 *     tags: [KhuVuc]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách khu vực
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   ten_khu_vuc:
 *                     type: string
 *                   mo_ta:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Lỗi server
 */
router.get('/', authMiddleware, khuvucController.getAll);

/**
 * @swagger
 * /api/khu-vuc/{id}:
 *   get:
 *     summary: Lấy khu vực theo ID
 *     tags: [KhuVuc]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của khu vực
 *     responses:
 *       200:
 *         description: Thông tin khu vực
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 ten_khu_vuc:
 *                   type: string
 *                 mo_ta:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy khu vực
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', authMiddleware, khuvucController.getById);

/**
 * @swagger
 * /api/khu-vuc:
 *   post:
 *     summary: Tạo khu vực mới
 *     tags: [KhuVuc]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten_khu_vuc
 *             properties:
 *               ten_khu_vuc:
 *                 type: string
 *                 description: Tên khu vực
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả khu vực
 *     responses:
 *       201:
 *         description: Khu vực đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/', authMiddleware, khuvucController.create);

/**
 * @swagger
 * /api/khu-vuc/{id}:
 *   put:
 *     summary: Cập nhật khu vực
 *     tags: [KhuVuc]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của khu vực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten_khu_vuc
 *             properties:
 *               ten_khu_vuc:
 *                 type: string
 *                 description: Tên khu vực
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả khu vực
 *     responses:
 *       200:
 *         description: Khu vực đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy khu vực
 *       500:
 *         description: Lỗi server
 */
router.put('/:id', authMiddleware, khuvucController.update);

/**
 * @swagger
 * /api/khu-vuc/{id}:
 *   delete:
 *     summary: Xóa khu vực
 *     tags: [KhuVuc]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của khu vực
 *     responses:
 *       200:
 *         description: Khu vực đã được xóa
 *       404:
 *         description: Không tìm thấy khu vực
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', authMiddleware, khuvucController.deleteById);

/**
 * @swagger
 * /api/khu-vuc:
 *   delete:
 *     summary: Xóa nhiều khu vực
 *     tags: [KhuVuc]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Danh sách ID của khu vực cần xóa
 *     responses:
 *       200:
 *         description: Các khu vực đã được xóa
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.delete('/', authMiddleware, khuvucController.deleteMultiple);

module.exports = router;