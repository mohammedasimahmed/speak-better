// lib/grpc-error.ts
import { status as grpcStatus, status } from "@grpc/grpc-js";

class GrpcError extends Error {
  code: status;

  constructor(message: string, code: status = grpcStatus.UNKNOWN) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, GrpcError.prototype);
  }

  static from(error: unknown): GrpcError {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "message" in error &&
      typeof (error as Record<string, unknown>).code === "number" &&
      typeof (error as Record<string, unknown>).message === "string"
    ) {
      const originalMessage = (error as { message: string }).message;
      const cleaned = originalMessage.split(": ").slice(1).join(": ").trim();
      const {code} = (error as { code: number });
      return new GrpcError(cleaned || originalMessage, code);
    }

    return new GrpcError("Unknown error", grpcStatus.UNKNOWN);
  }
}

export default GrpcError;