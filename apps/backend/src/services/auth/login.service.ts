import { ApiError } from "../../lib/api_error";
import http_status_codes from "../../config/http_status_codes";
import { User } from "../../types";
import { passwordVerify } from "../../lib/password_verify";
import { isUsernameTaken } from "../../lib/user_checks";
import { generateAccessToken, generateRefreshToken } from "../../lib/generate_tokens";

const validateUserCredentials = async (username: string, password: string) => {
  const user = await isUsernameTaken(username);

  if (!user) {
    throw new ApiError("Username does not exist", http_status_codes.UNAUTHORIZED);
  }

  const isPasswordValid = await passwordVerify(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError("Wrong Password", http_status_codes.UNAUTHORIZED);
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