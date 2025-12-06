import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import { authRoutes } from "./modules/auth/auth.route";
import { bookingRoutes } from "./modules/bookings/bookgin.route";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.route";

const app = express();
app.use(express.json());

initDB();

// * auth route
app.use("/api/v1/auth", authRoutes);

//* vehicles route
app.use("/api/v1/vehicles", vehiclesRoutes);

// * users route
// app.use("/api/v1/users", usersRoutes);

// * booking routes
app.use("/api/v1/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route!",
  });
});

export default app;
