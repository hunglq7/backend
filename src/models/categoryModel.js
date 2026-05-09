const db = require('./db');

const getAllCategories = async () => {
  const [rows] = await db.execute('SELECT * FROM categories ORDER BY id DESC');
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
};

const createCategory = async (name, description) => {
  return db.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
};

const updateCategory = async (id, name, description) => {
  return db.execute('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id]);
};

const deleteCategory = async (id) => {
  return db.execute('DELETE FROM categories WHERE id = ?', [id]);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
