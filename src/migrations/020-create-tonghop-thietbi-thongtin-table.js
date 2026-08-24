module.exports = {
  id: "020-create-tonghop-thietbi-thongtin-table",
  name: "Create table tonghop_thietbi_thongtin",
  up: async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tonghop_thietbi_thongtin(
        id INT AUTO_INCREMENT PRIMARY KEY,       
        thiet_bi_id INT NOT NULL,
        don_vi_id INT NOT NULL,
        vi_tri_id INT NOT NULL,
        khu_vuc_id INT NOT NULL,
        don_vi_tinh_id INT NOT NULL,
        so_luong INT NOT NULL,
        loai_thiet_bi_id INT NOT NULL,    
        ngay_lap DATETIME,
        tinh_trang BOOLEAN,
        ghi_chu varchar(100),   
      
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT fk_tonghop_thietbi
        FOREIGN KEY (thiet_bi_id)
        REFERENCES thiet_bi(id)
        ON DELETE CASCADE,

        CONSTRAINT fk_tonghop_donvi
        FOREIGN KEY (don_vi_id)
        REFERENCES danh_muc_don_vi(id),

        CONSTRAINT fk_tonghop_khuvuc
        FOREIGN KEY (khu_vuc_id)
        REFERENCES khu_vuc(id),

         CONSTRAINT fk_tonghop_vịtri
        FOREIGN KEY (vi_tri_id)
        REFERENCES vi_tri_lap_dat(id),

        CONSTRAINT fk_tonghop_donvitinh
        FOREIGN KEY (don_vi_tinh_id)
        REFERENCES don_vi_tinh(id), 
        
        CONSTRAINT fk_tonghop_loaithietbi
        FOREIGN KEY (loai_thiet_bi_id)
        REFERENCES loai_thiet_bi(id) 
       
      ) ENGINE=InnoDB;
    `);
  },
};
