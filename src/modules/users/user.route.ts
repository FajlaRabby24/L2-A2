import { Router } from "express";
import { auth } from "../../middleware/auth";
import { authConstant } from "../auth/auth.constant";
import { usersControllers } from "./user.controller";

const router = Router();

// get all users -> admin
router.get("/", auth(authConstant.admin), usersControllers.getAllUsers);

// user update by id -> admin, own
router.put(
  "/:userId",
  auth(authConstant.admin, authConstant.customer),
  usersControllers.updateUser
);

// delete user by id -> admin
router.delete(
  "/:userId",
  auth(authConstant.admin),
  usersControllers.deleteUser
);

export const usersRoutes = router;
