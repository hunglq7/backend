const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT b.ma_phieu_nhap,c.ten_thiet_bi,d.ten_loai,e.ten_don_vi_tinh,a.so_luong,a.don_gia,a.thanh_tien FROM camera_app.chi_tiet_phieu_nhap a inner join camera_app.phieu_nhap b on a.phieu_nhap_id=b.id inner join camera_app.thiet_bi c on a.thiet_bi_id=c.id inner join camera_app.loai_thiet_bi d on a.loai_thiet_bi_id=d.id inner join camera_app.don_vi_tinh e on a.don_vi_tinh_id=e.id ORDER BY a.created_at ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM chi_tiet_phieu_nhap WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (phieu_nhap_id, thiet_bi_id, loai_thiet_bi_id, don_vi_tinh_id, so_luong, don_gia) => {
  return db.execute(
    'INSERT INTO chi_tiet_phieu_nhap (phieu_nhap_id, thiet_bi_id, loai_thiet_bi_id, don_vi_tinh_id, so_luong, don_gia) VALUES (?, ?, ?, ?, ?, ?)',
    [phieu_nhap_id??null, thiet_bi_id??null, loai_thiet_bi_id??null, don_vi_tinh_id??null, so_luong??null, don_gia??null]
  );
};

const update = async (id, phieu_nhap_id, thiet_bi_id, loai_thiet_bi_id, don_vi_tinh_id, so_luong, don_gia) => {
  return db.execute(
    'UPDATE chi_tiet_phieu_nhap SET phieu_nhap_id = ?, thiet_bi_id = ?, loai_thiet_bi_id = ?, don_vi_tinh_id = ?, so_luong = ?, don_gia = ? WHERE id = ?',
    [phieu_nhap_id??null, thiet_bi_id??null, loai_thiet_bi_id??null, don_vi_tinh_id??null, so_luong??null, don_gia??null, id]
  );
};

const deleteById = async (id) => {
  return db.execute('DELETE FROM chi_tiet_phieu_nhap WHERE id = ?', [id]);
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM chi_tiet_phieu_nhap WHERE id IN (${placeholders})`,
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
