import { atom } from "jotai";

export type userType = {
    username: string,
    email: string,
}

export const userAtom = atom<userType | null>(null);

export type suggestionType = string[];

export const suggestionAtom = atom<suggestionType | null>(null);

export const isSuggestionLoadingAtom = atom<boolean>(false);