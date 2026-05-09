const db = require('./db');

const getAllAreas = async () => {
  const [rows] = await db.execute(`
    SELECT a.*, p.name as parent_name
    FROM areas a
    LEFT JOIN areas p ON a.parent_id = p.id
    ORDER BY a.id DESC
  `);
  return rows;
};

const getAreaById = async (id) => {
  const [rows] = await db.execute(`
    SELECT a.*, p.name as parent_name
    FROM areas a
    LEFT JOIN areas p ON a.parent_id = p.id
    WHERE a.id = ?
  `, [id]);
  return rows[0];
};

const createArea = async (name, parent_id, description) => {
  return db.execute('INSERT INTO areas (name, parent_id, description) VALUES (?, ?, ?)', [name, parent_id, description]);
};

const updateArea = async (id, name, parent_id, description) => {
  return db.execute('UPDATE areas SET name = ?, parent_id = ?, description = ? WHERE id = ?', [name, parent_id, description, id]);
};

const deleteArea = async (id) => {
  return db.execute('DELETE FROM areas WHERE id = ?', [id]);
};

module.exports = {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};