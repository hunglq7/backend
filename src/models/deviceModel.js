const db = require('./db');

const getAllDevices = async () => {
  const [rows] = await db.execute(`
    SELECT d.*, m.model_code, m.model_name, w.name as warehouse_name,
           s.name as supplier_name, ds.name as status_name,
           c.name as category_name, b.name as brand_name
    FROM devices d
    LEFT JOIN models m ON d.model_id = m.id
    LEFT JOIN warehouses w ON d.warehouse_id = w.id
    LEFT JOIN suppliers s ON d.supplier_id = s.id
    LEFT JOIN device_status ds ON d.status_id = ds.id
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN brands b ON m.brand_id = b.id
    ORDER BY d.id DESC
  `);
  return rows;
};

const getDeviceById = async (id) => {
  const [rows] = await db.execute(`
    SELECT d.*, m.model_code, m.model_name, w.name as warehouse_name,
           s.name as supplier_name, ds.name as status_name,
           c.name as category_name, b.name as brand_name
    FROM devices d
    LEFT JOIN models m ON d.model_id = m.id
    LEFT JOIN warehouses w ON d.warehouse_id = w.id
    LEFT JOIN suppliers s ON d.supplier_id = s.id
    LEFT JOIN device_status ds ON d.status_id = ds.id
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN brands b ON m.brand_id = b.id
    WHERE d.id = ?
  `, [id]);
  return rows[0];
};

const createDevice = async (model_id, warehouse_id, serial_number, asset_code, mac_address, ip_address, purchase_date, warranty_expired_date, supplier_id, status_id, note) => {
  return db.execute(
    `INSERT INTO devices (model_id, warehouse_id, serial_number, asset_code, mac_address, ip_address, purchase_date, warranty_expired_date, supplier_id, status_id, note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [model_id, warehouse_id, serial_number, asset_code, mac_address, ip_address, purchase_date, warranty_expired_date, supplier_id, status_id, note]
  );
};

const updateDevice = async (id, model_id, warehouse_id, serial_number, asset_code, mac_address, ip_address, purchase_date, warranty_expired_date, supplier_id, status_id, note) => {
  return db.execute(
    `UPDATE devices SET model_id = ?, warehouse_id = ?, serial_number = ?, asset_code = ?, mac_address = ?, ip_address = ?, purchase_date = ?, warranty_expired_date = ?, supplier_id = ?, status_id = ?, note = ? WHERE id = ?`,
    [model_id, warehouse_id, serial_number, asset_code, mac_address, ip_address, purchase_date, warranty_expired_date, supplier_id, status_id, note, id]
  );
};

const deleteDevice = async (id) => {
  return db.execute('DELETE FROM devices WHERE id = ?', [id]);
};

module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
};