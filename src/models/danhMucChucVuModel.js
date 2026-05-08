const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM danh_muc_chuc_vu ORDER BY created_at ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM danh_muc_chuc_vu WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (ten_chuc_vu) => {
  return db.execute(
    'INSERT INTO danh_muc_chuc_vu (ten_chuc_vu) VALUES (?)',
    [ten_chuc_vu]
  );
};

const update = async (id, ten_chuc_vu) => {
  return db.execute(
    'UPDATE danh_muc_chuc_vu SET ten_chuc_vu = ? WHERE id = ?',
    [ten_chuc_vu, id]
  );
};

const deleteById = async (id) => {
  return db.execute('DELETE FROM danh_muc_chuc_vu WHERE id = ?', [id]);
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM danh_muc_chuc_vu WHERE id IN (${placeholders})`,
    ids,
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteMultiple,
};
