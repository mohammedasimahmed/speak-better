import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import config from "./config/config";
import loginHandler from "./handlers/login.handler";
import registerHandler from "./handlers/register.handler";
import refreshHandler from "./handlers/refresh.handler";
import validateTokenHandler from "./handlers/validate-token.handler";
import { AuthServiceInterface } from "./types/auth-service";

const PROTO_PATH = path.join(__dirname, "./proto/auth-service.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as {
    AuthServicePackage: {
        AuthService: {
            service: grpc.ServiceDefinition<AuthServiceInterface>;
        };
    };
};

const authServicePackage = (grpcObject).AuthServicePackage;

const startServer = () => {
  const server = new grpc.Server();
  server.addService(authServicePackage.AuthService.service, {
    "login": loginHandler,
    "register": registerHandler,
    "refresh": refreshHandler,
    "validateToken": validateTokenHandler
  });

  server.bindAsync(`0.0.0.0:${config.PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(`Error starting server: ${err.message}`);
      return;
    }
    console.log(`gRPC server is running on port ${port}`);
  });
};

startServer();