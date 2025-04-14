"use client";

import { useState, useEffect } from "react";
import SaveMeasurementButton from "./SaveMeasurementButton";
import PopupSobreescritura from "./PopupSorbeescritura";

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
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el popup
  const [primeraMed, setPrimeraMed] = useState(true); //

  useEffect(() => {
    const valor = arduinoData.trim();
    if (valor && valor !== "Midiendo") {
      setMedicionTerminada(true);
      primeraMed && setPrimeraMed(false); // Cambia el estado a false después de la primera medición
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

  return arduinoData.trim() == "Midiendo" || primeraMed ? (
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
        setIsOpen={setIsOpen} // Pasar la función para abrir el popup
      ></SaveMeasurementButton>
      <PopupSobreescritura
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        type={type} // Pasar el tipo de medición al popup
        newValue={arduinoData} // Pasar el valor al popup
      >
        <div>
          <h2 className="mt-2 text-2xl font-bold text-black">
            Esta medición ya se ha guardado
          </h2>
          <p className="mt-4 text-black text-center">
            Desea sobreescribir la medición anterior?
          </p>
        </div>
      </PopupSobreescritura>
    </>
  );
}
