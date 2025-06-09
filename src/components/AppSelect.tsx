import React from "react";

type AppSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function AppSelect(props: AppSelectProps) {
  return (
    <select
      className="w-full rounded border border-gray-300 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-gray-100 text-gray-900"
      {...props}
    />
  );
}
