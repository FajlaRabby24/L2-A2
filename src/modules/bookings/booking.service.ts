import { pool } from "../../config/db";
import { isDateOver } from "../../utils/isDateOver";
import { authConstant } from "../auth/auth.constant";

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

const getBookings = async (user: Record<string, unknown>) => {
  if (user.role === "admin") {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
  }

  if (user.role === "customer") {
    const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
      user.id,
    ]);
    return result;
  }

  // fallback
  throw new Error("Invalid role");
};

const updateBooking = async (user: Record<string, unknown>, id: string) => {
  if (user.role === authConstant.customer) {
    const isOwnBookings = await pool.query(
      `
    SELECT * FROM bookings
    WHERE id = $1 AND customer_id = $2
    `,
      [id, user.id]
    );

    if (isOwnBookings.rowCount) {
      const result = await pool.query(
        `SELECT * FROM bookings WHERE customer_id=$1`,
        [user.id]
      );
      if (!result.rowCount) {
        return null;
      }

      const remainigBookingsIds = [...result.rows]
        .filter((booking) => isDateOver(booking.rent_start_date) !== true)
        .map((booking) => booking.id);

      const updatePromises = remainigBookingsIds.map(async (bookingId) => {
        const result = await pool.query(
          `
      UPDATE bookings SET status=$1  WHERE id=$2 RETURNING *
  `,
          ["cancelled", bookingId]
        );

        return result.rows[0];
      });

      const updatedBookings = await Promise.all(updatePromises);
      return updatedBookings;
    }
    return null;
  } else if (user.role === authConstant.admin) {
    console.log({ admin: user });
  } else {
    console.log("system");
  }
};

export const bookingService = {
  createBooking,
  getBookings,
  updateBooking,
};
