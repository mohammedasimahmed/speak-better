import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full rounded-lg shadow border m-2 sm:m-0 sm:max-w-md bg-gray-800 border-gray-700 text-white">
        <h1 className="text-xl text-center font-bold mt-6 md:text-2xl">
        Register into your account
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
