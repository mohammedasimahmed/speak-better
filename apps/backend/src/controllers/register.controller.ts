import { Request, Response, NextFunction } from "express";
import registerUserService from "../services/auth/register.service";
import http_status_codes from "../config/http_status_codes";

const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const newUser = await registerUserService(user);

    res.status(http_status_codes.CREATED).json({
      message: "User registered successfully",
      user: newUser
    });
  } catch (error) {
    next(error);
  }
};

export default registerUserController;