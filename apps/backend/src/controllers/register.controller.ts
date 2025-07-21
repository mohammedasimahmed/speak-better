import { Request, Response, NextFunction } from "express";
import registerUserService from "../services/auth/register.service";
import httpStatusCodes from "../config/http-status-codes";

const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const newUser = await registerUserService(user);

    res.status(httpStatusCodes.CREATED).json({
      message: "User registered successfully",
      user: newUser
    });
  } catch (error) {
    next(error);
  }
};

export default registerUserController;