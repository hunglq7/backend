const db = require('./db');

const getAll = async () => {
  const [rows] = await db.execute('SELECT a.id,a.ma_phieu_nhap,a.ngay_nhap,a.don_vi_id,b.ten_don_vi,a.nguoi_nhap,a.ngay_nhap,a.ghi_chu FROM camera_app.phieu_nhap a inner join camera_app.danh_muc_don_vi b on a.don_vi_id=b.id ORDER BY a.created_at ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM phieu_nhap WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async (ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu) => {
  return db.execute(
    'INSERT INTO phieu_nhap (ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu) VALUES (?, ?, ?, ?, ?)',
    [ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu]
  );
};

const update = async (id, ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu) => {
  return db.execute(
    'UPDATE phieu_nhap SET ma_phieu_nhap = ?, ngay_nhap = ?, don_vi_id = ?, nguoi_nhap = ?, ghi_chu = ? WHERE id = ?',
    [ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu, id]
  );
};

const deleteById = async (id) => {
  return db.execute('DELETE FROM phieu_nhap WHERE id = ?', [id]);
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM phieu_nhap WHERE id IN (${placeholders})`,
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
