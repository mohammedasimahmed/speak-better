import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import config from "../config/config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient & ReturnType<typeof PrismaClient.prototype.$extends>
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends(withAccelerate());

if (config.ENVIRONMENT !== "production") globalForPrisma.prisma = prisma;
