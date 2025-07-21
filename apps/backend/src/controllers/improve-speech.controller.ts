import { NextFunction, Response } from "express";
import { ImproveSpeechRequest } from "../types/requests/improve-speech.request.type";
import improveSpeechService from "../services/improve-speech.service";
import httpStatusCodes from "../config/http-status-codes";

const improveSpeechController = async (req: ImproveSpeechRequest, res: Response, next: NextFunction) => {
  try {
    const { speech, emotion } = req.body;
    const improvements = await improveSpeechService(speech, emotion);

    res.status(httpStatusCodes.OK).json({
      improvements,
    });
  } catch (error) {
    next(error);
  }
};

export default improveSpeechController;