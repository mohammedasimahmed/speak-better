import { NextFunction, Response } from "express";
import { ImproveSpeechRequest } from "../types/requests/improve-speech.request.type";
import httpStatusCodes from "../config/http-status-codes";
import grpcSpeechImproveClient from "../lib/grpc-speech-improve-client";
import { ApiError } from "../lib/api-error";
import grpcToHttpStatus from "../lib/grpc-to-http-status";
import getMessageFromError from "../lib/get-message-from-error";

interface ImproveSpeechResponse {
  improvements: string;
}

const improveSpeech = (speech: string[], emotion: string[]): Promise<ImproveSpeechResponse> => {
  return new Promise((resolve, reject) => {
    grpcSpeechImproveClient.improveSpeech({ speech, emotion }, (error: unknown, response: ImproveSpeechResponse) => {
      if (error || !response) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};


const improveSpeechController = async (req: ImproveSpeechRequest, res: Response, next: NextFunction) => {
  try {
    const { speech, emotion } = req.body;
    const improvements = await improveSpeech(speech, emotion);

    res.status(httpStatusCodes.OK).json(improvements);
  } catch (error) {
    const improveSpeechError = error !== null && typeof error === "object" && "code" in error && "message" in error
      ? new ApiError(getMessageFromError(error), grpcToHttpStatus[error.code as number]|| 500)
      : new ApiError("Internal server error", 500);

    next(improveSpeechError);
  }
};

export default improveSpeechController;