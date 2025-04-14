import expressLoader from "./express.loader";
import { Express } from "express";

const loader_intializer = (app: Express) => {
  expressLoader(app);
};

export default loader_intializer;