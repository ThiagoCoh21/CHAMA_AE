/** Erro de aplicacao com status HTTP e codigo semantico. */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(statusCode: number, message: string, code = "APP_ERROR", details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new AppError(400, message, "BAD_REQUEST", details);

export const unauthorized = (message = "Nao autorizado") =>
  new AppError(401, message, "UNAUTHORIZED");

export const forbidden = (message = "Acesso negado") =>
  new AppError(403, message, "FORBIDDEN");

export const notFound = (message = "Recurso nao encontrado") =>
  new AppError(404, message, "NOT_FOUND");

export const conflict = (message: string) => new AppError(409, message, "CONFLICT");
