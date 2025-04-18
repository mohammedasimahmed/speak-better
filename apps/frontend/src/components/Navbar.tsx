"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store";
import Button from "./Button";

const Navbar = () => {
  const [user] = useAtom(userAtom);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="w-full fixed top-0 z-20 px-6 py-3 text-white">
      <div className="w-full flex items-center justify-between">
        <Link href="/">
          <div className="text-2xl lg:text-3xl font-semibold">SpeakBetter</div>
        </Link>
        {/* Desktop View */}
        <div className="hidden md:flex flex-1 gap-8 mx-3 justify-center items-center">
          <Link href="/" className="text-lg hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-lg hover:underline">
            About
          </Link>
          <Link href="/speak" className="text-lg hover:underline">
            Speak
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          {user ? (
            <>
              <div className="mr-2 text-lg">
                {user.username}
              </div>
              <Button className="text-lg hover:underline hover:cursor-pointer">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-lg hover:underline">
                Login
              </Link>
              <Link className="text-lg hover:underline" href="/register">
                Register
              </Link>
            </>
          )}
        </div>
        {/* Hamburger Menu for Mobile */}
        <Button className="md:hidden flex items-center text-3xl hover:cursor-pointer" clickHandler={toggleNavbar}>
          {isNavbarOpen ? <>x</> : <>≡</>}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isNavbarOpen && (
        <div className="md:hidden flex flex-col items-center py-3 mt-3">
          <Link href="/" className="mb-1 text-lg" onClick={toggleNavbar}>
            Home
          </Link>
          <Link href="/about" className="mb-1 text-lg" onClick={toggleNavbar}>
            About
          </Link>
          <Link href="/speak" className="mb-2 text-lg" onClick={toggleNavbar}>
            Speak
          </Link>
          {user ? (
            <>
              <div className="text-lg">{user.username}</div>
              <Button className="text-lg hover:underline hover:cursor-pointer">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="mb-2 text-lg" onClick={toggleNavbar}>
                Login
              </Link>
              <Link href="/register" className="text-lg" onClick={toggleNavbar}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
