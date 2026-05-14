module.exports = {
  id: '011-create-thiet-bi-table',
  name: 'Create thiet_bi table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS thiet_bi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ten_thiet_bi VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};