const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM vi_tri_lap_dat ORDER BY created_at DESC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM vi_tri_lap_dat WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (ten_vi_tri, mo_ta) => {
  const result = await db.execute(
    'INSERT INTO vi_tri_lap_dat (ten_vi_tri, mo_ta) VALUES (?, ?)',
    [ten_vi_tri, mo_ta]
  );
  return result;
};

const update = async (id, ten_vi_tri, mo_ta) => {
  const result = await db.execute(
    'UPDATE vi_tri_lap_dat SET ten_vi_tri = ?, mo_ta = ? WHERE id = ?',
    [ten_vi_tri, mo_ta, id]
  );
  return result;
};

const deleteById = async (id) => {
  const result = await db.execute('DELETE FROM vi_tri_lap_dat WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};