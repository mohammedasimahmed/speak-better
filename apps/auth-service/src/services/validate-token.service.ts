import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import config from "../config/config";
import GrpcError from "../lib/grpc-error";
import { status } from "@grpc/grpc-js";

const validateToken = (accessToken: string) => {
  try {
    jwt.verify(accessToken, config.JWT_ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    if (error instanceof TokenExpiredError) {
      throw new GrpcError("Access token has expired", status.UNAUTHENTICATED);
    }

    if (error instanceof JsonWebTokenError) {
      throw new GrpcError("Invalid access token", status.UNAUTHENTICATED);
    }

    // Generic fallback
    throw new GrpcError("Unexpected Error", status.INTERNAL);
  }
};

export default validateToken;
