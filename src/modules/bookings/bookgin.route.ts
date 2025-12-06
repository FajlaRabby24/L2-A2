import { Router } from "express";
import { bookginController } from "./booking.controller";

const router = Router();

router.post("/", bookginController.createBookgin);

export const bookingRoutes = router;
