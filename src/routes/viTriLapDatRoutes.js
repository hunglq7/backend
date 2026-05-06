const express = require('express');
const router = express.Router();
const viTriLapDatController = require('../controllers/viTriLapDatController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/vi-tri-lap-dat:
 *   get:
 *     summary: Lấy danh sách tất cả vị trí lắp đặt
 *     tags: [ViTriLapDat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách vị trí lắp đặt
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   ten_vi_tri:
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
router.get('/', authMiddleware, viTriLapDatController.getAll);

/**
 * @swagger
 * /api/vi-tri-lap-dat/{id}:
 *   get:
 *     summary: Lấy vị trí lắp đặt theo ID
 *     tags: [ViTriLapDat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của vị trí lắp đặt
 *     responses:
 *       200:
 *         description: Thông tin vị trí lắp đặt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 ten_vi_tri:
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
 *         description: Không tìm thấy vị trí lắp đặt
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', authMiddleware, viTriLapDatController.getById);

/**
 * @swagger
 * /api/vi-tri-lap-dat:
 *   post:
 *     summary: Tạo vị trí lắp đặt mới
 *     tags: [ViTriLapDat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten_vi_tri
 *             properties:
 *               ten_vi_tri:
 *                 type: string
 *                 description: Tên vị trí
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả vị trí
 *     responses:
 *       201:
 *         description: Vị trí lắp đặt đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/', authMiddleware, viTriLapDatController.create);

/**
 * @swagger
 * /api/vi-tri-lap-dat/{id}:
 *   put:
 *     summary: Cập nhật vị trí lắp đặt
 *     tags: [ViTriLapDat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của vị trí lắp đặt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten_vi_tri
 *             properties:
 *               ten_vi_tri:
 *                 type: string
 *                 description: Tên vị trí
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả vị trí
 *     responses:
 *       200:
 *         description: Vị trí lắp đặt đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy vị trí lắp đặt
 *       500:
 *         description: Lỗi server
 */
router.put('/:id', authMiddleware, viTriLapDatController.update);

/**
 * @swagger
 * /api/vi-tri-lap-dat/{id}:
 *   delete:
 *     summary: Xóa vị trí lắp đặt
 *     tags: [ViTriLapDat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của vị trí lắp đặt
 *     responses:
 *       200:
 *         description: Vị trí lắp đặt đã được xóa
 *       404:
 *         description: Không tìm thấy vị trí lắp đặt
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', authMiddleware, viTriLapDatController.deleteById);

/**
 * @swagger
 * /api/vi-tri-lap-dat:
 *   delete:
 *     summary: Xóa nhiều vị trí lắp đặt
 *     tags: [ViTriLapDat]
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
 *                 description: Danh sách ID của vị trí lắp đặt cần xóa
 *     responses:
 *       200:
 *         description: Các vị trí lắp đặt đã được xóa
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.delete('/', authMiddleware, viTriLapDatController.deleteMultiple);

module.exports = router;