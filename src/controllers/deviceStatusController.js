const deviceStatusModel = require('../models/deviceStatusModel');

const getAllDeviceStatus = async (req, res, next) => {
  try {
    const statuses = await deviceStatusModel.getAllDeviceStatus();
    res.json({
      success: true,
      data: statuses,
    });
  } catch (error) {
    next(error);
  }
};

const getDeviceStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await deviceStatusModel.getDeviceStatusById(id);

    if (!status) {
      return res.status(404).json({
        success: false,
        message: 'Device status not found.',
      });
    }

    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    next(error);
  }
};

const createDeviceStatus = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const result = await deviceStatusModel.createDeviceStatus(name);

    res.status(201).json({
      success: true,
      message: 'Device status created successfully.',
      data: {
        id: result[0].insertId,
        name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateDeviceStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const status = await deviceStatusModel.getDeviceStatusById(id);
    if (!status) {
      return res.status(404).json({
        success: false,
        message: 'Device status not found.',
      });
    }

    await deviceStatusModel.updateDeviceStatus(id, name);

    res.json({
      success: true,
      message: 'Device status updated successfully.',
      data: {
        id: parseInt(id, 10),
        name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteDeviceStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await deviceStatusModel.getDeviceStatusById(id);

    if (!status) {
      return res.status(404).json({
        success: false,
        message: 'Device status not found.',
      });
    }

    await deviceStatusModel.deleteDeviceStatus(id);

    res.json({
      success: true,
      message: 'Device status deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDeviceStatus,
  getDeviceStatusById,
  createDeviceStatus,
  updateDeviceStatus,
  deleteDeviceStatus,
};