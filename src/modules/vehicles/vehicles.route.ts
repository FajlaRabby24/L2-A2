import { Router } from "express";
import { isAdmin } from "./../../middleware/isAdmin";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

router.post("/", isAdmin("admin"), vehiclesController.createVehicles);

router.get("/", vehiclesController.getAllVehicles);

export const vehiclesRoutes = router;
