import { Request, Response, NextFunction } from "express";
import { ApiError } from "../lib/api-error";
import httpStatusCodes from "../config/http-status-codes";

// Custom Error Handler
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const error_handler = (err: Error | ApiError, _req: Request, res: Response, _next: NextFunction): void => {
  let statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Unexpected error occurred";

  if (err instanceof ApiError) {
    ({ statusCode, message } = err);
  }

  // Send the error response to the client
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default error_handler;
