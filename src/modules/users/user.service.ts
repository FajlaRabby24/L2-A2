import { Request } from "express";
import { pool } from "../../config/db";

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

const deleteUser = (id: string) => {};

export const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
