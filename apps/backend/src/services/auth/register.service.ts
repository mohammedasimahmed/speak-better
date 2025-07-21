import { prisma } from "../../lib/prisma";
import { ApiError } from "../../lib/api-error";
import httpStatusCodes from "../../config/http-status-codes";
import { RegisterRequestBody } from "../../types";
import { isUsernameTaken, isEmailTaken } from "../../lib/user-checks";
import { encryptPassword } from "../../lib/password-encryption";
import { addToEmailFilter, addToUsernameFilter, checkEmailFilter, checkUsernameFilter } from "../../lib/query-bloom-filters";
import { emailCache, usernameCache } from "../../lib/cache-instances";

const registerUserService = async (user: RegisterRequestBody) => {
  const { username, email, password } = user;

  if (checkUsernameFilter(username)) {
    if (usernameCache.has(username)) {
      throw new ApiError("Username already taken", httpStatusCodes.CONFLICT);
    }

    if (await isUsernameTaken(username)) {
      usernameCache.add(username);
      throw new ApiError("Username already taken", httpStatusCodes.CONFLICT);
    }
  }

  if (checkEmailFilter(email)) {
    if (emailCache.has(email)) {
      throw new ApiError("Email already taken", httpStatusCodes.CONFLICT);
    }

    if (await isEmailTaken(email)) {
      emailCache.add(email);
      throw new ApiError("Email already taken", httpStatusCodes.CONFLICT);
    }
  }

  const hashedPassword = await encryptPassword(password);

  addToUsernameFilter(username);
  addToEmailFilter(email);

  usernameCache.add(username);
  emailCache.add(email);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  return newUser;
};

export default registerUserService;