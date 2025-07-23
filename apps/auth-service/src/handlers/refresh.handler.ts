import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import handleRefreshToken from "../services/refresh.service";

const refreshHandler = (call: ServerUnaryCall<{ refreshToken: string }, { accessToken: string, username: string, email: string }>, callback: sendUnaryData<{ accessToken: string, username: string, email: string }>) => {
  const { refreshToken } = call.request;

  try {
    const { accessToken, username, email } = handleRefreshToken(refreshToken);
    callback(null, { accessToken, username, email });
  } catch (error) {
    const grpcFormattedError = error !== null && typeof error === "object" && "code" in error && "message" in error
      ? { code: error.code as status, message: error.message as string }
      : { code: status.INTERNAL, message: "Internal server error" };

    console.error("Error in refresh:", error);
    callback(grpcFormattedError, null);
  }
};

export default refreshHandler;