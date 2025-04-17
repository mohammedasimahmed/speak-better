const config = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000/api/auth",
  AUTH_LOGIN_URL: process.env.NEXT_PUBLIC_AUTH_LOGIN_URL || "http://localhost:5000/api/auth/login",
  AUTH_REGISTER_URL: process.env.NEXT_PUBLIC_AUTH_REGISTER_URL || "http://localhost:5000/api/auth/register",
  AUTH_LOGOUT_URL: process.env.NEXT_PUBLIC_AUTH_LOGOUT_URL || "http://localhost:5000/api/auth/logout",
  AUTH_REFRESH_URL: process.env.NEXT_PUBLIC_AUTH_REFRESH_URL || "http://localhost:5000/api/auth/refresh",
};

export default config;