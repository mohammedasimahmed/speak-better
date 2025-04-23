"use client";
import React, { useEffect, useRef, useState } from "react";
import detectExpression from "@/services/detectExpression";
import createSpeechRecognizer from "@/services/createSpeechRecognizer";
import improveSpeech from "@/services/improveSpeech";
import { useSetAtom } from "jotai";
import { suggestionAtom } from "@/store";
import loadFaceApiModels from "@/services/loadFaceApiModels";

const VideoFeed = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [wordEmotionPairs, setWordEmotionPairs] = useState<{ word: string; emotion: string }[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const emotionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const noSpeechIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isRecordingRef = useRef<boolean>(false);
  const setSuggestion = useSetAtom(suggestionAtom);

  const currentEmotionRef = useRef<string>("");
  const lastSpeechTimestamp = useRef<number>(Date.now());

  const initializeVideoStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const startRecording = () => {
    if (!videoRef.current) return;

    setIsRecording(true);
    isRecordingRef.current = true;
    setWordEmotionPairs([]);

    const recognition = createSpeechRecognizer();
    recognitionRef.current = recognition;

    const previousWords: string[] = [];

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
        .trim();

      const currentWords = transcript.split(/\s+/);

      while (previousWords.length < currentWords.length) {
        const newWord = currentWords[previousWords.length];
        lastSpeechTimestamp.current = Date.now();

        setWordEmotionPairs((prev) => [
          ...prev,
          {
            word: newWord,
            emotion: currentEmotionRef.current || "[No Emotion]",
          },
        ]);

        previousWords.push(newWord);
      }
    };

    recognition.start();

    // Detect emotion every 100ms
    emotionIntervalRef.current = setInterval(async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        const expression = await detectExpression(videoRef.current);
        if (expression) {
          currentEmotionRef.current = expression;
        }
      }
    }, 100);

    // Add "[No Speech]" entry if no speech for over 1500ms
    noSpeechIntervalRef.current = setInterval(() => {
      const now = Date.now();
      if (now - lastSpeechTimestamp.current > 1500) {
        lastSpeechTimestamp.current = now;
        setWordEmotionPairs((prev) => [
          ...prev,
          { word: "[No Word]", emotion: currentEmotionRef.current || "[No Emotion]" },
        ]);
      }
    }, 1500);
  };

  const stopRecording = () => {
    setIsRecording(false);
    isRecordingRef.current = false;
    recognitionRef.current?.stop();

    if (emotionIntervalRef.current) clearInterval(emotionIntervalRef.current);
    if (noSpeechIntervalRef.current) clearInterval(noSpeechIntervalRef.current);
  };

  const processSpeechImprovement = async () => {
    if (wordEmotionPairs.length > 0 && !isRecordingRef.current) {
      const { improvements } = await improveSpeech(wordEmotionPairs);

      if (improvements) {
        setSuggestion(JSON.parse(improvements));
      }
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      await loadFaceApiModels();
      initializeVideoStream();
    };

    initializeApp();

    return () => {
      if (emotionIntervalRef.current) clearInterval(emotionIntervalRef.current);
      if (noSpeechIntervalRef.current) clearInterval(noSpeechIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    processSpeechImprovement();
  }, [wordEmotionPairs, isRecording]);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="text-2xl md:text-3xl font-bold text-white mt-11">Improve Your Speech</div>
      <div className="w-full h-full flex flex-col items-center mt-2 p-2">
        <div className="w-full h-full sm:w-4/5 md:w-2/3 lg:w-3/4 xl:w-1/2">
          <video ref={videoRef} className="w-full h-full object-cover rounded-lg rotate-y-180" autoPlay muted />
        </div>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`mt-4 p-2 rounded ${isRecording ? "bg-red-600" : "bg-green-600"} text-white`}
        >
          {isRecording ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default VideoFeed;
