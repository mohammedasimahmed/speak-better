import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/api-error";
import httpStatusCodes from "../config/http-status-codes";
import config from "../config/config";

const logoutController = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies) {
    const cookiesMissing = new ApiError(
      "No cookies Found",
      httpStatusCodes.BAD_REQUEST
    );

    next(cookiesMissing);
    return;
  }

  const { cookies } = req;
  if (!cookies.refresh) {
    const refreshTokenMissing = new ApiError(
      "Refresh Token is missing in the cookies",
      httpStatusCodes.BAD_REQUEST
    );

    next(refreshTokenMissing);
    return;
  }

  res.clearCookie("refresh", {
    httpOnly: true,
    secure: config.ENVIRONMENT === "production",
    sameSite: "none",
    maxAge: 0,
  });

  res.status(httpStatusCodes.OK).json({ message: "Logged out successfully" });
};

export default logoutController;