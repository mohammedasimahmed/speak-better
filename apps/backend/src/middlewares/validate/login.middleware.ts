import { NextFunction, Response } from "express";
import { LoginRequest } from "../../types/requests/auth.request.type";
import { loginSchema } from "../../schemas/auth.schema";
import { ApiError } from "../../lib/api-error";
import httpStatusCodes from "../../config/http-status-codes";

const login_validate = (req: LoginRequest, _res: Response, next: NextFunction) => {
  const validate = loginSchema.safeParse(req.body);

  if (!validate.success) {
    const wrongTypeError = new ApiError(
      "Server received data with wrong type",
      httpStatusCodes.BAD_REQUEST
    );

    next(wrongTypeError);
    return;
  }

  next();
};

export default login_validate;