import { generateAccessToken } from "../lib/generate_tokens";
import { LoginRequestBody } from "../types";
import verifyRefreshToken from "../lib/verify_refresh_token";

const handleRefreshToken = (refreshToken: string) => {

  const decoded = verifyRefreshToken(refreshToken);

  const user: LoginRequestBody = {
    username: decoded.username,
    password: decoded.password,
  };

  return generateAccessToken(user);
};

export default handleRefreshToken;
