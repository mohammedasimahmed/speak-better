import { ApiError } from "../../lib/api-error";
import httpStatusCodes from "../../config/http-status-codes";
import { User } from "../../types";
import { passwordVerify } from "../../lib/password-verify";
import { isUsernameTaken } from "../../lib/user-checks";
import { generateAccessToken, generateRefreshToken } from "../../lib/generate-tokens";

const validateUserCredentials = async (username: string, password: string) => {
  const user = await isUsernameTaken(username);

  if (!user) {
    throw new ApiError("Username does not exist", httpStatusCodes.UNAUTHORIZED);
  }

  const isPasswordValid = await passwordVerify(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError("Wrong Password", httpStatusCodes.UNAUTHORIZED);
  }

  return user;
};

const loginUserService = async (username: string, password: string) => {
  const existingUser: User = await validateUserCredentials(username, password);

  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  const user = {
    username: existingUser.username,
    email: existingUser.email
  };

  return { accessToken, refreshToken, user };
};

export default loginUserService;