import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { ApiError } from "./api-error";
import httpStatusCodes from "../config/http-status-codes";

const verifyRefreshToken = (refreshToken: string): JwtPayload => {
  try {
    return jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, httpStatusCodes.UNAUTHORIZED);
    }
    else {
      throw new ApiError("An unknown error occurred", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};

export default verifyRefreshToken;
