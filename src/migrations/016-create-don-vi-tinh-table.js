module.exports = {
  id: '016-create-don-vi-tinh-table',
  name: 'Create don_vi_tinh table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS don_vi_tinh (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ten_don_vi_tinh VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};