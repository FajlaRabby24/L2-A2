import { Router } from "express";
import { auth } from "../../middleware/auth";
import { authConstant } from "../auth/auth.constant";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

router.post("/", auth(authConstant.admin), vehiclesController.createVehicles);

router.get("/", vehiclesController.getAllVehicles);

router.get("/:vehicleId", vehiclesController.getSingleVehicle);

router.put(
  "/:vehicleId",
  auth(authConstant.admin),
  vehiclesController.updateVehicle
);

router.delete(
  "/:vehicleId",
  auth(authConstant.admin),
  vehiclesController.deleteVehicle
);

export const vehiclesRoutes = router;
