import errorHandlerLoader from "./error_handler.loader";
import expressLoader from "./express.loader";
import { Express } from "express";
import routesLoader from "./routes.loader";

const loader_intializer = (app: Express) => {
  expressLoader(app);
  errorHandlerLoader(app);
  routesLoader(app);
};

export default loader_intializer;