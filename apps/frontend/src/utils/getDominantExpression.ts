import { FaceExpressions } from "face-api.js";

const getDominantExpression = (expressions: FaceExpressions): string => {
  return Object.keys(expressions).reduce((a, b) =>
    expressions[a as keyof FaceExpressions] > expressions[b as keyof FaceExpressions] ? a : b
  );
};

export default getDominantExpression;
