import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import { authRouter } from "./modules/auth/auth.route";

const app = express();
app.use(express.json());

initDB();

// * auth route
app.use("/api/v1/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route!",
  });
});

export default app;
