const brandModel = require('../models/brandModel');

const getAllBrands = async (req, res, next) => {
  try {
    const brands = await brandModel.getAllBrands();
    res.json({
      success: true,
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

const getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.getBrandById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found.',
      });
    }

    res.json({
      success: true,
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const createBrand = async (req, res, next) => {
  try {
    const { name, country } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const result = await brandModel.createBrand(name, country);

    res.status(201).json({
      success: true,
      message: 'Brand created successfully.',
      data: {
        id: result[0].insertId,
        name,
        country,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, country } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const brand = await brandModel.getBrandById(id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found.',
      });
    }

    await brandModel.updateBrand(id, name, country);

    res.json({
      success: true,
      message: 'Brand updated successfully.',
      data: {
        id: parseInt(id, 10),
        name,
        country,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.getBrandById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found.',
      });
    }

    await brandModel.deleteBrand(id);

    res.json({
      success: true,
      message: 'Brand deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};