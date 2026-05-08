module.exports = {
  id: '010-create-danh-muc-chuc-vu-table',
  name: 'Create danh_muc_chuc_vu table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS danh_muc_chuc_vu (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ten_chuc_vu VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};