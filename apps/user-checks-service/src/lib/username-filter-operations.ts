import config from "../config/config";
import { usernameFilter } from "../lib/bloom-filters";
import generateHashes from "../lib/generate-hashes";

const checkUsernameFilter = (username: string): boolean => {
  const usernameFilterHashFunctionCount = config.USERNAME_FILTER_HASH_FUNCTION_COUNT;
  console.log("username", username);
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

export { checkUsernameFilter, addToUsernameFilter, removeFromUsernameFilter };