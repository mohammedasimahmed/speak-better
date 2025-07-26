import dotenv from "dotenv";
dotenv.config();

const config = {
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  API_KEY: process.env.API_KEY || "",
};

export default config;
