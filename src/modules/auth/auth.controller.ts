import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.signup(req.body);
    sendResponse(res, 201, true, "User created successfully. Please Login!");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    sendResponse(res, 200, true, "User login successfully", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const authController = {
  signup,
  login,
};
