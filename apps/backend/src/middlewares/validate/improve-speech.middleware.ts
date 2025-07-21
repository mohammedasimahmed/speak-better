import { NextFunction, Response } from "express";
import { ImproveSpeechRequest } from "../../types/requests/improve-speech.request.type";
import { improveSpeechSchema } from "../../schemas/improve_speech.schema";
import { ApiError } from "../../lib/api-error";
import httpStatusCodes from "../../config/http-status-codes";

const improve_speech_validate = (req: ImproveSpeechRequest, _res: Response, next: NextFunction) => {
  const validate = improveSpeechSchema.safeParse(req.body);
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

export default improve_speech_validate;