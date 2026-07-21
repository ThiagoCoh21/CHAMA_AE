import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/errors";
import { env } from "../config/env";

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ message: "Rota nao encontrada", code: "NOT_FOUND" });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
      details: err.details,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Dados invalidos",
      code: "VALIDATION_ERROR",
      details: err.flatten(),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        message: "Registro duplicado",
        code: "CONFLICT",
        details: err.meta,
      });
    }
    if (err.code === "P2025") {
      return res
        .status(404)
        .json({ message: "Recurso nao encontrado", code: "NOT_FOUND" });
    }
  }

  const message =
    env.nodeEnv === "production"
      ? "Erro interno do servidor"
      : (err as Error)?.message ?? "Erro interno do servidor";

  if (env.nodeEnv !== "test") {
    // eslint-disable-next-line no-console
    console.error("[error]", err);
  }

  return res.status(500).json({ message, code: "INTERNAL_ERROR" });
}
