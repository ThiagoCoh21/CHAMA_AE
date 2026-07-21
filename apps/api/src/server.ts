import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./prisma/client";

const app = createApp();

const server = app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Chama.AE API rodando em http://localhost:${env.port} (${env.nodeEnv})`);
});

async function shutdown(signal: string) {
  // eslint-disable-next-line no-console
  console.log(`\n${signal} recebido, encerrando...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
