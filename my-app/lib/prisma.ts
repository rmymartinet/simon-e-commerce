import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// 🔽 Ajoute ce bloc
prisma
  .$connect()
  .then(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Prisma connecté");
    }
  })
  .catch((err) => {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Erreur de connexion à Prisma :", err);
    }
  });
