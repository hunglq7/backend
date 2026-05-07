const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json({
      list: users,
      total: users.length,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const parseRoles = (rawRoles) => {
  if (!rawRoles) {
    return ['user'];
  }
  if (Array.isArray(rawRoles)) {
    return rawRoles;
  }
  try {
    return JSON.parse(rawRoles);
  } catch (error) {
    return [String(rawRoles)];
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { password, refresh_token, ...userWithoutSensitive } = user;
    userWithoutSensitive.roles = parseRoles(userWithoutSensitive.roles);
    res.json(userWithoutSensitive);
  } catch (error) {
    console.error('Error fetching user by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, phone, avatar, roles } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required' });
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const existingUsername = await userModel.findByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRoles = roles || ['user'];
    const result = await userModel.createUser(username, email, hashedPassword, phone, avatar, userRoles);

    res.status(201).json({
      id: result[0].insertId,
      username,
      email,
      phone,
      avatar,
      roles: userRoles,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone, avatar, roles, description } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'Email already in use' });
      }
    }

    if (username && username !== user.username) {
      const existingUsername = await userModel.findByUsername(username);
      if (existingUsername) {
        return res.status(409).json({ error: 'Username already in use' });
      }
    }

    const userRoles = roles || parseRoles(user.roles);
    await userModel.updateUser(id, username || user.username, email || user.email, phone, avatar, userRoles, description || user.description);

    res.json({
      id: parseInt(id),
      username: username || user.username,
      email: email || user.email,
      phone,
      avatar,
      description: description || user.description,
      roles: userRoles,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModel.deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    for (const id of ids) {
      await userModel.deleteUser(id);
    }
    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error('Error deleting multiple users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteUsers,
};