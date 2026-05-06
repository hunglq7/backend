module.exports = {
  id: '005-create-danh-muc-don-vi-table',
  name: 'Create danh_muc_don_vi table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS danh_muc_don_vi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ten_don_vi VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};