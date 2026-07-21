import { Router } from "express";
import * as profileController from "../controllers/profileController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { idParamSchema, updateProfileSchema } from "../validators/schemas";

export const profileRouter = Router();

profileRouter.get("/:id", authMiddleware, validate({ params: idParamSchema }), profileController.getById);
profileRouter.put("/", authMiddleware, validate({ body: updateProfileSchema }), profileController.update);
