import { prisma } from "../../lib/prisma";
import { ApiError } from "../../lib/api_error";
import http_status_codes from "../../config/http_status_codes";
import { RegisterRequestBody } from "../../types";
import { checkIfUsernameExists, checkIfEmailExists } from "../../lib/user_verification";
import { encryptPassword } from "../../lib/password_encryption";
import config from "../../config/config";

const registerUserService = async (user: RegisterRequestBody) => {
  const { username, email, password } = user;

  let usernameExists = false;
  let emailExists = false;

  try {
    const response = await fetch(config.BACKEND_CACHE_CHECK_CREDENTIALS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });

    if (response.ok) {
      const { isUsernameExists, isEmailExists } = await response.json();

      if (isUsernameExists) {
        usernameExists = !!(await checkIfUsernameExists(username));
      } else {
        usernameExists = false;
      }

      if (isEmailExists) {
        emailExists = !!(await checkIfEmailExists(email));
      } else {
        emailExists = false;
      }

    } else {
      usernameExists = !!(await checkIfUsernameExists(username));
      emailExists = !!(await checkIfEmailExists(email));
    }
  } catch {
    usernameExists = !!(await checkIfUsernameExists(username));
    emailExists = !!(await checkIfEmailExists(email));
  }

  if (usernameExists) {
    throw new ApiError("Username already taken", http_status_codes.CONFLICT);
  }

  if (emailExists) {
    throw new ApiError("Email already taken", http_status_codes.CONFLICT);
  }

  try {
    await fetch(config.BACKEND_CACHE_ADD_CREDENTIALS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });
  } catch {
    throw new ApiError("Unexpected error during cache update", http_status_codes.INTERNAL_SERVER_ERROR);
  }

  const hashedPassword = await encryptPassword(password);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  return newUser;
};

export default registerUserService;
