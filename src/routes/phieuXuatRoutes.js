const express = require('express');
const router = express.Router();
const phieuXuatController = require('../controllers/phieuXuatController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/phieu_xuat:
 *   get:
 *     tags: [Phiếu Xuất]
 *     summary: Lấy danh sách tất cả Phiếu xuất
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách phiếu xuất
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, phieuXuatController.getAll);
/**
 * @swagger
 * /api/phieu_xuat/{id}:
 *   get:
 *     tags: [Phiếu Xuất]
 *     summary: Lấy thông tin phiếu xuất theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phiếu xuất
 *     responses:
 *       200:
 *         description: Thông tin phiếu xuất
 *       404:
 *         description: Phiếu Xuất không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, phieuXuatController.getById);
/**
 * @swagger
 * /api/phieu_xuat:
 *   post:
 *     tags: [Phiếu Xuất]
 *     summary: Tạo Phiếu xuất mới
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
 *         description: Phiếu xuất đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, phieuXuatController.create);
/**
 * @swagger
 * /api/phieu_xuat/{id}:
 *   put:
 *     tags: [Phiếu Xuất]
 *     summary: Cập nhật phiếu xuất
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của Phiếu xuất
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
 *         description: Phiếu Xuất đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Phiếu Xuất không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, phieuXuatController.update);
/**
 * @swagger
 * /api/phieu_xuat:
 *   delete:
 *     tags: [Phiếu Xuất]
 *     summary: Xóa nhiều phiếu xuất
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description:  phiếu xuất
 *     responses:
 *       200:
 *         description: Phiếu xuất đã được xóa
 *       404:
 *         description: Phiếu xuấtkhông tồn tại
 *       401:
 *         description: Unauthorized
 */

router.delete('/', authMiddleware, phieuXuatController.deleteMultiple);
/**
 * @swagger
 * /api/phieu_xuat/{id}:
 *   delete:
 *     tags: [Phiếu Xuất]
 *     summary: Xóa phiếu xuất theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phiếu xuất
 *     responses:
 *       200:
 *         description: Phiếu Xuất đã được xóa
 *       404:
 *         description: Phiếu Xuất không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, phieuXuatController.deleteById);

module.exports = router;