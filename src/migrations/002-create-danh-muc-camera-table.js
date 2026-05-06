module.exports = {
  id: '002-create-danh-muc-camera-table',
  name: 'Create danh_muc_camera table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS danh_muc_camera (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ten_thiet_bi VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};
