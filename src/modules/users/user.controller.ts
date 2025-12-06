import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    console.log(result);
    if (!result.rowCount) {
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong! please try again"
      );
    }

    sendResponse(res, 200, true, "Users retrive successfully", result.rows);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const usersControllers = {
  getAllUsers,
};
