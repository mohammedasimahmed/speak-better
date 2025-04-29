import { Express } from "express";
import bloomRoutes from "../routes/bloom.routes";

export default function routesLoader(app: Express) {
  app.use("/api", bloomRoutes);
}