import { Express } from "express";
import authRoutes from "../routes/auth.routes";

export default function routesLoader(app: Express) {
  app.use("/api/auth", authRoutes);
}