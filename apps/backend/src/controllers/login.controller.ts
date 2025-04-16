import { Request, Response, NextFunction } from "express";
import http_status_codes from "../config/http_status_codes";
import loginUserService from "../services/login.service";
import config from "../config/config";

const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const { accessToken, refreshToken, existingUser } = await loginUserService(user);

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: config.ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(http_status_codes.OK).json({
      message: "Login successful",
      accessToken,
      user: existingUser
    });
  } catch (error) {
    next(error);
  }
};

export default loginUserController;
