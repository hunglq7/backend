const db = require('./db');
const getAll=async()=>{
    const [rows]=await db.execute(`SELECT b.ten_thiet_bi,c.ten_don_vi,d.ten_vi_tri,e.ten_khu_vuc,f.ten_don_vi_tinh,a.so_luong,g.ten_loai,a.ngay_lap,a.tinh_trang,a.ghi_chu FROM camera_app.tonghop_thietbi_thongtin AS a INNER JOIN camera_app.thiet_bi AS b ON a.thiet_bi_id=b.id INNER JOIN camera_app.danh_muc_don_vi AS c ON a.don_vi_id=c.id INNER JOIN camera_app.vi_tri_lap_dat AS d ON a.vi_tri_id=d.id INNER JOIN camera_app.khu_vuc AS e ON a.khu_vuc_id=e.id INNER JOIN camera_app.don_vi_tinh AS f ON a.don_vi_tinh_id=f.id INNER JOIN camera_app.loai_thiet_bi AS g ON a.loai_thiet_bi_id=g.id ORDER BY a.created_at ASC`);
    return rows;
}

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM tonghop_thietbi_thongtin WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (thiet_bi_id,don_vi_id,vi_tri_id,khu_vuc_id,don_vi_tinh_id, so_luong,loai_thiet_bi_id, ngay_lap,tinh_trang,ghi_chu) => {
  return db.execute(
    'INSERT INTO tonghop_thietbi_thongtin (thiet_bi_id, don_vi_id, vi_tri_id, khu_vuc_id, don_vi_tinh_id, so_luong, loai_thiet_bi_id, ngay_lap, tinh_trang, ghi_chu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [thiet_bi_id??null, don_vi_id??null, vi_tri_id??null, khu_vuc_id??null, don_vi_tinh_id??null, so_luong??null, loai_thiet_bi_id??null, ngay_lap??null, tinh_trang??null, ghi_chu??null]
  );
};
const update = async (id, thiet_bi_id, don_vi_id, vi_tri_id, khu_vuc_id, don_vi_tinh_id, so_luong, loai_thiet_bi_id, ngay_lap, tinh_trang, ghi_chu) => {
  return db.execute(
    'UPDATE tonghop_thietbi_thongtin SET thiet_bi_id = ?, don_vi_id = ?, vi_tri_id = ?, khu_vuc_id = ?, don_vi_tinh_id = ?, so_luong = ?, loai_thiet_bi_id = ?, ngay_lap = ?, tinh_trang = ?, ghi_chu = ? WHERE id = ?',
    [thiet_bi_id??null, don_vi_id??null, vi_tri_id??null, khu_vuc_id??null, don_vi_tinh_id??null, so_luong??null, loai_thiet_bi_id??null, ngay_lap??null, tinh_trang??null, ghi_chu??null, id]
  );
};

const deleteById = async (id) => {
  return db.execute('DELETE FROM tonghop_thietbi_thongtin WHERE id = ?', [id]);
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM tonghop_thietbi_thongtin WHERE id IN (${placeholders})`,
    ids,
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteMultiple,
};
