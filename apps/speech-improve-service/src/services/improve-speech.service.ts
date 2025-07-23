import llm from "../lib/llm";
import instruction from "../lib/instruction";
import GrpcError from "../lib/grpc-error";
import { status } from "@grpc/grpc-js";

const improveSpeechService = async (speech: string[], emotion: string[]) => {
  try {
    const aiMsg = await llm.invoke([
      [
        "system",
        instruction,
      ],
      ["human", `speech: ${JSON.stringify(speech)}, emotion: ${JSON.stringify(emotion)}`],
    ]);

    return aiMsg.content;
  } catch {
    throw new GrpcError("Unexpected Error", status.INTERNAL);
  }
};

export default improveSpeechService;