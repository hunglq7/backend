const express = require('express');
const router = express.Router();
const phieuNhapController = require('../controllers/phieuNhapController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/phieu_nhap:
 *   get:
 *     tags: [Phiếu Nhập]
 *     summary: Lấy danh sách tất cả Phiếu nhập
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách phiếu nhập
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, phieuNhapController.getAll);
/**
 * @swagger
 * /api/phieu_nhap/{id}:
 *   get:
 *     tags: [Phiếu Nhập]
 *     summary: Lấy thông tin phiếu nhập theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phiếu nhập
 *     responses:
 *       200:
 *         description: Thông tin phiếu nhập
 *       404:
 *         description: Phiếu Nhập không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, phieuNhapController.getById);
/**
 * @swagger
 * /api/phieu_nhap:
 *   post:
 *     tags: [Phiếu Nhập]
 *     summary: Tạo Phiếu nhập mới
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
 *         description: Phiếu nhập đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, phieuNhapController.create);
/**
 * @swagger
 * /api/phieu_nhap/{id}:
 *   put:
 *     tags: [Phiếu Nhập]
 *     summary: Cập nhật phiếu nhập
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của Phiếu nhập
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
 *         description: Phiếu Nhập đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Phiếu Nhập không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, phieuNhapController.update);
/**
 * @swagger
 * /api/phieu_nhap:
 *   delete:
 *     tags: [Phiếu Nhập]
 *     summary: Xóa nhiều phiếu nhập
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

router.delete('/', authMiddleware, phieuNhapController.deleteMultiple);
/**
 * @swagger
 * /api/phieu_nhap/{id}:
 *   delete:
 *     tags: [Phiếu Nhập]
 *     summary: Xóa phiếu nhập theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phiếu nhập
 *     responses:
 *       200:
 *         description: Phiếu Nhập đã được xóa
 *       404:
 *         description: Phiếu Nhập không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, phieuNhapController.deleteById);

module.exports = router;