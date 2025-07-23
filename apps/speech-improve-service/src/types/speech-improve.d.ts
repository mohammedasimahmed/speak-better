import * as grpc from "@grpc/grpc-js";

export interface ImproveSpeechRequest {
    speech: string[];
    emotion: string[];
}

export interface ImproveSpeechResponse {
    improvements: string;
}

export interface SpeechImproveServiceInterface extends grpc.UntypedServiceImplementation {
    improveSpeech: grpc.handleUnaryCall<ImproveSpeechRequest, ImproveSpeechResponse>;
}