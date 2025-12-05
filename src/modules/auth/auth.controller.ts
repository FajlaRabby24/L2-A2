import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUser(req.body);
    sendResponse(res, 201, true, "User created successfully. Please Login!");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const authController = {
  signup,
};
