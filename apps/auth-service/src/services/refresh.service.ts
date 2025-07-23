import { generateAccessToken } from "../lib/generate-tokens";
import verifyRefreshToken from "../lib/verify-refresh-token";
import { User } from "../types";

const handleRefreshToken = (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);

  const user: User = {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
  };

  const accessToken = generateAccessToken(user);

  return { accessToken, username: user.username, email: user.email };
};

export default handleRefreshToken;
