import { Express } from "express";
import bloomRoutes from "../routes/credentials.routes";
import credentials_validate from "../middlewares/validate/credentials.middleware";

export default function routesLoader(app: Express) {
  app.use("/api", credentials_validate, bloomRoutes);
}