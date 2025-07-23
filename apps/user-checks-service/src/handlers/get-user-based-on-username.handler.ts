import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import GrpcError from "../lib/grpc-error";
import { getUserBasedOnUsername } from "../services/user-checks.service";

type GetUserBasedOnUsernameRequest = { username: string };
type GetUserBasedOnUsernameResponse = { username: string; email: string; password: string };

const getUserBasedOnUsernameHandler = async (call: ServerUnaryCall<GetUserBasedOnUsernameRequest, GetUserBasedOnUsernameResponse>, callback: sendUnaryData<GetUserBasedOnUsernameResponse>) => {
  try {
    const { username } = call.request;
    console.log("request", call.request);
    const user = await getUserBasedOnUsername(username);

    console.log("user is", user);
    callback(null, user);
  } catch (err) {
    if (err instanceof GrpcError) {
      console.error("GrpcError in getUserBasedOnUsername:", err);
      callback({
        code: err.code,
        message: err.message,
      }, null);

      return;
    }

    console.error("Unexpected error in getUserBasedOnUsername:", err);
    callback({
      code: status.INTERNAL,
      message: "Failed to get user",
    }, null);
  }
};

export default getUserBasedOnUsernameHandler;