import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import config from "../config/config";

const PROTO_PATH = path.join(__dirname, "../proto/user-checks.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as {
  UserChecksPackage: {
    UserChecksService: grpc.ServiceClientConstructor;
  };
};

const userChecksPackage = grpcObject.UserChecksPackage;

const grpcUserChecksClient = new userChecksPackage.UserChecksService(
  `${config.USER_CHECKS_SERVICE_URL}:${config.USER_CHECKS_SERVICE_PORT}`,
  grpc.credentials.createInsecure()
);

export default grpcUserChecksClient;