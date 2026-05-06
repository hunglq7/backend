module.exports = {
  id: '004-update-danh-muc-camera-table',
  name: 'Update danh_muc_camera table to add thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat',
  up: async (db) => {
    await db.execute(`
      ALTER TABLE danh_muc_camera
      ADD COLUMN thong_so_ky_thuat TEXT DEFAULT NULL AFTER ten_thiet_bi,
      ADD COLUMN hang_san_xuat VARCHAR(255) DEFAULT NULL AFTER thong_so_ky_thuat,
      ADD COLUMN nuoc_san_xuat VARCHAR(255) DEFAULT NULL AFTER hang_san_xuat;
    `);
  },
};