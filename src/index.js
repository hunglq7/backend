const app = require('./app');
const dotenv = require('dotenv');
const runMigrations = require('./migrate');

dotenv.config();

const PORT = process.env.PORT || 4002;

const start = async () => {
  await runMigrations();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
