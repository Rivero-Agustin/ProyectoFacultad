// components/AppLink.tsx
// Este componente es un enlace estilizado que se puede usar en toda la aplicación

import Link from "next/link";
import React from "react";

type AppLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "button" | "ghost";
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
};

export const AppLink: React.FC<AppLinkProps> = ({
  href,
  children,
  variant = "default",
  className,
  target,
  rel,
}) => {
  const classes = "p-2 rounded-lg text-xl transition text-center";
  const variants = {
    default: "bg-primary-button hover:bg-primary-button-hover",
    ghost: "bg-gray-700 hover:bg-cyan-900",
    button:
      "inline-block px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors",
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`${classes} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};
