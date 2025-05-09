// components/AppButton.tsx
// Este componente es un boton estilizado que se puede usar en toda la aplicación

import React from "react";

type AppButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "button" | "ghost" | "buttonRed" | "buttonCyan";
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
  disabled?: boolean;
  [key: string]: any; // Para otras props como onClick, id, etc.
};

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant = "default",
  className,
  rel,
  disabled,
  ...props
}) => {
  const classes =
    "m-2 transition text-center text-white px-4 py-2 rounded text-lg";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700",
    ghost: "bg-gray-700 hover:bg-cyan-900",
    button:
      "inline-block px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors",
    buttonRed: "bg-red-500 hover:bg-red-700",
    buttonCyan: "bg-cyan-600 hover:bg-cyan-700",
  };

  const disabledClasses = disabled
    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
    : variants[variant];

  return (
    <button
      rel={rel}
      className={`${classes} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
