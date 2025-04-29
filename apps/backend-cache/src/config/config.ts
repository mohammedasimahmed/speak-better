import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:5000",
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  usernameFilterSize: Number(process.env.usernameFilterSize) || 2081369,
  usernameFilterHashFunctionCount: Number(process.env.usernameFilterHashFunctionCount) || 144,
  emailFilterSize: Number(process.env.emailFilterSize) || 2081369,
  emailFilterHashFunctionCount: Number(process.env.emailFilterHashFunctionCount) || 144,
};

export default config;