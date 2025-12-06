import { Router } from "express";
import { vechclesController } from "./vehicles.controller";

const router = Router();

router.post("/", vechclesController.createVehicles);

export const vehiclesRoutes = router;
