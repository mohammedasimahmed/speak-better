import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/api_error";
import http_status_codes from "../config/http_status_codes";
import jwt, { JwtPayload, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import config from "../config/config";

const verifyToken = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.headers) {
    const headersMissing = new ApiError(
      "Headers are missing",
      http_status_codes.BAD_REQUEST
    );

    next(headersMissing);
    return;
  }

  if (!req.headers["authorization"]) {
    const authorizationMissing = new ApiError(
      "Authorization header is missing",
      http_status_codes.BAD_REQUEST
    );

    next(authorizationMissing);
    return;
  }

  const [, accessToken] = req.headers["authorization"].split(" ");

  if (!accessToken) {
    const accessTokenMissing = new ApiError(
      "Access token is missing",
      http_status_codes.BAD_REQUEST
    );

    next(accessTokenMissing);
    return;
  }

  try {
    jwt.verify(accessToken, config.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      const tokenExpiredError = new ApiError("Access token has expired", http_status_codes.UNAUTHORIZED);
      next(tokenExpiredError);
      return;
    }

    if (error instanceof JsonWebTokenError) {
      const invalidTokenError = new ApiError("Invalid access token", http_status_codes.UNAUTHORIZED);
      next(invalidTokenError);
      return;
    }

    // Generic fallback
    next(new ApiError("Unexpected Error", http_status_codes.INTERNAL_SERVER_ERROR));
    return;
  }
};

export default verifyToken;