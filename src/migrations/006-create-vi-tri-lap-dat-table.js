module.exports = {
  id: '006-create-vi-tri-lap-dat-table',
  name: 'Create vi_tri_lap_dat table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS vi_tri_lap_dat (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ten_vi_tri VARCHAR(255) NOT NULL,
        mo_ta TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};