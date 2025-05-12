"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Loading from "../Loading";

interface IsAuthProps {
  children: React.ReactNode
}

const IsAuth = ({ children }: IsAuthProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      redirect("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  return <>{children}</>;
};

export default IsAuth;
