import React from "react";

interface LoadingProps {
    message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-white text-lg">{message}</p>
      </div>
    </>
  );
};

export default Loading;
