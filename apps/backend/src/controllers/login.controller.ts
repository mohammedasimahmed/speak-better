import { Request, Response, NextFunction } from "express";
import http_status_codes from "../config/http_status_codes";
import loginUserService from "../services/login.service";

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const { accessToken, refreshToken, existingUser} = await loginUserService(user);

    res.status(http_status_codes.OK).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user:existingUser
    });
  } catch (error) {
    next(error);
  }
};
