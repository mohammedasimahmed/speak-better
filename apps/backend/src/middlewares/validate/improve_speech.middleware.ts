import { NextFunction, Response } from "express";
import { ImproveSpeechRequest } from "../../types/requests/improve_speech.request.type";
import { improveSpeechSchema } from "../../schemas/improve_speech.schema";
import { ApiError } from "../../lib/api_error";
import http_status_codes from "../../config/http_status_codes";


const improve_speech_validate = (req: ImproveSpeechRequest, _res: Response, next: NextFunction) => {
  const validate = improveSpeechSchema.safeParse(req.body);
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

export default improve_speech_validate;