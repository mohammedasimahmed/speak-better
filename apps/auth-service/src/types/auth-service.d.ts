import * as grpc from "@grpc/grpc-js";

// Generated from AuthService.proto

export interface EmptyResponse {}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  username: string;
  email: string;
}

export interface ValidateTokenRequest {
  accessToken: string;
}

export interface AuthServiceInterface extends grpc.UntypedServiceImplementation {
    login: grpc.handleUnaryCall<LoginRequest, AuthResponse>;
    register: grpc.handleUnaryCall<RegisterRequest, EmptyResponse>;
    refresh: grpc.handleUnaryCall<RefreshRequest, AuthResponse>;
    validateToken: grpc.handleUnaryCall<ValidateTokenRequest, EmptyResponse>;
}