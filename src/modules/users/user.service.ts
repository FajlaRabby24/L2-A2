import { pool } from "../../config/db";

const getAllUsers = async () => {
  return await pool.query(`
        SELECT * FROM users
        `);
};

export const userService = {
  getAllUsers,
};
