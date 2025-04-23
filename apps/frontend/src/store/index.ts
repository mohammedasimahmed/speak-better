import { atom } from "jotai";

export type userType = {
    id: string,
    username: string,
    email: string,
    password: string
}

export const userAtom = atom<userType | null>(null);

export type suggestionType = string[];

export const suggestionAtom = atom<suggestionType | null>(null);
