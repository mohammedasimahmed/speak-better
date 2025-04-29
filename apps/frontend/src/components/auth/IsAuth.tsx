"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-white text-lg">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default IsAuth;
