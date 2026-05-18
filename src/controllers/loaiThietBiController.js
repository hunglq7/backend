const loaiThietBiModel = require('../models/loaiThietBiModel');

const getAll = async (req, res) => {
    try {
        const loaiThietBis = await loaiThietBiModel.getAll();
        res.json(loaiThietBis);
    } catch (error) {
        console.error('Error fetching thiet bis:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const loaiThietBi = await loaiThietBiModel.getById(id);
        if (!loaiThietBi) {
            return res.status(404).json({ error: 'Loại thiết bị not found' });
        }
        res.json(loaiThietBi);
    } catch (error) {
        console.error('Error fetching thiet bi by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const create = async (req, res) => {
  try {
    const { ten_loai } = req.body;
    if (!ten_loai) return res.status(400).json({ error: 'ten_loai is required' });
    await loaiThietBiModel.create(ten_loai);
    res.status(201).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Error creating thiet bi:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_loai } = req.body;
    if (!ten_loai) return res.status(400).json({ error: 'ten_loai is required' });
    const result = await loaiThietBiModel.update(id, ten_loai);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error updating thiet bi:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await loaiThietBiModel.deleteById(id);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting thiet bi:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await loaiThietBiModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Error deleting multiple thiet bis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };