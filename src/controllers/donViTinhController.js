const donViTinhModel = require('../models/donViTinhModel');

const getAll = async (req, res) => {
    try {
        const donViTinhs = await donViTinhModel.getAll();
        res.json(donViTinhs);
    } catch (error) {
        console.error('Error fetching don vi tinhs:', error);
        res.status(500).json({ error: 'Internal server error' });
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
        console.error('Error fetching don vi tinh by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const create = async (req, res) => {
  try {
    const { ten_don_vi_tinh } = req.body;
    if (!ten_don_vi_tinh) return res.status(400).json({ error: 'ten_don_vi_tinh is required' });
    await donViTinhModel.create(ten_don_vi_tinh);
    res.status(200).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Error creating don vi tinh:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    console.error('Error updating don vi tinh:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await donViTinhModel.deleteById(id);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting don vi tinh:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    console.error('Error deleting multiple don vi tinhs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };