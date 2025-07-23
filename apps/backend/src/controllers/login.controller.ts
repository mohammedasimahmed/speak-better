import { Response, NextFunction } from "express";
import httpStatusCodes from "../config/http-status-codes";
import config from "../config/config";
import { LoginRequest } from "../types/requests/auth.request.type";
import grpcAuthServiceClient from "../lib/grpc-auth-service-client";
import { ApiError } from "../lib/api-error";
import grpcToHttpStatus from "../lib/grpc-to-http-status";
import getMessageFromError from "../lib/get-message-from-error";

interface loginUserReponse {
  accessToken: string;
  refreshToken: string;
  user: {
    username: string;
    email: string;
  };
}

const loginUser = (username: string, password: string): Promise<loginUserReponse> => {
  return new Promise((resolve, reject) => {
    grpcAuthServiceClient.login({ username, password }, (error: unknown, response: loginUserReponse | null) => {
      if (error || !response) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

const loginUserController = async (req: LoginRequest, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const { accessToken, refreshToken, user } = await loginUser(username, password);

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: config.ENVIRONMENT === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(httpStatusCodes.OK).json({
      message: "Login successful",
      accessToken,
      user
    });
  } catch (error) {
    const loginError = error !== null && typeof error === "object" && "code" in error && "message" in error
      ? new ApiError(getMessageFromError(error), grpcToHttpStatus[error.code as number]|| 500)
      : new ApiError("Internal server error", 500);

    next(loginError);
  }
};

export default loginUserController;
