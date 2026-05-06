const jwtUtils = require('../utils/jwt');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token truy cập không tồn tại.' });
  }

  const token = authHeader.split(' ')[1];
  const payload = jwtUtils.verifyAccessToken(token);
  if (!payload) {
    return res.status(401).json({ message: 'Token truy cập không hợp lệ.' });
  }

  req.user = payload;
  next();
};

module.exports = authenticate;
