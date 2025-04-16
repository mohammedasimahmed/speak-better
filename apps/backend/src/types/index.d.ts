export interface LoginRequestBody {
    username: string;
    password: string;
}

export interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

export interface ImproveSpeechRequestBody {
    speech :[string],
    emotion: [string]
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}