import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URLS: process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, "http://localhost:3000"]
    : ["http://localhost:3000"],
  DATABASE_URL: process.env.DATABASE_URL!,
  ENVIRONMENT: process.env.ENVIRONMENT!
};

export default config;