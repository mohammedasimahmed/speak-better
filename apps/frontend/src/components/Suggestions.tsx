import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { suggestionAtom } from "@/store";
import Button from "./Button";

const Suggestions = () => {
  const [suggestions] = useAtom(suggestionAtom);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const suggestionTextRef = useRef<HTMLDivElement | null>(null);

  // Update the displayed suggestion text when the index changes
  useEffect(() => {
    if (suggestionTextRef.current && suggestions) {
      suggestionTextRef.current.innerHTML = suggestions[selectedSuggestionIndex];
    }
  }, [selectedSuggestionIndex, suggestions]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-4/5 h-3/4 flex flex-col items-center bg-white rounded-3xl shadow-lg p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions?.map((suggestion, index) => (
            <Button
              key={index}
              clickHandler={() => setSelectedSuggestionIndex(index)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center text-white"
            >
              Suggestion {index + 1}
            </Button>
          ))}
        </div>

        <div className="p-6 bg-gray-100 flex-1 w-full rounded-lg overflow-scroll text-center sm:text-left">
          <div ref={suggestionTextRef} className="text-lg h-full text-gray-800l" />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
