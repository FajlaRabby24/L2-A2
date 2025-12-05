import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// sign up
router.post("/signup", authController.signup);

export const authRouter = router;
