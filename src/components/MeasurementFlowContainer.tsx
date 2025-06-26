"use client";

import { useState, useEffect, createContext, useContext } from "react";
import ButtonArduino from "./ButtonArduino";
import Measurement from "./Measurement";
import { sendToArduino } from "@/utils/arduino";

type Props = {
  unidad: string;
  sendParam: string;
  paso?: number;
  disabledSave?: boolean;
};

export default function MeasurementFlowContainer({
  unidad,
  sendParam,
  paso = -1,
  disabledSave = false,
}: Props) {
  const [mostrarMedicion, setMostrarMedicion] = useState(false);
  const [medicionTerminada, setMedicionTerminada] = useState(false);
  const [repetir, setRepetir] = useState(false);
  const [deshabilitado, setDeshabilitado] = useState(false);

  useEffect(() => {
    if (medicionTerminada) {
      //Cuando termina la medicion
      setRepetir(true); //Cambia el texto del boton a "Repetir medición"
      setDeshabilitado(false); // Reactivar el botón cuando el hijo lo indique
      setMedicionTerminada(false); // Dejarlo listo para la próxima medición
    }
  }, [medicionTerminada]);

  return (
    <div className="flex flex-col items-center gap-1">
      <ButtonArduino
        sendToArduino={sendToArduino}
        sendParam={sendParam}
        unidad={unidad}
        repetir={repetir}
        setMostrarMedicion={setMostrarMedicion}
        deshabilitado={deshabilitado}
        setDeshabilitado={setDeshabilitado}
        className="m-2"
      >
        Realizar medición
      </ButtonArduino>

      {mostrarMedicion && (
        <Measurement
          unidad={unidad}
          setMedicionTerminada={setMedicionTerminada}
          type={parseInt(sendParam)}
          paso={paso}
          disabledSave={disabledSave}
        />
      )}
    </div>
  );
}
