/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars, no-unused-vars */
import GrpcError from "../lib/grpc-error";
import grpcUserChecksClient from "../lib/grpc-user-checks-client";
import { encryptPassword } from "../lib/password-encryption";
import { prisma } from "../lib/prisma";
import { status } from "@grpc/grpc-js";

const checkUsernameAndEmailExists = (username: string, email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    grpcUserChecksClient.checkUsernameAndEmailExists({ username, email }, (error: GrpcError | null, _response: {}) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

const addToFilterAndCache = (username: string, email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    grpcUserChecksClient.addToFilterAndCache({ username, email }, (error: GrpcError | null, _response: {}) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};


const registerUserService = async (username: string, email: string, password: string) => {
  await checkUsernameAndEmailExists(username, email);

  const hashedPassword = await encryptPassword(password);

  if (!hashedPassword) {
    throw new GrpcError("Failed to hash password", status.INTERNAL);
  }

  await addToFilterAndCache(username, email);

  await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
};

export default registerUserService;