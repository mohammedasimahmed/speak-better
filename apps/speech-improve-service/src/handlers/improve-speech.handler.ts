import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import improveSpeechService from "../services/improve-speech.service";
import GrpcError from "../lib/grpc-error";

const improveSpeechHandler = async (
  call: ServerUnaryCall<{ speech: string[], emotion: string[] }, { improvements: string }>,
  callback: sendUnaryData<{ improvements: string }>
) => {
  const { speech, emotion } = call.request;

  try {
    const improvements = await improveSpeechService(speech, emotion) as string;

    callback(null, { improvements });
  } catch (error) {
    const grpcFormattedError = error instanceof GrpcError
      ? { code: error.code, message: error.message }
      : { code: status.INTERNAL, message: "Internal server error" };

    console.error("Error in improve speech handler:", error);
    callback(grpcFormattedError, null);
  }
};

export default improveSpeechHandler;