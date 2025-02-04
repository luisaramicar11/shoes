import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  name?: string;
  error?: string;
}
export const Input = ({
  placeholder,
  type = "text",
  name,
  error,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col mb-4 ">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`px-4 py-2 border  rounded-lg text-gray-700 
            placeholder-gray-400 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:border-transparent
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};