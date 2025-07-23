import { emailCache, usernameCache } from "../lib/cache-instances";
import { addToEmailFilter } from "../lib/email-filter-operations";
import { addToUsernameFilter } from "../lib/username-filter-operations";

const addToFilterAndCache = (username: string, email: string) => {
  addToUsernameFilter(username);
  addToEmailFilter(email);

  usernameCache.add(username);
  emailCache.add(email);
};

export { addToFilterAndCache };