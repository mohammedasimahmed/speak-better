import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import config from "../config/config";

const PROTO_PATH = path.join(__dirname, "../proto/auth-service.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as {
  AuthServicePackage: {
    AuthService: grpc.ServiceClientConstructor;
  };
};

const authServicePackage = grpcObject.AuthServicePackage;

const grpcAuthServiceClient = new authServicePackage.AuthService(
  `${config.AUTH_SERVICE_URL}:${config.AUTH_SERVICE_PORT}`,
  grpc.credentials.createInsecure()
);

export default grpcAuthServiceClient;