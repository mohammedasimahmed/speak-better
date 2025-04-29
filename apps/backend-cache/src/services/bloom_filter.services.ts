import { CountingBloomFilter } from "bloom-filters";
import config from "../config/config";

const { usernameFilterSize, usernameFilterHashFunctionCount, emailFilterSize, emailFilterHashFunctionCount } = config;

export const usernameFilter = new CountingBloomFilter(usernameFilterSize, usernameFilterHashFunctionCount);
export const emailFilter = new CountingBloomFilter(emailFilterSize, emailFilterHashFunctionCount);

export const checkUsernameExistence = (username: string) => {
  return usernameFilter.has(username);
};

export const addUsername = (username: string) => {
  usernameFilter.add(username);
};

export const removeUsername = (username: string) => {
  usernameFilter.remove(username);
};

export const checkEmailExistence = (email: string) => {
  return emailFilter.has(email);
};

export const addEmail = (email: string) => {
  emailFilter.add(email);
};

export const removeEmail = (email: string) => {
  emailFilter.remove(email);
};
