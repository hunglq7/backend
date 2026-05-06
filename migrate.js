const runMigrations = require('./src/migrate');

runMigrations()
  .then(() => {
    console.log('Migrations successfully executed.');
  })
  .catch((error) => {
    console.error('Migration execution failed:', error);
    process.exit(1);
  });
