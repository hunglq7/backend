const db = require('./db');

const getAllModels = async () => {
  const [rows] = await db.execute(`
    SELECT m.*, c.name as category_name, b.name as brand_name
    FROM models m
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN brands b ON m.brand_id = b.id
    ORDER BY m.id DESC
  `);
  return rows;
};

const getModelById = async (id) => {
  const [rows] = await db.execute(`
    SELECT m.*, c.name as category_name, b.name as brand_name
    FROM models m
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN brands b ON m.brand_id = b.id
    WHERE m.id = ?
  `, [id]);
  return rows[0];
};

const createModel = async (category_id, brand_id, model_code, model_name, specification) => {
  return db.execute('INSERT INTO models (category_id, brand_id, model_code, model_name, specification) VALUES (?, ?, ?, ?, ?)', [category_id, brand_id, model_code, model_name, specification]);
};

const updateModel = async (id, category_id, brand_id, model_code, model_name, specification) => {
  return db.execute('UPDATE models SET category_id = ?, brand_id = ?, model_code = ?, model_name = ?, specification = ? WHERE id = ?', [category_id, brand_id, model_code, model_name, specification, id]);
};

const deleteModel = async (id) => {
  return db.execute('DELETE FROM models WHERE id = ?', [id]);
};

module.exports = {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
};