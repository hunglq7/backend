const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT a.id,a.ma_phieu_xuat,a.ngay_xuat,a.don_vi_id,b.ten_don_vi,a.nguoi_xuat,a.vi_tri_id,c.ten_vi_tri,a.ghi_chu FROM camera_app.phieu_xuat a inner join camera_app.danh_muc_don_vi b on a.don_vi_id=b.id inner join camera_app.vi_tri_lap_dat c on a.vi_tri_id=c.id ORDER BY a.created_at ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM phieu_xuat WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (ma_phieu_xuat, ngay_xuat, don_vi_id, nguoi_xuat, vi_tri_id, ghi_chu) => {
  return db.execute(
    'INSERT INTO phieu_xuat (ma_phieu_xuat, ngay_xuat, don_vi_id, nguoi_xuat, vi_tri_id, ghi_chu) VALUES (?, ?, ?, ?, ?, ?)',
    [ma_phieu_xuat??null, ngay_xuat??null, don_vi_id??null, nguoi_xuat??null, vi_tri_id??null, ghi_chu??null]
  );
};

const update = async (id, ma_phieu_xuat, ngay_xuat, don_vi_id, nguoi_xuat, vi_tri_id, ghi_chu) => {
  return db.execute(
    'UPDATE phieu_xuat SET ma_phieu_xuat = ?, ngay_xuat = ?, don_vi_id = ?, nguoi_xuat = ?, vi_tri_id = ?, ghi_chu = ? WHERE id = ?',
    [ma_phieu_xuat??null, ngay_xuat??null, don_vi_id??null, nguoi_xuat??null, vi_tri_id??null, ghi_chu??null, id]
  );
};

const deleteById = async (id) => {
  return db.execute('DELETE FROM phieu_xuat WHERE id = ?', [id]);
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM phieu_xuat WHERE id IN (${placeholders})`,
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
