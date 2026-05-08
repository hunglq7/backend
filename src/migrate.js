const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const {
  DB_HOST = '192.168.0.110',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = 'LeHung@79',
  DB_NAME = 'camera_app',
} = process.env;

const ensureDatabaseExists = async () => {
  const pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 1,
  });

  await pool.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await pool.end();
};

const MIGRATION_TABLE = 'migrations';

const ensureMigrationTable = async (db) => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS ${MIGRATION_TABLE} (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);
};

const getAppliedMigrations = async (db) => {
  const [rows] = await db.execute(`SELECT id FROM ${MIGRATION_TABLE}`);
  return rows.map((row) => row.id);
};

const recordMigration = async (db, migration) => {
  await db.execute(
    `INSERT INTO ${MIGRATION_TABLE} (id, name) VALUES (?, ?)`,
    [migration.id, migration.name]
  );
};

const runMigrations = async () => {
  await ensureDatabaseExists();

  const db = require('./models/db');
  const migrations = require('./migrations');

  await ensureMigrationTable(db);
  const appliedMigrations = await getAppliedMigrations(db);

  const pending = migrations.filter((migration) => !appliedMigrations.includes(migration.id));

  if (pending.length === 0) {
    console.log('No pending migrations.');
    return;
  }

  for (const migration of pending) {
    console.log(`Running migration: ${migration.id} - ${migration.name}`);
    await migration.up(db);
    await recordMigration(db, migration);
    console.log(`Applied migration: ${migration.id}`);
  }
};

if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migrations completed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = runMigrations;
