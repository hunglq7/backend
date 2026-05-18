module.exports = {
  id: "015-create-chi-tiet-phieu-nhap-table",
  name: "Create chi_tiet_phieu_nhap table",
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS chi_tiet_phieu_nhap (
        id INT AUTO_INCREMENT PRIMARY KEY,       
        phieu_nhap_id INT NOT NULL,
        thiet_bi_id INT NOT NULL,
        loai_thiet_bi_id INT NOT NULL,
        don_vi_tinh_id INT NOT NULL,
        so_luong INT NOT NULL,
        don_gia DECIMAL(18,2) DEFAULT 0,
        thanh_tien DECIMAL(18,2)
        GENERATED ALWAYS AS (so_luong * don_gia) STORED,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

         CONSTRAINT fk_ctpn_phieunhap
        FOREIGN KEY (phieu_nhap_id)
        REFERENCES phieu_nhap(id)
        ON DELETE CASCADE,

        CONSTRAINT fk_ctpn_thietbi
        FOREIGN KEY (thiet_bi_id)
        REFERENCES thiet_bi(id),

         CONSTRAINT fk_ctpn_loaithietbi
        FOREIGN KEY (loai_thiet_bi_id)
        REFERENCES loai_thiet_bi(id),

         CONSTRAINT fk_ctpn_donvitinh
        FOREIGN KEY (don_vi_tinh_id)
        REFERENCES don_vi_tinh(id)
      ) ENGINE=InnoDB;
    `);
  },
};
