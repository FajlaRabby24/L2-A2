import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { vechclesService } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vechclesService.createVehicles(req.body);

    sendResponse(res, 201, true, "Vehicles created successfully", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const vechclesController = {
  createVehicles,
};
