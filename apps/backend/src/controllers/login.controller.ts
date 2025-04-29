import { Response, NextFunction } from "express";
import http_status_codes from "../config/http_status_codes";
import loginUserService from "../services/auth/login.service";
import config from "../config/config";
import { LoginRequest } from "../types/requests/auth.request.type";

const loginUserController = async (req: LoginRequest, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const { accessToken, refreshToken, user } = await loginUserService(username, password);

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: config.ENVIRONMENT === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(http_status_codes.OK).json({
      message: "Login successful",
      accessToken,
      user
    });
  } catch (error) {
    next(error);
  }
};

export default loginUserController;
