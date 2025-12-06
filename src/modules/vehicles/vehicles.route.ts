import { Router } from "express";
import { isAdmin } from "./../../middleware/isAdmin";
import { vechclesController } from "./vehicles.controller";

const router = Router();

router.post("/", isAdmin("admin"), vechclesController.createVehicles);

export const vehiclesRoutes = router;
