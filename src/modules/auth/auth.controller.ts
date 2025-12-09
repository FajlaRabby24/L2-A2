import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.signup(req.body);

    if (!result.rowCount) {
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong! please try again"
      );
    }

    delete result.rows[0].password;
    sendResponse(
      res,
      201,
      true,
      "User registered successfully",
      result.rows[0]
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    if (!result) {
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong! please try again"
      );
    }
    sendResponse(res, 200, true, "Login successful", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const authController = {
  signup,
  login,
};
