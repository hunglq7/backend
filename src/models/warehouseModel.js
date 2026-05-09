const db = require('./db');

const getAllWarehouses = async () => {
  const [rows] = await db.execute('SELECT * FROM warehouses ORDER BY id DESC');
  return rows;
};

const getWarehouseById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM warehouses WHERE id = ?', [id]);
  return rows[0];
};

const createWarehouse = async (name, address) => {
  return db.execute('INSERT INTO warehouses (name, address) VALUES (?, ?)', [name, address]);
};

const updateWarehouse = async (id, name, address) => {
  return db.execute('UPDATE warehouses SET name = ?, address = ? WHERE id = ?', [name, address, id]);
};

const deleteWarehouse = async (id) => {
  return db.execute('DELETE FROM warehouses WHERE id = ?', [id]);
};

module.exports = {
  getAllWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
};