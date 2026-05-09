const categoryModel = require('../models/categoryModel');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const result = await categoryModel.createCategory(name, description);

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: {
        id: result[0].insertId,
        name,
        description,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const category = await categoryModel.getCategoryById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    await categoryModel.updateCategory(id, name, description);

    res.json({
      success: true,
      message: 'Category updated successfully.',
      data: {
        id: parseInt(id, 10),
        name,
        description,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    await categoryModel.deleteCategory(id);

    res.json({
      success: true,
      message: 'Category deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
