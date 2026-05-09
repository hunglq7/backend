module.exports = {
  id: '013-create-models-table',
  name: 'Create models table',
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS models (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        brand_id INT NOT NULL,
        model_code VARCHAR(100) NOT NULL,
        model_name VARCHAR(255),
        specification TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (brand_id) REFERENCES brands(id)
      ) ENGINE=InnoDB;
    `);
  },
};