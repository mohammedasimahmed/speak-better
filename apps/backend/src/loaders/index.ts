import errorHandlerLoader from "./error-handler.loader";
import expressLoader from "./express.loader";
import { Express } from "express";
import routesLoader from "./routes.loader";

const loader_intializer = (app: Express) => {
  expressLoader(app);
  routesLoader(app);
  errorHandlerLoader(app);
};

export default loader_intializer;