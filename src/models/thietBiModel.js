const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM thiet_bi ORDER BY created_at ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM thiet_bi WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (ten_thiet_bi) => {
  return db.execute(
    'INSERT INTO thiet_bi (ten_thiet_bi) VALUES (?)',
    [ten_thiet_bi]
  );
};

const update = async (id, ten_thiet_bi) => {
  return db.execute(
    'UPDATE thiet_bi SET ten_thiet_bi = ? WHERE id = ?',
    [ten_thiet_bi, id]
  );
};

const deleteById = async (id) => {
  return db.execute('DELETE FROM thiet_bi WHERE id = ?', [id]);
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM thiet_bi WHERE id IN (${placeholders})`,
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
