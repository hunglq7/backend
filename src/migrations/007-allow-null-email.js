module.exports = {
  id: '007-allow-null-email',
  name: 'Allow nullable email in users table',
  up: async (db) => {
    await db.execute(`
      ALTER TABLE users
      MODIFY COLUMN email VARCHAR(255) NULL;
    `);
  },
};