import { NextFunction, Response } from "express";
import { RegisterRequest } from "../../types/requests/auth.request.type";
import { registerSchema } from "../../schemas/auth.schema";
import { ApiError } from "../../lib/api-error";
import httpStatusCodes from "../../config/http-status-codes";

const register_validate = (req: RegisterRequest, _res: Response, next: NextFunction) => {
  const validate = registerSchema.safeParse(req.body);

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

export default register_validate;