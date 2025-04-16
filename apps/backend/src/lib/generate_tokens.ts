import jwt from "jsonwebtoken";
import config from "../config/config";
import { User } from "../types";

export const generateAccessToken = (user: User) => {
  const accessToken = jwt.sign(user, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  return accessToken;
};

export const generateRefreshToken = (user: User) => {
  const refreshToken = jwt.sign(user, config.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
  return refreshToken;
};