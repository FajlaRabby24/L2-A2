import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { vehiclesService } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicles(req.body);

    sendResponse(res, 201, true, "Vehicles created successfully", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getAllVehicles();
    sendResponse(res, 200, true, "Vehicles retrieved  successfully", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getSingleVehicle(
      req.params.vehicleId!
    );
    sendResponse(res, 200, true, "Vehicle retrieved  successfully", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicle_name, type, daily_rent_price, availability_status } =
      req.body;
    const result = await vehiclesService.updateVehicle(
      vehicle_name,
      type,
      daily_rent_price,
      availability_status,
      req.params.vehicleId!
    );
    console.log(req.body);
    sendResponse(res, 200, true, "Vehicle updated successfully", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.deleteVehicle(req.params.vehicleId!);
    console.log(result);
    sendResponse(res, 200, true, "Vehicle deleted successfully", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const vehiclesController = {
  createVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
