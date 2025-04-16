import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { ApiError } from "../lib/api_error";
import http_status_codes from "../config/http_status_codes";

const verifyRefreshToken = (refreshToken: string): JwtPayload => {
  try {
    return jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, http_status_codes.UNAUTHORIZED);
    }
    else {
      throw new ApiError("An unknown error occurred", http_status_codes.INTERNAL_SERVER_ERROR);
    }
  }
};

export default verifyRefreshToken;
