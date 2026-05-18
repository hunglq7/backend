module.exports = {
  id: '013-create-loai-thiet-bi-table',
  name: 'Create loai_thiet_bi table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS loai_thiet_bi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ten_loai VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};