const viTriLapDatModel = require('../models/viTriLapDatModel');

const getAll = async (req, res) => {
  try {
    const viTriLapDat = await viTriLapDatModel.getAll();
    res.json(viTriLapDat);
  } catch (error) {
    console.error('Error fetching vi tri lap dat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const viTriLapDat = await viTriLapDatModel.getById(id);
    if (!viTriLapDat) {
      return res.status(404).json({ error: 'Vi tri lap dat not found' });
    }
    res.json(viTriLapDat);
  } catch (error) {
    console.error('Error fetching vi tri lap dat by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const create = async (req, res) => {
  try {
    const { ten_vi_tri, mo_ta } = req.body;
    if (!ten_vi_tri) {
      return res.status(400).json({ error: 'ten_vi_tri is required' });
    }
    await viTriLapDatModel.create(ten_vi_tri, mo_ta);
    res.status(201).json({ message: 'Vi tri lap dat created successfully' });
  } catch (error) {
    console.error('Error creating vi tri lap dat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_vi_tri, mo_ta } = req.body;
    if (!ten_vi_tri) {
      return res.status(400).json({ error: 'ten_vi_tri is required' });
    }
    const result = await viTriLapDatModel.update(id, ten_vi_tri, mo_ta);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Vi tri lap dat not found' });
    }
    res.json({ message: 'Vi tri lap dat updated successfully' });
  } catch (error) {
    console.error('Error updating vi tri lap dat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await viTriLapDatModel.deleteById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Vi tri lap dat not found' });
    }
    res.json({ message: 'Vi tri lap dat deleted successfully' });
  } catch (error) {
    console.error('Error deleting vi tri lap dat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    for (const id of ids) {
      await viTriLapDatModel.deleteById(id);
    }
    res.json({ message: 'Vi tri lap dat deleted successfully' });
  } catch (error) {
    console.error('Error deleting multiple vi tri lap dat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteMultiple,
};