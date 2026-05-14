const thietBiModel = require('../models/thietBiModel');

const getAll = async (req, res) => {
    try {
        const thietBis = await thietBiModel.getAll();
        res.json(thietBis);
    } catch (error) {
        console.error('Error fetching thiet bis:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const thietBi = await thietBiModel.getById(id);
        if (!thietBi) {
            return res.status(404).json({ error: 'Thiet bi not found' });
        }
        res.json(thietBi);
    } catch (error) {
        console.error('Error fetching thiet bi by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const create = async (req, res) => {
  try {
    const { ten_thiet_bi } = req.body;
    if (!ten_thiet_bi) return res.status(400).json({ error: 'ten_thiet_bi is required' });
    await thietBiModel.create(ten_thiet_bi);
    res.status(201).json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Error creating thiet bi:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_thiet_bi } = req.body;
    if (!ten_thiet_bi) return res.status(400).json({ error: 'ten_thiet_bi is required' });
    const result = await thietBiModel.update(id, ten_thiet_bi);
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
    const result = await thietBiModel.deleteById(id);
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
    await thietBiModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Error deleting multiple thiet bis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getById, create, update, deleteById, deleteMultiple };