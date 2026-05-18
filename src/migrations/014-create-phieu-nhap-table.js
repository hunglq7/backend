module.exports = {
  id: "014-create-phieu-nhap-table",
  name: "Create phieu_nhap table",
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS phieu_nhap (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ma_phieu_nhap VARCHAR(100) UNIQUE NOT NULL,
        ngay_nhap DATETIME NOT NULL,
        don_vi_id INT NOT NULL,
        nguoi_nhap VARCHAR(255),
        ghi_chu TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
         CONSTRAINT fk_pn_donvi
        FOREIGN KEY (don_vi_id)
        REFERENCES danh_muc_don_vi(id)
      ) ENGINE=InnoDB;
    `);
  },
};
