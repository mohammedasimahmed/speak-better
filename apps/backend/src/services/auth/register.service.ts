import { prisma } from "../../lib/prisma";
import { ApiError } from "../../lib/api_error";
import http_status_codes from "../../config/http_status_codes";
import { RegisterRequestBody } from "../../types";
import { isUsernameTaken, isEmailTaken } from "../../lib/user_checks";
import { encryptPassword } from "../../lib/password_encryption";
import { addToEmailFilter, addToUsernameFilter, checkEmailFilter, checkUsernameFilter } from "../../lib/query_bloom_filters";

const registerUserService = async (user: RegisterRequestBody) => {
  const { username, email, password } = user;

  let isUsernameExists = false;

  isUsernameExists = checkUsernameFilter(username);

  if (isUsernameExists) {
    isUsernameExists = !!(await isUsernameTaken(username));
  }

  if (isUsernameExists) {
    throw new ApiError("Username already taken", http_status_codes.CONFLICT);
  }

  let emailExists = false;

  emailExists = checkEmailFilter(email);

  if (emailExists) {
    emailExists = !!(await isEmailTaken(email));
  }

  if (emailExists) {
    throw new ApiError("Email already taken", http_status_codes.CONFLICT);
  }

  const hashedPassword = await encryptPassword(password);

  addToUsernameFilter(username);
  addToEmailFilter(email);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  return newUser;
};

export default registerUserService;