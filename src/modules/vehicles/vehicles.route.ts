import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

router.post("/", isAdmin("admin"), vehiclesController.createVehicles);

router.get("/", vehiclesController.getAllVehicles);

router.get("/:vehicleId", vehiclesController.getSingleVehicle);

router.put("/:vehicleId", isAdmin("admin"), vehiclesController.updateVehicle);

router.delete(
  "/:vehicleId",
  isAdmin("admin"),
  vehiclesController.deleteVehicle
);

export const vehiclesRoutes = router;
