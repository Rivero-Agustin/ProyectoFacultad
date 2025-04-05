// components/AppButton.tsx
// Este componente es un boton estilizado que se puede usar en toda la aplicación

import React from "react";

type AppButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "button" | "ghost";
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
};

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant = "default",
  className,
  rel,
}) => {
  const classes = "p-2 m-5 rounded-lg text-xl transition text-center";
  const variants = {
    default: "bg-cyan-700 hover:bg-cyan-900",
    ghost: "bg-gray-700 hover:bg-cyan-900",
    button:
      "inline-block px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors",
  };

  return (
    <button
      rel={rel}
      className={`${classes} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
