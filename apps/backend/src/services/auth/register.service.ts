import { prisma } from "../../lib/prisma";
import { ApiError } from "../../lib/api_error";
import http_status_codes from "../../config/http_status_codes";
import { RegisterRequestBody } from "../../types";
import { checkIfUsernameExists, checkIfEmailExists } from "../../lib/user_verification";
import { encryptPassword } from "../../lib/password_encryption";

const registerUserService = async (user: RegisterRequestBody) => {
  const { username, email, password } = user;

  if (await checkIfUsernameExists(username)) {
    throw new ApiError("Username already taken", http_status_codes.CONFLICT);
  }

  if (await checkIfEmailExists(email)) {
    throw new ApiError("Email already taken", http_status_codes.CONFLICT);
  }

  const hashedPassword = await encryptPassword(password);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword }
  });

  return newUser;
};

export default registerUserService;