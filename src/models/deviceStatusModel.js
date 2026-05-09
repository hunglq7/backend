const db = require('./db');

const getAllDeviceStatus = async () => {
  const [rows] = await db.execute('SELECT * FROM device_status ORDER BY id DESC');
  return rows;
};

const getDeviceStatusById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM device_status WHERE id = ?', [id]);
  return rows[0];
};

const createDeviceStatus = async (name) => {
  return db.execute('INSERT INTO device_status (name) VALUES (?)', [name]);
};

const updateDeviceStatus = async (id, name) => {
  return db.execute('UPDATE device_status SET name = ? WHERE id = ?', [name, id]);
};

const deleteDeviceStatus = async (id) => {
  return db.execute('DELETE FROM device_status WHERE id = ?', [id]);
};

module.exports = {
  getAllDeviceStatus,
  getDeviceStatusById,
  createDeviceStatus,
  updateDeviceStatus,
  deleteDeviceStatus,
};