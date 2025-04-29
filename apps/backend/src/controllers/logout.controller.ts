import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/api_error";
import http_status_codes from "../config/http_status_codes";
import config from "../config/config";

const logoutController = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies) {
    const cookiesMissing = new ApiError(
      "No cookies Found",
      http_status_codes.BAD_REQUEST
    );

    next(cookiesMissing);
    return;
  }

  const {cookies} = req;
  if (!cookies.refresh) {
    const refreshTokenMissing = new ApiError(
      "Refresh Token is missing in the cookies",
      http_status_codes.BAD_REQUEST
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

  res.status(http_status_codes.OK).json({ message: "Logged out successfully" });
};

export default logoutController;