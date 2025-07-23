import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URLS: process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, "http://localhost:3000"]
    : ["http://localhost:3000"],
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  SPEECH_IMPROVE_SERVICE_URL: process.env.SPEECH_IMPROVE_SERVICE_URL || "0.0.0.0",
  SPEECH_IMPROVE_SERVICE_PORT: process.env.SPEECH_IMPROVE_SERVICE_PORT ? parseInt(process.env.SPEECH_IMPROVE_SERVICE_PORT) : 5001,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "0.0.0.0",
  AUTH_SERVICE_PORT: process.env.AUTH_SERVICE_PORT ? parseInt(process.env.AUTH_SERVICE_PORT) : 5002
};

export default config;
