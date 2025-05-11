import { prisma } from "../../lib/prisma";
import { ApiError } from "../../lib/api_error";
import http_status_codes from "../../config/http_status_codes";
import { RegisterRequestBody } from "../../types";
import { isUsernameTaken, isEmailTaken } from "../../lib/user_checks";
import { encryptPassword } from "../../lib/password_encryption";
import { addToEmailFilter, addToUsernameFilter, checkEmailFilter, checkUsernameFilter } from "../../lib/query_bloom_filters";
import { emailCache, usernameCache } from "../../lib/cache_instances";

const registerUserService = async (user: RegisterRequestBody) => {
  const { username, email, password } = user;

  if(checkUsernameFilter(username))
  {
    if(usernameCache.has(username) || await isUsernameTaken(username))
    {
      throw new ApiError("Username already taken", http_status_codes.CONFLICT);
    }
  }

  if (checkEmailFilter(email)) {
    if (emailCache.has(email) || await isEmailTaken(email)) {
      throw new ApiError("Email already taken", http_status_codes.CONFLICT);
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