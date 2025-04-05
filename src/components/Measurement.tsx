"use client";

import { useState, useEffect } from "react";

type Props = {
  unidad?: string;
  setFinMedicion: (condicion: boolean) => void;
};

export default function Measurement({ unidad, setFinMedicion }: Props) {
  const [arduinoData, setArduinoData] = useState("");
  //let midiendo = false;

  useEffect(() => {
    if (arduinoData.trim() != "Midiendo") {
      setFinMedicion(true); // Notifica al padre que debe reactivar el botón
    }
  }, [setFinMedicion]);

  useEffect(() => {
    if (window.electron) {
      window.electron.onArduinoData((data) => {
        setArduinoData(data);
      });
    }

    return () => {
      if (window.electron) {
        window.electron.onArduinoData(() => {}); // Limpia el listener al desmontar
      }
    };
  }, []);

  // if (arduinoData.length == 2) {
  //   midiendo = true;
  // } else {
  //   midiendo = false;
  // }

  // return arduinoData.length == 2 ? (
  //   <p className="text-white text-xl bg-red-600 p-2 rounded">
  //     Realizando medición...
  //   </p>
  // ) : (
  //   <p className="text-green-600 text-xl">Resultado: {arduinoData} Ω</p>
  // );

  return arduinoData.trim() == "Midiendo" ? (
    <p className="text-white text-xl bg-red-600 p-2 rounded">
      Realizando medición...
    </p>
  ) : (
    <p className="text-white text-xl">
      Resultado:{" "}
      <span className="text-green-600 font-bold">
        {arduinoData} {unidad}
      </span>
    </p>
  );
}
