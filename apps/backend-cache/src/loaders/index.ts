import expressLoader from "./express.loader";
import { Express } from "express";
import routesLoader from "./routes.loader";
import errorHandlerLoader from "./error_handler.loader";

const loader_intializer = (app: Express) => {
  expressLoader(app);
  routesLoader(app);
  errorHandlerLoader(app);
};

export default loader_intializer;