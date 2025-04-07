"use client";

import { useState, useEffect } from "react";
import SaveMeasurementButton from "./SaveMeasurementButton";

type Props = {
  unidad: string;
  setMedicionTerminada: (condicion: boolean) => void;
  type: number;
};

export default function Measurement({
  unidad,
  setMedicionTerminada,
  type,
}: Props) {
  const [arduinoData, setArduinoData] = useState("");

  useEffect(() => {
    const valor = arduinoData.trim();
    if (valor && valor !== "Midiendo") {
      setMedicionTerminada(true);
    }
  }, [arduinoData, setMedicionTerminada]);

  useEffect(() => {
    let removeListener: (() => void) | undefined;

    if (window.electron) {
      const listener = (data: string) => {
        setArduinoData(data);
      };
      window.electron.onArduinoData(listener);

      // Simula una función de limpieza (si implementaste "removeListener" en tu preload.js)
      removeListener = () => {
        window.electron.removeArduinoDataListener?.(listener);
      };
    }

    return () => {
      removeListener?.();
    };
  }, []);

  return arduinoData.trim() == "Midiendo" ? (
    <p className="text-white text-xl bg-red-600 p-2 rounded">
      Realizando medición...
    </p>
  ) : (
    <>
      <p className="text-white text-xl">
        Resultado:{" "}
        <span className="text-green-600 font-bold">
          {arduinoData} {unidad}
        </span>
      </p>
      <SaveMeasurementButton
        saveValue={arduinoData}
        unit={unidad}
        type={type}
      ></SaveMeasurementButton>
    </>
  );
}
