import { Router } from "express";
import { auth } from "../../middleware/auth";
import { authConstant } from "../auth/auth.constant";
import { usersControllers } from "./user.controller";

const router = Router();

router.get("/", auth(authConstant.admin), usersControllers.getAllUsers);

// router.put("/:userId", auth("admin", "customer"), usersControllers.updateUser);

router.delete(
  "/:userId",
  auth(authConstant.admin),
  usersControllers.deleteUser
);

export const usersRoutes = router;
