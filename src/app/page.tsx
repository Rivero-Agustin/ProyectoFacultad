"use client"; // Indica que este componente se ejecuta en el cliente

import { useEffect, useState } from "react";
import { sendToArduino } from "@/utils/arduino";
import Button from "@/components/Button";

const Home = () => {
  const [arduinoData, setArduinoData] = useState("");

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

  return (
    <>
      <div className="m-4">
        <p className="text-center">*Agregar indicaciones*</p>
        <p>
          Conecte el dispositivo -- Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Amet, non ullam perspiciatis possimus fugiat commodi
          sint vitae, at eaque similique impedit. Nihil aspernatur corrupti
          voluptas, nemo laboriosam beatae unde natus?
        </p>
        <h1>Datos de Arduino: {arduinoData}</h1>
        <Button sendToArduino={sendToArduino} sendParam="hola">
          Enviar a Arduino
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <Button className="" href="/iniciar">
          Iniciar Medición
        </Button>
      </div>
    </>
  );
};

export default Home;
