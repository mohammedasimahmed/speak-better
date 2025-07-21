import { Router } from "express";
import improveSpeechController from "../controllers/improve-speech.controller";
import improve_speech_validate from "../middlewares/validate/improve-speech.middleware";

const router = Router();

router.post("/speech", improve_speech_validate, improveSpeechController);

export default router;