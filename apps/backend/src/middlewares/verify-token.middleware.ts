/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/api-error";
import httpStatusCodes from "../config/http-status-codes";
import grpcAuthServiceClient from "../lib/grpc-auth-service-client";
import grpcToHttpStatus from "../lib/grpc-to-http-status";
import getMessageFromError from "../lib/get-message-from-error";

interface validateTokenResponse {}

const validateToken = (accessToken: string): Promise<validateTokenResponse> => {
  return new Promise((resolve, reject) => {
    grpcAuthServiceClient.validateToken({ accessToken }, (error: unknown, response: validateTokenResponse | null) => {
      if (error || !response) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

const verifyToken = async (req: Request, _res: Response, next: NextFunction) => {
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
    await validateToken(accessToken);
    next();
  } catch (error) {
    const validateTokenError = error !== null && typeof error === "object" && "code" in error && "message" in error
      ? new ApiError(getMessageFromError(error), grpcToHttpStatus[error.code as number] || 500)
      : new ApiError("Internal server error", 500);

    next(validateTokenError);
  }
};

export default verifyToken;