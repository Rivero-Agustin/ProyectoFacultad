"use client"; // Es necesario porque usa useRouter

//Este boton permite enviar datos a un arduino,
// renderiza un link si hay un href, sino renderiza un button
// y si hay una unidad, agrega un boton de medicion al hacer click

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Measurement from "./Measurement";

interface ButtonArduinoProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  sendToArduino?: (data: string) => void;
  sendParam?: string;
  unidad?: string;
  repetir?: boolean; // Permite cambiar el texto del boton a "Repetir medición" si es true
  setMostrarMedicion: (mostrar: boolean) => void; // Función para cambiar el estado de mostrarMedicion
  deshabilitado: boolean; // Prop para deshabilitar el botón
  setDeshabilitado: (deshabilitado: boolean) => void; // Función para cambiar el estado de deshabilitado
  [key: string]: any; // Para otras props como onClick, id, etc.
}

let bandera = false; // Bandera para verificar si la medición fue realizada

const ButtonArduino = ({
  href,
  children,
  className = "",
  sendToArduino,
  sendParam = "",
  unidad = "",
  repetir = false,
  setMostrarMedicion,
  deshabilitado,
  setDeshabilitado,
  ...props
}: ButtonArduinoProps) => {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    setMostrarMedicion(true); // Muestra el componente de medición
    setDeshabilitado(true); //Deshabilita el boton al hacer click, porque se esta realizando la medicion

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

  const classes = ` p-2 m-5 rounded-lg text-xl transition text-center ${
    deshabilitado
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-cyan-700 hover:bg-cyan-900"
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
  // si hay un href, renderiza un link, sino un button:
  return (
    <>
      <button
        className={classes}
        onClick={handleClick}
        disabled={deshabilitado}
        {...props}
      >
        {repetir ? "Repetir medición" : children}
      </button>
    </>
  );
};

export default ButtonArduino;
