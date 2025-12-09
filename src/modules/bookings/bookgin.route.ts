import { Router } from "express";
import { auth } from "../../middleware/auth";
import { authConstant } from "../auth/auth.constant";
import { bookginController } from "./booking.controller";

const router = Router();

router.post(
  "/",
  auth(authConstant.admin, authConstant.customer),
  bookginController.createBooking
);

router.get(
  "/",
  auth(authConstant.admin, authConstant.customer),
  bookginController.getBookings
);

router.put(
  "/:bookingId",
  auth(authConstant.admin, authConstant.customer),
  bookginController.updateBooking
);

export const bookingRoutes = router;
