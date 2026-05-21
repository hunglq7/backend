const express = require('express');
const router = express.Router();
const chiTietPhieuNhapController = require('../controllers/chiTietPhieuNhapController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/chi_tiet_phieu_nhap:
 *   get:
 *     tags: [Chi Tiết Phiếu Nhập]
 *     summary: Lấy danh sách tất cả Chi tiết phiếu nhập
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách chi tiết phiếu nhập
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, chiTietPhieuNhapController.getAll);
/**
 * @swagger
 * /api/chi_tiet_phieu_nhap/{id}:
 *   get:
 *     tags: [Chi Tiết Phiếu Nhập]
 *     summary: Lấy thông tin chi tiết phiếu nhập theo ID
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
 *         description: Thông tin chi tiết phiếu nhập
 *       404:
 *         description: Chi tiết Phiếu Nhập không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, chiTietPhieuNhapController.getById);
/**
 * @swagger
 * /api/chi_tiet_phieu_nhap:
 *   post:
 *     tags: [Chi Tiết Phiếu Nhập]
 *     summary: Tạo Chi tiết phiếu nhập mới
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phieu_nhap_id:
 *                 type: number
 *                 example: 1
 *               thiet_bi_id:
 *                 type: number
 *                 example: 1
 *               loai_thiet_bi_id:
 *                 type: number
 *                 example: 1
 *               don_vi_tinh_id:
 *                 type: number
 *                 example: 1
 *               so_luong:
 *                 type: integer
 *                 example: 10
 *               don_gia:
 *                 type: integer
 *                 example: 10
 *               ghi_chu:
 *                 type: string
 *                 example: "Ghi chú"
 *             required:
 *               - phieu_nhap_id
 *               - thiet_bi_id
 *               - don_vi_tinh_id
 *               - so_luong
 *               - don_gia
 *     responses:
 *       201:
 *         description: Phiếu nhập đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, chiTietPhieuNhapController.create);
/**
 * @swagger
 * /api/chi_tiet_phieu_nhap/{id}:
 *   put:
 *     tags: [Chi Tiết Phiếu Nhập]
 *     summary: Cập nhật chi tiết phiếu nhập
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của Chi tiết phiếu nhập
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phieu_nhap_id:
 *                 type: number
 *                 example: 1
 *               thiet_bi_id:
 *                 type: number
 *                 example: 1
 *               loai_thiet_bi_id:
 *                 type: number
 *                 example: 1
 *               don_vi_tinh_id:
 *                 type: number
 *                 example: 1
 *               so_luong:
 *                 type: integer
 *                 example: 10
 *               don_gia:
 *                 type: integer
 *                 example: 10
 *               ghi_chu:
 *                 type: string
 *                 example: "Ghi chú"
 *             required:
 *               - phieu_nhap_id
 *               - thiet_bi_id
 *               - don_vi_tinh_id
 *               
 *     responses:
 *       200:
 *         description: Chi tiết phiếu nhập đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Chi tiết Phiếu Nhập không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, chiTietPhieuNhapController.update);
/**
 * @swagger
 * /api/chi_tiet_phieu_nhap:
 *   delete:
 *     tags: [Chi Tiết Phiếu Nhập]
 *     summary: Xóa nhiều chi tiết phiếu nhập
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *             required:
 *               - ids
 *     responses:
 *       200:
 *         description: Phiếu nhập đã được xóa
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */

router.delete('/', authMiddleware, chiTietPhieuNhapController.deleteMultiple);
/**
 * @swagger
 * /api/chi_tiet_phieu_nhap/{id}:
 *   delete:
 *     tags: [Chi Tiết Phiếu Nhập]
 *     summary: Xóa chi tiết phiếu nhập theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của chi tiết phiếu nhập
 *     responses:
 *       200:
 *         description: Chi tiết Phiếu Nhập đã được xóa
 *       404:
 *         description: Chi tiết Phiếu Nhập không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, chiTietPhieuNhapController.deleteById);

module.exports = router;