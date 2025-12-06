import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  return await pool.query(
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
};

const getAllVehicles = async () => {
  return await pool.query(`SELECT * FROM vehicles`);
};

const getSingleVehicle = async (id: string) => {
  return await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
};

const updateVehicle = async (
  vehicle_name: string,
  type: string,
  daily_rent_price: number,
  availability_status: string,
  id: string
) => {
  return await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2, daily_rent_price=$3, availability_status=$4  WHERE id=$5 RETURNING *`,
    [vehicle_name, type, daily_rent_price, availability_status, id]
  );
};

const deleteVehicle = async (id: string) => {
  const getVehicle = await getSingleVehicle(id);
  if (!getVehicle.rowCount) {
    return null;
  }

  return await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
};

export const vehiclesService = {
  createVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
