const db = require('./db');

const getAllBrands = async () => {
  const [rows] = await db.execute('SELECT * FROM brands ORDER BY id DESC');
  return rows;
};

const getBrandById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM brands WHERE id = ?', [id]);
  return rows[0];
};

const createBrand = async (name, country) => {
  return db.execute('INSERT INTO brands (name, country) VALUES (?, ?)', [name, country]);
};

const updateBrand = async (id, name, country) => {
  return db.execute('UPDATE brands SET name = ?, country = ? WHERE id = ?', [name, country, id]);
};

const deleteBrand = async (id) => {
  return db.execute('DELETE FROM brands WHERE id = ?', [id]);
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};