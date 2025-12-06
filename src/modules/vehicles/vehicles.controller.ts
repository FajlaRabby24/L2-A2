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

export const vehiclesController = {
  createVehicles,
  getAllVehicles,
};
