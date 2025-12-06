import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

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

// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const result = await userService.updateUser(
//       req,
//       req.body,
//       req.params.userId!
//     );

//     // if (!result.rowCount) {
//     //   return sendResponse(
//     //     res,
//     //     500,
//     //     false,
//     //     "Something went wrong! please try again"
//     //   );
//     // }
//     // sendResponse(res, 200, true, "Users retrive successfully", result.rows[0]);
//     sendResponse(res, 200, true, "Users retrive successfully", result);
//   } catch (error: any) {
//     sendResponse(res, 500, false, error.message);
//   }
// };

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.userId!);
    console.log(result);
    sendResponse(res, 200, true, "Users deleted successfully");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message);
  }
};

export const usersControllers = {
  getAllUsers,
  //   updateUser,
  deleteUser,
};
