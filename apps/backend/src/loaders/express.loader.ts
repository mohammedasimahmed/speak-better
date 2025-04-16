import express, { Application } from "express";
import config from "../config/config";
import cors from "cors";
import helmet from "helmet";
import cookie_parser from "cookie-parser";

const expressLoader = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookie_parser());

  app.use(
    cors({
      origin: config.FRONTEND_URLS,
      credentials: true
    })
  );

  app.use(helmet());

  if (config.ENVIRONMENT === "development") {
    import("morgan").then(morgan => {
      app.use(morgan.default("dev"));
    }
    );
  }
};

export default expressLoader;