"use client";
import React, { useRef } from "react";
import InputField from "../InputField";
import Button from "../Button";
import InputLabel from "../InputLabel";
import Link from "next/link";
import loginUser from "@/services/loginUser";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      username: usernameRef.current ? usernameRef.current.value : "",
      password: passwordRef.current ? passwordRef.current.value : "",
    };

    try {
      const result = await loginUser(user);
      const { user: existingUser, accessToken } = result;

      const { username, email } = existingUser;
      setUser({ username, email });

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("email", email);

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // console.log(error.message);
      } else {
        // console.error("An unknown error occurred");
      }
    }

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
