import bcrypt from "bcrypt";

export const passwordVerify = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};