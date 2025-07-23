import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import loginUserService from "../services/login.service";
import GrpcError from "../lib/grpc-error";

const loginHandler = async (
  call: ServerUnaryCall<{ username: string, password: string }, { accessToken: string, refreshToken: string, user: { username: string, email: string } }>,
  callback: sendUnaryData<{ accessToken: string, refreshToken: string, user: { username: string, email: string } }>
): Promise<void> => {
  const { username, password } = call.request;

  try {
    const { accessToken, refreshToken, user } = await loginUserService(username, password);

    callback(null, {
      accessToken,
      refreshToken,
      user,
    });
  } catch (error: unknown) {
    const grpcFormattedError = error instanceof GrpcError
      ? { code: error.code, message: error.message }
      : { code: status.INTERNAL, message: "Internal server error" };

    console.error("Login error:", error);
    callback(grpcFormattedError, null);
  }
};

export default loginHandler;