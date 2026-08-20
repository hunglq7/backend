const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM don_vi_tinh ORDER BY created_at ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM don_vi_tinh WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (ten_don_vi_tinh) => {
  return db.execute(
    'INSERT INTO don_vi_tinh (ten_don_vi_tinh) VALUES (?)',
    [ten_don_vi_tinh]
  );
};

const update = async (id, ten_don_vi_tinh) => {
  return db.execute(
    'UPDATE don_vi_tinh SET ten_don_vi_tinh = ? WHERE id = ?',
    [ten_don_vi_tinh, id]
  );
};

const deleteById = async (id) => {
  return db.execute('DELETE FROM don_vi_tinh WHERE id = ?', [id]);
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM don_vi_tinh WHERE id IN (${placeholders})`,
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
