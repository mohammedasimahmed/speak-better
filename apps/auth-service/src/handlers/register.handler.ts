import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import GrpcError from "../lib/grpc-error";
import registerUserService from "../services/register.service";
import { User } from "../types";

const registerHandler = async (call: ServerUnaryCall<{ username: string, email: string, password: string }, { message: string, user: User }>, callback: sendUnaryData<{ message: string, user: User }>) => {
  const { username, email, password } = call.request;
  try {
    const newUser = await registerUserService(username, email, password);

    callback(null, {
      message: "User registered successfully",
      user: newUser
    });
  } catch (error) {
    const grpcFormattedError = error instanceof GrpcError
      ? { code: error.code, message: error.message }
      : { code: status.INTERNAL, message: "Internal server error" };

    console.error("Error in registration:", error);
    callback(grpcFormattedError, null);
  }
};

export default registerHandler;