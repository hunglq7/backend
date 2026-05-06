const danhMucDonViModel = require('../models/danhMucDonViModel');

const getAll = async (req, res) => {
  try {
    const danhMucDonVi = await danhMucDonViModel.getAll();
    res.json(danhMucDonVi);
  } catch (error) {
    console.error('Error fetching danh muc don vi:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const danhMucDonVi = await danhMucDonViModel.getById(id);
    if (!danhMucDonVi) {
      return res.status(404).json({ error: 'Danh muc don vi not found' });
    }
    res.json(danhMucDonVi);
  } catch (error) {
    console.error('Error fetching danh muc don vi by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const create = async (req, res) => {
  try {
    const { ten_don_vi } = req.body;
    if (!ten_don_vi) {
      return res.status(400).json({ error: 'ten_don_vi is required' });
    }
    await danhMucDonViModel.create(ten_don_vi);
    res.status(201).json({ message: 'Danh muc don vi created successfully' });
  } catch (error) {
    console.error('Error creating danh muc don vi:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_don_vi } = req.body;
    if (!ten_don_vi) {
      return res.status(400).json({ error: 'ten_don_vi is required' });
    }
    const result = await danhMucDonViModel.update(id, ten_don_vi);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Danh muc don vi not found' });
    }
    res.json({ message: 'Danh muc don vi updated successfully' });
  } catch (error) {
    console.error('Error updating danh muc don vi:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await danhMucDonViModel.deleteById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Danh muc don vi not found' });
    }
    res.json({ message: 'Danh muc don vi deleted successfully' });
  } catch (error) {
    console.error('Error deleting danh muc don vi:', error);
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
      await danhMucDonViModel.deleteById(id);
    }
    res.json({ message: 'Danh muc don vi deleted successfully' });
  } catch (error) {
    console.error('Error deleting multiple danh muc don vi:', error);
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