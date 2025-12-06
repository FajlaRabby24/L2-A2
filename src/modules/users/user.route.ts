import { Router } from "express";
import { usersControllers } from "./user.controller";

const router = Router();

router.get("/", usersControllers.getAllUsers);

export const usersRoutes = router;
