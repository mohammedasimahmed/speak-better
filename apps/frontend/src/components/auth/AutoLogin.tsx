"use client";
import getNewToken from "@/services/getNewToken";
import { userAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

const AutoLogin = () => {
  const setUser = useSetAtom(userAtom);

  const checkAuth = async () => {
    const username = sessionStorage.getItem("username");
    const email = sessionStorage.getItem("email");
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken && username && email) {
      setUser({ username, email });
      return;
    }

    sessionStorage.clear();

    try {
      const response = await getNewToken();
      if (response.ok) {
        const { accessToken, username, email } = await response.json();
        setUser({ username, email });

        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("email", email);
      }
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    checkAuth();
  }, []);
  return null;
};

export default AutoLogin;
