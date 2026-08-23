require('dotenv').config();
const db = require('./src/libs/db');

(async () => {
  try {
    // Update user hunglq7 to have admin role
    await db.execute('UPDATE users SET roles = \'["admin"]\' WHERE username = "hunglq7"');
    console.log('Updated user hunglq7 to admin role');
  } catch (error) {
    console.error(error);
  }
  process.exit();
})();