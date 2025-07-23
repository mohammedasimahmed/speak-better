import { prisma } from "./prisma";

export const isUsernameTaken = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const isEmailTaken = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};