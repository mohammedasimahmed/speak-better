import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import config from "./config/config";
import { UserChecksServiceInterface } from "./types/user-checks";
import addToFilterAndCacheHandler from "./handlers/add-to-filter-and-cache.handler";
import checkUsernameAndEmailExistsHandler from "./handlers/check-username-and-email-exists.handler";
import getUserBasedOnUsernameHandler from "./handlers/get-user-based-on-username.handler";

const PROTO_PATH = path.join(__dirname, "./proto/user-checks.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as {
    UserChecksPackage: {
        UserChecksService: {
            service: grpc.ServiceDefinition<UserChecksServiceInterface>;
        };
    };
};

const userChecksPackage = grpcObject.UserChecksPackage;

const startServer = () => {
  const server = new grpc.Server();
  server.addService(userChecksPackage.UserChecksService.service, {
    "addToFilterAndCache": addToFilterAndCacheHandler,
    "checkUsernameAndEmailExists": checkUsernameAndEmailExistsHandler,
    "getUserBasedOnUsername": getUserBasedOnUsernameHandler,
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