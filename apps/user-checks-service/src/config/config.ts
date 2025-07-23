import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 5003,
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  USERNAME_FILTER_SIZE: process.env.USERNAME_FILTER_SIZE ? parseInt(process.env.USERNAME_FILTER_SIZE) : 1437759,
  USERNAME_FILTER_HASH_FUNCTION_COUNT: process.env.USERNAME_FILTER_HASH_FUNCTION_COUNT ? parseInt(process.env.USERNAME_FILTER_HASH_FUNCTION_COUNT) : 10,
  EMAIL_FILTER_SIZE: process.env.EMAIL_FILTER_SIZE ? parseInt(process.env.EMAIL_FILTER_SIZE) : 1437759,
  EMAIL_FILTER_HASH_FUNCTION_COUNT: process.env.EMAIL_FILTER_HASH_FUNCTION_COUNT ? parseInt(process.env.EMAIL_FILTER_HASH_FUNCTION_COUNT) : 10,
  CACHE_ELEMENT_TTL: process.env.CACHE_ELEMENT_TTL ? parseInt(process.env.CACHE_ELEMENT_TTL) : 86400
};

export default config;
