import express, { Application } from "express";
import config from "../config/config";
import cors from "cors";
import helmet from "helmet";

const expressLoader = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: config.ALLOWED_ORIGINS,
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