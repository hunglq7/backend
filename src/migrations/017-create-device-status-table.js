module.exports = {
  id: '017-create-device-status-table',
  name: 'Create device_status table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS device_status (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};