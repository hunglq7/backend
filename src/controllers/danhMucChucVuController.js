const danhMucChucVuModel = require('../models/danhMucChucVuModel');

const getAll = async (req, res) => {
    try {
        const chucVus = await danhMucChucVuModel.getAll();
        res.json(chucVus);
    } catch (error) {
        console.error('Error fetching chuc vus:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const chucVu = await danhMucChucVuModel.getById(id);
        if (!chucVu) {
            return res.status(404).json({ error: 'Chuc vu not found' });
        }
        res.json(chucVu);
    } catch (error) {
        console.error('Error fetching chuc vu by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const create = async (req, res) => {
  try {
    const { ten_chuc_vu } = req.body;
    if (!ten_chuc_vu) return res.status(400).json({ error: 'ten_chuc_vu is required' });
    await danhMucChucVuModel.create(ten_chuc_vu);
    res.status(201).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Error creating danh muc chuc vu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_chuc_vu } = req.body;
    if (!ten_chuc_vu) return res.status(400).json({ error: 'ten_chuc_vu is required' });
    const result = await danhMucChucVuModel.update(id, ten_chuc_vu);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error updating danh muc chuc vu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await danhMucChucVuModel.deleteById(id);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting danh muc chuc vu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await danhMucChucVuModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Error deleting multiple danh muc chuc vu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };