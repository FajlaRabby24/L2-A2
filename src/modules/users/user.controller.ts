import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

// get all user -> admin
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

    if (!result.rowCount) {
      return sendResponse(res, 500, false, "There was no users!");
    }

    sendResponse(res, 200, true, "Users retrive successfully", result.rows);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

// update user -> admin
const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateUser(
      req,
      req.body,
      req.params.userId!
    );
    console.log(result);

    if (!result) {
      return sendResponse(
        res,
        500,
        false,
        `There was nothing to find anyone to this id - ${req.params.userId}. Please try another Id`
      );
    }
    sendResponse(res, 200, true, "Users retrive successfully", result.rows[0]);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

// delete user by id
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.userId!);

    if (result.toString().toLowerCase().startsWith("user")) {
      return sendResponse(res, 500, false, `${result}`);
    }

    if (result.toString().toLowerCase().startsWith("this")) {
      return sendResponse(res, 500, false, `${result}`);
    }

    sendResponse(res, 200, true, "Users deleted successfully");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const usersControllers = {
  getAllUsers,
  updateUser,
  deleteUser,
};
