module.exports = {
  id: '003-update-users-table',
  name: 'Update users table to add username, phone, avatar, roles',
  up: async (db) => {
    // First add columns as nullable
    await db.execute(`
      ALTER TABLE users
      ADD COLUMN username VARCHAR(255) DEFAULT NULL AFTER id,
      ADD COLUMN phone VARCHAR(20) DEFAULT NULL AFTER email,
      ADD COLUMN avatar VARCHAR(500) DEFAULT NULL AFTER phone,
      ADD COLUMN roles JSON DEFAULT ('["user"]') AFTER avatar;
    `);
    // Then update existing users with default username based on email
    await db.execute(`
      UPDATE users SET username = CONCAT('user_', id) WHERE username IS NULL;
    `);
    // Finally make username NOT NULL and UNIQUE
    await db.execute(`
      ALTER TABLE users
      MODIFY COLUMN username VARCHAR(255) NOT NULL UNIQUE;
    `);
  },
};