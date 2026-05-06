require('dotenv').config();
const db = require('./src/models/db');

(async () => {
  try {
    await db.execute('UPDATE users SET roles = \'["user"]\' WHERE roles IS NULL OR roles = "user"');
    console.log('Updated roles');
  } catch (error) {
    console.error(error);
  }
  process.exit();
})();