import { generateAccessToken } from "../../lib/generate_tokens";
import { User } from "../../types";
import verifyRefreshToken from "../../lib/verify_refresh_token";

const handleRefreshToken = (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);

  const user: User = {
    id: decoded.id,
    username: decoded.username,
    password: decoded.password,
    email: decoded.email,
  };

  const accessToken = generateAccessToken(user);

  return { accessToken, username: user.username, email: user.email };
};

export default handleRefreshToken;
