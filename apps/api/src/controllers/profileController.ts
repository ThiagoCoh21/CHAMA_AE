import type { NextFunction, Request, Response } from "express";
import * as profileService from "../services/profileService";

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await profileService.getMe(req.userId!);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await profileService.getProfileById(req.params.id);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await profileService.updateProfile(req.userId!, req.body);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}
