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
  [key: string]: any; // Para otras props como onClick, id, etc.
}

const ButtonArduino = ({
  href,
  children,
  className = "",
  sendToArduino,
  sendParam = "",
  unidad = "",
  ...props
}: ButtonArduinoProps) => {
  const router = useRouter();
  const [mostrar, setMostrar] = useState(false);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [medicionTerminada, setMedicionTerminada] = useState(false);

  useEffect(() => {
    if (medicionTerminada) {
      setDeshabilitado(false); // Reactivar el botón cuando el hijo lo indique
      setMedicionTerminada(false); // Dejarlo listo para la próxima medición
    }
  }, [medicionTerminada]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    unidad != "" && setMostrar(true); // Si hay unidad, muestra el botón de la medición
    setDeshabilitado(true); // Deshabilita el botón cuando hace click

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
        {children}
      </button>
      {mostrar && (
        <Measurement
          unidad={unidad}
          setMedicionTerminada={setMedicionTerminada}
          type={sendParam} // Agregar el tipo de medición
        />
      )}
    </>
  );
};

export default ButtonArduino;
