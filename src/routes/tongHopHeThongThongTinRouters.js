const express = require('express');
const router = express.Router();
const tongHopHeThongThongTinController = require('../controllers/tongHopHeThongThongTinController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/tonghop_hethong_thongtin:
 *   get:
 *     tags: [Tổng hợp hệ thống thông tin]
 *     summary: Lấy danh sách tất cả Tổng hợp hệ thống thông tin
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách Tổng hợp hệ thống thông tin
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, tongHopHeThongThongTinController.getAll);
/**
 * @swagger
 * /api/tonghop_hethong_thongtin/{id}:
 *   get:
 *     tags: [Tổng hợp hệ thống thông tin]
 *     summary: Lấy thông tin Tổng hợp hệ thống thông tin theo ID
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
 *         description: Thông tin Tổng hợp hệ thống thông tin
 *       404:
 *         description: Tổng hợp hệ thống thông tin không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, tongHopHeThongThongTinController.getById);
/**
 * @swagger
 * /api/tonghop_hethong_thongtin:
 *   post:
 *     tags: [Tổng hợp hệ thống thông tin]
 *     summary: Tạo Tổng hợp hệ thống thông tin mới
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               thiet_bi_id:
 *                 type: number
 *                 example: 1
 * 
 *               don_vi_id:
 *                 type: number
 *                 example: 1
 * 
 *               vi_tri_id:
 *                 type: number
 *                 example: 1
 * 
 *               khu_vuc_id:
 *                 type: number
 *                 example: 1
 * 
 *               don_vi_tinh_id:
 *                 type: number
 *                 example: 1
 * 
 *               so_luong:
 *                 type: integer
 *                 example: 1
 * 
 *              loai_thiet_bi_id:
 *                 type: integer
 *                 example: 1 

 *               ngay_lap:
 *               type: datetime
 *               example: 2026-08-20  
 *             
 *               ghi_chu:
 *                 type: string
 *                 example: "Ghi chú"
 *             required:
 *               - thiet_bi_id
 *               - don_vi_id
 *               - vi_tri_id
 *               - khu_vuc_id
 *               - don_vi_tinh_id
 *               - so_luong
 *              
 *     responses:
 *       201:
 *         description: Phiếu nhập đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, tongHopHeThongThongTinController.create);
/**
 * @swagger
 * /api/tonghop_hethong_thongtin/{id}:
 *   put:
 *     tags: [Tổng hợp hệ thống thông tin]
 *     summary: Cập nhật Tổng hợp hệ thống thông tin
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của Tổng hợp hệ thống thông tin
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
 *         description: Tổng hợp hệ thống thông tin đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Tổng hợp hệ thống thông tin không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, tongHopHeThongThongTinController.update);
/**
 * @swagger
 * /api/tonghop_hethong_thongtin:
 *   delete:
 *     tags: [Tổng hợp hệ thống thông tin]
 *     summary: Xóa nhiều Tổng hợp hệ thống thông tin
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

router.delete('/', authMiddleware, tongHopHeThongThongTinController.deleteMultiple);
/**
 * @swagger
 * /api/tonghop_hethong_thongtin/{id}:
 *   delete:
 *     tags: [Tổng hợp hệ thống thông tin]
 *     summary: Xóa Tổng hợp hệ thống thông tin theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của Tổng hợp hệ thống thông tin
 *     responses:
 *       200:
 *         description: Tổng hợp hệ thống thông tin đã được xóa
 *       404:
 *         description: Tổng hợp hệ thống thông tin không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, tongHopHeThongThongTinController.deleteById);

module.exports = router;