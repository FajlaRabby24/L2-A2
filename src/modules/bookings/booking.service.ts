import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = payload;
  const result = await pool.query(
    `
          INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
          VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *
        `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  return result;
};

const getBookings = async (payload: Record<string, unknown>) => {
  if (payload.role === "admin") {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
  }

  if (payload.role === "customer") {
    const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
      payload.id,
    ]);
    return result;
  }

  // fallback
  throw new Error("Invalid role");
};

export const bookingService = {
  createBooking,
  getBookings,
};
