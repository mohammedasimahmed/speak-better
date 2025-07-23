/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import GrpcError from "../lib/grpc-error";
import validateToken from "../services/validate-token.service";

const validateTokenHandler = (call: ServerUnaryCall<{ accessToken: string }, {}>, callback: sendUnaryData<{}>) => {
  const { accessToken } = call.request;
  if (!accessToken) {
    callback({
      code: status.INVALID_ARGUMENT,
      message: "Access token is required"
    });
    return;
  }
  try {
    validateToken(accessToken);
    callback(null, {});
  } catch (error) {
    console.log(error);
    if (error instanceof GrpcError) {
      callback({
        code: error.code,
        message: error.message
      });
      return;
    }

    console.error("Error in token validation:", error);
    callback({
      code: status.INTERNAL,
      message: "Internal server error"
    });
  }
};

export default validateTokenHandler;