import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT ,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  ENVIRONMENT: process.env.ENVIRONMENT
};

export default config;