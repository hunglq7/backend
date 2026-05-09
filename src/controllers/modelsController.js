const modelsModel = require('../models/modelsModel');
const categoryModel = require('../models/categoryModel');
const brandModel = require('../models/brandModel');

const getAllModels = async (req, res, next) => {
  try {
    const models = await modelsModel.getAllModels();
    res.json({
      success: true,
      data: models,
    });
  } catch (error) {
    next(error);
  }
};

const getModelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await modelsModel.getModelById(id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Model not found.',
      });
    }

    res.json({
      success: true,
      data: model,
    });
  } catch (error) {
    next(error);
  }
};

const createModel = async (req, res, next) => {
  try {
    const { category_id, brand_id, model_code, model_name, specification } = req.body;

    if (!category_id || !brand_id || !model_code) {
      return res.status(400).json({
        success: false,
        message: 'Category ID, Brand ID, and Model Code are required.',
      });
    }

    // Check if category exists
    const category = await categoryModel.getCategoryById(category_id);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID.',
      });
    }

    // Check if brand exists
    const brand = await brandModel.getBrandById(brand_id);
    if (!brand) {
      return res.status(400).json({
        success: false,
        message: 'Invalid brand ID.',
      });
    }

    const result = await modelsModel.createModel(category_id, brand_id, model_code, model_name, specification);

    res.status(201).json({
      success: true,
      message: 'Model created successfully.',
      data: {
        id: result[0].insertId,
        category_id,
        brand_id,
        model_code,
        model_name,
        specification,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_id, brand_id, model_code, model_name, specification } = req.body;

    if (!category_id || !brand_id || !model_code) {
      return res.status(400).json({
        success: false,
        message: 'Category ID, Brand ID, and Model Code are required.',
      });
    }

    const model = await modelsModel.getModelById(id);
    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Model not found.',
      });
    }

    // Check if category exists
    const category = await categoryModel.getCategoryById(category_id);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID.',
      });
    }

    // Check if brand exists
    const brand = await brandModel.getBrandById(brand_id);
    if (!brand) {
      return res.status(400).json({
        success: false,
        message: 'Invalid brand ID.',
      });
    }

    await modelsModel.updateModel(id, category_id, brand_id, model_code, model_name, specification);

    res.json({
      success: true,
      message: 'Model updated successfully.',
      data: {
        id: parseInt(id, 10),
        category_id,
        brand_id,
        model_code,
        model_name,
        specification,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await modelsModel.getModelById(id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Model not found.',
      });
    }

    await modelsModel.deleteModel(id);

    res.json({
      success: true,
      message: 'Model deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
};