const donViTinhModel = require('../models/donViTinhModel');

const getAll = async (req, res) => {
    try {
        const donViTinhs = await donViTinhModel.getAll();
        res.json(donViTinhs);
    } catch (error) {
        console.error('Lỗi khi gọi API getALL:', error);
        res.status(500).json({ error: 'Lỗi hệ thống' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const donViTinh = await donViTinhModel.getById(id);
        if (!donViTinh) {
            return res.status(404).json({ error: 'Đơn vị tính not found' });
        }
        res.json(donViTinh);
    } catch (error) {
        console.error('Lỗi khi gọi API getById:', error);
        res.status(500).json({ error: 'Lỗi hệ thống' });
    }
};
const create = async (req, res) => {
  try {
    const { ten_don_vi_tinh } = req.body;
    if (!ten_don_vi_tinh) return res.status(400).json({ error: 'ten_don_vi_tinh is required' });
    await donViTinhModel.create(ten_don_vi_tinh);
    res.status(200).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Lỗi khi gọi API create:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_don_vi_tinh } = req.body;
    if (!ten_don_vi_tinh) return res.status(400).json({ error: 'ten_don_vi_tinh is required' });
    const result = await donViTinhModel.update(id, ten_don_vi_tinh);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Lỗi khi gọi API update:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await donViTinhModel.deleteById(id);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Lỗi khi gọi API deleteById:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await donViTinhModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Lỗi khi gọi API deleteMultiple:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };