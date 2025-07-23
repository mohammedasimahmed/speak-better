/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response, NextFunction } from "express";
import httpStatusCodes from "../config/http-status-codes";
import grpcAuthServiceClient from "../lib/grpc-auth-service-client";
import { ApiError } from "../lib/api-error";
import grpcToHttpStatus from "../lib/grpc-to-http-status";
import getMessageFromError from "../lib/get-message-from-error";

interface RegisterUserResponse {}

const registerUser = (username: string, email: string, password: string): Promise<RegisterUserResponse> => {
  return new Promise((resolve, reject) => {
    grpcAuthServiceClient.register({ username, email, password }, (error: unknown, response: RegisterUserResponse | null) => {
      if (error || !response) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    await registerUser(user.username, user.email, user.password);

    res.status(httpStatusCodes.CREATED).json({
      message: "User registered successfully",
    });
  } catch (error) {
    const registerError = error !== null && typeof error === "object" && "code" in error && "message" in error
      ? new ApiError(getMessageFromError(error), grpcToHttpStatus[error.code as number] || 500)
      : new ApiError("Internal server error", 500);

    next(registerError);
  }
};

export default registerUserController;