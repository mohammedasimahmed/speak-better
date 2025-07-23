import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import config from "./config/config";
import improveSpeechHandler from "./handlers/improve-speech.handler";
import { SpeechImproveServiceInterface } from "./types/speech-improve";

const PROTO_PATH = path.join(__dirname, "./proto/speech-improve.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as {
    SpeechImprovePackage: {
        SpeechImproveService: {
            service: grpc.ServiceDefinition<SpeechImproveServiceInterface>;
        };
    };
};;

const speechImprovePackage = (grpcObject).SpeechImprovePackage;

const startServer = () => {
  const server = new grpc.Server();
  server.addService(speechImprovePackage.SpeechImproveService.service, {
    "improveSpeech": improveSpeechHandler,
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