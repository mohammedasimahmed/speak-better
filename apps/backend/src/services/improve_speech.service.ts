import llm from "../lib/llm";
import instruction from "../lib/instruction";

const improveSpeechService = async (speech: string[], emotion: string[]) => {
  const aiMsg = await llm.invoke([
    [
      "system",
      instruction,
    ],
    ["human", `speech: ${JSON.stringify(speech)}, emotion: ${JSON.stringify(emotion)}`],
  ]);

  return aiMsg.content;
};

export default improveSpeechService;