import { Express } from "express";
import error_handler from "../middlewares/error.middleware";


export default function errorHandlerLoader(app: Express) {
  app.use(error_handler);
}