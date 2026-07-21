import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { router } from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigin === "*" ? true : env.corsOrigin.split(",").map((o) => o.trim()),
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "chama-ae-api", timestamp: new Date().toISOString() });
  });

  app.use("/", router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
