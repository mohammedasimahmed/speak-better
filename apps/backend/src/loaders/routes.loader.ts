import { Express } from "express";
import authRoutes from "../routes/auth.routes";
import speechRoute from "../routes/improve_speech.route";

export default function routesLoader(app: Express) {
  app.use("/api/auth", authRoutes);
  app.use("/api", speechRoute);
}