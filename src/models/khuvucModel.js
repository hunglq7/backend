const db = require('./db');
const getAll=async()=>{
    const [rows] = await db.execute('SELECT * FROM khu_vuc ORDER BY created_at ASC');
    return rows;
}
const getById=async(id)=>{
    const [rows] = await db.execute('SELECT * FROM khu_vuc WHERE id = ?', [id]);
    return rows[0] || null;
}
const create=async(ten_khu_vuc)=>{
    return db.execute(
        'INSERT INTO khu_vuc (ten_khu_vuc) VALUES (?)',
        [ten_khu_vuc]
    );
}
const update=async(id, ten_khu_vuc)=>{
    return db.execute(
        'UPDATE khu_vuc SET ten_khu_vuc = ? WHERE id = ?',
        [ten_khu_vuc, id]
    );
}
const deleteById=async(id)=>{
    return db.execute('DELETE FROM khu_vuc WHERE id = ?', [id]);
}

const deleteMultiple=async(ids)=>{
    if (!Array.isArray(ids) || ids.length === 0) {
        return;
    }
    const placeholders = ids.map(() => '?').join(', ');
    return db.execute(`DELETE FROM khu_vuc WHERE id IN (${placeholders})`, ids);
}
module.exports={
    getAll,
    getById,
    create,
    update,
    deleteById,
    deleteMultiple,
}