"use client";
import IsAuth from "@/components/auth/IsAuth";
import Loading from "@/components/Loading";
import Suggestions from "@/components/Suggestions";
import VideoFeed from "@/components/VideoFeed";
import { isSuggestionLoadingAtom, suggestionAtom } from "@/store";
import { useAtomValue } from "jotai";
import React from "react";

const page = () => {
  const suggestion = useAtomValue(suggestionAtom);
  const isSuggestionLoading = useAtomValue(isSuggestionLoadingAtom);
  return (
    <IsAuth>
      {
        isSuggestionLoading && <Loading message="Suggestion Loading..." />
      }
      {
        !isSuggestionLoading && suggestion ? (
          <Suggestions />
        ) : (
          <VideoFeed />
        )
      }
    </IsAuth>
  );
};

export default page;
