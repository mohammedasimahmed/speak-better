import React from "react";

type InputFieldProps = {
  type: string;
  placeholder: string;
  id?: string;
  name?: string;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
};

const InputField = ({ id, name, type, placeholder, className, ref }: InputFieldProps) => (
  <div>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      ref={ref}
      className={className ? className : "border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"}
    />
  </div>
);

export default InputField;
