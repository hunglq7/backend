const warehouseModel = require('../models/warehouseModel');

const getAllWarehouses = async (req, res, next) => {
  try {
    const warehouses = await warehouseModel.getAllWarehouses();
    res.json({
      success: true,
      data: warehouses,
    });
  } catch (error) {
    next(error);
  }
};

const getWarehouseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const warehouse = await warehouseModel.getWarehouseById(id);

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found.',
      });
    }

    res.json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    next(error);
  }
};

const createWarehouse = async (req, res, next) => {
  try {
    const { name, address } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const result = await warehouseModel.createWarehouse(name, address);

    res.status(201).json({
      success: true,
      message: 'Warehouse created successfully.',
      data: {
        id: result[0].insertId,
        name,
        address,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const warehouse = await warehouseModel.getWarehouseById(id);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found.',
      });
    }

    await warehouseModel.updateWarehouse(id, name, address);

    res.json({
      success: true,
      message: 'Warehouse updated successfully.',
      data: {
        id: parseInt(id, 10),
        name,
        address,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const warehouse = await warehouseModel.getWarehouseById(id);

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found.',
      });
    }

    await warehouseModel.deleteWarehouse(id);

    res.json({
      success: true,
      message: 'Warehouse deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
};