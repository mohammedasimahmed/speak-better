import config from "../config/config";

const usernameFilter = new Uint32Array(config.USERNAME_FILTER_SIZE);
const emailFilter = new Uint32Array(config.EMAIL_FILTER_SIZE);

export { usernameFilter, emailFilter };