const chiTietPhieuNhapModel = require('../models/chiTietPhieuNhapModel');

const getAll = async (req, res) => {
    try {
        const chiTietPhieuNhaps = await chiTietPhieuNhapModel.getAll();
        res.json(chiTietPhieuNhaps);
    } catch (error) {
        console.error('Lỗi gọi API lấy tất cả chi tiết phiếu nhập:', error);
        res.status(500).json({ error: 'Lỗi kết nối hệ thống' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const chiTietPhieuNhap = await chiTietPhieuNhapModel.getById(id);
        if (!chiTietPhieuNhap) {
            return res.status(404).json({ error: 'Chi tiết phiếu nhập not found' });
        }
        res.json(chiTietPhieuNhap);
    } catch (error) {
        console.error('Lỗi gọi API lấy chi tiết phiếu nhập theo id:', error);
        res.status(500).json({ error: 'Lỗi kết nối hệ thống' });
    }
};
const create = async (req, res) => {
  try {
    const { phieu_nhap_id, thiet_bi_id, loai_thiet_bi_id, don_vi_tinh_id, so_luong, don_gia } = req.body;
    if (!phieu_nhap_id || !thiet_bi_id || !loai_thiet_bi_id || !don_vi_tinh_id || so_luong === undefined ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }   
    await chiTietPhieuNhapModel.create(
      phieu_nhap_id,
      thiet_bi_id,
      loai_thiet_bi_id,
      don_vi_tinh_id,
      so_luong,
      don_gia
    );
    res.status(201).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Lỗi gọi API tạo chi tiết phiếu nhập:', error);
    res.status(500).json({ error: 'Lỗi kết nối hệ thống' });
  }
};

const update = async (req, res) => {
  
  try {
    const { id } = req.params;
    const { phieu_nhap_id, thiet_bi_id, loai_thiet_bi_id, don_vi_tinh_id, so_luong, don_gia } = req.body;
    if (!phieu_nhap_id || !thiet_bi_id || !loai_thiet_bi_id || !don_vi_tinh_id || so_luong === undefined || don_gia === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await chiTietPhieuNhapModel.update(id, phieu_nhap_id, thiet_bi_id, loai_thiet_bi_id, don_vi_tinh_id, so_luong, don_gia);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Lỗi gọi API cập nhật chi tiết phiếu nhập:', error);
    res.status(500).json({ error: 'Lỗi kết nối hệ thống' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await chiTietPhieuNhapModel.deleteById(id);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Lỗi gọi API xóa chi tiết phiếu nhập:', error);
    res.status(500).json({ error: 'Lỗi kết nối hệ thống' });
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await chiTietPhieuNhapModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Lỗi gọi API xóa nhiều chi tiết phiếu nhập:', error);
    res.status(500).json({ error: 'Lỗi kết nối hệ thống' });
  }
};

module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };