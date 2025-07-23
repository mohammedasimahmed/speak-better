import { User } from "../types";
import { passwordVerify } from "../lib/password-verify";
import { generateAccessToken, generateRefreshToken } from "../lib/generate-tokens";
import grpcUserChecksClient from "../lib/grpc-user-checks-client";
import GrpcError from "../lib/grpc-error";
import { status } from "@grpc/grpc-js";

const getUser = (username: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    grpcUserChecksClient.getUserBasedOnUsername({ username }, (error: GrpcError, response: User | null) => {
      if (error || !response) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

const validateUserCredentials = async (username: string, password: string): Promise<User> => {
  const user = await getUser(username);

  if (!user) {
    throw new GrpcError("Username does not exist", status.NOT_FOUND);
  }

  const isPasswordValid = await passwordVerify(password, user.password as string);
  if (!isPasswordValid) {
    throw new GrpcError("Wrong Password", status.PERMISSION_DENIED);
  }

  return user;
};

const loginUserService = async (username: string, password: string) => {
  console.log(username, password);
  const existingUser = await validateUserCredentials(username, password);

  const accessToken = generateAccessToken({ username: existingUser.username, email: existingUser.email, id: existingUser.id });
  const refreshToken = generateRefreshToken({ username: existingUser.username, email: existingUser.email, id: existingUser.id });

  const user = {
    username: existingUser.username,
    email: existingUser.email
  };

  return { accessToken, refreshToken, user };
};

export default loginUserService;
