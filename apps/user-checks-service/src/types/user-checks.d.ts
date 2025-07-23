import * as grpc from "@grpc/grpc-js";

export interface EmptyResponse {}

export interface UsernameRequest {
  username: string;
}

export interface UsernameAndEmailRequest {
  username: string;
  email: string;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserChecksServiceInterface extends grpc.UntypedServiceImplementation {
  addToFilterAndCache: grpc.handleUnaryCall<UsernameAndEmailRequest, EmptyResponse>;
  checkUsernameAndEmailExists: grpc.handleUnaryCall<UsernameAndEmailRequest, EmptyResponse>;
  getUserBasedOnUsername: grpc.handleUnaryCall<UsernameRequest, UserData>;
}