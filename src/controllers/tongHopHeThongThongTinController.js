const tongHopHeThongThongTinModel = require('../models/tongHopHeThongThongTinModel');
const getAll = async (req, res) => {
    try {
        const tongHopHeThongThongTins = await tongHopHeThongThongTinModel.getAll();
        res.json(tongHopHeThongThongTins);
    } catch (error) {
        console.error('Không lấy được danh sách thiết bị:', error);
        res.status(500).json({ error: 'Lỗi kết nối server' });
    }
};
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const tongHopHeThongThongTin = await tongHopHeThongThongTinModel.getById(id);
        if (!tongHopHeThongThongTin) {
            return res.status(404).json({ error: 'Tổng hợp hệ thống thông tin not found' });
        }
        res.json(tongHopHeThongThongTin);
    } catch (error) {
        console.error('Error fetching tổng hợp hệ thống thông tin by id:', error);
        res.status(500).json({ error: 'Lỗi kết nối server' });
    }
};

const create = async (req, res) => {
  try {
    const { thiet_bi_id,don_vi_id,vi_tri_id,khu_vuc_id,don_vi_tinh_id, so_luong,loai_thiet_bi_id, ngay_lap,tinh_trang,ghi_chu } = req.body;
    if (!thiet_bi_id || !don_vi_id || !vi_tri_id || !khu_vuc_id || !don_vi_tinh_id || so_luong === undefined || loai_thiet_bi_id === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }   
    await tongHopHeThongThongTinModel.create(
      thiet_bi_id,don_vi_id,vi_tri_id,khu_vuc_id,don_vi_tinh_id, so_luong,loai_thiet_bi_id, ngay_lap,tinh_trang,ghi_chu
    );
    res.status(201).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Error creating tổng hợp hệ thống thông tin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  
  try {
    const { id } = req.params;
    const {  thiet_bi_id,don_vi_id,vi_tri_id,khu_vuc_id,don_vi_tinh_id, so_luong,loai_thiet_bi_id, ngay_lap,tinh_trang,ghi_chu } = req.body;
    if (!thiet_bi_id || !don_vi_id || !vi_tri_id || !khu_vuc_id || !don_vi_tinh_id || so_luong === undefined || loai_thiet_bi_id === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await tongHopHeThongThongTinModel.update(id, thiet_bi_id, don_vi_id, vi_tri_id, khu_vuc_id, don_vi_tinh_id, so_luong, loai_thiet_bi_id, ngay_lap, tinh_trang, ghi_chu);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error updating tổng hợp hệ thống thông tin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tongHopHeThongThongTinModel.deleteById(id);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting tổng hợp hệ thống thông tin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await tongHopHeThongThongTinModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Error deleting multiple tổng hợp hệ thống thông tin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };