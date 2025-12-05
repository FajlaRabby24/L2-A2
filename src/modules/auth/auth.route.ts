import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// sign up
router.post("/signup", authController.signup);
// sign in
router.post("/signin", authController.login);

export const authRoutes = router;
