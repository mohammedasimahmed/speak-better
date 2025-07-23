/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import GrpcError from "../lib/grpc-error";
import { checkUsernameAndEmailExists } from "../services/user-checks.service";

type CheckUsernameAndEmailExistsRequest = { username: string; email: string };
type CheckUsernameAndEmailExistsResponse = {};

const checkUsernameAndEmailExistsHandler = async (call: ServerUnaryCall<CheckUsernameAndEmailExistsRequest, CheckUsernameAndEmailExistsResponse>, callback: sendUnaryData<CheckUsernameAndEmailExistsResponse>) => {
  try {
    const { username, email } = call.request;
    await checkUsernameAndEmailExists(username, email);
    callback(null, {});
  } catch (err) {
    if (err instanceof GrpcError) {
      console.error("Error in checkUsernameAndEmailExists:", err);
      callback({
        code: err.code,
        message: err.message,
      }, null);

      return;
    }

    callback({
      code: status.INTERNAL,
      message: "Failed to check username and email",
    }, null);
  }
};

export default checkUsernameAndEmailExistsHandler;