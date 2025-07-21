import { Request, Response, NextFunction } from "express";
import httpStatusCodes from "../config/http-status-codes";
import handleRefreshToken from "../services/auth/refresh.service";
import { ApiError } from "../lib/api-error";

const refreshController = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies) {
    const cookieMissing = new ApiError(
      "Cookie is missing",
      httpStatusCodes.BAD_REQUEST
    );

    next(cookieMissing);
    return;
  }

  const { cookies } = req;

  if (!cookies.refresh) {
    const refreshTokenMissing = new ApiError(
      "Refresh token is missing",
      httpStatusCodes.BAD_REQUEST
    );

    next(refreshTokenMissing);
    return;
  }

  const refreshToken = cookies.refresh;

  try {
    const { accessToken, username, email } = handleRefreshToken(refreshToken);
    res.status(httpStatusCodes.OK).json({ accessToken, username, email });
  } catch (error) {
    next(error);
  }
};

export default refreshController;
