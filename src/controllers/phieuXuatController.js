const phieuXuatModel = require('../models/phieuXuatModel');

const getAll = async (req, res) => {
    try {
        const phieuXuats = await phieuXuatModel.getAll();
        res.json(phieuXuats);
    } catch (error) {
        console.error('Error fetching phieu xuats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const phieuXuat = await phieuXuatModel.getById(id);
        if (!phieuXuat) {
            return res.status(404).json({ error: 'Phiếu xuất not found' });
        }
        res.json(phieuXuat);
    } catch (error) {
        console.error('Error fetching phieu xuat by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const create = async (req, res) => {
  try {
    const { ma_phieu_xuat, ngay_xuat, don_vi_id, vi_tri_id, nguoi_xuat, ghi_chu } = req.body;
    if (!ma_phieu_xuat || !ngay_xuat || !don_vi_id || !vi_tri_id || !nguoi_xuat) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    await phieuXuatModel.create(ma_phieu_xuat, ngay_xuat, don_vi_id, vi_tri_id, nguoi_xuat??null, ghi_chu??null);
    res.status(201).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Error creating phieu xuat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  console.log('Update request body:', req.body); // Log the request body for debugging
  try {
    const { id } = req.params;
    const { ma_phieu_xuat, ngay_xuat, don_vi_id, vi_tri_id, nguoi_xuat, ghi_chu } = req.body;
    if (!ma_phieu_xuat || !ngay_xuat || !don_vi_id || !nguoi_xuat|| !vi_tri_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const ngayXuatFormatted = ngay_xuat
  ? new Date(ngay_xuat).toISOString().split("T")[0]
  : null;
    const result = await phieuXuatModel.update(id, ma_phieu_xuat, ngayXuatFormatted, don_vi_id, vi_tri_id, nguoi_xuat, ghi_chu);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error updating phieu xuat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await phieuXuatModel.deleteById(id);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting phieu xuat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await phieuXuatModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Error deleting multiple phieu xuats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };