import { Router } from "express";
import { auth } from "../../middleware/auth";
import { authConstant } from "../auth/auth.constant";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

// create vehicle -> admin
router.post("/", auth(authConstant.admin), vehiclesController.createVehicles);

// get all vehicle -> public
router.get("/", vehiclesController.getAllVehicles);

// get single vehicle by id -> admin
router.get("/:vehicleId", vehiclesController.getSingleVehicle);

// update vehicle by id -> admin
router.put(
  "/:vehicleId",
  auth(authConstant.admin),
  vehiclesController.updateVehicle
);

// delete vehicle by id -> admin
router.delete(
  "/:vehicleId",
  auth(authConstant.admin),
  vehiclesController.deleteVehicle
);

export const vehiclesRoutes = router;
