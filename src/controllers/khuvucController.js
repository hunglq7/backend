const khuvucModel = require("../models/khuvucModel");

const getAll = async (req, res) => {
  try {
    const khuvuc = await khuvucModel.getAll();
    res.json(khuvuc);
  } catch (error) {
    console.error("Error fetching khu vuc:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const khuvuc = await khuvucModel.getById(id);
    if (!khuvuc) {
      return res.status(404).json({ error: "Khu vuc not found" });
    }
    res.json(khuvuc);
  } catch (error) {
    console.error("Error fetching khu vuc by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    const { ten_khu_vuc } = req.body;
    if (!ten_khu_vuc) {
      return res.status(400).json({ error: "ten_khu_vuc is required" });
    }
    await khuvucModel.create(ten_khu_vuc);
    res.status(201).json({ message: "Khu vuc created successfully" });
  } catch (error) {
    console.error("Error creating khu vuc:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_khu_vuc } = req.body;
    if (!ten_khu_vuc) {
      return res.status(400).json({ error: "ten_khu_vuc is required" });
    }
    const result = await khuvucModel.update(id, ten_khu_vuc);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Khu vuc not found" });
    }
    res.json({ message: "Khu vuc updated successfully" });
  } catch (error) {
    console.error("Error updating khu vuc:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await khuvucModel.deleteById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Khu vuc not found' });
    }
    res.json({ message: 'Khu vuc deleted successfully' });
  } catch (error) {
    console.error('Error deleting khu vuc:', error);
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
      await khuvucModel.deleteById(id);
    }
    res.json({ message: 'Khu vuc deleted successfully' });
  } catch (error) {
    console.error('Error deleting multiple khu vuc:', error);
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
