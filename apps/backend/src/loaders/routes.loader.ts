import { Express } from "express";
import authRoutes from "../routes/auth.routes";
import speechRoute from "../routes/improve-speech.route";
import verifyToken from "../middlewares/verify-token.middleware";

export default function routesLoader(app: Express) {
  app.use("/api/auth", authRoutes);
  app.use(verifyToken);
  app.use("/api", speechRoute);
}