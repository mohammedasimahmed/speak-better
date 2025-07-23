import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import GrpcError from "../lib/grpc-error";
import handleRefreshToken from "../services/refresh.service";

const refreshHandler = (call: ServerUnaryCall<{ refreshToken: string }, { accessToken: string, username: string, email: string }>, callback: sendUnaryData<{ accessToken: string, username: string, email: string }>) => {
  const { refreshToken } = call.request;

  try {
    const { accessToken, username, email } = handleRefreshToken(refreshToken);
    callback(null, { accessToken, username, email });
  } catch (error) {
    const grpcFormattedError = error instanceof GrpcError
      ? { code: error.code, message: error.message }
      : { code: status.INTERNAL, message: "Internal server error" };

    console.error("Error in refresh:", error);
    callback(grpcFormattedError, null);
  }
};

export default refreshHandler;