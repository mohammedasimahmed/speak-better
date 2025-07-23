import * as grpc from "@grpc/grpc-js";

export interface EmptyResponse { }

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginUserResponseObject {
  username: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: LoginUserResponseObject;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  username: string;
  email: string;
}

export interface ValidateTokenRequest {
  accessToken: string;
}

export interface AuthServiceInterface extends grpc.UntypedServiceImplementation {
  login: grpc.handleUnaryCall<LoginRequest, LoginResponse>;
  register: grpc.handleUnaryCall<RegisterRequest, EmptyResponse>;
  refresh: grpc.handleUnaryCall<RefreshRequest, RefreshResponse>;
  validateToken: grpc.handleUnaryCall<ValidateTokenRequest, EmptyResponse>;
}