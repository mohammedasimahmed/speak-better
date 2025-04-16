import { NextFunction, Response } from "express";
import { ImproveSpeechRequest } from "../types/requests/improve_speech.request.type";
import improveSpeechService from "../services/improve_speech.service";
import http_status_codes from "../config/http_status_codes";

const improveSpeechController = async (req: ImproveSpeechRequest, res: Response, next: NextFunction) => {
  try {
    const { speech, emotion } = req.body;
    const improvements = await improveSpeechService(speech, emotion);

    res.status(http_status_codes.OK).json({
      improvements,
    });
  } catch (error) {
    next(error);
  }
};

export default improveSpeechController;