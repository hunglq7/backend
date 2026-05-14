require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./src/models/db');

(async () => {
  try {
    const username = 'hunglq7';
    const newPassword = 'LeHung@79';
    
    // Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Hashed password:', hashedPassword);
    
    // Update password
    const result = await db.execute(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword, username]
    );
    
    console.log('Password updated successfully');
    console.log('Result:', result);
    
    // Verify user
    const [rows] = await db.execute('SELECT id, username, password FROM users WHERE username = ?', [username]);
    console.log('User after update:', rows[0]);
    
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit();
})();
