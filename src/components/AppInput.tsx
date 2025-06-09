import React from "react";

type AppInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function AppInput(props: AppInputProps) {
  return (
    <input
      className="w-full rounded border border-gray-300 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-gray-100 text-gray-900"
      {...props}
    />
  );
}
