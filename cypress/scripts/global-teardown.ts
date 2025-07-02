import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

export const teardownDatabase = async () => {
  const pgClient = new Client({
    connectionString: process.env.PG_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await pgClient.connect();
    console.log('🧹 Cleaning up Postgres DB test data...');

    await pgClient.query(`
      
      DELETE FROM users WHERE email LIKE '%cypress-r-user-email-%';
      DELETE FROM pulse_clients WHERE name LIKE '%cypress-r-client-%';
      DELETE FROM pulse_workspaces WHERE name LIKE '%cypress-r-workspace-%';     
    `);

    await pgClient.end();
    console.log('✅ Postgres DB cleanup complete.');
  } catch (err) {
    console.error('❌ Teardown error:', err);
    process.exit(1);
  }
};

teardownDatabase();
