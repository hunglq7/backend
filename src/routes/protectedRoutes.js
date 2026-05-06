const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/protected/profile:
 *   get:
 *     tags: [Protected]
 *     summary: Lấy thông tin profile của người dùng đã đăng nhập
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Thông tin profile
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authenticate, (req, res) => {
  res.json({
    message: 'Protected profile information',
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

module.exports = router;
