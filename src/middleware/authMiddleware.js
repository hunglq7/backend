const jwtUtils = require('../utils/jwt');

const authenticate = (req, res, next) => {
  try{
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
  }
  catch (error) {
    console.error('Lỗi xác thực token:', error);
    res.status(500).json({ message: 'Lỗi xác thực token.' });
  }
};

module.exports = authenticate;
