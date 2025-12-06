import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);
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
      "Booking created successfully",
      result.rows[0]
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getBookings(req.user!);
    if (!result.rowCount) {
      return sendResponse(res, 200, true, "There was no booking.");
    }
    if (result.rowCount === 1) {
      return sendResponse(res, 200, true, "Success", result.rows[0]);
    }
    return sendResponse(res, 200, true, "Success", result.rows);
  } catch (error: any) {
    return sendResponse(res, 500, false, error.message);
  }
};

export const bookginController = {
  createBooking,
  getBookings,
};
