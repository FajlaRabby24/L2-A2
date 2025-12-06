import { Router } from "express";
import { auth } from "../../middleware/auth";
import { usersControllers } from "./user.controller";

const router = Router();

router.get("/", auth("admin"), usersControllers.getAllUsers);

// router.put("/:userId", auth("admin", "customer"), usersControllers.updateUser);

router.delete("/:userId", auth("admin"), usersControllers.deleteUser);

export const usersRoutes = router;
