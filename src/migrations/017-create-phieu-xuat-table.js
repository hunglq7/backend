module.exports = {
  id: "017-create-phieu-xuat-table",
  name: "Create phieu_xuat table",
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS phieu_xuat (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ma_phieu_xuat VARCHAR(100) UNIQUE NOT NULL,
      ngay_xuat DATETIME NOT NULL,
      don_vi_id INT NOT NULL,
      vi_tri_id INT,
      nguoi_xuat VARCHAR(255),
      ghi_chu TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

         CONSTRAINT fk_px_donvi
        FOREIGN KEY (don_vi_id)
        REFERENCES danh_muc_don_vi(id),

         CONSTRAINT fk_px_vitri
        FOREIGN KEY (vi_tri_id)
        REFERENCES vi_tri_lap_dat(id)
      ) ENGINE=InnoDB;
    `);
  },
};
