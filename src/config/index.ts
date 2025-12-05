import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  connection_str: process.env.CONNECTION_STR,
};
