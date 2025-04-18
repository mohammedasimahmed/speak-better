"use client";
import React from "react";
import InputField from "../InputField";
import Button from "../Button";
import InputLabel from "../InputLabel";
import Link from "next/link";
import registerUser from "@/services/registerUser";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      username: usernameRef.current? usernameRef.current.value : "",
      email: emailRef.current? emailRef.current.value : "",
      password: passwordRef.current? passwordRef.current.value: "",
    };

    try {
      await registerUser(user);
      router.push("/login");
    } catch (error:unknown) {
      if(error instanceof Error)
      {
        // console.log(error.message);
      }
      else
      {
        // console.log("An unknown error occurred");
      }
    }
  };

  return (
    <form className="p-6 space-y-4 sm:p-8 sm:pt-6" onSubmit={handleSubmit}>
      <InputLabel label="Username" htmlFor="username" />
      <InputField id="username" name="username" type="text" placeholder="Your Username" ref={usernameRef} />
      <InputLabel label="Email" htmlFor="email" />
      <InputField id="email" name="email" type="email" placeholder="Your Email" ref={emailRef} />
      <InputLabel label="Password" htmlFor="password" />
      <InputField id="password" name="password" type="password" placeholder="••••••••" ref={passwordRef} />
      <Button type="submit">
        Register
      </Button>
      <p className="text-sm font-light text-center">
        Already have an account?
        <Link href="/login" className="font-medium ml-2 text-primary-600 hover:underline hover:cursor-pointer text-primary-500">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
