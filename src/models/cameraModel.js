const db = require('./db');

const getAllCameras = async () => {
  const [rows] = await db.execute(
    'SELECT id, name, ip_address, location, is_online, last_check FROM cameras ORDER BY created_at DESC',
  );
  return rows.map(row => ({
    ...row,
    is_online: Boolean(row.is_online),
  }));
};

const findById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM cameras WHERE id = ?', [id]);
  if (!rows[0]) {
    return null;
  }
  return {
    ...rows[0],
    is_online: Boolean(rows[0].is_online),
  };
};

const createCamera = async (name, ip_address, location) => {
  return db.execute(
    'INSERT INTO cameras (name, ip_address, location, is_online, last_check) VALUES (?, ?, ?, ?, ?)',
    [name, ip_address, location, false, null],
  );
};

const updateCamera = async (id, name, ip_address, location, is_online, last_check) => {
  return db.execute(
    'UPDATE cameras SET name = ?, ip_address = ?, location = ?, is_online = ?, last_check = ? WHERE id = ?',
    [name, ip_address, location, is_online, last_check, id],
  );
};

const updateCameraStatus = async (id, is_online, last_check) => {
  return db.execute(
    'UPDATE cameras SET is_online = ?, last_check = ? WHERE id = ?',
    [is_online, last_check, id],
  );
};

const deleteCamera = async (id) => {
  return db.execute('DELETE FROM cameras WHERE id = ?', [id]);
};

const deleteCameras = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return null;
  }
  const placeholders = ids.map(() => '?').join(',');
  return db.execute(`DELETE FROM cameras WHERE id IN (${placeholders})`, ids);
};

module.exports = {
  getAllCameras,
  findById,
  createCamera,
  updateCamera,
  updateCameraStatus,
  deleteCamera,
  deleteCameras,
};
