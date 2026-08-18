module.exports = {
  id: '019-create-danh-muc-cap-table',
  name: 'Create danhMucCapDienThoai table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS danhMucCapDienThoai (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenCap VARCHAR(255) NOT NULL UNIQUE,        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
  },
};
