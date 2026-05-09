const areaModel = require('../models/areaModel');

const getAllAreas = async (req, res, next) => {
  try {
    const areas = await areaModel.getAllAreas();
    res.json({
      success: true,
      data: areas,
    });
  } catch (error) {
    next(error);
  }
};

const getAreaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const area = await areaModel.getAreaById(id);

    if (!area) {
      return res.status(404).json({
        success: false,
        message: 'Area not found.',
      });
    }

    res.json({
      success: true,
      data: area,
    });
  } catch (error) {
    next(error);
  }
};

const createArea = async (req, res, next) => {
  try {
    const { name, parent_id, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    if (parent_id) {
      const parent = await areaModel.getAreaById(parent_id);
      if (!parent) {
        return res.status(400).json({
          success: false,
          message: 'Invalid parent ID.',
        });
      }
    }

    const result = await areaModel.createArea(name, parent_id, description);

    res.status(201).json({
      success: true,
      message: 'Area created successfully.',
      data: {
        id: result[0].insertId,
        name,
        parent_id,
        description,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateArea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, parent_id, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const area = await areaModel.getAreaById(id);
    if (!area) {
      return res.status(404).json({
        success: false,
        message: 'Area not found.',
      });
    }

    if (parent_id) {
      const parent = await areaModel.getAreaById(parent_id);
      if (!parent) {
        return res.status(400).json({
          success: false,
          message: 'Invalid parent ID.',
        });
      }
      // Prevent self-reference
      if (parent_id === parseInt(id, 10)) {
        return res.status(400).json({
          success: false,
          message: 'Cannot set self as parent.',
        });
      }
    }

    await areaModel.updateArea(id, name, parent_id, description);

    res.json({
      success: true,
      message: 'Area updated successfully.',
      data: {
        id: parseInt(id, 10),
        name,
        parent_id,
        description,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteArea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const area = await areaModel.getAreaById(id);

    if (!area) {
      return res.status(404).json({
        success: false,
        message: 'Area not found.',
      });
    }

    await areaModel.deleteArea(id);

    res.json({
      success: true,
      message: 'Area deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};