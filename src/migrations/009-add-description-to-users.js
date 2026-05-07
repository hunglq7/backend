module.exports = {
  id: '009-add-description-to-users',
  name: 'Add description column to users table',
  up: async (db) => {
    await db.execute(`
      ALTER TABLE users
      ADD COLUMN description TEXT DEFAULT NULL AFTER roles;
    `);
  },
};
