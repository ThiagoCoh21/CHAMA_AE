import { PrismaClient, Position } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "jogador@chama.ae";
  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      username: "craque10",
      passwordHash,
      profile: {
        create: {
          fullName: "Craque da Pelada",
          position: Position.FORWARD,
          city: "Sao Paulo",
          rating: 4.5,
          matchesPlayed: 27,
        },
      },
    },
    include: { profile: true },
  });

  // eslint-disable-next-line no-console
  console.log(`Seed concluido. Usuario de teste: ${user.email} / senha: 123456`);
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
