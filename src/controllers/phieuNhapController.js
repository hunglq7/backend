const phieuNhapModel = require('../models/phieuNhapModel');

const getAll = async (req, res) => {
    try {
        const phieuNhaps = await phieuNhapModel.getAll();
        res.json(phieuNhaps);
    } catch (error) {
        console.error('Error fetching phieu nhaps:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const phieuNhap = await phieuNhapModel.getById(id);
        if (!phieuNhap) {
            return res.status(404).json({ error: 'Phiếu nhập not found' });
        }
        res.json(phieuNhap);
    } catch (error) {
        console.error('Error fetching phieu nhap by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const create = async (req, res) => {
  try {
    const { ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu } = req.body;
    if (!ma_phieu_nhap || !ngay_nhap || !don_vi_id || !nguoi_nhap) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    await phieuNhapModel.create(ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu);
    res.status(201).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Error creating phieu nhap:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu } = req.body;
    if (!ma_phieu_nhap || !ngay_nhap || !don_vi_id || !nguoi_nhap) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const result = await phieuNhapModel.update(id, ma_phieu_nhap, ngay_nhap, don_vi_id, nguoi_nhap, ghi_chu);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error updating phieu nhap:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await phieuNhapModel.deleteById(id);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting phieu nhap:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await phieuNhapModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Error deleting multiple phieu nhaps:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };