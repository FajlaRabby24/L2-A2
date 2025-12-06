import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `
          INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
          VALUES ($1, $2, $3, $4, $5)  RETURNING *
        `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

const getSingleVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateVehicle = async (
  vehicle_name: string,
  type: string,
  daily_rent_price: number,
  availability_status: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2, daily_rent_price=$3, availability_status=$4  WHERE id=$5 RETURNING *`,
    [vehicle_name, type, daily_rent_price, availability_status, id]
  );

  return result.rows[0];
};

export const vehiclesService = {
  createVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
};
