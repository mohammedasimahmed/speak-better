import config from "../config/config";
import { emailFilter } from "../lib/bloom-filters";
import generateHashes from "../lib/generate-hashes";

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

export { checkEmailFilter, addToEmailFilter, removeFromEmailFilter };