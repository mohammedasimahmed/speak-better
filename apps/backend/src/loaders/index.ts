import errorHandlerLoader from "./error_handler.loader";
import expressLoader from "./express.loader";
import { Express } from "express";

const loader_intializer = (app: Express) => {
  expressLoader(app);
  errorHandlerLoader(app);
};

export default loader_intializer;