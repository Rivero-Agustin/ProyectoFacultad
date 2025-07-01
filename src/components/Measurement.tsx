"use client";

import { useState, useEffect } from "react";
import SaveMeasurementButton from "./SaveMeasurementButton";
import PopupSobreescritura from "./popups/PopupSorbeescritura";
import EstructuraMediciones from "./EstructuraMediciones";
import PopupSimple from "./popups/PopupSimple";
import { useDataContext } from "@/context/DataContext";
import { toast } from "sonner";

type Props = {
  unidad: string;
  setMedicionTerminada: (condicion: boolean) => void;
  type: number;
  paso: number;
  disabledSave?: boolean;
  onGuardar?: () => void;
  textoFicha?: string;
};

export default function Measurement({
  unidad,
  setMedicionTerminada,
  type,
  paso,
  disabledSave,
  onGuardar,
  textoFicha,
}: Props) {
  const [arduinoData, setArduinoData] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el popup
  const [sobreescribirFichaIsOpen, setSobreescribirFichaIsOpen] =
    useState(false);
  const [noSobreescribirFichaIsOpen, setNoSobreescribirFichaIsOpen] =
    useState(false);

  const [primeraMed, setPrimeraMed] = useState(true); //

  const { measurements } = useDataContext(); // Función del contexto

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

  const handleSobreescribirFicha = () => {
    const index = measurements.findIndex((m) => m.indexType === 1);
    if (index != -1) {
      measurements[index].value = parseFloat(arduinoData);
      measurements[
        index
      ].type = `Corriente de fuga del equipo - Método directo - Ficha: ${textoFicha}`;
    }
    toast.success("Medición sobreescrita correctamente"); // Muestra un mensaje de éxito
    setSobreescribirFichaIsOpen(false);
  };

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
          disabledSave={disabledSave}
          onGuardar={onGuardar}
          textoFicha={textoFicha}
          setSobreescribirFichaIsOpen={setSobreescribirFichaIsOpen}
          setNoSobreescribirFichaIsOpen={setNoSobreescribirFichaIsOpen}
        ></SaveMeasurementButton>
      </div>
      {/* <EstructuraMediciones></EstructuraMediciones> */}

      <PopupSobreescritura
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        type={type} // Pasar el tipo de medición al popup
        newValue={arduinoData} // Pasar el valor al popup
      ></PopupSobreescritura>

      {/* Popup para sobreescribir mediciones en posicion de fichas de valores mayores */}
      {/* Solo funcionan para la medicion 1, por ahora */}
      <PopupSimple
        isOpen={sobreescribirFichaIsOpen}
        onClose={handleSobreescribirFicha}
        title="El valor de la medición en esta posición de la ficha es mayor que los anteriores"
        message="Se documentará este valor, eliminando los resultados de las otras posiciones"
      ></PopupSimple>

      {/* Popup de aviso para no sobreescribir valores de medicion de posiciones de ficha, cuando el valor de la medicion no supera a otra posicion de ficha */}
      <PopupSimple
        isOpen={noSobreescribirFichaIsOpen}
        onClose={() => setNoSobreescribirFichaIsOpen(false)}
        title="El valor de la medición en esta posición de la ficha NO supera al anterior"
        message="Este valor NO se documentará, permanece guardado el valor mayor"
      ></PopupSimple>
    </>
  );
}
