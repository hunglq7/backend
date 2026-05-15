const db = require('./db');

const getAllCategories = async () => {
  const [rows] = await db.execute('SELECT * FROM danh_muc_camera ORDER BY created_at DESC');
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM danh_muc_camera WHERE id = ?', [id]);
  return rows[0] || null;
};

const createCategory = async (ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat) => {
  const result = await db.execute(
    'INSERT INTO danh_muc_camera (ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat) VALUES (?, ?, ?, ?)',
    [ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat]
  );
  return result;
};

const updateCategory = async (id, ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat) => {
  const result = await db.execute(
    'UPDATE danh_muc_camera SET ten_thiet_bi = ?, thong_so_ky_thuat = ?, hang_san_xuat = ?, nuoc_san_xuat = ? WHERE id = ?',
    [ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat, id]
  );
  return result;
};

const deleteCategory = async (id) => {
  const result = await db.execute('DELETE FROM danh_muc_camera WHERE id = ?', [id]);
  return result;
};

const deleteMultiple = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return;
  }
  const placeholders = ids.map(() => '?').join(', ');
  return db.execute(
    `DELETE FROM danh_muc_camera WHERE id IN (${placeholders})`,
    ids,
  );
};


module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteMultiple
};
