import * as dotenv from 'dotenv';
import { Client } from 'pg';
dotenv.config();

export const setupDatabase = async () => {
  const pgClient = new Client({
    connectionString: process.env.PG_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await pgClient.connect();
    console.log('✅ Connecting to Postgres DB ......');

    await pgClient.end();
    console.log('✅ DB setup complete.');
  } catch (err) {
    console.error('❌ Setup error:', err);
    process.exit(1);
  }
};

setupDatabase();
