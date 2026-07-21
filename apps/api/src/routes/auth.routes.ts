import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as authController from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { loginSchema, refreshSchema, registerSchema } from "../validators/schemas";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Muitas tentativas. Tente novamente mais tarde.", code: "RATE_LIMITED" },
});

export const authRouter = Router();

authRouter.post("/register", validate({ body: registerSchema }), authController.register);
authRouter.post("/login", loginLimiter, validate({ body: loginSchema }), authController.login);
authRouter.post("/refresh", validate({ body: refreshSchema }), authController.refresh);
