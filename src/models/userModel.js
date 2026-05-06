const db = require('./db');

const findByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (rows[0]) {
    rows[0].roles = rows[0].roles || ['user'];
  }
  return rows[0] || null;
};

const findByUsername = async (username) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  if (rows[0]) {
    rows[0].roles = rows[0].roles || ['user'];
  }
  return rows[0] || null;
};

const findById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  if (rows[0]) {
    rows[0].roles = rows[0].roles || ['user'];
  }
  return rows[0] || null;
};

const createUser = async (username, email, password, phone, avatar, roles) => {
  return db.execute(
    'INSERT INTO users (username, email, password, phone, avatar, roles) VALUES (?, ?, ?, ?, ?, ?)',
    [username, email, password, phone, avatar, JSON.stringify(roles)]
  );
};

const updateUser = async (id, username, email, phone, avatar, roles) => {
  return db.execute(
    'UPDATE users SET username = ?, email = ?, phone = ?, avatar = ?, roles = ? WHERE id = ?',
    [username, email, phone, avatar, JSON.stringify(roles), id]
  );
};

const getAllUsers = async () => {
  const [rows] = await db.execute('SELECT id, username, email, phone, avatar, roles, created_at FROM users ORDER BY created_at DESC');
  return rows.map(row => ({
    ...row,
    roles: row.roles || ['user']
  }));
};

const deleteUser = async (id) => {
  return db.execute('DELETE FROM users WHERE id = ?', [id]);
};

const updateRefreshToken = async (id, refreshToken) => {
  return db.execute(
    'UPDATE users SET refresh_token = ? WHERE id = ?',
    [refreshToken, id]
  );
};

module.exports = {
  findByEmail,
  findByUsername,
  findById,
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
  updateRefreshToken,
};
