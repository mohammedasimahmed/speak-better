import express, { Application } from "express";
import config from "../config/config";

const expressLoader = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if(config.ENVIRONMENT === "development") {
    import ("morgan").then(morgan => {
      app.use(morgan.default("dev"));
    }
    );
  }
};

export default expressLoader;