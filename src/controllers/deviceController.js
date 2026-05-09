const deviceModel = require('../models/deviceModel');
const modelsModel = require('../models/modelsModel');
const warehouseModel = require('../models/warehouseModel');
const supplierModel = require('../models/supplierModel');
const deviceStatusModel = require('../models/deviceStatusModel');

const getAllDevices = async (req, res, next) => {
  try {
    const devices = await deviceModel.getAllDevices();
    res.json({
      success: true,
      data: devices,
    });
  } catch (error) {
    next(error);
  }
};

const getDeviceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await deviceModel.getDeviceById(id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found.',
      });
    }

    res.json({
      success: true,
      data: device,
    });
  } catch (error) {
    next(error);
  }
};

const createDevice = async (req, res, next) => {
  try {
    const {
      model_id,
      warehouse_id,
      serial_number,
      asset_code,
      mac_address,
      ip_address,
      purchase_date,
      warranty_expired_date,
      supplier_id,
      status_id,
      note,
    } = req.body;

    if (!model_id || !status_id) {
      return res.status(400).json({
        success: false,
        message: 'model_id and status_id are required.',
      });
    }

    const model = await modelsModel.getModelById(model_id);
    if (!model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid model_id.',
      });
    }

    if (warehouse_id) {
      const warehouse = await warehouseModel.getWarehouseById(warehouse_id);
      if (!warehouse) {
        return res.status(400).json({
          success: false,
          message: 'Invalid warehouse_id.',
        });
      }
    }

    if (supplier_id) {
      const supplier = await supplierModel.getSupplierById(supplier_id);
      if (!supplier) {
        return res.status(400).json({
          success: false,
          message: 'Invalid supplier_id.',
        });
      }
    }

    const status = await deviceStatusModel.getDeviceStatusById(status_id);
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status_id.',
      });
    }

    const result = await deviceModel.createDevice(
      model_id,
      warehouse_id,
      serial_number,
      asset_code,
      mac_address,
      ip_address,
      purchase_date,
      warranty_expired_date,
      supplier_id,
      status_id,
      note
    );

    res.status(201).json({
      success: true,
      message: 'Device created successfully.',
      data: {
        id: result[0].insertId,
        model_id,
        warehouse_id,
        serial_number,
        asset_code,
        mac_address,
        ip_address,
        purchase_date,
        warranty_expired_date,
        supplier_id,
        status_id,
        note,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      model_id,
      warehouse_id,
      serial_number,
      asset_code,
      mac_address,
      ip_address,
      purchase_date,
      warranty_expired_date,
      supplier_id,
      status_id,
      note,
    } = req.body;

    if (!model_id || !status_id) {
      return res.status(400).json({
        success: false,
        message: 'model_id and status_id are required.',
      });
    }

    const device = await deviceModel.getDeviceById(id);
    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found.',
      });
    }

    const model = await modelsModel.getModelById(model_id);
    if (!model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid model_id.',
      });
    }

    if (warehouse_id) {
      const warehouse = await warehouseModel.getWarehouseById(warehouse_id);
      if (!warehouse) {
        return res.status(400).json({
          success: false,
          message: 'Invalid warehouse_id.',
        });
      }
    }

    if (supplier_id) {
      const supplier = await supplierModel.getSupplierById(supplier_id);
      if (!supplier) {
        return res.status(400).json({
          success: false,
          message: 'Invalid supplier_id.',
        });
      }
    }

    const status = await deviceStatusModel.getDeviceStatusById(status_id);
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status_id.',
      });
    }

    await deviceModel.updateDevice(
      id,
      model_id,
      warehouse_id,
      serial_number,
      asset_code,
      mac_address,
      ip_address,
      purchase_date,
      warranty_expired_date,
      supplier_id,
      status_id,
      note
    );

    res.json({
      success: true,
      message: 'Device updated successfully.',
      data: {
        id: parseInt(id, 10),
        model_id,
        warehouse_id,
        serial_number,
        asset_code,
        mac_address,
        ip_address,
        purchase_date,
        warranty_expired_date,
        supplier_id,
        status_id,
        note,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await deviceModel.getDeviceById(id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found.',
      });
    }

    await deviceModel.deleteDevice(id);

    res.json({
      success: true,
      message: 'Device deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
};