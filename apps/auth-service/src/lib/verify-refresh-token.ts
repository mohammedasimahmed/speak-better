import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import GrpcError from "./grpc-error";
import { status } from "@grpc/grpc-js";

const verifyRefreshToken = (refreshToken: string): JwtPayload => {
  try {
    return jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw new GrpcError(error.message, status.UNAUTHENTICATED);
    }
    else {
      throw new GrpcError("An unknown error occurred", status.INTERNAL);
    }
  }
};

export default verifyRefreshToken;
