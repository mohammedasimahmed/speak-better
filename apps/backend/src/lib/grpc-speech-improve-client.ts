import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import config from "../config/config";

const PROTO_PATH = path.join(__dirname, "../proto/speech-improve.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as {
  SpeechImprovePackage: {
    SpeechImproveService: grpc.ServiceClientConstructor;
  };
};

const speechImprovePackage = grpcObject.SpeechImprovePackage;

const grpcSpeechImproveClient = new speechImprovePackage.SpeechImproveService(
  `${config.SPEECH_IMPROVE_SERVICE_URL}:${config.SPEECH_IMPROVE_SERVICE_PORT}`,
  grpc.credentials.createInsecure()
);

export default grpcSpeechImproveClient;