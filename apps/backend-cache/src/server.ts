import express from "express";
import config from "./config/config";
import loader_initializer from "./loaders/index";

function startServer() {
  const app = express();

  loader_initializer(app);

  const { PORT } = config;

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

startServer();

