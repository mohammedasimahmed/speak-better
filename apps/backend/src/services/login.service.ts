import { ApiError } from "../lib/api_error";
import http_status_codes from "../config/http_status_codes";
import { LoginRequestBody } from "../types";
import { passwordVerify } from "../lib/password_verify";
import { checkIfUsernameExists } from "../lib/user_verification";
import { generateAccessToken, generateRefreshToken } from "../lib/generate_tokens";

const validateUserCredentials = async (username: string, password: string) => {
  const user = await checkIfUsernameExists(username);

  if (!user) {
    throw new ApiError("Username does not exist", http_status_codes.UNAUTHORIZED);
  }

  const isPasswordValid = await passwordVerify(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError("Wrong Password", http_status_codes.UNAUTHORIZED);
  }

  return user;
};

const loginUserService = async (user: LoginRequestBody) => {
  const { username, password } = user;
  const existingUser = await validateUserCredentials(username, password);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken, existingUser };
};

export default loginUserService;