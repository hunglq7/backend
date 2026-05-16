module.exports = {
  id: '012-create-khu-vuc-table',
  name: 'Create khu_vuc table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS khu_vuc (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ten_khu_vuc VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};