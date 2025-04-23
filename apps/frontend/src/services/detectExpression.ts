import * as faceapi from "face-api.js";
import getDominantExpression from "@/utils/getDominantExpression";

const detectExpression = async (video: HTMLVideoElement): Promise<string | null> => {
  const detections = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions();

  if (detections) {
    const {expressions} = detections;
    return getDominantExpression(expressions);
  }

  return null;
};

export default detectExpression;