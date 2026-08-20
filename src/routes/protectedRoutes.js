const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

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
