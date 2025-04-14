import jwt from "jsonwebtoken";
import config from "../config/config";
import { LoginRequestBody } from "../types";

export const generateAccessToken = (user: LoginRequestBody) => {
  const accessToken = jwt.sign(user, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  return accessToken;
};

export const generateRefreshToken = (user: LoginRequestBody) => {
  const refreshToken = jwt.sign(user, config.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
  return refreshToken;
};