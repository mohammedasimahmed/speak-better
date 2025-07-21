import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/api-error";
import httpStatusCodes from "../config/http-status-codes";
import jwt, { JwtPayload, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import config from "../config/config";

const verifyToken = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.headers) {
    const headersMissing = new ApiError(
      "Headers are missing",
      httpStatusCodes.BAD_REQUEST
    );

    next(headersMissing);
    return;
  }

  if (!req.headers["authorization"]) {
    const authorizationMissing = new ApiError(
      "Authorization header is missing",
      httpStatusCodes.BAD_REQUEST
    );

    next(authorizationMissing);
    return;
  }

  const [, accessToken] = req.headers["authorization"].split(" ");

  if (!accessToken) {
    const accessTokenMissing = new ApiError(
      "Access token is missing",
      httpStatusCodes.BAD_REQUEST
    );

    next(accessTokenMissing);
    return;
  }

  try {
    jwt.verify(accessToken, config.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      const tokenExpiredError = new ApiError("Access token has expired", httpStatusCodes.UNAUTHORIZED);
      next(tokenExpiredError);
      return;
    }

    if (error instanceof JsonWebTokenError) {
      const invalidTokenError = new ApiError("Invalid access token", httpStatusCodes.UNAUTHORIZED);
      next(invalidTokenError);
      return;
    }

    // Generic fallback
    next(new ApiError("Unexpected Error", httpStatusCodes.INTERNAL_SERVER_ERROR));
    return;
  }
};

export default verifyToken;