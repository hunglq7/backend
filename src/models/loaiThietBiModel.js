const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM loai_thiet_bi ORDER BY created_at ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM loai_thiet_bi WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (ten_loai) => {
  return db.execute(
    'INSERT INTO loai_thiet_bi (ten_loai) VALUES (?)',
    [ten_loai]
  );
};

const update = async (id, ten_loai) => {
  return db.execute(
    'UPDATE loai_thiet_bi SET ten_loai = ? WHERE id = ?',
    [ten_loai, id]
  );
};

const deleteById = async (id) => {
  return db.execute('DELETE FROM loai_thiet_bi WHERE id = ?', [id]);
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM loai_thiet_bi WHERE id IN (${placeholders})`,
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
