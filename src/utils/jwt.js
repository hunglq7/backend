const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const accessSecret = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
const accessExpires = process.env.JWT_ACCESS_EXPIRES || '15m';
const refreshExpires = process.env.JWT_REFRESH_EXPIRES || '7d';

const createAccessToken = (payload) => {
  return jwt.sign(payload, accessSecret, { expiresIn: accessExpires });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpires });
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, accessSecret);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, refreshSecret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
