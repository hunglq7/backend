module.exports = {
  id: '008-create-cameras-table',
  name: 'Create cameras table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS cameras (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        ip_address VARCHAR(255) NOT NULL,
        location VARCHAR(255) DEFAULT NULL,
        is_online BOOLEAN DEFAULT FALSE,
        last_check DATETIME DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};
