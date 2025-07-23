/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import registerUserService from "../services/register.service";

const registerHandler = async (call: ServerUnaryCall<{ username: string, email: string, password: string }, {}>, callback: sendUnaryData<{}>) => {
  const { username, email, password } = call.request;
  try {
    await registerUserService(username, email, password);

    callback(null, {});
  } catch (error) {
    const grpcFormattedError =  error !== null && typeof error === "object" && "code" in error && "message" in error
      ? { code: error.code as status, message: error.message as string }
      : { code: status.INTERNAL, message: "Internal server error" };

    console.error("Error in registration:", error);
    callback(grpcFormattedError, null);
  }
};

export default registerHandler;