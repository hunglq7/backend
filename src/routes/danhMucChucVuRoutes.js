const express = require('express');
const router = express.Router();
const danhMucChucVuController = require('../controllers/danhMucChucVuController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/danh-muc-chuc-vu:
 *   get:
 *     tags: [Danh mục chức vụ]
 *     summary: Lấy danh sách tất cả danh mục chức vụ
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Danh sách danh mục chức vụ
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, danhMucChucVuController.getAll);
/**
 * @swagger
 * /api/danh-muc-chuc-vu/{id}:
 *   get:
 *     tags: [Danh mục chức vụ]
 *     summary: Lấy thông tin danh mục chức vụ theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục chức vụ
 *     responses:
 *       200:
 *         description: Thông tin danh mục chức vụ
 *       404:
 *         description: Danh mục không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, danhMucChucVuController.getById);
/**
 * @swagger
 * /api/danh-muc-chuc-vu:
 *   post:
 *     tags: [Danh mục chức vụ]
 *     summary: Tạo danh mục chức vụ mới
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_chuc_vu:
 *                 type: string
 *                 example: "Quản trị viên"
 *             required:
 *               - ten_chuc_vu
 *     responses:
 *       201:
 *         description: Danh mục chức vụ đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, danhMucChucVuController.create);
/**
 * @swagger
 * /api/danh-muc-chuc-vu/{id}:
 *   put:
 *     tags: [Danh mục chức vụ]
 *     summary: Cập nhật danh mục chức vụ
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục chức vụ
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
 *         description: Danh mục chức vụ đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Danh mục không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, danhMucChucVuController.update);
/**
 * @swagger
 * /api/danh-muc-chuc-vu:
 *   delete:
 *     tags: [Danh mục chức vụ]
 *     summary: Xóa nhiều danh mục chức vụ
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

router.delete('/', authMiddleware, danhMucChucVuController.deleteMultiple);
/**
 * @swagger
 * /api/danh-muc-chuc-vu/{id}:
 *   delete:
 *     tags: [Danh mục chức vụ]
 *     summary: Xóa danh mục chức vụ theo ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục chức vụ
 *     responses:
 *       200:
 *         description: Danh mục chức vụ đã được xóa
 *       404:
 *         description: Danh mục không tồn tại
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, danhMucChucVuController.deleteById);

module.exports = router;