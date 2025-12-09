import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { authConstant } from "../auth/auth.constant";
import { bookingService } from "./booking.service";

// create booking -> admin, customer
const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);

    if (typeof result === "string") {
      if (result === "doesn't exists!") {
        return sendResponse(res, 400, false, "This vehicle doesn't exist!");
      }

      if (result === "booked") {
        return sendResponse(res, 400, false, "This vehicle is already booked");
      }

      // fallback unknown string
      return sendResponse(res, 400, false, result);
    }

    if (result.rowCount! > 0) {
      return sendResponse(res, 201, true, "Booking created successfully", {
        ...result.rows[0],
        vehicle: result.vehicle,
      });
    }

    return sendResponse(
      res,
      500,
      false,
      "Unknown error while creating booking"
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

// get bookings -> admin all, customer only own
const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getBookings(req.user!);

    if (!result.rowCount) {
      return sendResponse(res, 404, true, "There was no booking.");
    }

    if (result.rowCount === 1) {
      return sendResponse(
        res,
        200,
        true,
        "Your bookings retrieved successfully",
        result.rows[0]
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "Bookings retrieved successfully",
      result.rows
    );
  } catch (error: any) {
    return sendResponse(res, 500, false, error.message);
  }
};

// update booking by id -> admin, customer
const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.updateBooking(
      req.user!,
      req.body,
      req.params.bookingId!
    );

    if (!result) {
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong! please try again"
      );
    }

    if (result?.message === authConstant.admin) {
      const { vehicle, message, ...rest } = result;
      sendResponse(
        res,
        200,
        true,
        "Booking marked as returned. Vehicle is now available",
        { ...rest, vehicle }
      );
    } else {
      sendResponse(
        res,
        200,
        true,
        "Booking cancelled successfully",
        result.rows[0]
      );
    }
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const bookginController = {
  createBooking,
  getBookings,
  updateBooking,
};
