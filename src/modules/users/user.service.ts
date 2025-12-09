import { Request } from "express";
import { pool } from "../../config/db";

// get all user -> admin
const getAllUsers = async () => {
  return await pool.query(`
        SELECT * FROM users
        `);
};

const getSingleUser = async (id: string) => {
  return await pool.query(
    `
        SELECT * FROM users WHERE id = $1
        `,
    [id]
  );
};

// update user by id -> admin, own
const updateUser = async (
  req: Request,
  payload: Record<string, unknown>,
  id: string
) => {
  const getUser = await getSingleUser(id);

  if (!getUser.rowCount) {
    return null;
  }

  const isAdmin = req.user;

  let alowedFields = ["name", "password", "phone"];

  if (isAdmin!.role === "admin") {
    alowedFields.push("role");
  }

  delete payload.id;
  delete payload.email;

  const entries = Object.entries(payload).filter(([key]) =>
    alowedFields.includes(key)
  );

  const setQuery = entries
    .map(([key], index) => `${key}=$${index + 1}`)
    .join(", ");

  const values = entries.map(([_, value]) => value);

  const result = await pool.query(
    `
    UPDATE users SET ${setQuery} WHERE id=$${values.length + 1} RETURNING *
    `,
    [...values, id]
  );
  return result;
};

// delete user by id -> admin
const deleteUser = async (id: string) => {
  const getUser = await getSingleUser(id);

  if (!getUser.rowCount) {
    return "User not found!";
  }

  const getUserBookings = await pool.query(
    "SELECT * FROM bookings WHERE customer_id = $1",
    [id]
  );

  let isActive: boolean = false;

  if (getUserBookings.rowCount! > 0) {
    isActive = getUserBookings.rows[0].status === "active";
  }

  if (isActive) {
    return "This user has active booking. So you can't delete";
  }
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
