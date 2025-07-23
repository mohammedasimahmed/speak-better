import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 5002,
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "your_jwt_access_token_secret",
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "your_jwt_refresh_token_secret",
  USER_CHECKS_SERVICE_URL: process.env.USER_CHECKS_SERVICE_URL || "0.0.0.0",
  USER_CHECKS_SERVICE_PORT: process.env.USER_CHECKS_SERVICE_PORT || 5003,
};

export default config;
