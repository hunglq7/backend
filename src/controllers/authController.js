const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwtUtils = require('../utils/jwt');
const db = require('../models/db');

const register = async (req, res, next) => {
  try {
    const { username, email, password, phone, avatar } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username và mật khẩu là bắt buộc.' });
    }

    const existingUsername = await userModel.findByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ message: 'Username đã được sử dụng.' });
    }

    if (email) {
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email đã được sử dụng.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const roles = ['user'];
    const createdUser = await userModel.createUser(username, email || null, hashedPassword, phone || null, avatar || null, roles);
    const user = await userModel.findById(createdUser[0].insertId);

    const accessToken = jwtUtils.createAccessToken({ id: user.id, username: user.username, email: user.email, avatar: user.avatar || "", roles });
    const refreshToken = jwtUtils.createRefreshToken({ id: user.id, username: user.username, email: user.email, avatar: user.avatar || "", roles });
    await userModel.updateRefreshToken(user.id, refreshToken);

    res.status(201).json({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      user_id: user.id,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username và mật khẩu là bắt buộc.' });
    }

    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không đúng.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không đúng.' });
    }

    const roles = user.roles || ['user'];
    const accessToken = jwtUtils.createAccessToken({ id: user.id, username: user.username, email: user.email, avatar: user.avatar || "", roles });
    const refreshToken = jwtUtils.createRefreshToken({ id: user.id, username: user.username, email: user.email, avatar: user.avatar || "", roles });

    await userModel.updateRefreshToken(user.id, refreshToken);

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      user_id: user.id,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token là bắt buộc.' });
    }

    const payload = jwtUtils.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ message: 'Refresh token không hợp lệ.' });
    }

    const user = await userModel.findById(payload.id);
    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({ message: 'Refresh token không hợp lệ hoặc đã bị thu hồi.' });
    }

    const roles = user.roles || ['user'];
    const newAccessToken = jwtUtils.createAccessToken({ id: user.id, username: user.username, email: user.email, avatar: user.avatar || "", roles });
    const newRefreshToken = jwtUtils.createRefreshToken({ id: user.id, username: user.username, email: user.email, avatar: user.avatar || "", roles });
    console.log('accessToken:', newAccessToken);
    console.log('refreshToken:', newRefreshToken);
    await userModel.updateRefreshToken(user.id, newRefreshToken);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token là bắt buộc.' });
    }

    const payload = jwtUtils.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(400).json({ message: 'Refresh token không hợp lệ.' });
    }

    await userModel.updateRefreshToken(payload.id, null);
    res.json({ message: 'Đã đăng xuất thành công.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
