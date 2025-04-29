import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URLS: process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, "http://localhost:3000"]
    : ["http://localhost:3000"],
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "your_jwt_access_token_secret",
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "your_jwt_refresh_token_secret",
  API_KEY: process.env.API_KEY || "",
  BACKEND_CACHE_URL: process.env.BACKEND_CACHE_URL || "http://localhost:8000",
  BACKEND_CACHE_CHECK_CREDENTIALS_URL: process.env.BACKEND_CACHE_CHECK_CREDENTIALS_URL || "http://localhost:8000/api/check-credentials",
  BACKEND_CACHE_ADD_CREDENTIALS_URL: process.env.BACKEND_CACHE_ADD_CREDENTIALS_URL || "http://localhost:8000/api/add-credentials",
  BACKEND_CACHE_REMOVE_CREDENTIALS_URL: process.env.BACKEND_CACHE_REMOVE_CREDENTIALS_URL || "http://localhost:8000/api/remove-credentials"
};

export default config;
