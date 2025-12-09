import { pool } from "../../config/db";

// create vehicle
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
  return result;
};

// get all vehicle -> public
const getAllVehicles = async () => {
  return await pool.query(`SELECT * FROM vehicles`);
};

// get sigle vehicle -> public
export const getSingleVehicle = async (id: string) => {
  return await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
};

// update vehicle by id -> admin
const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
  const getVehicle = await getSingleVehicle(id);

  if (!getVehicle.rowCount) {
    return null;
  }

  let alowedFields = [
    "vehicle_name",
    "type",
    "registration_number",
    "daily_rent_price",
    "availability_status",
  ];

  const entries = Object.entries(payload).filter(([key]) =>
    alowedFields.includes(key)
  );

  const setQuery = entries
    .map(([key], index) => `${key}=$${index + 1}`)
    .join(", ");

  const values = entries.map(([_, value]) => value);

  const result = await pool.query(
    `
    UPDATE vehicles SET ${setQuery} WHERE id=$${values.length + 1} RETURNING *
    `,
    [...values, id]
  );

  return result;
};

// delete vehicle
const deleteVehicle = async (id: string) => {
  const getVehicle = await getSingleVehicle(id);

  if (!getVehicle.rowCount) {
    return null;
  }

  if (getVehicle.rows[0].availability_status === "booked") {
    return "This vehicle is already booked. You can't delete this vehicle right now";
  }

  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
  return result.rowCount;
};

export const vehiclesService = {
  createVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
