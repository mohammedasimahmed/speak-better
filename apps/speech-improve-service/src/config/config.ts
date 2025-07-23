import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 5001,
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  API_KEY: process.env.API_KEY || "",
};

export default config;
