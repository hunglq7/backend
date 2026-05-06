const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM danh_muc_don_vi ORDER BY created_at DESC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM danh_muc_don_vi WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (ten_don_vi) => {
  const result = await db.execute(
    'INSERT INTO danh_muc_don_vi (ten_don_vi) VALUES (?)',
    [ten_don_vi]
  );
  return result;
};

const update = async (id, ten_don_vi) => {
  const result = await db.execute(
    'UPDATE danh_muc_don_vi SET ten_don_vi = ? WHERE id = ?',
    [ten_don_vi, id]
  );
  return result;
};

const deleteById = async (id) => {
  const result = await db.execute('DELETE FROM danh_muc_don_vi WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};