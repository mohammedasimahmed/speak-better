import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import config from "../config/config";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  temperature: 0,
  maxRetries: 2,
  apiKey: config.API_KEY
});

export default llm;