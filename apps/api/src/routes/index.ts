import { Router } from "express";
import { authRouter } from "./auth.routes";
import { profileRouter } from "./profile.routes";
import * as profileController from "../controllers/profileController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

router.use("/auth", authRouter);
router.get("/me", authMiddleware, profileController.getMe);
router.use("/profile", profileRouter);
