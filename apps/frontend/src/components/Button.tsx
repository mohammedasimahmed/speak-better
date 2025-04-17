import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  clickHandler?: () => void;
  children: React.ReactNode;
};

const Button = ({ type = "button", className, clickHandler, children }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={className ? className : "w-full bg-blue-600 hover:bg-primary-700 hover:cursor-pointer focus:ring-1 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"}
    >
      {children}
    </button>
  );
};

export default Button;