import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();
/*
const db = new Pool ({ connectionString: process.env.DATABASE_URL });

export default db;*/

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const db = new Pool(databaseConfig);

export default db;