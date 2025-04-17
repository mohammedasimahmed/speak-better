import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full rounded-lg shadow border m-2 sm:m-0 sm:max-w-md bg-gray-800 border-gray-700 text-white">
        <h1 className="text-xl text-center font-bold mt-6 md:text-2xl">
          Login to your account
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
