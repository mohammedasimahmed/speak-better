import { Request, Response, NextFunction } from "express";
import http_status_codes from "../config/http_status_codes";
import handleRefreshToken from "../services/refresh.service";
import { ApiError } from "../lib/api_error";

const refreshController = (req: Request, res: Response, next: NextFunction) => {

  if (!req.cookies) {
    const cookieMissing = new ApiError(
      "Cookie is missing",
      http_status_codes.BAD_REQUEST
    );

    next(cookieMissing);
    return;
  }

  const { cookies } = req;

  if (!cookies.refresh) {
    const refreshTokenMissing = new ApiError(
      "Refresh token is missing",
      http_status_codes.BAD_REQUEST
    );

    next(refreshTokenMissing);
    return;
  }

  const refreshToken = cookies.refresh;

  try {
    const accessToken = handleRefreshToken(refreshToken);
    res.status(http_status_codes.OK).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export default refreshController;
