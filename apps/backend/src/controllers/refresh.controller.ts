import { Request, Response, NextFunction } from "express";
import httpStatusCodes from "../config/http-status-codes";
import { ApiError } from "../lib/api-error";
import grpcAuthServiceClient from "../lib/grpc-auth-service-client";
import grpcToHttpStatus from "../lib/grpc-to-http-status";
import getMessageFromError from "../lib/get-message-from-error";

interface RefreshResponse {
  accessToken: string;
  username: string;
  email: string;
}

const handleRefreshToken = (refreshToken: string): Promise<RefreshResponse> => {
  return new Promise((resolve, reject) => {
    grpcAuthServiceClient.refresh({ refreshToken }, (error: unknown, response: RefreshResponse) => {
      if (error || !response) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

const refreshController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies) {
    const cookieMissing = new ApiError(
      "Cookie is missing",
      httpStatusCodes.BAD_REQUEST
    );

    next(cookieMissing);
    return;
  }

  const { cookies } = req;

  if (!cookies.refresh) {
    const refreshTokenMissing = new ApiError(
      "Refresh token is missing",
      httpStatusCodes.BAD_REQUEST
    );

    next(refreshTokenMissing);
    return;
  }

  const refreshToken = cookies.refresh;

  try {
    const { accessToken, username, email } = await handleRefreshToken(refreshToken);
    res.status(httpStatusCodes.OK).json({ accessToken, username, email });
  } catch (error) {
    const refreshError = error !== null && typeof error === "object" && "code" in error && "message" in error
      ? new ApiError(getMessageFromError(error), grpcToHttpStatus[error.code as number]|| 500)
      : new ApiError("Internal server error", 500);

    next(refreshError);
  }
};

export default refreshController;
