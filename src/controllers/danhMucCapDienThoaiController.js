const danhMuccapDienThoaiModel=require('../models/danhMucCapDienThoaiModel')
const getAll = async (req, res, next) => {
  try {
    const dataList = await danhMuccapDienThoaiModel.getAll();
    res.json(dataList);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { tenCap} = req.body;

    if (!tenCap) {
      return res.status(400).json({
        success: false,
        message: 'Tên thiết bị là bắt buộc.',
      });
    }
    const result = await danhMuccapDienThoaiModel.add(tenCap);
    res.status(200).json({
      success: true,
      message: 'Thêm mới thành công.',
      data: {
        id: result[0].insertId,
        tenCap     
      },
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenCap } = req.body;
    if (!tenCap) {
      return res.status(400).json({ error: "tenCap is required" });
    }
    const result = await danhMuccapDienThoaiModel.update(id, tenCap);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tên cáp not found" });
    }
    res.json({ message: "Dữ liệu updated successfully" });
  } catch (error) {
    console.error("Error updating tên cáp:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await danhMuccapDienThoaiModel.deleteById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'danh mục not found' });
    }
    res.json({ message: 'danh mục deleted successfully' });
  } catch (error) {
    console.error('Error deleting danh mục:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  add,
  update,
  deleteById
};

