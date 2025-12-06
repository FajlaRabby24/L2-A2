import { Router } from "express";
import { auth } from "../../middleware/auth";
import { bookginController } from "./booking.controller";

const router = Router();

router.post("/", bookginController.createBooking);

router.get("/", auth("admin", "customer"), bookginController.getBookings);

router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookginController.updateBooking
);

export const bookingRoutes = router;
