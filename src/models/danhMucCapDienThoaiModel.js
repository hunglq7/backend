const db = require('./db');
const getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM danhMucCapDienThoai ORDER BY created_at DESC');
  return rows;
};
const add = async (tenCap) => {
  const result = await db.execute(
    'INSERT INTO danhMucCapDienThoai (tenCap) VALUES (?)',
    [tenCap]
  );
  return result;
};
const update = async (id, tenCap) => {
  const result = await db.execute(
    'UPDATE danhMucCapDienThoai SET tenCap = ?  WHERE id = ?',
    [tenCap, id]
  );
  return result;
};
const deleteById=async(id)=>{
    return db.execute('DELETE FROM danhMucCapDienThoai WHERE id = ?', [id]);
}

module.exports = {
  getAll,
  add,
  update,
  deleteById,
};
