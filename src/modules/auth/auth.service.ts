import bcrypt from "bcrypt";
import { pool } from "../../config/db";

const signup = async (payload: Record<string, any>) => {
  const { name, role, email, password, phone } = payload;

  const hashedPass = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
      INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5)
      `,
    [name, email, hashedPass, phone, role]
  );

  return result;
};

export const authService = {
  createUser: signup,
};
