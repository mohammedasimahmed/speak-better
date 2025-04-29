import llm from "../lib/llm";
import instruction from "../lib/instruction";
import { ApiError } from "../lib/api_error";
import http_status_codes from "../config/http_status_codes";

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
    throw new ApiError("Unexpected Error", http_status_codes.INTERNAL_SERVER_ERROR);
  }
};

export default improveSpeechService;