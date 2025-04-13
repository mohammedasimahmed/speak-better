// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient & ReturnType<typeof PrismaClient.prototype.$extends>
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
