import { Router } from "express";
import { auth } from "../../middleware/auth";
import { authConstant } from "../auth/auth.constant";
import { bookginController } from "./booking.controller";

const router = Router();

// create booking -> admin, customer
router.post(
  "/",
  auth(authConstant.admin, authConstant.customer),
  bookginController.createBooking
);

// get bookings -> admin, customer
router.get(
  "/",
  auth(authConstant.admin, authConstant.customer),
  bookginController.getBookings
);

// update bookings by id -> admin, customer
router.put(
  "/:bookingId",
  auth(authConstant.admin, authConstant.customer),
  bookginController.updateBooking
);

export const bookingRoutes = router;
