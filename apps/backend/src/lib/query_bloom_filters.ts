import config from "../config/config";
import { emailFilter, usernameFilter } from "./bloom_filters";
import generateHashes from "./generate_hashes";

const checkUsernameFilter = (username: string): boolean => {
  const usernameFilterHashFunctionCount = config.USERNAME_FILTER_HASH_FUNCTION_COUNT;
  const usernameHashes = generateHashes(username, usernameFilterHashFunctionCount);

  for (const hash of usernameHashes) {
    const usernameFilterSize = config.USERNAME_FILTER_SIZE;
    const index = hash % usernameFilterSize;

    if (usernameFilter[index]) {
      return true;
    }
  }

  return false;
};

const addToUsernameFilter = (username: string): void => {
  const usernameFilterHashFunctionCount = config.USERNAME_FILTER_HASH_FUNCTION_COUNT;
  const usernameHashes = generateHashes(username, usernameFilterHashFunctionCount);

  for (const hash of usernameHashes) {
    const usernameFilterSize = config.USERNAME_FILTER_SIZE;
    const index = hash % usernameFilterSize;

    usernameFilter[index]++;
  }
};

const removeFromUsernameFilter = (username: string): void => {
  const usernameFilterHashFunctionCount = config.USERNAME_FILTER_HASH_FUNCTION_COUNT;
  const usernameHashes = generateHashes(username, usernameFilterHashFunctionCount);

  for (const hash of usernameHashes) {
    const usernameFilterSize = config.USERNAME_FILTER_SIZE;
    const index = hash % usernameFilterSize;

    usernameFilter[index] = Math.max(0, usernameFilter[index] - 1);
  }
};

const checkEmailFilter = (email: string): boolean => {
  const emailFilterHashFunctionCount = config.EMAIL_FILTER_HASH_FUNCTION_COUNT;
  const emailHashes = generateHashes(email, emailFilterHashFunctionCount);

  for (const hash of emailHashes) {
    const emailFilterSize = config.EMAIL_FILTER_SIZE;
    const index = hash % emailFilterSize;

    if (emailFilter[index]) {
      return true;
    }
  }

  return false;
};

const addToEmailFilter = (email: string): void => {
  const emailFilterHashFunctionCount = config.EMAIL_FILTER_HASH_FUNCTION_COUNT;
  const emailHashes = generateHashes(email, emailFilterHashFunctionCount);

  for (const hash of emailHashes) {
    const emailFilterSize = config.EMAIL_FILTER_SIZE;
    const index = hash % emailFilterSize;

    emailFilter[index]++;
  }
};

const removeFromEmailFilter = (email: string): void => {
  const emailFilterHashFunctionCount = config.EMAIL_FILTER_HASH_FUNCTION_COUNT;
  const emailHashes = generateHashes(email, emailFilterHashFunctionCount);

  for (const hash of emailHashes) {
    const emailFilterSize = config.EMAIL_FILTER_SIZE;
    const index = hash % emailFilterSize;

    emailFilter[index] = Math.max(0, emailFilter[index] - 1);
  }
};

export { checkUsernameFilter, addToUsernameFilter, removeFromUsernameFilter, checkEmailFilter, addToEmailFilter, removeFromEmailFilter };