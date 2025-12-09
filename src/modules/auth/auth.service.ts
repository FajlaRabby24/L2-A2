import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { pool } from "../../config/db";

const signup = async (payload: Record<string, any>) => {
  const { name, role, email, password, phone } = payload;
  console.log(payload);

  const hashedPass = await bcrypt.hash(password, 10);

  if (role) {
    const result = await pool.query(
      `
        INSERT INTO users(name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [name, email, hashedPass, phone, role]
    );

    return result;
  } else {
    const result = await pool.query(
      `
        INSERT INTO users(name, email, password, phone)
        VALUES ($1, $2, $3, $4) RETURNING *
      `,
      [name, email, hashedPass, phone]
    );

    return result;
  }
};

// login
const login = async (email: string, password: string) => {
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email]
  );

  if (!result.rows.length) {
    return null;
  }

  const user = result.rows[0];
  const isMatchPass = bcrypt.compare(password, user.password);

  if (!isMatchPass) {
    return false;
  }

  const tokenInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  const token = jwt.sign(tokenInfo, config.jwt_secret!, {
    expiresIn: "7d",
  });

  delete user.password;

  return { token, user };
};

export const authService = {
  signup,
  login,
};
