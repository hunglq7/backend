const express = require('express');
const router = express.Router();
const danhMucDonViController = require('../controllers/danhMucDonViController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/danh-muc-don-vi:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục đơn vị
 *     tags: [DanhMucDonVi]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách danh mục đơn vị
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   ten_don_vi:
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
router.get('/', authMiddleware, danhMucDonViController.getAll);

/**
 * @swagger
 * /api/danh-muc-don-vi/{id}:
 *   get:
 *     summary: Lấy danh mục đơn vị theo ID
 *     tags: [DanhMucDonVi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục đơn vị
 *     responses:
 *       200:
 *         description: Thông tin danh mục đơn vị
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 ten_don_vi:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy danh mục đơn vị
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', authMiddleware, danhMucDonViController.getById);

/**
 * @swagger
 * /api/danh-muc-don-vi:
 *   post:
 *     summary: Tạo danh mục đơn vị mới
 *     tags: [DanhMucDonVi]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten_don_vi
 *             properties:
 *               ten_don_vi:
 *                 type: string
 *                 description: Tên đơn vị
 *     responses:
 *       201:
 *         description: Danh mục đơn vị đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/', authMiddleware, danhMucDonViController.create);

/**
 * @swagger
 * /api/danh-muc-don-vi/{id}:
 *   put:
 *     summary: Cập nhật danh mục đơn vị
 *     tags: [DanhMucDonVi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục đơn vị
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten_don_vi
 *             properties:
 *               ten_don_vi:
 *                 type: string
 *                 description: Tên đơn vị
 *     responses:
 *       200:
 *         description: Danh mục đơn vị đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy danh mục đơn vị
 *       500:
 *         description: Lỗi server
 */
router.put('/:id', authMiddleware, danhMucDonViController.update);

/**
 * @swagger
 * /api/danh-muc-don-vi/{id}:
 *   delete:
 *     summary: Xóa danh mục đơn vị
 *     tags: [DanhMucDonVi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục đơn vị
 *     responses:
 *       200:
 *         description: Danh mục đơn vị đã được xóa
 *       404:
 *         description: Không tìm thấy danh mục đơn vị
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', authMiddleware, danhMucDonViController.deleteById);

/**
 * @swagger
 * /api/danh-muc-don-vi:
 *   delete:
 *     summary: Xóa nhiều danh mục đơn vị
 *     tags: [DanhMucDonVi]
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
 *                 description: Danh sách ID của danh mục đơn vị cần xóa
 *     responses:
 *       200:
 *         description: Các danh mục đơn vị đã được xóa
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.delete('/', authMiddleware, danhMucDonViController.deleteMultiple);

module.exports = router;