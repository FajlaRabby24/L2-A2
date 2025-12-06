import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";

const createBooking = (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const bookginController = {
  createBookgin: createBooking,
};
