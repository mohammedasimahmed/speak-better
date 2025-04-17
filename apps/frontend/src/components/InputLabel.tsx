import React from "react";

type InputLabelProps = {
  label: string;
  htmlFor?: string;
  className?: string;
};

const InputLabel = ({ label, htmlFor, className }: InputLabelProps) => (
  <label className={className ? className : "block mb-2 text-sm font-medium"} htmlFor={htmlFor}>
    {label}
  </label>
);

export default InputLabel;