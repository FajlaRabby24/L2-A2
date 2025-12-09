import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { getDiffDay } from "../../utils/getDiffDay";
import { isDateOver } from "../../utils/isDateOver";
import { authConstant } from "../auth/auth.constant";
import { getSingleVehicle } from "../vehicles/vehicles.service";

// create booking -> admin, own
const createBooking = async (
  payload: Record<string, unknown>
): Promise<QueryResult<any> | any> => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } =
    payload;

  const getVehicle = await getSingleVehicle(vehicle_id as string);

  if (!getVehicle.rowCount) {
    return "doesn't exists!";
  }

  if (getVehicle.rows[0].availability_status === "booked") {
    return "booked";
  }

  const bookingStatus = status || "active";

  const dayly_rent_price = getVehicle.rows[0].daily_rent_price as number;

  const daysDiff = getDiffDay(
    rent_start_date as string,
    rent_end_date as string
  );
  const total_price = daysDiff * dayly_rent_price;
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
      bookingStatus,
    ]
  );

  const updateVehicle = await pool.query(
    `
    UPDATE vehicles
    SET availability_status = $1
    WHERE id = $2 RETURNING vehicle_name, daily_rent_price
  `,
    ["booked", vehicle_id]
  );

  return { ...result, vehicle: updateVehicle.rows[0] };
};

// get bookings -> admin all, own only own
const getBookings = async (user: Record<string, unknown>) => {
  if (user.role === authConstant.admin) {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
  }

  if (user.role === authConstant.customer) {
    const result = await pool.query(
      `SELECT * FROM bookings WHERE customer_id = $1`,
      [user.id]
    );
    return result;
  }

  // fallback
  throw new Error("Invalid role");
};

// get single bookings
const getSingleBooking = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM bookings WHERE id = $1
    `,
    [id]
  );

  return result;
};

// update booking by id -> admin, own
const updateBooking = async (
  user: Record<string, unknown>,
  id: string
): Promise<QueryResult<any> | any> => {
  // customer
  if (user.role === authConstant.customer) {
    const isOwnBookings = await pool.query(
      `
    SELECT * FROM bookings
    WHERE id = $1 AND customer_id = $2
    `,
      [id, user.id]
    );

    if (isOwnBookings.rowCount) {
      const isBookingsDateOver = isDateOver(
        isOwnBookings.rows[0].rent_start_date
      );

      if (!isBookingsDateOver) {
        const result = await pool.query(
          `
          UPDATE bookings SET status=$1  WHERE id=$2 RETURNING *
      `,
          ["cancelled", id]
        );

        return result;
      }
      return null;
    }
    return null;
  }
  // admin
  else if (user.role === authConstant.admin) {
    const getBooking = await getSingleBooking(id);
    if (!getBooking.rowCount) {
      return null;
    }

    // Update booking
    const result = await pool.query(
      `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
      ["returned", id]
    );

    // Update vehicle
    await pool.query(
      `UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
      ["available", getBooking.rows[0].vehicle_id]
    );

    return result;
  } else {
    console.log("system");
  }
};

export const bookingService = {
  createBooking,
  getBookings,
  updateBooking,
};
