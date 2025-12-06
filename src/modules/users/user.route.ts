import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin";
import { usersControllers } from "./user.controller";

const router = Router();

router.get("/", isAdmin("admin"), usersControllers.getAllUsers);

// router.put("/:userId", auth("admin", "customer"), usersControllers.updateUser);

router.delete("/:userId", isAdmin("admin"), usersControllers.deleteUser);

export const usersRoutes = router;
