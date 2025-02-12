"use client"; // Es necesario porque usa useRouter

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  sendToArduino?: (data: string) => void;
  sendParam?: string;
  [key: string]: any; // Para otras props como onClick, id, etc.
}

const Button = ({
  href,
  children,
  className = "",
  sendToArduino,
  sendParam = "",
  ...props
}: ButtonProps) => {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (sendToArduino) {
      sendToArduino(sendParam);
    }

    if (href) {
      e.preventDefault(); // Evita que el Link haga la navegación automática
      setTimeout(() => {
        router.push(href); // Navega después de enviar el dato
      }, 200); // Pequeña espera para asegurar que el envío se complete
    }
  };

  const classes = `bg-cyan-700 p-2 m-5 hover:bg-cyan-900 rounded-lg text-xl transition ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
  // si hay un href, renderiza un link, sino un button
  return (
    <button className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
