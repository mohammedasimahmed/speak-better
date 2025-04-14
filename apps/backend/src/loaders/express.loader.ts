import express, { Application } from "express";
import config from "../config/config";
import cors from "cors";

const expressLoader = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: config.FRONTEND_URLS,
      credentials: true
    })
  );

  if (config.ENVIRONMENT === "development") {
    import("morgan").then(morgan => {
      app.use(morgan.default("dev"));
    }
    );
  }
};

export default expressLoader;