import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const db = new Pool ({ connectionString: process.env.DATABASE_URL });

export default db;