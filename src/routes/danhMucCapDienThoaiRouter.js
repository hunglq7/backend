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
 * /api/danhMucCapDienThoai/{id}:
 *   put:
 *     summary: Cập nhật danh mục cáp điện thoại
 *     tags: [danhMucCapDienThoai]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục cáp điện thoại cần cập nhật
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
 *                 description: Tên cáp điện thoại
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả tên cáp
 *     responses:
 *       200:
 *         description: Cáp đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy dữ liệu
 *       500:
 *         description: Lỗi server
 */
router.put('/:id', authenticate, danhMucCapDienThoaiController.update);
/**
 * @swagger
 * /api/danhMucCapDienThoai/{id}:
 *   delete:
 *     summary: Xóa danh mục cáp điện thoại
 *     tags: [DanhMucCapDienThoai]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID 
 *     responses:
 *       200:
 *         description: Bản ghi đã được xóa
 *       404:
 *         description: Không tìm thấy bản ghi nào
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', authenticate, danhMucCapDienThoaiController.deleteById);
module.exports = router;