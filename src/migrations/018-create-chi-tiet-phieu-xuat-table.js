module.exports = {
  id: "018-create-chi-tiet-phieu-xuat-table",
  name: "Create chi_tiet_phieu_xuat table",
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS chi_tiet_phieu_xuat (
        id INT AUTO_INCREMENT PRIMARY KEY,       
        phieu_xuat_id INT NOT NULL,
        thiet_bi_id INT NOT NULL,
        loai_thiet_bi_id INT NOT NULL,
        don_vi_tinh_id INT NOT NULL,
        so_luong INT NOT NULL,   
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

         CONSTRAINT fk_ctpx_phieuxuat
        FOREIGN KEY (phieu_xuat_id)
        REFERENCES phieu_xuat(id)
        ON DELETE CASCADE,

        CONSTRAINT fk_ctpx_thietbi
        FOREIGN KEY (thiet_bi_id)
        REFERENCES thiet_bi(id),

         CONSTRAINT fk_ctpx_loaithietbi
        FOREIGN KEY (loai_thiet_bi_id)
        REFERENCES loai_thiet_bi(id),

         CONSTRAINT fk_ctpx_donvitinh
        FOREIGN KEY (don_vi_tinh_id)
        REFERENCES don_vi_tinh(id)
      ) ENGINE=InnoDB;
    `);
  },
};
