const danhMucCameraModel = require('../models/danhMucCameraModel');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await danhMucCameraModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await danhMucCameraModel.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Danh mục không tồn tại.',
      });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat } = req.body;

    if (!ten_thiet_bi) {
      return res.status(400).json({
        success: false,
        message: 'Tên thiết bị là bắt buộc.',
      });
    }

    const result = await danhMucCameraModel.createCategory(ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat);

    res.status(201).json({
      success: true,
      message: 'Danh mục đã được tạo thành công.',
      data: {
        id: result[0].insertId,
        ten_thiet_bi,
        thong_so_ky_thuat,
        hang_san_xuat,
        nuoc_san_xuat,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat } = req.body;

    if (!ten_thiet_bi) {
      return res.status(400).json({
        success: false,
        message: 'Tên thiết bị là bắt buộc.',
      });
    }

    const category = await danhMucCameraModel.getCategoryById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Danh mục không tồn tại.',
      });
    }

    await danhMucCameraModel.updateCategory(id, ten_thiet_bi, thong_so_ky_thuat, hang_san_xuat, nuoc_san_xuat);

    res.json({
      success: true,
      message: 'Danh mục đã được cập nhật thành công.',
      data: {
        id: parseInt(id),
        ten_thiet_bi,
        thong_so_ky_thuat,
        hang_san_xuat,
        nuoc_san_xuat,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await danhMucCameraModel.getCategoryById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Danh mục không tồn tại.',
      });
    }

    await danhMucCameraModel.deleteCategory(id);

    res.json({
      success: true,
      message: 'Danh mục đã được xóa thành công.',
    });
  } catch (error) {
    next(error);
  }
};

const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await danhMucCameraModel.deleteMultiple(ids);
    res.json({ message: 'Deleted multiple successfully' });
  } catch (error) {
    console.error('Error deleting multiple danh muc cameras:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteMultiple,
};

