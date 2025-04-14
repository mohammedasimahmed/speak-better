import { prisma } from "./prisma";

export const checkIfUsernameExists = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  return user;
};

export const checkIfEmailExists = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};
