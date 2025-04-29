import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../lib/api_error";
import http_status_codes from "../../config/http_status_codes";
import { credentialsSchema } from "../../schemas/credentials.schema";

const credentials_validate = (req: Request, _res: Response, next: NextFunction) => {
  const validate = credentialsSchema.safeParse(req.body);

  if (!validate.success) {
    const wrongTypeError = new ApiError(
      "Server received data with wrong type",
      http_status_codes.BAD_REQUEST
    );

    next(wrongTypeError);
    return;
  }

  next();
};

export default credentials_validate;