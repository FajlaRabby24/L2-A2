import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { vehiclesService } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicles(req.body);
    if (!result.rowCount) {
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong! please try again"
      );
    }

    sendResponse(
      res,
      201,
      true,
      "Vehicles created successfully",
      result.rows[0]
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getAllVehicles();
    if (!result.rowCount) {
      return sendResponse(res, 500, true, "There was no vehicles");
    }
    sendResponse(
      res,
      200,
      true,
      "Vehicles retrieved successfully",
      result.rows
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getSingleVehicle(
      req.params.vehicleId!
    );

    if (!result.rowCount) {
      return sendResponse(
        res,
        404,
        false,
        "This is not a valid id. Please enter a valid vahicle id"
      );
    }
    sendResponse(
      res,
      200,
      true,
      "Vehicle retrieved successfully",
      result.rows[0]
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.updateVehicle(
      req.body,
      req.params.vehicleId!
    );

    if (!result?.rowCount) {
      return sendResponse(
        res,
        404,
        false,
        "This is not a valid id. Please enter a valid vahicle id"
      );
    }
    sendResponse(
      res,
      200,
      true,
      "Vehicle updated successfully",
      result.rows[0]
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.deleteVehicle(req.params.vehicleId!);

    if (!result) {
      return sendResponse(
        res,
        404,
        false,
        "This is not a valid id. Please enter a valid vahicle id"
      );
    }

    sendResponse(res, 200, true, "Vehicle deleted successfully");
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
