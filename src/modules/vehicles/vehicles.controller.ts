import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { vehiclesService } from "./vehicles.service";

// create vehicle -> admin
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
      "Vehicle created successfully",
      result.rows[0]
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

// get vehicles -> public
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getAllVehicles();
    if (!result.rowCount) {
      return sendResponse(res, 500, true, "No vehicles found", []);
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

    if (result.toString().toLowerCase().startsWith("this")) {
      return sendResponse(res, 500, false, `${result}`);
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
