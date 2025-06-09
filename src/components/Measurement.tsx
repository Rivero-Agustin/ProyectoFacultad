"use client";

import { useState, useEffect } from "react";
import SaveMeasurementButton from "./SaveMeasurementButton";
import PopupSobreescritura from "./popups/PopupSorbeescritura";
import EstructuraMediciones from "./EstructuraMediciones";

type Props = {
  unidad: string;
  setMedicionTerminada: (condicion: boolean) => void;
  type: number;
  paso: number;
};

export default function Measurement({
  unidad,
  setMedicionTerminada,
  type,
  paso,
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
    <p className="text-white text-xl bg-error p-2 rounded-lg">
      Realizando medición...
    </p>
  ) : (
    <>
      <div className="w-full flex flex-row justify-center gap-4 items-center">
        <p className="text-white text-xl">
          Resultado:{" "}
          <span className="text-success font-bold">
            {arduinoData} {unidad}
          </span>
        </p>
        <SaveMeasurementButton
          saveValue={arduinoData}
          unit={unidad}
          type={type}
          setIsOpen={setIsOpen} // Pasar la función para abrir el popup
          paso={paso}
        ></SaveMeasurementButton>
      </div>
      {/* <EstructuraMediciones></EstructuraMediciones> */}

      <PopupSobreescritura
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        type={type} // Pasar el tipo de medición al popup
        newValue={arduinoData} // Pasar el valor al popup
      ></PopupSobreescritura>
    </>
  );
}
