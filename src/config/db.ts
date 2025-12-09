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
       role VARCHAR(20) DEFAULT 'customer',

       CONSTRAINT email_lowercase CHECK (email = LOWER(email)),
       CONSTRAINT password_min_length CHECK (char_length(password) >= 6),
       CONSTRAINT valid_role CHECK (role IN ('admin', 'customer'))
        )
        `);

  await pool.query(`
                CREATE TABLE IF NOT EXISTS vehicles(
                id SERIAL PRIMARY KEY,
                vehicle_name VARCHAR(50) NOT NULL,
                type VARCHAR(10) NOT NULL,
                registration_number VARCHAR(50) NOT NULL UNIQUE,
                daily_rent_price INT NOT NULL,
                availability_status VARCHAR(15)  DEFAULT 'available',

                CONSTRAINT valid_type CHECK (type IN ('car', 'bike', 'van', 'SUV')),
                CONSTRAINT positive_rent CHECK (daily_rent_price > 0),
                CONSTRAINT valid_availability_status CHECK (availability_status IN ('available', 'booked'))
                )
                `);

  await pool.query(`
                 CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,

    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,

    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL,

    total_price INT NOT NULL,
    status VARCHAR(20)  DEFAULT 'active',

    CONSTRAINT valid_status CHECK (status IN ('active', 'cancelled', 'returned')),
    CONSTRAINT positive_price CHECK (total_price > 0),
    CONSTRAINT valid_rent_date CHECK (rent_end_date > rent_start_date)
);
                  `);
};
