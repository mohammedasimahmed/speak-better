"use client";
import React from "react";
import InputField from "../InputField";
import Button from "../Button";
import InputLabel from "../InputLabel";
import Link from "next/link";

const LoginForm = () => {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="p-6 space-y-4 sm:p-8 sm:pt-6" onSubmit={handleSubmit}>
      <InputLabel label="Username" htmlFor="username" />
      <InputField id="username" name="username" type="text" placeholder="Your Username" ref={usernameRef} />
      <InputLabel label="Password" htmlFor="password" />
      <InputField id="password" name="password" type="password" placeholder="••••••••" ref={passwordRef} />
      <Button type="submit">
        Login
      </Button>
      <p className="text-sm font-light text-center">
        Don&apos;t have an account yet?
        <Link href="/register" className="font-medium ml-2 text-primary-600 hover:underline hover:cursor-pointer text-primary-500">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
