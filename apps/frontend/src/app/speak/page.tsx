"use client";
import Suggestions from "@/components/Suggestions";
import VideoFeed from "@/components/VideoFeed";
import { suggestionAtom } from "@/store";
import { useAtomValue } from "jotai";
import React from "react";

const page = () => {
  const suggestion = useAtomValue(suggestionAtom);
  return (
    <>
      {
        suggestion ? (
          <Suggestions />
        ) : (
          <VideoFeed />
        )
      }
    </>
  );
};

export default page;
