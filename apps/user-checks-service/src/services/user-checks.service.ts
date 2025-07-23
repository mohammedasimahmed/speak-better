import { status } from "@grpc/grpc-js";
import { emailCache, usernameCache } from "../lib/cache-instances";
import { isEmailTaken, isUsernameTaken } from "../lib/db-user-checks";
import GrpcError from "../lib/grpc-error";
import { checkUsernameFilter } from "../lib/username-filter-operations";
import { checkEmailFilter } from "../lib/email-filter-operations";

const checkUsernameAndEmailExists = async (username: string, email: string) => {
  if (checkUsernameFilter(username)) {
    if (usernameCache.has(username)) {
      throw new GrpcError("Username already taken", status.ALREADY_EXISTS);
    }

    if (await isUsernameTaken(username)) {
      usernameCache.add(username);
      throw new GrpcError("Username already taken", status.ALREADY_EXISTS);
    }
  }

  if (checkEmailFilter(email)) {
    if (emailCache.has(email)) {
      throw new GrpcError("Email already taken", status.ALREADY_EXISTS);
    }

    if (await isEmailTaken(email)) {
      emailCache.add(email);
      throw new GrpcError("Email already taken", status.ALREADY_EXISTS);
    }
  }
};

const getUserBasedOnUsername = async (username: string) => {
  if (!checkUsernameFilter(username)) {
    throw new GrpcError("Username does not exist", status.NOT_FOUND);
  }

  const user = await isUsernameTaken(username);
  if (!user) {
    throw new GrpcError("User not found", status.NOT_FOUND);
  }

  return user;
};

export { checkUsernameAndEmailExists, getUserBasedOnUsername };
