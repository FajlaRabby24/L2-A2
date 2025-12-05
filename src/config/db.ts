import { Pool } from "pg";
import { config } from ".";

export const pool = new Pool({
  connectionString: config.connection_str,
});

export const initDB = async () => {
  await pool.query(`
       CREATE TABLE IF NOT EXISTS users(
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(50) NOT NULL UNIQUE,
       password TEXT NOT NULL,
       phone TEXT NOT NULL,
       role VARCHAR(50) NOT NULL DEFAULT 'customer',

       CONSTRAINT email_lowercase CHECK (email = LOWER(email)),
       CONSTRAINT password_min_length CHECK (char_length(password) >= 6),
       CONSTRAINT valid_role CHECK (role IN ('admin', 'customer'))
        )
        `);
};
