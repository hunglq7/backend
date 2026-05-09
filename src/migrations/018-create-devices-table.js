module.exports = {
  id: '018-create-devices-table',
  name: 'Create devices table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS devices (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        model_id INT NOT NULL,
        warehouse_id INT NULL,
        serial_number VARCHAR(255) UNIQUE,
        asset_code VARCHAR(100) UNIQUE,
        mac_address VARCHAR(100),
        ip_address VARCHAR(100),
        purchase_date DATE,
        warranty_expired_date DATE,
        supplier_id INT NULL,
        status_id INT NOT NULL,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (model_id) REFERENCES models(id),
        FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
        FOREIGN KEY (status_id) REFERENCES device_status(id)
      ) ENGINE=InnoDB;
    `);
  },
};