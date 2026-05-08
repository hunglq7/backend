require('dotenv').config();
const db = require('./src/models/db');

(async () => {
  try {
    const [rows] = await db.execute('SELECT id, username, roles FROM users WHERE username = "hunglq7"');
    console.log('User:', rows[0]);
  } catch (error) {
    console.error(error);
  }
  process.exit();
})();